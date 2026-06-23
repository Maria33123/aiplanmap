export type Locale = "en" | "zh";

export type Translation = {
  header: {
    home: string;
    blog: string;
    about: string;
  };
  hero: {
    title: string;
    description: string;
  };
  subscriptions: {
    title: string;
    description: string;
    officialPrice: string;
    bestOption: string;
    potentialSaving: string;
    viewOptions: string;
  };
  platforms: {
    title: string;
    values: Array<{
      name: string;
      description: string;
      tag: string;
    }>;
  };
  guides: {
    title: string;
    read: string;
    items: Array<{
      title: string;
      description: string;
    }>;
  };
  footer: {
    description: string;
    links: Array<{
      label: string;
      href: string;
    }>;
    copyright: string;
  };
};

export const translations: Record<Locale, Translation> = {
  en: {
    header: {
      home: "Home",
      blog: "Blog",
      about: "About",
    },
    hero: {
      title: "Find the Web's Lowest-Price Strategy for AI Subscriptions",
      description:
        "Compare official prices, shared-platform prices, and safer savings options for ChatGPT, Claude, Gemini and more.",
    },
    subscriptions: {
      title: "Popular AI subscriptions",
      description:
        "Quickly compare official prices, lower-cost options, and estimated savings.",
      officialPrice: "Official price",
      bestOption: "Best option",
      potentialSaving: "Potential saving",
      viewOptions: "View Lowest-Price Plan",
    },
    platforms: {
      title: "Trusted platform notes",
      values: [
        {
          name: "Official Plans",
          description: "Most stable, highest price.",
          tag: "Account safety first",
        },
        {
          name: "GamsGo",
          description: "Clear price advantage, with availability to review.",
          tag: "Lowest-price priority",
        },
        {
          name: "Spliiit",
          description: "More transparent sharing, useful for group subscriptions.",
          tag: "Sharing transparency",
        },
        {
          name: "Sharesub",
          description: "Flexible shared plans as an additional option.",
          tag: "Flexible plans",
        },
      ],
    },
    guides: {
      title: "Guides for smarter AI subscriptions",
      read: "Read guide",
      items: [
        {
          title: "Is shared AI subscription safe?",
          description:
            "Understand the risks, safety tips, and how to protect your account.",
        },
        {
          title: "Cheapest way to use ChatGPT Plus",
          description: "Compare prices and find the lowest-cost options that work.",
        },
        {
          title: "GamsGo vs Spliiit: which is better?",
          description:
            "Feature, price and risk comparison to help you choose confidently.",
        },
        {
          title: "How to avoid overpaying for AI tools",
          description:
            "Simple tips to save more without sacrificing experience.",
        },
      ],
    },
    footer: {
      description: "Find smarter, more affordable ways to subscribe to AI tools.",
      links: [
        { label: "Subscription Guides", href: "/blog" },
        { label: "About", href: "/platform-notice" },
        { label: "Terms", href: "#" },
        { label: "Privacy", href: "#" },
        { label: "Platform Notice", href: "/platform-notice" },
      ],
      copyright: "© 2026 AI Plan Map. All rights reserved.",
    },
  },
  zh: {
    header: {
      home: "首页",
      blog: "订阅指南",
      about: "关于我们",
    },
    hero: {
      title: "找到 AI 订阅的全网最低价策略",
      description:
        "比较 ChatGPT、Claude、Gemini 等 AI 工具的官方价格、共享平台价格与更安全的省钱方式。",
    },
    subscriptions: {
      title: "热门 AI 订阅",
      description: "快速比较官方价格、更低价方案和预计节省比例。",
      officialPrice: "官方价格",
      bestOption: "更优方案",
      potentialSaving: "预计节省",
      viewOptions: "查看最低价方案",
    },
    platforms: {
      title: "平台说明",
      values: [
        {
          name: "官方方案",
          description: "最稳妥，价格最高。",
          tag: "账号安全优先",
        },
        {
          name: "GamsGo",
          description: "价格优势明显，需要关注可用性。",
          tag: "最低价优先",
        },
        {
          name: "Spliiit",
          description: "共享透明度较高，适合多人共享。",
          tag: "共享透明度",
        },
        {
          name: "Sharesub",
          description: "共享方案灵活，可作为补充选择。",
          tag: "灵活方案",
        },
      ],
    },
    guides: {
      title: "更聪明的 AI 订阅指南",
      read: "阅读指南",
      items: [
        {
          title: "共享 AI 订阅安全吗？",
          description: "了解共享订阅的可用性、账号安全和退款风险。",
        },
        {
          title: "使用 ChatGPT Plus 最便宜的方式",
          description: "比较官方方案、共享平台和其他低成本路径。",
        },
        {
          title: "GamsGo 和 Spliiit 哪个更好？",
          description: "从价格、可用性、透明度和风险角度进行比较。",
        },
        {
          title: "如何避免为 AI 工具多花钱？",
          description: "用更清晰的订阅组合减少不必要的月费支出。",
        },
      ],
    },
    footer: {
      description: "找到更聪明、更省钱的 AI 订阅方式。",
      links: [
        { label: "订阅指南", href: "/zh/blog" },
        { label: "关于我们", href: "/zh/platform-notice" },
        { label: "服务条款", href: "#" },
        { label: "隐私政策", href: "#" },
        { label: "平台说明", href: "/zh/platform-notice" },
      ],
      copyright: "© 2026 AI Plan Map。保留所有权利。",
    },
  },
};
