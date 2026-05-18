// =============================================
// 3D-effects.js — 网站3D立体动效
// =============================================

document.addEventListener('DOMContentLoaded', () => {

  // === 1. 3D粒子背景 ===
  function initParticleBg() {
    const hero = document.querySelector('.hero-with-bg');
    if (!hero) return;

    const canvas = document.createElement('canvas');
    canvas.className = 'particle-canvas';
    canvas.style.cssText = `
      position: absolute; inset: 0; z-index: 0;
      width: 100%; height: 100%; pointer-events: none;
    `;
    hero.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animFrame;

    function resize() {
      const rect = hero.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }

    function createParticles(count) {
      const w = canvas.width / window.devicePixelRatio;
      const h = canvas.height / window.devicePixelRatio;
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          z: Math.random() * 200 - 100,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 0.4,
          speedY: (Math.random() - 0.5) * 0.4,
          speedZ: (Math.random() - 0.5) * 0.2,
          opacity: Math.random() * 0.5 + 0.2
        });
      }
    }

    function animate() {
      const w = canvas.width / window.devicePixelRatio;
      const h = canvas.height / window.devicePixelRatio;
      ctx.clearRect(0, 0, w, h);

      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.z += p.speedZ;

        // 3D透视缩放
        const scale = 300 / (300 + p.z);
        const drawSize = p.size * scale;
        const drawX = p.x + (p.x - w/2) * (scale - 1);
        const drawY = p.y + (p.y - h/2) * (scale - 1);

        ctx.beginPath();
        ctx.arc(drawX, drawY, drawSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity * scale})`;
        ctx.fill();

        // 边界重置
        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        if (p.y > h + 20) p.y = -20;
        if (p.z < -150) p.z = 150;
        if (p.z > 150) p.z = -150;
      });

      animFrame = requestAnimationFrame(animate);
    }

    resize();
    createParticles(60);
    animate();

    window.addEventListener('resize', () => {
      resize();
      createParticles(60);
    });
  }

  // === 2. 头像3D浮动旋转 ===
  function initAvatar3D() {
    const avatar = document.querySelector('.hero-avatar');
    if (!avatar) return;

    let angle = 0;
    function floatAnim() {
      angle += 0.005;
      const floatY = Math.sin(angle) * 6;
      const scale = 1 + Math.sin(angle * 0.7) * 0.03;
      avatar.style.transform = `translateY(${floatY}px) scale(${scale})`;
      avatar.style.transition = 'none';
      requestAnimationFrame(floatAnim);
    }
    floatAnim();

    // 鼠标悬停时跟随
    const hero = avatar.closest('.hero-content');
    if (hero) {
      hero.addEventListener('mousemove', (e) => {
        const rect = avatar.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - centerX) / 20;
        const deltaY = (e.clientY - centerY) / 20;
        avatar.style.setProperty('--rotate-x', `${-deltaY}deg`);
        avatar.style.setProperty('--rotate-y', `${deltaX}deg`);
      });

      hero.addEventListener('mouseleave', () => {
        avatar.style.setProperty('--rotate-x', '0deg');
        avatar.style.setProperty('--rotate-y', '0deg');
      });
    }
  }

  // === 3. 文章卡片3D倾斜效果 ===
  function initCard3D() {
    const cards = document.querySelectorAll('.article-card');
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 8;
        const rotateY = (centerX - x) / 8;
        card.style.transform = `
          perspective(800px)
          rotateX(${rotateX}deg)
          rotateY(${rotateY}deg)
          scale3d(1.03, 1.03, 1.03)
        `;
        card.style.transition = 'transform 0.05s ease-out';
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        card.style.transition = 'transform 0.4s ease-out';
      });
    });
  }

  // === 4. 标题文字3D效果 ===
  function initTitle3D() {
    const title = document.querySelector('.hero-content h1');
    if (!title) return;

    // 给文字加阴影分层
    title.style.textShadow = `
      0 1px 2px rgba(0,0,0,0.3),
      0 2px 4px rgba(0,0,0,0.2),
      0 4px 8px rgba(0,0,0,0.15),
      0 8px 16px rgba(0,0,0,0.1)
    `;

    // 鼠标移动时文字轻微倾斜
    const hero = title.closest('.hero-content');
    if (hero) {
      hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        title.style.transform = `perspective(500px) rotateX(${-y * 3}deg) rotateY(${x * 3}deg)`;
        title.style.transition = 'transform 0.1s ease-out';
      });

      hero.addEventListener('mouseleave', () => {
        title.style.transform = 'perspective(500px) rotateX(0deg) rotateY(0deg)';
        title.style.transition = 'transform 0.4s ease-out';
      });
    }
  }

  // === 5. 3D标签云（可选的，只在有 tag 元素的页面生效） ===
  function initTagCloud3D() {
    const tagContainers = document.querySelectorAll('.tags');
    tagContainers.forEach(container => {
      const tags = container.querySelectorAll('.tag');
      tags.forEach((tag, i) => {
        // 每个标签带轻微旋转和延迟
        const delay = i * 0.1;
        tag.style.animation = `tagFloat 3s ease-in-out ${delay}s infinite`;
        tag.style.transformStyle = 'preserve-3d';
      });
    });
  }

  // 启动所有效果
  initParticleBg();
  initAvatar3D();
  initCard3D();
  initTitle3D();
  initTagCloud3D();
});

// 标签浮动关键帧（动态注入）
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes tagFloat {
    0%, 100% { transform: perspective(300px) translateZ(0) rotateX(0deg); }
    25% { transform: perspective(300px) translateZ(10px) rotateX(2deg); }
    75% { transform: perspective(300px) translateZ(-5px) rotateX(-1deg); }
  }

  .hero-avatar {
    transform-style: preserve-3d;
    transition: transform 0.3s ease-out;
    transform:
      rotateX(var(--rotate-x, 0deg))
      rotateY(var(--rotate-y, 0deg));
  }
`;
document.head.appendChild(styleSheet);
