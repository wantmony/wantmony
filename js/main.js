// =============================================
// main.js — 博客核心功能
// =============================================

// 获取当前页面路径
const pagePath = window.location.pathname;

// === 导航栏高亮 ===
function highlightNav() {
  const links = document.querySelectorAll('.nav-links a');
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (pagePath.endsWith(href) || (pagePath.endsWith('/wantmony/') && href === './')) {
      link.classList.add('active');
    }
  });
}

// === 移动端菜单切换 ===
function setupMobileMenu() {
  const btn = document.querySelector('.menu-btn');
  const links = document.querySelector('.nav-links');
  if (!btn || !links) return;
  btn.addEventListener('click', () => {
    links.classList.toggle('open');
  });
  // 点链接自动关闭菜单
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => links.classList.remove('open'));
  });
}

// === 渲染文章卡片 ===
function renderArticleCard(article) {
  const tagsHTML = article.tags.map(t => `<span class="tag">${t}</span>`).join('');
  return `
    <div class="article-card" onclick="location.href='./article.html?id=${article.id}'">
      <div class="date">${article.date}</div>
      <h3>${article.title}</h3>
      <div class="summary">${article.summary}</div>
      <div class="tags">${tagsHTML}</div>
    </div>
  `;
}

// === 首页：渲染最新文章列表 ===
function renderHomeArticles() {
  const container = document.getElementById('article-list-container');
  if (!container) return;
  // 取最新的3篇
  const latest = articles.slice(0, 3);
  container.innerHTML = latest.map(renderArticleCard).join('');
}

// === 文章列表页：渲染所有文章 ===
function renderAllArticles() {
  const container = document.getElementById('all-articles-container');
  if (!container) return;
  container.innerHTML = articles.map(renderArticleCard).join('');
}

// === 文章详情页 ===
function renderArticleDetail() {
  const container = document.getElementById('article-detail-container');
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  if (!id) {
    container.innerHTML = `<div class="error-msg">⚠️ 未找到文章</div>`;
    return;
  }

  const article = articles.find(a => a.id === id);
  if (!article) {
    container.innerHTML = `<div class="error-msg">⚠️ 文章不存在</div>`;
    return;
  }

  document.title = `${article.title} - wantmony`;

  container.innerHTML = `
    <a href="./articles.html" class="back-link">← 返回文章列表</a>
    <div class="article-header">
      <div class="date">${article.date}</div>
      <h1>${article.title}</h1>
    </div>
    <div class="article-body">${article.content}</div>
  `;
}

// === 页面初始化 ===
function init() {
  highlightNav();
  setupMobileMenu();
  renderHomeArticles();
  renderAllArticles();
  renderArticleDetail();
}

// DOM 加载完成后初始化
document.addEventListener('DOMContentLoaded', init);
