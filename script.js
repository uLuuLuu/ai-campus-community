/* ============================================================
   AI 校园社区 · 一站式服务站 —— 主程序
   职责：路由、视图渲染、复制提示、移动端导航
   数据：window.SITE_MODULES / window.DAILY_REPORTS / window.PROMPT_LIB
   ============================================================ */
(function () {
  "use strict";

  // ===== 全站配置（站点名 / 反馈表单 URL 等只需改这里） =====
  var CONFIG = {
    siteName: "AI 校园社区",
    siteSub: "一站式服务站",
    // 反馈表单链接：建好腾讯文档表单后，把链接粘到这里即全站生效。
    // 留空则显示「筹备中」占位，不会出现死链。
    feedbackFormUrl: ""
  };

  var reports = window.DAILY_REPORTS || [];
  var prompts = window.PROMPT_LIB || [];
  var categories = window.PROMPT_CATEGORIES || [{ id: "all", name: "全部" }];
  var modules = window.SITE_MODULES || [];

  // ===== 工具函数 =====
  function escapeHtml(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }
  function esc(s) { return escapeHtml(s); }
  function pad2(n) { return n < 10 ? "0" + n : "" + n; }
  function countItems(report) {
    return report.sections.reduce(function (s, sec) { return s + sec.items.length; }, 0);
  }
  function findReportByIssue(issue) {
    return reports.find(function (r) { return r.issue === issue; });
  }
  function findModuleById(id) {
    return modules.find(function (m) { return m.id === id; });
  }
  function copyText(text) {
    // 优先使用现代 API；非安全上下文（如 file://）自动回退到 execCommand
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
      try {
        var ta = document.createElement("textarea");
        ta.value = text;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.top = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        var ok = document.execCommand("copy");
        document.body.removeChild(ta);
        ok ? resolve() : reject(new Error("copy failed"));
      } catch (e) { reject(e); }
    });
  }
  function showToast(msg) {
    var t = document.getElementById("toast");
    t.textContent = msg || "已复制";
    t.hidden = false;
    clearTimeout(showToast._tid);
    showToast._tid = setTimeout(function () { t.hidden = true; }, 1600);
  }

  // ===== 导航 =====
  function buildNav() {
    var online = modules.filter(function (m) { return m.status === "online"; });
    var navItems = [
      { id: "home", name: "首页", hash: "#/" }
    ].concat(online.map(function (m) {
      return { id: m.id, name: m.name, hash: "#/" + m.id };
    })).concat([
      { id: "all", name: "全部模块", hash: "#/all" }
    ]);
    var html = navItems.map(function (n) {
      return '<a href="' + n.hash + '" data-nav-id="' + n.id + '">' + esc(n.name) + '</a>';
    }).join("");
    document.getElementById("nav").innerHTML = html;
  }
  function highlightNav(activeNavId) {
    var links = document.querySelectorAll("#nav a");
    links.forEach(function (a) {
      if (a.getAttribute("data-nav-id") === activeNavId) a.classList.add("active");
      else a.classList.remove("active");
    });
  }

  // ===== 视图：首页 =====
  // 板块配色：按板块名固定映射，未知板块按索引循环取色
  var SECTION_COLOR_BY_NAME = {
    "腾讯一线": "#2f6fed",
    "世界前沿": "#7c5cff",
    "前沿科技": "#0fb5a6",
    "报告观点": "#f59e0b"
  };
  var SECTION_PALETTE = ["#2f6fed", "#7c5cff", "#0fb5a6", "#f59e0b", "#e0533d", "#0ea5a4"];
  function sectionColor(sec, idx) {
    return SECTION_COLOR_BY_NAME[sec.name] || SECTION_PALETTE[idx % SECTION_PALETTE.length];
  }

  function renderHome() {
    highlightNav("home");
    var latest = reports[0];
    var todayBlock = "";
    if (latest) {
      var kws = (latest.keywords || []).map(function (k) { return '<span class="kw-tag">' + esc(k) + '</span>'; }).join("");
      var previewItems = [];
      latest.sections.forEach(function (sec, si) {
        var color = sectionColor(sec, si);
        sec.items.slice(0, 2).forEach(function (it) { previewItems.push({ it: it, color: color }); });
      });
      previewItems = previewItems.slice(0, 5);
      var list = previewItems.map(function (p) {
        return '<li><span class="sec-chip" style="background:' + p.color + '"></span>' +
               '<span class="no">' + esc(p.it.no) + '</span>' +
               '<a href="' + esc(p.it.url) + '" target="_blank" rel="noopener">' + esc(p.it.title) + '</a></li>';
      }).join("");
      todayBlock =
        '<div class="today-card">' +
          '<div class="today-head">' +
            '<span class="today-eyebrow">最新日报</span>' +
            '<h3 class="today-title">第 ' + esc(latest.issue) + ' 期 · ' + esc(latest.date) + '（' + esc(latest.weekday) + '）</h3>' +
          '</div>' +
          '<p class="today-meta">' + countItems(latest) + ' 条资讯 · 已收录 ' + reports.length + ' 期</p>' +
          '<div class="today-keywords">' + kws + '</div>' +
          '<ul class="today-list">' + list + '</ul>' +
          '<a class="today-more" href="#/daily/' + esc(latest.issue) + '">查看完整日报 →</a>' +
        '</div>';
    } else {
      todayBlock = '<div class="empty-state"><p>日报区暂无内容</p></div>';
    }

    var moduleCards = modules.map(function (m) {
      var isOnline = m.status === "online";
      var badge = isOnline
        ? '<span class="status-badge status-online">已上线</span>'
        : '<span class="status-badge status-soon">即将推出</span><span class="phase-tag">' + esc(m.phase || "") + '</span>';
      var href = isOnline ? ("#/" + m.id) : ("#/m/" + m.id);
      return (
        '<a class="module-card' + (isOnline ? "" : " is-soon") + '" href="' + href + '">' +
          '<div class="icon">' + esc(m.icon) + '</div>' +
          '<div class="name">' + esc(m.name) + ' ' + badge + '</div>' +
          '<div class="desc">' + esc(m.desc) + '</div>' +
        '</a>'
      );
    }).join("");

    return (
      '<section class="hero">' +
        '<span class="hero-eyebrow">腾讯云 AI 校园社群</span>' +
        '<h1>' + esc(CONFIG.siteName) + ' · ' + esc(CONFIG.siteSub) + '</h1>' +
        '<p>每日 AI 资讯、提问模板库、新人上手路径——一个站走完从入门到上手到共创的每一步。</p>' +
        '<div class="hero-cta">' +
          '<a class="btn btn-primary" href="#/daily">看今日日报</a>' +
          '<a class="btn btn-ghost" href="#/newbie">我是新人</a>' +
          '<a class="btn btn-ghost" href="#/prompts">Prompt 库</a>' +
        '</div>' +
      '</section>' +

      todayBlock +

      '<div class="modules-head">' +
        '<h2>全部模块</h2>' +
        '<span class="legend">' +
          '<span class="legend-dot legend-online"></span>已上线 ' +
          '<span class="legend-dot legend-soon" style="margin-left:8px"></span>即将推出' +
        '</span>' +
      '</div>' +
      '<div class="module-grid">' + moduleCards + '</div>'
    );
  }

  // ===== 视图：日报总览 =====
  function renderDailyList() {
    highlightNav("daily");
    if (!reports.length) {
      return '<h1 class="section-title">AI 日报</h1><div class="empty-state"><p>暂无已收录的日报</p></div>';
    }
    var cards = reports.map(function (r, i) {
      var isLatest = i === 0;
      var issueBadge = '<span class="issue-badge' + (isLatest ? " is-latest" : "") + '">第 ' + esc(r.issue) + ' 期' + (isLatest ? " · 最新" : "") + '</span>';
      var kws = (r.keywords || []).map(function (k) { return '<span class="kw-tag">' + esc(k) + '</span>'; }).join("");
      return (
        '<a class="daily-card" href="#/daily/' + esc(r.issue) + '">' +
          '<div class="daily-card-head">' + issueBadge + '<span class="daily-card-date">' + esc(r.date) + ' · ' + esc(r.weekday) + '</span></div>' +
          '<div class="daily-card-meta">共 ' + countItems(r) + ' 条资讯</div>' +
          '<div class="daily-card-keywords">' + (kws || '<span class="kw-tag" style="background:var(--bg-surface);color:var(--color-text-light);border-color:var(--border-light)">暂无关键词</span>') + '</div>' +
        '</a>'
      );
    }).join("");
    return (
      '<h1 class="section-title">AI 日报</h1>' +
      '<p class="section-subtitle">按天归档，每期附今日关键词；点击进入查看完整内容。</p>' +
      '<div class="daily-list">' + cards + '</div>'
    );
  }

  // ===== 视图：日报详情 =====
  function renderDailyDetail(issue) {
    highlightNav("daily");
    var r = findReportByIssue(issue);
    if (!r) {
      return '<a class="back-link" href="#/daily">← 返回日报总览</a><div class="empty-state"><p>未找到第 ' + esc(issue) + ' 期</p></div>';
    }
    var isLatest = reports[0] && reports[0].issue === r.issue;
    var kws = (r.keywords || []).map(function (k) { return '<span class="kw-tag">' + esc(k) + '</span>'; }).join("");
    var sections = r.sections.map(function (sec, si) {
      var color = sectionColor(sec, si);
      var items = sec.items.map(function (it) {
        return (
          '<div class="item-row">' +
            '<span class="no">' + esc(it.no) + '</span>' +
            '<div class="ititle"><a href="' + esc(it.url) + '" target="_blank" rel="noopener">' + esc(it.title) + ' ↗</a></div>' +
          '</div>'
        );
      }).join("");
      return (
        '<div class="section-card" style="--sec:' + color + '">' +
          '<h3><span class="sec-dot"></span>' + esc(sec.name) + ' <span class="sec-count">· ' + sec.items.length + ' 条</span></h3>' +
          items +
        '</div>'
      );
    }).join("");

    return (
      '<a class="back-link" href="#/daily">← 返回日报总览</a>' +
      '<div class="daily-detail-head">' +
        '<h1>第 ' + esc(r.issue) + ' 期 · ' + esc(r.title) + (isLatest ? ' <span class="issue-badge is-latest">最新</span>' : '') + '</h1>' +
        '<p class="meta">' + esc(r.date) + ' · ' + esc(r.weekday) + ' · 共 ' + countItems(r) + ' 条</p>' +
        '<div class="today-keywords">' + (kws || '') + '</div>' +
      '</div>' +
      sections
    );
  }

  // ===== 视图：新人专区 =====
  function renderNewbie() {
    highlightNav("newbie");
    return (
      '<h1 class="section-title">新人专区</h1>' +
      '<p class="section-subtitle">5 分钟走完一遍：看完日报、抽个 Prompt、试个工具，第一天就算上了路。</p>' +

      '<div class="newbie-section">' +
        '<h2>1. 这是什么社群</h2>' +
        '<p>我们是一群在校园里用 AI 解决真问题的人。群里日常聊三件事：</p>' +
        '<ul>' +
          '<li>谁在用 AI 搞定什么具体的事（求职 / 论文 / 设计 / 代码）</li>' +
          '<li>哪些工具值得推荐、哪些坑要避开</li>' +
          '<li>腾讯的官方训练营 / 校招内推 / 教程等入群后能解锁的福利</li>' +
        '</ul>' +
      '</div>' +

      '<div class="newbie-section">' +
        '<h2>2. 5 分钟上手路径</h2>' +
        '<div class="path-steps">' +
          step(1, "看今日日报", "花 3 分钟浏览今日 AI 日报的关键词和前几条，了解今天值得知道的事。") +
          step(2, "抽 1 个 Prompt", "去 Prompt 库找一个你今天马上能用上的提示词（比如简历 / 论文 / 作业），一键复制。") +
          step(3, "试 1 个工具", "挑一个推荐过的 AI 工具，把刚才的 Prompt 粘进去跑一次。") +
          step(4, "进群交作业", "在群里发一句「我今天用 AI 搞定了 ____」，和大家打个招呼就算上路了。") +
        '</div>' +
      '</div>' +

      '<div class="newbie-section">' +
        '<h2>3. 入群你能得到什么</h2>' +
        '<ul>' +
          '<li>AI 互助共创 · 提问 / 答 / 一起做项目</li>' +
          '<li>腾讯官方训练营名额与活动推送</li>' +
          '<li>校招内推通道（入群后按规则开放）</li>' +
          '<li>个人网页搭建、AI 工具实战等小课教程</li>' +
        '</ul>' +
        '<div class="placeholder-box">[入群二维码] 群码在群公告/网站首页置顶，入群后请按提示改群昵称</div>' +
      '</div>' +

      '<div class="newbie-section">' +
        '<h2>4. 群规与昵称</h2>' +
        '<ul>' +
          '<li>不发广告、不发与 AI/学习/职业无关的链接</li>' +
          '<li>提问前先搜群聊记录，没答案再问，大家时间都宝贵</li>' +
          '<li>允许灌水但请打在「水群」话题里，别污染主话题</li>' +
        '</ul>' +
        '<div class="placeholder-box">[群昵称格式待补充] 建议：年级-专业-昵称 / AI 兴趣方向，方便大家认识你</div>' +
      '</div>'
    );
  }
  function step(no, title, desc) {
    return (
      '<div class="path-step">' +
        '<div class="step-no">' + no + '</div>' +
        '<div class="step-body">' +
          '<div class="step-title">' + esc(title) + '</div>' +
          '<div class="step-desc">' + esc(desc) + '</div>' +
        '</div>' +
      '</div>'
    );
  }

  // ===== 视图：Prompt 库 =====
  var currentCat = "all";
  function renderPrompts() {
    highlightNav("prompts");
    var chips = categories.map(function (c) {
      return '<button class="filter-chip' + (currentCat === c.id ? " is-active" : "") + '" data-cat="' + esc(c.id) + '">' + esc(c.name) + '</button>';
    }).join("");

    var list = prompts.filter(function (p) {
      return currentCat === "all" || p.category === currentCat;
    });
    var cards = list.length ? list.map(function (p) {
      var catName = (categories.find(function (c) { return c.id === p.category; }) || { name: p.category }).name;
      return (
        '<div class="prompt-card" data-prompt-id="' + esc(p.title) + '">' +
          (p.hot ? '<span class="hot-flag">热门</span>' : '') +
          '<div class="prompt-card-head">' +
            '<h3 class="title">' + esc(p.title) + '</h3>' +
            '<span class="phase-tag">' + esc(catName) + '</span>' +
          '</div>' +
          '<p class="scene">' + esc(p.scene) + '</p>' +
          '<pre class="prompt-text">' + esc(p.text) + '</pre>' +
          '<div class="prompt-card-foot">' +
            '<span>复制后在元宝 / WorkBuddy 等工具中使用</span>' +
            '<button class="copy-btn" data-copy="' + esc(p.title) + '">复制 Prompt</button>' +
          '</div>' +
        '</div>'
      );
    }).join("") : '<div class="empty-state"><p>该分类下暂无 Prompt</p></div>';

    return (
      '<h1 class="section-title">Prompt 库</h1>' +
      '<p class="section-subtitle">按场景分类的提问模板，一键复制即可使用。[方括号] 是需要你填的变量。</p>' +
      '<div class="prompt-filter">' + chips + '</div>' +
      '<div class="prompt-list">' + cards + '</div>'
    );
  }

  // ===== 视图：反馈页 =====
  function renderFeedback() {
    highlightNav("feedback");
    var formUrl = CONFIG.feedbackFormUrl;
    var formBlock = formUrl
      ? '<a class="btn btn-primary" href="' + esc(formUrl) + '" target="_blank" rel="noopener">去填写反馈表</a>'
      : '<div class="placeholder-box">反馈表单筹备中，将通过群公告通知。<br>在这之前请把反馈发到群里，站长每周统一收口。</div>';

    var cards = [
      { title: "产品真实评分", desc: "你在用什么 AI 工具？打几分？为什么？真实数据沉淀进「AI 工具矩阵」展示。", icon: "⭐" },
      { title: "Bug & 故障反馈", desc: "用某个 AI 工具/网站翻车了？把复现步骤丢过来，下一次双周上报会带上。", icon: "🐞" },
      { title: "功能许愿池", desc: "希望网站 / 群内 / 工具出什么功能？提得越具体，越可能被排上路线图。", icon: "✨" }
    ];
    var cardHtml = cards.map(function (c) {
      return (
        '<div class="feedback-card">' +
          '<h3>' + c.icon + ' ' + esc(c.title) + '</h3>' +
          '<p>' + esc(c.desc) + '</p>' +
          formBlock +
        '</div>'
      );
    }).join("");

    return (
      '<h1 class="section-title">产品反馈与共创</h1>' +
      '<p class="section-subtitle">所有反馈按双周维度汇总上报——你说的每一句都会进官方记录里。</p>' +
      '<div class="feedback-grid">' + cardHtml + '</div>' +
      '<div class="feedback-meta">' +
        '<strong>怎么用：</strong>每类反馈都汇总到同一张反馈表，提交一次即可；紧急问题请直接发群。' +
        '<br><strong>管理员：</strong>站长每两周整理一次，节选脱敏后随官方月报上送。' +
      '</div>'
    );
  }

  // ===== 视图：模块详情（即将推出） =====
  function renderModuleDetail(id) {
    var m = findModuleById(id);
    if (!m) {
      highlightNav("home");
      return '<a class="back-link" href="#/">← 返回首页</a><div class="empty-state"><p>未找到该模块</p></div>';
    }
    if (m.status === "online") {
      location.hash = "#/" + m.id;
      return "";
    }
    highlightNav(null);
    var features = m.features.map(function (f) { return '<li>' + esc(f) + '</li>'; }).join("");
    return (
      '<a class="back-link" href="#/">← 返回首页</a>' +
      '<div class="module-detail-head">' +
        '<div class="icon">' + esc(m.icon) + '</div>' +
        '<h1>' + esc(m.name) + ' <span class="status-badge status-soon">即将推出</span> <span class="phase-tag">' + esc(m.phase || "") + '</span></h1>' +
        '<p class="meta">本模块在 V2 框架路线图中的位置</p>' +
        '<p class="desc">' + esc(m.desc) + '</p>' +
      '</div>' +
      '<div class="feature-list">' +
        '<h2>计划包含的功能</h2>' +
        '<ul>' + (features || '<li>规划中，欢迎在反馈页提需求</li>') + '</ul>' +
      '</div>' +
      '<div class="feedback-meta" style="margin-top:16px">' +
        '想催更或提建议？<a href="#/feedback">去反馈页</a> 写一句，我们按双周整理一次。' +
      '</div>'
    );
  }

  // ===== 视图：全部模块（= 首页，# 别名） =====
  function renderAllModules() { return renderHome(); }

  // ===== 路由 =====
  function route() {
    var hash = location.hash.replace(/^#\/?/, "");
    var app = document.getElementById("app");
    var html = "";
    if (!hash) {
      html = renderHome();
    } else if (hash === "all") {
      html = renderAllModules();
    } else if (hash === "daily") {
      html = renderDailyList();
    } else if (hash.indexOf("daily/") === 0) {
      html = renderDailyDetail(decodeURIComponent(hash.slice(6)));
    } else if (hash === "newbie") {
      html = renderNewbie();
    } else if (hash === "prompts") {
      html = renderPrompts();
    } else if (hash === "feedback") {
      html = renderFeedback();
    } else if (hash.indexOf("m/") === 0) {
      html = renderModuleDetail(hash.slice(2));
    } else {
      html = renderHome();
    }
    app.innerHTML = html;
    // 移动端导航收起
    var nav = document.getElementById("nav");
    var toggle = document.getElementById("nav-toggle");
    if (nav) nav.classList.remove("is-open");
    if (toggle) toggle.setAttribute("aria-expanded", "false");
    // 顶部
    window.scrollTo(0, 0);
  }

  // ===== 事件绑定 =====
  document.addEventListener("click", function (e) {
    // 复制按钮
    var copyBtn = e.target.closest("[data-copy]");
    if (copyBtn) {
      var title = copyBtn.getAttribute("data-copy");
      var p = prompts.find(function (x) { return x.title === title; });
      if (!p) return;
      copyText(p.text).then(function () {
        showToast("已复制：" + title);
        var orig = copyBtn.textContent;
        copyBtn.textContent = "✓ 已复制";
        copyBtn.disabled = true;
        setTimeout(function () { copyBtn.textContent = orig; copyBtn.disabled = false; }, 1200);
      }).catch(function () { showToast("复制失败，请手动选中"); });
      return;
    }
    // Prompt 分类筛选
    var chip = e.target.closest(".filter-chip");
    if (chip) {
      currentCat = chip.getAttribute("data-cat");
      var app = document.getElementById("app");
      // 只重渲染 prompt 区域：简单做法是重新渲染整个视图
      app.innerHTML = renderPrompts();
      return;
    }
    // 移动端导航开关
    if (e.target.id === "nav-toggle" || e.target.closest("#nav-toggle")) {
      var navEl = document.getElementById("nav");
      var tg = document.getElementById("nav-toggle");
      var open = navEl.classList.toggle("is-open");
      tg.setAttribute("aria-expanded", open ? "true" : "false");
      return;
    }
    // 点击导航链接时收起移动端菜单
    if (e.target.closest("#nav a")) {
      var navEl2 = document.getElementById("nav");
      var tg2 = document.getElementById("nav-toggle");
      if (navEl2) navEl2.classList.remove("is-open");
      if (tg2) tg2.setAttribute("aria-expanded", "false");
    }
  });

  window.addEventListener("hashchange", route);

  // ===== 启动 =====
  function init() {
    // 应用配置
    document.getElementById("brand-name").textContent = CONFIG.siteName;
    document.getElementById("brand-sub").textContent = CONFIG.siteSub;
    document.getElementById("footer-brand").textContent = CONFIG.siteName;
    document.title = CONFIG.siteName + " · " + CONFIG.siteSub;

    buildNav();
    route();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
