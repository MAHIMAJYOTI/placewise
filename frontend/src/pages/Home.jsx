import React, { useEffect, useRef, useState } from 'react';

function Home() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    const cards = Array.from(document.querySelectorAll('.feature-card'));
    const handlers = cards.map((card) => {
      const handler = (event) => {
        const rect = card.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--mx', `${x}%`);
        card.style.setProperty('--my', `${y}%`);
      };
      card.addEventListener('mousemove', handler);
      return { card, handler };
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.hiw-card, .feature-card').forEach((element) => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(20px)';
      element.style.transition = 'opacity 0.5s ease, transform 0.5s ease, border-color 0.3s';
      observer.observe(element);
    });

    return () => {
      handlers.forEach(({ card, handler }) => card.removeEventListener('mousemove', handler));
      observer.disconnect();
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleGenerateClick = () => {
    if (isGenerating) return;
    setIsGenerating(true);
    setIsReady(false);
    timerRef.current = setTimeout(() => {
      setIsGenerating(false);
      setIsReady(true);
    }, 2200);
  };

  const buttonContent = isReady
    ? { icon: '🎉', text: 'Roadmap Ready! Scroll Down →' }
    : isGenerating
      ? { icon: '✨', text: 'Generating your roadmap…' }
      : { icon: '🚀', text: 'Generate My Personalized Roadmap' };

  return (
    <div>
      <style>{`
        :root {
          --navy: #0a0f2e;
          --navy-mid: #0d1540;
          --navy-light: #131d56;
          --accent: #00e5a0;
          --accent-dim: rgba(0,229,160,0.12);
          --accent-glow: rgba(0,229,160,0.35);
          --purple: #7c6fff;
          --purple-dim: rgba(124,111,255,0.15);
          --white: #ffffff;
          --white-60: rgba(255,255,255,0.6);
          --white-20: rgba(255,255,255,0.08);
          --border: rgba(255,255,255,0.1);
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        html { scroll-behavior: smooth; }

        body {
          background: var(--navy);
          color: var(--white);
          font-family: 'DM Sans', sans-serif;
          overflow-x: hidden;
          cursor: default;
        }

        /* ---- NOISE TEXTURE OVERLAY ---- */
        body::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.035'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 9999;
          opacity: 0.6;
        }

        /* ---- MESH GRADIENT BLOB ---- */
        .mesh {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          pointer-events: none;
          z-index: 0;
        }
        .mesh-1 { width: 600px; height: 600px; background: rgba(124,111,255,0.18); top: -150px; right: -100px; }
        .mesh-2 { width: 500px; height: 500px; background: rgba(0,229,160,0.12); top: 200px; left: -200px; }
        .mesh-3 { width: 400px; height: 400px; background: rgba(124,111,255,0.1); bottom: 0; right: 200px; }

        /* ---- NAV ---- */
        nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          padding: 18px 60px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          background: rgba(10,15,46,0.7);
          border-bottom: 1px solid var(--border);
          animation: fadeDown 0.6s ease both;
        }

        .logo {
          font-family: 'Syne', sans-serif;
          font-size: 22px;
          font-weight: 800;
          letter-spacing: -0.5px;
        }
        .logo span { color: var(--accent); }

        .nav-links { display: flex; gap: 32px; list-style: none; }
        .nav-links a {
          text-decoration: none;
          color: var(--white-60);
          font-size: 14px;
          font-weight: 500;
          transition: color 0.2s;
        }
        .nav-links a:hover { color: var(--white); }

        .nav-cta {
          background: var(--accent);
          color: var(--navy);
          font-weight: 700;
          font-size: 13px;
          padding: 10px 22px;
          border-radius: 100px;
          text-decoration: none;
          transition: box-shadow 0.2s, transform 0.2s;
          letter-spacing: 0.2px;
        }
        .nav-cta:hover { box-shadow: 0 0 30px var(--accent-glow); transform: translateY(-1px); }

        /* ---- HERO ---- */
        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding: 120px 60px 80px;
          position: relative;
          overflow: hidden;
        }

        .hero-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .hero-left { animation: fadeUp 0.8s ease 0.1s both; }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--accent-dim);
          border: 1px solid rgba(0,229,160,0.3);
          border-radius: 100px;
          padding: 6px 14px;
          font-size: 12px;
          font-weight: 600;
          color: var(--accent);
          margin-bottom: 28px;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }
        .hero-badge::before {
          content: '';
          width: 6px; height: 6px;
          background: var(--accent);
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        h1 {
          font-family: 'Syne', sans-serif;
          font-size: clamp(40px, 5vw, 64px);
          font-weight: 800;
          line-height: 1.08;
          letter-spacing: -2px;
          margin-bottom: 24px;
        }
        h1 .highlight {
          background: linear-gradient(135deg, var(--accent) 0%, #00c8ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-sub {
          font-size: 18px;
          color: var(--white-60);
          line-height: 1.6;
          max-width: 450px;
          margin-bottom: 40px;
          font-weight: 400;
        }

        .hero-actions { display: flex; align-items: center; gap: 20px; }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: var(--accent);
          color: var(--navy);
          font-family: 'DM Sans', sans-serif;
          font-weight: 700;
          font-size: 15px;
          padding: 16px 32px;
          border-radius: 14px;
          text-decoration: none;
          border: none;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.3s;
          letter-spacing: -0.2px;
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 40px var(--accent-glow);
        }
        .btn-primary svg { transition: transform 0.2s; }
        .btn-primary:hover svg { transform: translateX(3px); }

        .hero-note {
          font-size: 13px;
          color: var(--white-60);
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .hero-note::before { content: '✓'; color: var(--accent); font-weight: 700; }

        .hero-stats {
          display: flex;
          gap: 32px;
          margin-top: 48px;
          padding-top: 40px;
          border-top: 1px solid var(--border);
        }
        .stat-val {
          font-family: 'Syne', sans-serif;
          font-size: 28px;
          font-weight: 800;
          color: var(--white);
          letter-spacing: -1px;
        }
        .stat-val span { color: var(--accent); }
        .stat-label { font-size: 12px; color: var(--white-60); margin-top: 2px; font-weight: 500; }

        /* ---- DASHBOARD MOCK ---- */
        .hero-right { animation: fadeUp 0.8s ease 0.3s both; position: relative; }

        .dashboard-mock {
          background: linear-gradient(145deg, rgba(19,29,86,0.9) 0%, rgba(13,21,64,0.95) 100%);
          border: 1px solid var(--border);
          border-radius: 24px;
          padding: 28px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 40px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08);
        }
        .dashboard-mock::before {
          content: '';
          position: absolute;
          top: -1px; left: 20px; right: 20px; height: 1px;
          background: linear-gradient(90deg, transparent, var(--accent), transparent);
        }

        .mock-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
        }
        .mock-dots { display: flex; gap: 6px; }
        .mock-dots span {
          width: 10px; height: 10px; border-radius: 50%;
        }
        .mock-dots span:nth-child(1) { background: #ff5f57; }
        .mock-dots span:nth-child(2) { background: #febc2e; }
        .mock-dots span:nth-child(3) { background: #28c840; }
        .mock-title {
          font-size: 12px;
          color: var(--white-60);
          font-weight: 500;
          letter-spacing: 0.5px;
        }

        .mock-greeting {
          font-size: 13px;
          color: var(--white-60);
          margin-bottom: 6px;
          font-weight: 400;
        }
        .mock-name {
          font-family: 'Syne', sans-serif;
          font-size: 22px;
          font-weight: 700;
          margin-bottom: 24px;
          letter-spacing: -0.5px;
        }

        .progress-section { margin-bottom: 24px; }
        .progress-label {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          color: var(--white-60);
          margin-bottom: 8px;
          font-weight: 500;
        }
        .progress-bar {
          height: 6px;
          background: var(--white-20);
          border-radius: 100px;
          overflow: hidden;
          margin-bottom: 10px;
        }
        .progress-fill {
          height: 100%;
          border-radius: 100px;
          background: linear-gradient(90deg, var(--accent), #00c8ff);
          animation: fillBar 1.5s ease 1s both;
        }

        .roadmap-items { display: flex; flex-direction: column; gap: 10px; }
        .roadmap-item {
          display: flex;
          align-items: center;
          gap: 12px;
          background: var(--white-20);
          border-radius: 10px;
          padding: 12px 14px;
          font-size: 13px;
          font-weight: 500;
          transition: background 0.2s;
        }
        .roadmap-item:hover { background: rgba(255,255,255,0.1); }
        .item-icon {
          width: 32px; height: 32px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 15px;
          flex-shrink: 0;
        }
        .item-done { background: var(--accent-dim); border: 1px solid rgba(0,229,160,0.3); }
        .item-active { background: var(--purple-dim); border: 1px solid rgba(124,111,255,0.4); }
        .item-pending { background: var(--white-20); }
        .item-text { flex: 1; }
        .item-name { color: var(--white); font-size: 13px; }
        .item-sub { color: var(--white-60); font-size: 11px; margin-top: 2px; }
        .item-badge {
          font-size: 10px;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 100px;
          letter-spacing: 0.3px;
        }
        .badge-done { background: var(--accent-dim); color: var(--accent); }
        .badge-active { background: var(--purple-dim); color: var(--purple); }
        .badge-soon { background: var(--white-20); color: var(--white-60); }

        .floating-chip {
          position: absolute;
          background: rgba(13,21,64,0.95);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 10px 14px;
          font-size: 12px;
          font-weight: 600;
          backdrop-filter: blur(10px);
          animation: float 3s ease-in-out infinite;
          box-shadow: 0 8px 24px rgba(0,0,0,0.3);
        }
        .chip-1 { top: -16px; right: 40px; color: var(--accent); animation-delay: 0s; }
        .chip-2 { bottom: 30px; left: -30px; color: var(--purple); animation-delay: 1.5s; }

        /* ---- INPUT CARD ---- */
        .input-section {
          padding: 80px 60px;
          position: relative;
          z-index: 1;
        }

        .section-label {
          font-size: 12px;
          font-weight: 700;
          color: var(--accent);
          letter-spacing: 2px;
          text-transform: uppercase;
          text-align: center;
          margin-bottom: 12px;
        }
        .section-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(28px, 3.5vw, 44px);
          font-weight: 800;
          text-align: center;
          letter-spacing: -1.5px;
          margin-bottom: 16px;
        }
        .section-sub {
          text-align: center;
          color: var(--white-60);
          font-size: 16px;
          margin-bottom: 48px;
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
        }

        .input-card {
          max-width: 780px;
          margin: 0 auto;
          background: linear-gradient(145deg, rgba(19,29,86,0.8), rgba(13,21,64,0.9));
          border: 1px solid var(--border);
          border-radius: 28px;
          padding: 48px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 40px 80px rgba(0,0,0,0.4);
        }
        .input-card::before {
          content: '';
          position: absolute;
          top: -1px; left: 60px; right: 60px; height: 1px;
          background: linear-gradient(90deg, transparent, var(--purple), transparent);
        }

        .input-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 20px;
        }

        .field-group { display: flex; flex-direction: column; gap: 8px; }
        .field-label {
          font-size: 12px;
          font-weight: 600;
          color: var(--white-60);
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .field-select, .field-input {
          width: 100%;
          background: rgba(255,255,255,0.06);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 14px 18px;
          color: var(--white);
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 500;
          outline: none;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
          appearance: none;
          -webkit-appearance: none;
        }
        .field-select { background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='rgba(255,255,255,0.4)' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 14px center; background-size: 16px; padding-right: 42px; cursor: pointer; }
        .field-select option { background: var(--navy-mid); color: var(--white); }
        .field-select:focus, .field-input:focus {
          border-color: rgba(124,111,255,0.6);
          background: rgba(124,111,255,0.08);
          box-shadow: 0 0 0 3px rgba(124,111,255,0.12);
        }
        .field-input::placeholder { color: rgba(255,255,255,0.25); }

        .skills-wrapper { position: relative; grid-column: 1 / -1; }
        .skills-tags {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          left: 14px;
          display: flex;
          gap: 6px;
          align-items: center;
          pointer-events: none;
        }
        .skill-tag {
          background: var(--accent-dim);
          border: 1px solid rgba(0,229,160,0.3);
          color: var(--accent);
          font-size: 11px;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 100px;
          letter-spacing: 0.3px;
        }

        .generate-btn {
          width: 100%;
          background: linear-gradient(135deg, var(--accent) 0%, #00c8ff 100%);
          color: var(--navy);
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 17px;
          padding: 18px;
          border-radius: 14px;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          transition: transform 0.2s, box-shadow 0.3s, opacity 0.2s;
          letter-spacing: -0.3px;
          margin-top: 8px;
        }
        .generate-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 16px 50px rgba(0,229,160,0.3);
        }
        .generate-btn .btn-icon { font-size: 20px; }
        .generate-btn.is-loading { opacity: 0.8; cursor: wait; }

        .card-footer {
          margin-top: 24px;
          text-align: center;
          font-size: 13px;
          color: var(--white-60);
        }
        .card-footer span { color: var(--accent); font-weight: 600; }

        /* ---- HOW IT WORKS ---- */
        .hiw-section {
          padding: 80px 60px;
          position: relative;
          z-index: 1;
        }
        .hiw-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          max-width: 1000px;
          margin: 0 auto;
          position: relative;
        }
        .hiw-connector {
          position: absolute;
          top: 48px;
          left: calc(33.33% - 12px);
          right: calc(33.33% - 12px);
          height: 1px;
          background: linear-gradient(90deg, var(--accent), var(--purple));
          opacity: 0.3;
          pointer-events: none;
        }

        .hiw-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 36px 28px;
          text-align: center;
          position: relative;
          transition: border-color 0.3s, transform 0.3s;
        }
        .hiw-card:hover { border-color: rgba(0,229,160,0.3); transform: translateY(-4px); }
        .hiw-card:hover .hiw-icon { box-shadow: 0 12px 30px var(--accent-glow); }

        .hiw-num {
          font-family: 'Syne', sans-serif;
          font-size: 11px;
          font-weight: 800;
          color: var(--accent);
          letter-spacing: 2px;
          margin-bottom: 16px;
        }
        .hiw-icon {
          width: 64px; height: 64px;
          border-radius: 16px;
          background: var(--accent-dim);
          border: 1px solid rgba(0,229,160,0.2);
          display: flex; align-items: center; justify-content: center;
          font-size: 28px;
          margin: 0 auto 20px;
          transition: box-shadow 0.3s;
        }
        .hiw-card:nth-child(2) .hiw-icon { background: var(--purple-dim); border-color: rgba(124,111,255,0.2); }
        .hiw-card:nth-child(3) .hiw-icon { background: rgba(0,200,255,0.1); border-color: rgba(0,200,255,0.2); }
        .hiw-card-title {
          font-family: 'Syne', sans-serif;
          font-size: 17px;
          font-weight: 700;
          margin-bottom: 10px;
          letter-spacing: -0.3px;
        }
        .hiw-card-text { font-size: 14px; color: var(--white-60); line-height: 1.6; }

        /* ---- FEATURES ---- */
        .features-section {
          padding: 80px 60px;
          position: relative;
          z-index: 1;
        }
        .features-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          max-width: 900px;
          margin: 0 auto;
        }

        .feature-card {
          background: linear-gradient(145deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02));
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 32px;
          transition: border-color 0.3s, transform 0.3s;
          position: relative;
          overflow: hidden;
        }
        .feature-card::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 20px;
          opacity: 0;
          transition: opacity 0.3s;
          background: radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(0,229,160,0.06) 0%, transparent 70%);
        }
        .feature-card:hover { border-color: rgba(0,229,160,0.25); transform: translateY(-3px); }
        .feature-card:hover::after { opacity: 1; }

        .feature-icon {
          font-size: 32px;
          margin-bottom: 16px;
          display: block;
        }
        .feature-title {
          font-family: 'Syne', sans-serif;
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 10px;
          letter-spacing: -0.3px;
        }
        .feature-text { font-size: 14px; color: var(--white-60); line-height: 1.65; }

        /* ---- FOOTER ---- */
        footer {
          margin-top: 40px;
          border-top: 1px solid var(--border);
          padding: 40px 60px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
          z-index: 1;
        }
        .footer-logo {
          font-family: 'Syne', sans-serif;
          font-size: 20px;
          font-weight: 800;
          letter-spacing: -0.5px;
        }
        .footer-logo span { color: var(--accent); }
        .footer-tagline { font-size: 12px; color: var(--white-60); margin-top: 4px; }
        .footer-team {
          text-align: right;
          font-size: 13px;
          color: var(--white-60);
        }
        .footer-team strong { color: var(--white); font-weight: 600; }

        /* ---- ANIMATIONS ---- */
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(0.8); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-8px); }
        }
        @keyframes fillBar {
          from { width: 0%; }
        }

        /* Responsive */
        @media (max-width: 900px) {
          nav { padding: 16px 24px; }
          .nav-links { display: none; }
          .hero { padding: 100px 24px 60px; }
          .hero-content { grid-template-columns: 1fr; gap: 50px; }
          .hero-right { display: none; }
          .input-section, .hiw-section, .features-section { padding: 60px 24px; }
          .input-card { padding: 32px 24px; }
          .input-grid { grid-template-columns: 1fr; }
          .skills-wrapper { grid-column: auto; }
          .hiw-grid { grid-template-columns: 1fr; }
          .hiw-connector { display: none; }
          .features-grid { grid-template-columns: 1fr; }
          footer { flex-direction: column; gap: 20px; text-align: center; padding: 32px 24px; }
          .footer-team { text-align: center; }
        }
      `}</style>

      <nav>
        <div className="logo">Place<span>AI</span></div>
        <ul className="nav-links">
          <li><a href="#how">How it Works</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#roadmap">Roadmap</a></li>
        </ul>
        <a href="#roadmap" className="nav-cta">Get Started Free</a>
      </nav>

      <section className="hero">
        <div className="mesh mesh-1"></div>
        <div className="mesh mesh-2"></div>

        <div className="hero-content">
          <div className="hero-left">
            <div className="hero-badge">AI-Powered Career Prep</div>
            <h1>Your AI Mentor for <span className="highlight">Placement Preparation</span></h1>
            <p className="hero-sub">Personalized roadmap, coding practice & resume — tailored to your dream company. Stop guessing. Start placing.</p>
            <div className="hero-actions">
              <a href="#roadmap" className="btn-primary">
                Get My Roadmap
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5-5 5M6 12h12"/></svg>
              </a>
              <span className="hero-note">No login needed</span>
            </div>
            <div className="hero-stats">
              <div>
                <div className="stat-val">500<span>+</span></div>
                <div className="stat-label">Companies covered</div>
              </div>
              <div>
                <div className="stat-val">3k<span>+</span></div>
                <div className="stat-label">Students mentored</div>
              </div>
              <div>
                <div className="stat-val">94<span>%</span></div>
                <div className="stat-label">Placement rate</div>
              </div>
            </div>
          </div>

          <div className="hero-right">
            <div className="floating-chip chip-1">🎯 Google SWE Roadmap ready!</div>
            <div className="floating-chip chip-2">⚡ 3 skill gaps identified</div>

            <div className="dashboard-mock">
              <div className="mock-header">
                <div className="mock-dots"><span></span><span></span><span></span></div>
                <span className="mock-title">placeai.app/roadmap</span>
                <span></span>
              </div>

              <div className="mock-greeting">Welcome back,</div>
              <div className="mock-name">Aditya's Prep Plan 👋</div>

              <div className="progress-section">
                <div className="progress-label">
                  <span>Overall Progress</span>
                  <span style={{ color: 'var(--accent)', fontWeight: 700 }}>62%</span>
                </div>
                <div className="progress-bar"><div className="progress-fill" style={{ width: '62%' }}></div></div>
                <div className="progress-label">
                  <span>DSA Mastery</span>
                  <span style={{ color: 'var(--purple)', fontWeight: 700 }}>45%</span>
                </div>
                <div className="progress-bar"><div className="progress-fill" style={{ width: '45%', background: 'linear-gradient(90deg,var(--purple),#a78bfa)' }}></div></div>
              </div>

              <div className="roadmap-items">
                <div className="roadmap-item">
                  <div className="item-icon item-done">✅</div>
                  <div className="item-text">
                    <div className="item-name">Arrays & Strings</div>
                    <div className="item-sub">28 problems solved</div>
                  </div>
                  <span className="item-badge badge-done">Done</span>
                </div>
                <div className="roadmap-item">
                  <div className="item-icon item-active">🔄</div>
                  <div className="item-text">
                    <div className="item-name">Trees & Graphs</div>
                    <div className="item-sub">12 / 30 completed</div>
                  </div>
                  <span className="item-badge badge-active">Active</span>
                </div>
                <div className="roadmap-item">
                  <div className="item-icon item-pending">📄</div>
                  <div className="item-text">
                    <div className="item-name">Resume Optimization</div>
                    <div className="item-sub">ATS Score: Pending</div>
                  </div>
                  <span className="item-badge badge-soon">Next</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="input-section" id="roadmap">
        <div className="mesh mesh-3"></div>
        <div className="section-label">Start Here</div>
        <h2 className="section-title">Generate Your Roadmap</h2>
        <p className="section-sub">Tell us where you are and where you want to go — we'll handle the rest.</p>

        <div className="input-card">
          <div className="input-grid">
            <div className="field-group">
              <label className="field-label" htmlFor="year">Your Year</label>
              <select className="field-select" id="year" defaultValue="">
                <option value="" disabled>Select year</option>
                <option>2nd Year</option>
                <option>3rd Year</option>
                <option>4th Year / Final</option>
              </select>
            </div>

            <div className="field-group">
              <label className="field-label" htmlFor="target">Target Company / Role</label>
              <select className="field-select" id="target" defaultValue="">
                <option value="" disabled>Select target</option>
                <optgroup label="Tech Giants">
                  <option>Google — SWE</option>
                  <option>Microsoft — SDE</option>
                  <option>Amazon — SDE</option>
                  <option>Meta — SWE</option>
                  <option>Apple — SWE</option>
                </optgroup>
                <optgroup label="Indian Tech">
                  <option>Flipkart — SDE</option>
                  <option>Zomato — SDE</option>
                  <option>CRED — SDE</option>
                </optgroup>
                <optgroup label="Product Roles">
                  <option>Any — Product Manager</option>
                  <option>Any — Data Scientist</option>
                  <option>Any — Frontend Dev</option>
                </optgroup>
              </select>
            </div>

            <div className="field-group skills-wrapper">
              <label className="field-label" htmlFor="skills">Your Current Skills</label>
              <input
                type="text"
                className="field-input"
                id="skills"
                placeholder="e.g.  Java, DSA, React, SQL…"
              />
            </div>
          </div>

          <button
            className={`generate-btn${isGenerating ? ' is-loading' : ''}`}
            onClick={handleGenerateClick}
            type="button"
          >
            <span className="btn-icon">{buttonContent.icon}</span>
            {buttonContent.text}
          </button>

          <div className="card-footer">
            <span>Free forever</span> · No login · Results in under 10 seconds
          </div>
        </div>
      </section>

      <section className="hiw-section" id="how">
        <div className="section-label">Process</div>
        <h2 className="section-title">How It Works</h2>
        <p className="section-sub">Three simple steps from where you are to where you want to be.</p>

        <div className="hiw-grid">
          <div className="hiw-connector"></div>

          <div className="hiw-card">
            <div className="hiw-num">STEP 01</div>
            <div className="hiw-icon">📝</div>
            <div className="hiw-card-title">Enter Your Details</div>
            <p className="hiw-card-text">Share your year, existing skills, and the company or role you're targeting. Takes 30 seconds.</p>
          </div>

          <div className="hiw-card">
            <div className="hiw-num">STEP 02</div>
            <div className="hiw-icon">🧠</div>
            <div className="hiw-card-title">AI Analyzes Skill Gaps</div>
            <p className="hiw-card-text">Our AI maps your current profile against the exact requirements of your target — and pinpoints gaps.</p>
          </div>

          <div className="hiw-card">
            <div className="hiw-num">STEP 03</div>
            <div className="hiw-icon">🗺️</div>
            <div className="hiw-card-title">Get Your Prep Plan</div>
            <p className="hiw-card-text">A week-by-week roadmap with curated resources, coding problems, and resume tips — built just for you.</p>
          </div>
        </div>
      </section>

      <section className="features-section" id="features">
        <div className="section-label">Features</div>
        <h2 className="section-title">Everything You Need to Land the Offer</h2>
        <p className="section-sub">Comprehensive tools — built specifically for campus placement success.</p>

        <div className="features-grid">
          <div className="feature-card">
            <span className="feature-icon">🎯</span>
            <div className="feature-title">Company-Specific Roadmap</div>
            <p className="feature-text">Not generic advice — a detailed prep plan calibrated to your target company's actual interview process, question patterns, and hiring bar.</p>
          </div>

          <div className="feature-card">
            <span className="feature-icon">🧠</span>
            <div className="feature-title">Smart Coding Recommendations</div>
            <p className="feature-text">Adaptive problem sets that evolve with your progress. We surface the exact LeetCode patterns companies test, in the order that builds intuition fastest.</p>
          </div>

          <div className="feature-card">
            <span className="feature-icon">📄</span>
            <div className="feature-title">ATS-Friendly Resume Builder</div>
            <p className="feature-text">AI-reviewed resume feedback optimized to pass applicant tracking systems and impress human recruiters at your target companies.</p>
          </div>

          <div className="feature-card">
            <span className="feature-icon">📊</span>
            <div className="feature-title">Progress Tracking</div>
            <p className="feature-text">Visual dashboards that show exactly how much ground you've covered and what to tackle next — so you always know you're moving forward.</p>
          </div>
        </div>
      </section>

      <footer>
        <div>
          <div className="footer-logo">Place<span>AI</span></div>
          <div className="footer-tagline">Built for students. Powered by AI.</div>
        </div>
        <div className="footer-team">
          <div>Made with ♥ for</div>
          <strong>Hackathon 2025 · Team Nexus</strong>
        </div>
      </footer>
    </div>
  );
}

export default Home;
