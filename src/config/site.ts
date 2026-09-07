// Single source of truth for blog category ids, shared with the content
// collection schema in `content.config.ts` so the two can never drift apart.
export const BLOG_CATEGORY_IDS = ['microelectronics', 'circuit-theory'] as const;

export type BlogCategoryId = (typeof BLOG_CATEGORY_IDS)[number];

const BLOG_CATEGORY_META: Record<
  BlogCategoryId,
  { label: string; description: string }
> = {
  'microelectronics': {
    label: 'Microelectronics',
    description: '전자회로 문제 풀이',
  },
  'circuit-theory': {
    label: 'Circuit Theory',
    description: '회로이론 문제 풀이',
  },
};

export interface GpaTerm {
  /** Full term name, used in the tooltip/table (e.g. "1학년 1학기"). */
  term: string;
  /** Compact axis label (e.g. "1-1", "1-여름"). */
  short: string;
  /** null for a term still in progress — rendered as a pending marker. */
  gpa: number | null;
  /** Optional major-only GPA, shown as a secondary annotation on that point. */
  majorGpa?: number;
}

// Append a new entry each semester — GpaChart.astro re-derives the chart's
// scale and gridlines from whatever values are here.
// Summer-term GPA is intentionally excluded from this list — it isn't part
// of the regular semester progression this chart is meant to show.
const GPA_HISTORY: GpaTerm[] = [
  { term: '1학년 1학기', short: '1-1', gpa: 3.91 },
  { term: '1학년 2학기', short: '1-2', gpa: 4.18 },
  { term: '2학년 1학기', short: '2-1', gpa: 4.28, majorGpa: 4.38 },
];

export const SITE_CONFIG = {
  site: {
    title: 'Lee Geonwoo',
    description: '전자공학을 공부하는 Lee Geonwoo의 개인 학습 기록 & 블로그입니다.',
  },

  profile: {
    name: 'Lee Geonwoo',
    role: '전자공학부 2학년',
    image: '/images/profile.png',
    email: 'thisiswoo04@gmail.com',
    label: 'ELECTRICAL ENGINEERING · ELECTROMAGNETICS',
    description: [
      'Welcome to my website! \n',
      'I am a second-year student majoring in Electronic Engineering at Jeonbuk National University.',
      'I initially entered the university in 2023 as a student in the Department of Computer Science and Artificial Intelligence, and later transferred to Electronic Engineering in 2026.',
      'I love creating things. During my freshman year, I wanted to build a website, so I learned foundational languages of web development such as HTML, CSS, and JS, and created a dormitory website for Jeonbuk National University. Building on the web knowledge I gained back then, I developed a seat availability notification program for course registration using vibe coding during the summer break of my sophomore year. Moving forward, I plan to enter the field of Physical AI to control actual physical spaces.',
    ],
  },

  academics: {
    // GPA is on a 4.5 scale — GpaChart.astro reads this for the axis max.
    gpaScale: 4.5,
    gpaHistory: GPA_HISTORY,
  },

  links: {
    github: 'https://github.com/StormTamerPot',
  },

  navigation: [
    { href: '/', label: 'About' },
    { href: '/blog', label: 'Notes' },
  ],

  blogCategories: [
    {
      id: 'all' as const,
      label: 'All',
      description: '열공해 봅시다.',
    },
    ...BLOG_CATEGORY_IDS.map((id) => ({ id, ...BLOG_CATEGORY_META[id] })),
  ],

  // Note: posts are not listed here — they're read from the `blog` content
  // collection (src/content/blog/).
} as const;
