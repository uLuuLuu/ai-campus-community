// ============================================================
// 每日AI日报数据（与旧版 ai-daily/data/reports.js 格式兼容）
//
// 【如何新增一期】
//   复制下面一个对象，改 issue / date / weekday / keywords / sections，
//   粘贴到数组 DAILY_REPORTS 的【最前面】（最新一期排最上）。
//
// 字段说明：
//   issue    期数，例如 "020"
//   date     日期，例如 "2026-10-12"
//   weekday  星期，例如 "周一"
//   title    日报标题
//   keywords 今日关键词，3-4 个（从当天最重要新闻里提炼，
//             参考：模型/产品名 + 事件词，如 "混元 Hy4"、"数学 × AI"）
//   sections 板块数组，每个含 name（板块名）与 items（条目数组）
//   items[].no     序号（保留带圈数字，如 ①）
//   items[].title  条目标题
//   items[].url    来源链接
// ============================================================

window.DAILY_REPORTS = [
  {
    issue: "022",
    date: "2026-10-14",
    weekday: "周三",
    title: "腾讯云AI校园日报",
    keywords: ["WorkBuddy 入企微", "Gemini 4 Argon", "Scion 取代 Git", "数字蠕虫"],
    sections: [
      {
        name: "腾讯一线",
        items: [
          { no: "①", title: "企业微信与 WorkBuddy 双向深度融合：WorkBuddy 正式进入企微通讯录", url: "https://news.qq.com/rain/a/20261014A04NL600" },
          { no: "②", title: "WorkBuddy 企业版“可观测中心”上线公测", url: "https://www.geekpark.net/news/372316" },
          { no: "③", title: "腾讯朱雀实验室开源 A.I.G 加入 ClawHub 安全审核", url: "https://www.sohu.com/a/1087353138_455313" },
          { no: "④", title: "阶跃终端发布智能体手机 STEPX Neo，腾讯为其合作方之一", url: "https://www.sohu.com/a/1087353138_455313" }
        ]
      },
      {
        name: "世界前沿",
        items: [
          { no: "⑤", title: "谷歌 Gemini 4 Argon 正式上架：首发价约为对手五分之一", url: "https://on.theverge.com/ai-artificial-intelligence/1009862/google-releases-gemini-4-argon" },
          { no: "⑥", title: "Anthropic 自研版本控制系统 Scion 取代 Git，日均合并代码超 3 万次", url: "https://www.163.com/dy/article/L96N0S3T0511FQO9.html" },
          { no: "⑦", title: "Anthropic 严打大模型蒸馏：封禁数万个账号，蒸馏数据减少 90%–99%", url: "https://www.163.com/dy/article/L96N0S3T0511FQO9.html" },
          { no: "⑧", title: "OpenAI 办公室发现隐藏录音设备，涉事员工已被捕", url: "https://www.163.com/dy/article/L96N0S3T0511FQO9.html" },
          { no: "⑨", title: "Character.AI 申请破产，同意以 2000 万美元向迪士尼出售部分资产", url: "https://www.163.com/dy/article/L96N0S3T0511FQO9.html" },
          { no: "⑩", title: "苹果发布首款智能家庭中枢 HomeView，售价 299 美元", url: "https://www.163.com/dy/article/L96N0S3T0511FQO9.html" },
          { no: "⑪", title: "OpenAI 与 Higgsfield 合作：AI 视频生成时长上限从 1 分钟提升至 10 分钟", url: "https://www.toutiao.com/article/7696302657916584483" }
        ]
      },
      {
        name: "前沿科技",
        items: [
          { no: "⑫", title: "华为首次公布麒麟 9050 Pro 芯片详细架构图", url: "https://www.163.com/dy/article/L96N0S3T0511FQO9.html" },
          { no: "⑬", title: "面壁智能开源 MiniCPM-V 4.7：手机约 3GB 内存可跑", url: "https://www.sohu.com/a/1087353138_455313" },
          { no: "⑭", title: "英伟达将 Vera Rubin 架构机柜设计贡献给 OCP", url: "https://www.tmtpost.com/8167796.html" },
          { no: "⑮", title: "Meta 在 OCP 发布三层网络开放方案，发起 OSPA 交换机标准", url: "https://www.tmtpost.com/8167796.html" }
        ]
      },
      {
        name: "报告观点",
        items: [
          { no: "⑯", title: "Anthropic：无总开关的“数字蠕虫”，小模型年底可自我复制", url: "https://www.sohu.com/a/1087353138_455313" },
          { no: "⑰", title: "北京朝阳法院：员工用 AI 辅助办公被辞退，法院判公司违法", url: "https://www.163.com/dy/article/L96N0S3T0511FQO9.html" },
          { no: "⑱", title: "博通 CEO 陈福阳“赌场论”戳破 AI 牛市第一道裂缝", url: "https://www.tmtpost.com/8167796.html" }
        ]
      }
    ]
  },
  {
    issue: "021",
    date: "2026-10-13",
    weekday: "周二",
    title: "腾讯云AI校园日报",
    keywords: ["WorkBuddy 小程序", "元宝俱乐部", "Maia 300", "Gemini Agent"],
    sections: [
      {
        name: "腾讯一线",
        items: [
          { no: "①", title: "WorkBuddy 微信小程序发布能力上线：生成、预览、发布全在 WorkBuddy 内完成", url: "https://gmt8press.com/flash/detail/1529099" },
          { no: "②", title: "元宝新版本小范围内测：上线“元宝俱乐部”试探 AI 社交", url: "https://gmteight.com/flash/detail/1175887" }
        ]
      },
      {
        name: "世界前沿",
        items: [
          { no: "③", title: "Meta 推出 Muse Wonder：扎克伯格称“已追上前沿”", url: "https://www.cna.com.tw/news/ait/202610130006.aspx" },
          { no: "④", title: "微软发布第三代自研芯片 Maia 300：2nm、288GB HBM4、机架 Token 吞吐翻 7 倍", url: "https://news.qq.com/rain/a/20261013A03QBF00" },
          { no: "⑤", title: "英伟达与思科推出 USFP 可插拔光模块，单通道 200Gb/s 提至 400Gb/s", url: "https://t.qianzhan.com/caijing/detail/261013-49cf948a.html" },
          { no: "⑥", title: "谷歌云 Gemini Agent 上线：海外巨头企业级 Agent 布局全部亮相", url: "https://news.qq.com/rain/a/20261013A0313200" },
          { no: "⑦", title: "DeepSeek 拟领投前腾讯科学家创立的机器人公司 Winverse AI", url: "https://t.qianzhan.com/caijing/detail/261013-49cf948a.html" },
          { no: "⑧", title: "模思智能完成超 10 亿元 Pre-A 轮，押注全模态实时交互", url: "https://so.html5.qq.com/page/real/search_news?docid=70000021_7926acd60f854752" },
          { no: "⑨", title: "阿里千问发布 QwenGyre：面向超长程智能体任务的在线强化学习框架", url: "https://www.163.com/dy/article/L93UQIFB05119FMA.html" }
        ]
      },
      {
        name: "前沿科技",
        items: [
          { no: "⑪", title: "三星 Q3 营业利润同比增近 8 倍，首次突破 100 万亿韩元", url: "https://news.qq.com/rain/a/20261013A0313200" },
          { no: "⑫", title: "上海启动“新一代智能制造行动”：2028 年 8000 台人形机器人进工厂", url: "https://t.qianzhan.com/caijing/detail/261013-49cf948a.html" },
          { no: "⑬", title: "我国首列具身智能数字地铁列车 VELLINK 亮相", url: "https://www.163.com/dy/article/L93UQIFB05119FMA.html" },
          { no: "⑭", title: "长鑫存储第五代 DRAM 平台量产，LPDDR6 全球首发", url: "https://t.qianzhan.com/caijing/detail/261013-49cf948a.html" }
        ]
      },
      {
        name: "报告观点",
        items: [
          { no: "⑮", title: "微软总裁史密斯：AI 监管力度还不如一盒牛奶", url: "https://t.qianzhan.com/caijing/detail/261013-49cf948a.html" },
          { no: "⑯", title: "《人民日报海外版》：AI“越界”推动国际社会探索设立“护栏”", url: "https://news.qq.com/rain/a/20261013A02O1500" },
          { no: "⑰", title: "中银证券：Agent 竞赛升维，算力业绩密集兑现", url: "https://news.qq.com/rain/a/20261013A0313200" }
        ]
      }
    ]
  },
  {
    issue: "020",
    date: "2026-10-12",
    weekday: "周一",
    title: "腾讯云AI校园日报",
    keywords: ["Step 5 接入", "混元 Hy4", "数学 × AI", "企鹅微单"],
    sections: [
      {
        name: "腾讯一线",
        items: [
          { no: "①", title: "WorkBuddy 接入阶跃旗舰 Step 5 Preview，独家限免两周", url: "https://new.qq.com/rain/a/20261012A05YNE00" },
          { no: "②", title: "混元 Hy4 preview 稳居 OpenRouter 全球调用量第五", url: "https://news.qq.com/rain/a/20261012A04T1600" },
          { no: "③", title: "券商加速入驻 WorkBuddy，券业 AI 竞争转向“生态位卡位”", url: "https://finance.eastmoney.com/a/202610123892140430.html" },
          { no: "④", title: "腾讯云多用户多 Agent 开源项目 Octop 登技术社区热议榜首", url: "https://www.agentlist.top/en/projects/tencentcloud-octop" },
          { no: "⑤", title: "微信内上线“企鹅微单”：AI 创作撮合交易平台", url: "https://www.chinaz.com/ainews/31559.shtml" }
        ]
      },
      {
        name: "世界前沿",
        items: [
          { no: "⑥", title: "Anthropic 关闭全部内部评测联网，白宫酝酿强制上报 Agent 事故", url: "https://news.qq.com/rain/a/20261011A001GB00" },
          { no: "⑦", title: "丘成桐数学与AI实验室联盟在清华成立，数学界集体回应“海啸”（昨日）", url: "https://news.youth.cn/jsxw/202610/t20261012_16909425.htm" },
          { no: "⑧", title: "陶哲轩公开《Math 2.0》：从“证明匮乏”转向“证明充沛”", url: "https://www.huxiu.com/article/4896661.html" },
          { no: "⑨", title: "OpenAI 撤回 3 篇数学手稿：正负号错误引发“链条坍塌”", url: "https://na.ifeng.com/c/8x83nDTbNFO" },
          { no: "⑩", title: "无问芯穹完成 23 亿元 C 轮，累计 43 亿创国内 AI Infra 赛道纪录", url: "https://tech.ifeng.com/c/8x9t7CZc7SC" },
          { no: "⑪", title: "蚂蚁“灵光”小范围内测，新版对标 Meta Muse（昨日）", url: "https://www.163.com/dy/article/L91B71FV05562DGT.html" }
        ]
      },
      {
        name: "前沿科技",
        items: [
          { no: "⑫", title: "第 26 届工博会今日上海开幕", url: "https://k.sina.com.cn/article_5952915705_162d248f906703qere.html" },
          { no: "⑬", title: "通用世界模型北京市重点实验室揭牌，国内首个世界模型方向省部级重点实验室", url: "https://k.sina.com.cn/article_5953466437_162dab0450670beogu.html" }
        ]
      },
      {
        name: "报告观点",
        items: [
          { no: "⑭", title: "一份“销毁按钮”基准：最贵的 Claude Opus 5 均衡准确率垫底", url: "https://dev.to/sarvar_04/ai-agent-benchmark-i-gave-9-models-a-destroy-button-and-a-job-that-needed-it-3d0f" },
          { no: "⑮", title: "多智能体“组队”成本最高贵 5.1 倍，质量几乎无提升", url: "https://www.dailyaithread.com/en" }
        ]
      }
    ]
  }
];
