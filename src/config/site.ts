// Single source of truth for blog category ids, shared with the content
// collection schema in `content.config.ts` so the two can never drift apart.
export const BLOG_CATEGORY_IDS = ['electromagnetics', 'circuit-theory'] as const;

export type BlogCategoryId = (typeof BLOG_CATEGORY_IDS)[number];

const BLOG_CATEGORY_META: Record<
  BlogCategoryId,
  { label: string; description: string }
> = {
  electromagnetics: {
    label: 'Electromagnetics',
    description: '전기장, 자기장, 맥스웰 방정식 등 전자기학 이론을 정리합니다.',
  },
  'circuit-theory': {
    label: 'Circuit Theory',
    description: '옴의 법칙, 커패시터와 인덕터 등 회로 해석 이론을 정리합니다.',
  },
};

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

  links: {
    github: 'https://github.com/StormTamerPot',
  },

  navigation: [
    { href: '/', label: 'About' },
    { href: '/story', label: 'Story' },
    { href: '/blog', label: 'Notes' },
  ],

  blogCategories: [
    {
      id: 'all' as const,
      label: 'All',
      description: '전자공학 전공 수업과 스스로 공부한 내용을 정리한 기록입니다.',
    },
    ...BLOG_CATEGORY_IDS.map((id) => ({ id, ...BLOG_CATEGORY_META[id] })),
  ],

  // Note: posts are not listed here — they're read from the `blog` content
  // collection (src/content/blog/).
} as const;
