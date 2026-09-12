# Lee Geonwoo — Portfolio & Blog

<!-- TODO: 한두 문장으로 사이트 소개 -->

대학생활의 모든 것을 기록합니다.

## 소개

<!-- TODO: 자기소개, 이 사이트를 만든 이유 등 -->


## 주요 기능

- 프로필 소개 섹션 (`src/components/ProfileCard.astro`) — 자기소개 문구, 연락처
- GPA 추이 그래프 (`src/components/GpaChart.astro`) — 학기별 평점을 카드형 라인 차트로 표시
- 블로그 (`src/content/blog/`) — 카테고리별 분류, 태그, KaTeX 수식(`$...$`, `$$...$$`) 및 이미지 지원
- 글 단위 비밀번호 보호 (`src/components/PasswordGate.astro`, `src/utils/postLock.ts`) — frontmatter에 `password` 필드만 추가하면 해당 글 본문이 AES-256-GCM으로 암호화되어 배포되고, 방문자가 비밀번호를 입력해야 브라우저에서 복호화되어 보임
- 라이트/다크 테마 토글 (`src/components/ThemeToggle.astro`)
- RSS 피드, sitemap, SEO 메타데이터(Open Graph) 자동 생성

## 기술 스택

- [Astro](https://astro.build) — 정적 사이트 생성
- TypeScript
- [KaTeX](https://katex.org) (`remark-math` + `rehype-katex`) — 수식 렌더링
- Cloudflare (정적 자산 배포)

## 프로젝트 구조

```text
├── public/
│   └── images/            # 정적 이미지 (프로필 사진 등)
├── src/
│   ├── assets/            # astro:assets로 최적화되는 이미지
│   ├── components/
│   │   ├── layout/        # BaseHead, Header, Footer — 모든 페이지 공통
│   │   └── *.astro        # ProfileCard, GpaChart, PasswordGate 등
│   ├── config/
│   │   └── site.ts        # SITE_CONFIG — 프로필, 내비게이션, 블로그 카테고리, GPA 등 모든 사이트 데이터의 단일 출처
│   ├── content/
│   │   └── blog/          # 블로그 글 (카테고리 폴더 단위)
│   ├── content.config.ts  # 블로그 글 frontmatter 스키마
│   ├── layouts/
│   ├── pages/
│   └── utils/             # postLock(비밀번호 암호화), blog, formatDate 등
├── astro.config.mjs
├── wrangler.jsonc
└── package.json
```

새로운 사이트 데이터/콘텐츠가 필요하면 컴포넌트에 하드코딩하지 말고 `src/config/site.ts`의 `SITE_CONFIG`를 확장하세요.

## 블로그 글 작성

`npm run new-post` 를 실행하면 카테고리 선택 → 제목 입력만으로 폴더와 frontmatter가 자동 생성됩니다.

```bash
npm run new-post
# 또는 한 줄로:
npm run new-post -- circuit-theory "옴의 법칙 정리"
```

직접 만들 경우 글은 `src/content/blog/<카테고리>/<slug>/index.md` 형태로 작성합니다 (카테고리와 slug, 두 단계 폴더 필수).

```yaml
---
title: '글 제목'
description: '한 줄 설명'
pubDate: 2026-01-01
tags: ['tag1', 'tag2']
password: '선택 사항 — 설정하면 글이 잠김'
heroImage: './cover.jpg' # 선택 사항, 같은 폴더에 이미지 배치
---
```

- 이미지: 글 폴더에 이미지를 넣고 `![설명](./파일명)`으로 참조
- 수식: 인라인은 `$...$`, 블록은 `$$...$$`
- 카테고리 목록/이름은 `src/config/site.ts`의 `BLOG_CATEGORY_IDS`, `BLOG_CATEGORY_META`에서 관리

## 개발 명령어

| 명령어                    | 설명                              |
| :------------------------ | :-------------------------------- |
| `npm install`              | 의존성 설치                       |
| `npm run dev`              | 로컬 개발 서버 실행 (`localhost:4321`) |
| `npm run build`            | 프로덕션 빌드 (`./dist/`)          |
| `npm run preview`          | 빌드 결과 로컬 미리보기           |
| `npm run astro -- --help`  | Astro CLI 도움말                  |

## 배포

<!-- TODO: Cloudflare 배포 관련 설명 (자동 배포 여부, 브랜치 등) -->
[여기에 적어주세요]

## 라이선스

<!-- TODO -->
[여기에 적어주세요]
