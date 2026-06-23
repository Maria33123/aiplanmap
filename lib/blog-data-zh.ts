import { blogPosts, type BlogPost } from "./blog-data";

export type ChineseBlogPost = Omit<BlogPost, "category"> & {
  category: string;
};

const translations: Record<
  string,
  Pick<ChineseBlogPost, "title" | "category" | "excerpt" | "content">
> = {
  "is-shared-ai-subscription-safe": {
    title: "共享 AI 订阅安全吗？",
    category: "避坑",
    excerpt: "了解共享订阅的风险、可用性问题和账号安全注意事项。",
    content: [
      {
        heading: "共享订阅意味着什么",
        paragraphs: [
          "共享订阅通常通过一个由平台管理的方案提供多人访问。价格可能较低，但账号控制方式与直接订阅官方服务不同。",
          "选择前应了解访问方式、账号由谁管理，以及方案发生变化时如何处理。",
        ],
      },
      {
        heading: "可用性与账号访问",
        paragraphs: [
          "访问可能受到容量、密码变更、地区规则、验证要求和服务政策变化影响。今天可用的方案不代表以后始终可用。",
        ],
      },
      {
        heading: "退款与支持",
        paragraphs: [
          "不同平台的退款规则和支持响应时间可能不同。决定前应阅读平台自己的条款、取消规则和访问中断处理方式。",
        ],
      },
      {
        heading: "如何评估风险",
        paragraphs: [
          "应同时比较节省金额、访问稳定性、隐私和账号控制需求。AI Plan Map 不销售账号，也不处理付款。",
        ],
      },
    ],
  },
  "cheapest-way-to-use-chatgpt-plus": {
    title: "使用 ChatGPT Plus 最便宜的方式",
    category: "ChatGPT",
    excerpt: "比较官方方案、共享平台和其他低成本路径。",
    content: [
      {
        heading: "先了解自己的使用频率",
        paragraphs: [
          "最低成本方案取决于使用频率和所需功能。高频工作需求与偶尔写作、学习或研究的需求并不相同。",
        ],
      },
      {
        heading: "官方方案",
        paragraphs: [
          "官方方案提供直接的账号控制和明确的服务条款，适合重视稳定访问或处理敏感工作的用户。",
        ],
      },
      {
        heading: "较低成本的访问方式",
        paragraphs: [
          "共享平台可能降低月费，但也可能带来可用性、隐私、退款和账号控制方面的差异。",
        ],
      },
      {
        heading: "比较整体取舍",
        paragraphs: [
          "不要只比较标价，还应考虑访问稳定性、使用限制、支持和取消方式。",
        ],
      },
    ],
  },
  "gamsgo-vs-spliiit": {
    title: "GamsGo 和 Spliiit 哪个更好？",
    category: "共享平台",
    excerpt: "从价格、可用性、透明度和风险角度比较两个平台。",
    content: [
      {
        heading: "为什么不能只比较价格",
        paragraphs: [
          "两个平台可能提供不同的产品、访问方式、订阅时长和服务规则。只有在访问内容相近时，价格比较才有意义。",
        ],
      },
      {
        heading: "价格与可用性",
        paragraphs: [
          "价格可能随库存、地区、订阅时长和平台调整而变化，可用性也可能随时间改变。",
        ],
      },
      {
        heading: "透明度与账号控制",
        paragraphs: [
          "应查看平台如何说明账号归属、访问方式、续订、取消和访问中断后的处理规则。",
        ],
      },
      {
        heading: "如何选择",
        paragraphs: [
          "使用相同标准比较当前价格、访问方式、退款规则、支持流程和服务限制。",
        ],
      },
    ],
  },
  "is-there-a-cheaper-option-for-claude-pro": {
    title: "Claude Pro 有没有更便宜的方案？",
    category: "Claude",
    excerpt: "了解 Claude Pro 的官方价格和可能的低成本订阅策略。",
    content: [
      {
        heading: "先确认需要哪些功能",
        paragraphs: [
          "Claude Pro 的价值取决于更高使用限制和相关功能是否符合日常需求。",
        ],
      },
      {
        heading: "以免费版本作为基准",
        paragraphs: [
          "轻度使用者可以先观察免费版本是否足够，以及实际多久会遇到使用限制。",
        ],
      },
      {
        heading: "按项目订阅",
        paragraphs: [
          "只在高需求项目期间订阅，可能比全年维持多个重叠工具更节省。",
        ],
      },
      {
        heading: "谨慎比较第三方选项",
        paragraphs: [
          "比较第三方访问时，应同时查看可用性、账号控制、退款规则和隐私因素。",
        ],
      },
    ],
  },
  "how-to-stop-overpaying-for-ai-tools": {
    title: "如何避免为 AI 工具多花钱？",
    category: "避坑",
    excerpt: "通过更清晰的 AI 订阅组合减少不必要的月费支出。",
    content: [
      {
        heading: "列出所有订阅",
        paragraphs: ["记录每个工具的月费、续订日期和主要用途。"],
      },
      {
        heading: "寻找功能重叠",
        paragraphs: [
          "许多工具都能处理写作、研究、编程或文档分析，应明确每项任务的主要工具。",
        ],
      },
      {
        heading: "按当前项目调整",
        paragraphs: ["工具有价值并不代表每个月都需要保持订阅。"],
      },
      {
        heading: "同时考虑成本和风险",
        paragraphs: [
          "降低费用时也应考虑隐私、稳定性和账号控制需求。",
        ],
      },
    ],
  },
  "chatgpt-vs-claude-worth-subscribing": {
    title: "ChatGPT vs Claude：哪个更值得订阅？",
    category: "价格对比",
    excerpt: "从使用场景、价格和整体价值角度比较两款主流 AI 工具。",
    content: [
      {
        heading: "比较实际工作流程",
        paragraphs: [
          "除了模型表现，还应比较界面、使用限制、文件支持和日常工作方式。",
        ],
      },
      {
        heading: "写作与文档分析",
        paragraphs: ["可以使用相同任务测试两款工具的清晰度和修改成本。"],
      },
      {
        heading: "编程、研究与工具能力",
        paragraphs: ["应关注代码处理、联网功能、集成和当前使用限制。"],
      },
      {
        heading: "是否需要同时订阅",
        paragraphs: [
          "多数用户可以选择一个主要工具，并在需要时使用另一个工具的免费版本。",
        ],
      },
    ],
  },
  "is-perplexity-pro-worth-it": {
    title: "Perplexity Pro 值得买吗？",
    category: "价格对比",
    excerpt: "分析 AI 搜索工具的订阅价值和可替代方案。",
    content: [
      {
        heading: "AI 搜索订阅适合什么需求",
        paragraphs: ["这类工具适合经常需要来源概览、资料发现和重复研究的用户。"],
      },
      {
        heading: "评估研究质量",
        paragraphs: ["应检查来源相关性、引用准确性、覆盖范围和核实成本。"],
      },
      {
        heading: "比较免费和已有工具",
        paragraphs: ["先确认现有工具或免费功能是否已经覆盖相同工作。"],
      },
      {
        heading: "什么时候可能值得",
        paragraphs: ["如果研究工作频繁且能持续节省时间，订阅可能更有价值。"],
      },
    ],
  },
  "how-to-choose-an-ai-subscription-stack": {
    title: "AI 工具订阅组合怎么选？",
    category: "价格对比",
    excerpt: "根据学生、开发者、创作者和普通用户等不同场景选择 AI 工具组合。",
    content: [
      {
        heading: "从目标开始",
        paragraphs: ["根据学习、编程、研究、写作或创作等重复需求选择工具。"],
      },
      {
        heading: "选择一个主要通用工具",
        paragraphs: ["先选择最适合常用工作流程的通用 AI 助手。"],
      },
      {
        heading: "谨慎增加专业工具",
        paragraphs: ["只有当专业工具解决明确限制时，再把它加入订阅组合。"],
      },
      {
        heading: "定期检查组合",
        paragraphs: [
          "项目、免费功能和工具能力变化时，应重新评估每项订阅是否仍有价值。",
        ],
      },
    ],
  },
};

export const chineseBlogPosts: ChineseBlogPost[] = blogPosts.map((post) => ({
  ...post,
  ...translations[post.slug],
  readingTime: post.readingTime.replace("min read", "分钟阅读"),
}));

export function getChineseBlogPost(slug: string) {
  return chineseBlogPosts.find((post) => post.slug === slug);
}

export function getRelatedChinesePosts(post: ChineseBlogPost, limit = 3) {
  const sameCategory = chineseBlogPosts.filter(
    (candidate) =>
      candidate.slug !== post.slug && candidate.category === post.category,
  );
  const others = chineseBlogPosts.filter(
    (candidate) =>
      candidate.slug !== post.slug && candidate.category !== post.category,
  );
  return [...sameCategory, ...others].slice(0, limit);
}
