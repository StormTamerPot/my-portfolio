// Single source of truth for blog category ids, shared with the content
// collection schema in `content.config.ts` so the two can never drift apart.
export const BLOG_CATEGORY_IDS = [
  'robot-manipulation',
  'vla',
  'robotics',
  'research-notes',
] as const;

export type BlogCategoryId = (typeof BLOG_CATEGORY_IDS)[number];

const BLOG_CATEGORY_META: Record<
  BlogCategoryId,
  { label: string; description: string }
> = {
  'robot-manipulation': {
    label: 'Robot Manipulation',
    description: '로봇 팔 제어, 파지, 물체 조작과 관련된 기록입니다.',
  },
  vla: {
    label: 'VLA',
    description: 'Vision-Language-Action 모델과 로봇 지능에 관한 기록입니다.',
  },
  robotics: {
    label: 'Robotics',
    description: '로봇 시스템, 센서, ROS, 제어에 관한 기록입니다.',
  },
  'research-notes': {
    label: 'Research Notes',
    description: '논문, 실험, 학습 과정에서 얻은 생각을 정리합니다.',
  },
};

export const SITE_CONFIG = {
  site: {
    title: 'Lee Geonwoo',
    description:
      'Robot Manipulation과 Vision-Language-Action(VLA)을 연구하는 Lee Geonwoo의 포트폴리오 & 블로그입니다.',
  },

  profile: {
    name: 'Lee Geonwoo',
    role: 'Undergraduate Researcher',
    image: '/images/profile.png',
    email: 'thisiswoo04@gmail.com',
    label: 'ROBOTICS · RESEARCH · PROJECTS',
    description: [
      'Robot Manipulation과 Vision-Language-Action(VLA) 분야에 관심을 두고, 로봇이 시각과 언어 정보를 바탕으로 주변 환경을 이해하고 물체를 정확하게 조작하는 방법을 탐구하고 있습니다.',
      '이 공간에는 로보틱스 프로젝트의 구현 과정, 실험에서 얻은 시행착오, 그리고 연구와 학습을 통해 새롭게 발견한 내용을 기록합니다.',
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
      description: '로보틱스 연구, 프로젝트, 학습 과정에 대한 모든 기록입니다.',
    },
    ...BLOG_CATEGORY_IDS.map((id) => ({ id, ...BLOG_CATEGORY_META[id] })),
  ],

  // Note: posts are not listed here — they're read from the `blog` content
  // collection (src/content/blog/).
} as const;
