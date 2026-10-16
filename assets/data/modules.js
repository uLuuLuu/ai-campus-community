// ============================================================
// 模块注册表 —— 全站导航、首页模块墙、模块详情页都由这一个文件驱动
//
// 【如何新增 / 升级一个模块】
//   1. 上线新模块：把 status 从 "soon" 改成 "online"，
//      并在 script.js 的 ROUTES 里注册它的渲染函数
//   2. 新增模块：复制一个对象改字段，插到数组里即可，
//      首页模块墙会自动出现新卡片
//
// 字段说明：
//   id       模块英文标识（用于路由 #/m/{id}，不要改已上线的）
//   icon     模块图标（emoji，展示用）
//   name     模块名
//   desc     一句话描述（首页卡片 / 模块详情页用）
//   status   "online" 已上线 ｜ "soon" 即将推出
//   phase    优先级标签（P0/P1/P2/P3，仅 soon 模块展示）
//   features 该模块计划包含的功能（详情页列表用）
// ============================================================

window.SITE_MODULES = [
  {
    id: "daily",
    icon: "📰",
    name: "AI 日报",
    desc: "每日 AI 资讯按天归档，每期附今日关键词",
    status: "online",
    features: []
  },
  {
    id: "newbie",
    icon: "🚪",
    name: "新人专区",
    desc: "5 分钟上手路径、入群指南与群规",
    status: "online",
    features: []
  },
  {
    id: "prompts",
    icon: "✍️",
    name: "Prompt 库",
    desc: "按场景分类的提问模板，一键复制即用",
    status: "online",
    features: []
  },
  {
    id: "feedback",
    icon: "📮",
    name: "产品反馈与共创",
    desc: "评分 / Bug / 许愿池，双周汇总上报",
    status: "online",
    features: []
  },
  {
    id: "toolbox",
    icon: "🎓",
    name: "学习提效工具箱",
    desc: "期末 / 论文 / PPT / 四六级场景化 AI 用法",
    status: "soon",
    phase: "P1",
    features: [
      "「我现在卡在 ____」场景导航：期末复习急救、论文资料速读、PPT 救援站、四六级冲刺",
      "每个场景给一套标准流程：步骤 + 推荐 Prompt + 工具链接",
      "与 Prompt 库联动：场景页内嵌对应模板，点开即用",
      "错题整理、课堂 pre、思维导图、读书拆目录等扩展场景"
    ]
  },
  {
    id: "jobs",
    icon: "💼",
    name: "求职就业中心",
    desc: "简历诊断、面试模拟与春招信息互助",
    status: "soon",
    phase: "P1",
    features: [
      "简历诊断：按「动作 + 方法 + 结果 + 数据」结构改写经历",
      "面试模拟间：AI 当面试官追问，覆盖常见岗",
      "群面 / Offer 选择 / 实习避坑专题",
      "春招信息互助楼：公司 / 岗位 / 城市 / 截止时间接龙（不发广告）"
    ]
  },
  {
    id: "tools",
    icon: "🧰",
    name: "AI 工具矩阵",
    desc: "真实用过的工具推荐与评分",
    status: "soon",
    phase: "P2",
    features: [
      "工具卡片墙：工具名 + 解决什么问题 + 推荐指数",
      "只收真实用过的，不收云推荐",
      "与反馈中心数据同源：一次投稿同时产出工具卡片和评分记录",
      "AI 体验官招募与成果展"
    ]
  },
  {
    id: "trending",
    icon: "🔥",
    name: "AI 行业热点",
    desc: "话题投票、辩论与新闻真假判断",
    status: "soon",
    phase: "P2",
    features: [
      "日报联动：日报发完自动发起今日早报投票",
      "话题投票（24 小时截止）与观点讨论",
      "AI 新闻真假判断、AI 替代岗位辩论、AI 与专业对照",
      "与日报区打通：热点话题沉淀归档"
    ]
  },
  {
    id: "play",
    icon: "🎮",
    name: "互动娱乐区",
    desc: "猜 Prompt、作品墙、接龙与吐槽",
    status: "soon",
    phase: "P3",
    features: [
      "猜 Prompt、文字 RPG、AI 角色扮演（面试官）",
      "作品墙：投稿展示 AI 作业 / 项目 / 创作成果",
      "今日 AI 帮我接龙、AI 吐槽大会、匿名提问箱",
      "每月 AI 成果展，与学习中心「交作业」联动"
    ]
  },
  {
    id: "events",
    icon: "📅",
    name: "活动中心",
    desc: "本周活动排期、打卡与招募",
    status: "soon",
    phase: "P1",
    features: [
      "本周活动排期：话题日、作品征集、体验官活动一目了然",
      "打卡墙：今日 AI 使用打卡沉淀",
      "官方物料周更位：教程 / 训练营 / 福利推送归档",
      "所有互动活动的统一报名入口"
    ]
  },
  {
    id: "knowledge",
    icon: "📚",
    name: "知识库与资源中心",
    desc: "共享资料沉淀与官方资源直达",
    status: "soon",
    phase: "P3",
    features: [
      "共享知识库：课程 PPT、论文资料、考研笔记、面经沉淀",
      "ima 共享知识库入口",
      "弹药库三大资源直达：实操场景视频号 / 应用知识库 / 研究院公众号",
      "资料越存越乱？这里有建知识库的方法论"
    ]
  }
];
