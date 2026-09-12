#!/usr/bin/env node
// Scaffolds a new blog post folder: src/content/blog/<category>/<slug>/index.md
// Usage:
//   npm run new-post                          (interactive prompts)
//   npm run new-post -- <category> "제목"      (non-interactive)

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { createInterface } from 'node:readline/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const rootDir = path.resolve(fileURLToPath(import.meta.url), '../..');
const siteConfigPath = path.join(rootDir, 'src/config/site.ts');
const blogDir = path.join(rootDir, 'src/content/blog');

function loadCategories() {
  const source = readFileSync(siteConfigPath, 'utf8');
  const idsMatch = source.match(/BLOG_CATEGORY_IDS\s*=\s*\[([^\]]*)\]/);
  if (!idsMatch) throw new Error('BLOG_CATEGORY_IDS를 site.ts에서 찾을 수 없습니다.');
  const ids = [...idsMatch[1].matchAll(/'([^']+)'|"([^"]+)"/g)].map(
    (m) => m[1] ?? m[2],
  );

  const labels = new Map();
  for (const id of ids) {
    const metaMatch = source.match(
      new RegExp(`${id}:\\s*{[^}]*label:\\s*'([^']+)'`),
    );
    labels.set(id, metaMatch?.[1] ?? id);
  }
  return ids.map((id) => ({ id, label: labels.get(id) }));
}

function slugify(title) {
  return title
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9가-힣\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

async function main() {
  const categories = loadCategories();
  const [argCategory, ...titleParts] = process.argv.slice(2);
  let argTitle = titleParts.join(' ').trim();

  const rl = createInterface({ input: process.stdin, output: process.stdout });
  const ask = (q) => rl.question(q);

  let category = argCategory;
  if (!category || !categories.some((c) => c.id === category)) {
    console.log('카테고리를 선택하세요:');
    categories.forEach((c, i) => console.log(`  ${i + 1}. ${c.label} (${c.id})`));
    const answer = await ask('번호 또는 id 입력: ');
    const byIndex = categories[Number(answer) - 1];
    category = byIndex?.id ?? answer.trim();
  }
  if (!categories.some((c) => c.id === category)) {
    rl.close();
    console.error(
      `"${category}"는 알 수 없는 카테고리입니다. 사용 가능: ${categories.map((c) => c.id).join(', ')}`,
    );
    process.exit(1);
  }

  let title = argTitle;
  if (!title) title = (await ask('글 제목: ')).trim();
  rl.close();

  if (!title) {
    console.error('제목이 필요합니다.');
    process.exit(1);
  }

  const slug = slugify(title);
  const postDir = path.join(blogDir, category, slug);

  if (existsSync(postDir)) {
    console.error(`이미 존재하는 폴더입니다: ${path.relative(rootDir, postDir)}`);
    process.exit(1);
  }

  mkdirSync(postDir, { recursive: true });

  const frontmatter = `---
title: '${title.replace(/'/g, "''")}'
description: ''
pubDate: ${todayISO()}
tags: []
---

`;
  const indexPath = path.join(postDir, 'index.md');
  writeFileSync(indexPath, frontmatter, 'utf8');

  console.log(`\n생성 완료: ${path.relative(rootDir, indexPath)}\n`);
  console.log('이미지를 넣으려면 같은 폴더에 파일을 두고 아래처럼 참조하세요:');
  console.log(`  대표 이미지 → heroImage: './cover.jpg' (frontmatter에 추가)`);
  console.log(`  본문 이미지 → ![설명](./파일명.jpg)`);
  console.log(`\n폴더 위치: ${path.relative(rootDir, postDir)}`);
}

main();
