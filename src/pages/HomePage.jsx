import { useEffect } from "react";

// ─── Asset URLs from Figma (valid ~7 days) ───────────────────────────────────
const LOGO_WORDMARK =
  "https://www.figma.com/api/mcp/asset/0e749cd7-9e87-46e3-9b78-765404a41116";
const LOGO_MARK_TOP =
  "https://www.figma.com/api/mcp/asset/aadd0d98-a25a-45cd-bb60-daa9a61be40a";

// ─── Project data ─────────────────────────────────────────────────────────────
const PROJECTS = [
  { num: "01", category: "Magazine",             title: "Sabrá Mandrake",        featured: true  },
  { num: "02", category: "Branding + UX/UI",     title: "Bubble",                featured: false },
  { num: "03", category: "Branding + UX/UI",     title: "ReBloom",               featured: false },
  { num: "04", category: "Branding",             title: "Charlie's Queer Books", featured: false },
  { num: "05", category: "Motion",               title: "Motion Graphics",       featured: false },
  { num: "06", category: "Creative exploration", title: "Playground",            featured: false },
  { num: "07", category: "Creative exploration", title: "AI Exploration",        featured: false },
];

// ─── Styles ──────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Karla:wght@300;400;500;700&family=Poppins:wght@400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --smp-bg:      #2a2d3e;
    --smp-text:    #f7f9ff;
    --smp-blue:    #27a4d6;
    --smp-div:     rgba(247, 249, 255, 0.18);
    --smp-poppins: 'Poppins', sans-serif;
    --smp-karla:   'Karla', sans-serif;
  }

  @keyframes smpFadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .smp-anim { opacity: 0; animation: smpFadeUp 0.6s cubic-bezier(0.22,1,0.36,1) forwards; }
  .smp-d1 { animation-delay: 0.05s; }
  .smp-d2 { animation-delay: 0.13s; }
  .smp-d3 { animation-delay: 0.22s; }
  .smp-d4 { animation-delay: 0.30s; }

  .smp-page {
    width: 100%;
    min-height: 100vh;
    background: var(--smp-bg);
    color: var(--smp-text);
    font-family: var(--smp-karla);
    padding: 0 16px;
  }
  @media (min-width: 600px)  { .smp-page { padding: 0 24px; } }
  @media (min-width: 840px)  { .smp-page { padding: 0 40px; } }
  @media (min-width: 1200px) { .smp-page { padding: 0 60px; } }
  @media (min-width: 1600px) { .smp-page { padding: 0 120px; } }

  /* Navbar */
  .smp-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 20px;
    height: 44px;
  }
  @media (min-width: 600px)  { .smp-nav { padding-top: 24px; } }
  @media (min-width: 1200px) { .smp-nav { padding-top: 40px; } }

  .smp-nav-logo img { height: 24px; width: auto; display: block; }
  @media (min-width: 600px)  { .smp-nav-logo img { height: 28px; } }
  @media (min-width: 840px)  { .smp-nav-logo img { height: 32px; } }
  @media (min-width: 1200px) { .smp-nav-logo img { height: 44px; } }
  @media (min-width: 1600px) { .smp-nav-logo img { height: 48px; } }

  .smp-nav-menu {
    display: flex;
    gap: 24px;
    font-family: var(--smp-poppins);
    font-size: 16px;
    font-weight: 500;
    line-height: 20px;
  }
  .smp-nav-menu a { text-decoration: none; color: var(--smp-text); transition: opacity 0.2s; }
  .smp-nav-menu a:hover { opacity: 0.5; }

  /* Hero */
  .smp-hero {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 40px 16px;
    gap: 28px;
  }
  @media (min-width: 600px)  { .smp-hero { padding: 52px 24px; } }
  @media (min-width: 840px)  { .smp-hero { padding: 60px 0; gap: 32px; } }
  @media (min-width: 1200px) { .smp-hero { gap: 36px; } }

  .smp-hero-inner { display: flex; flex-direction: column; align-items: center; gap: 12px; }

  .smp-wordmark { width: 191px; height: auto; display: block; }
  @media (min-width: 600px)  { .smp-wordmark { width: 254px; } }
  @media (min-width: 840px)  { .smp-wordmark { width: 382px; } }
  @media (min-width: 1200px) { .smp-wordmark { width: 509px; } }
  @media (min-width: 1600px) { .smp-wordmark { width: 637px; } }

  .smp-bio {
    font-family: var(--smp-karla);
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    max-width: 292px;
  }
  @media (min-width: 840px)  { .smp-bio { font-size: 18px; line-height: 26px; max-width: 398px; } }
  @media (min-width: 1200px) { .smp-bio { max-width: 560px; } }
  @media (min-width: 1600px) { .smp-bio { max-width: 640px; } }

  .smp-scroll {
    font-family: var(--smp-karla);
    font-weight: 300;
    font-size: 16px;
    line-height: 20px;
    opacity: 0.6;
  }

  /* Projects */
  .smp-projects { width: 100%; }

  .smp-project {
    border-top: 1px solid var(--smp-div);
    padding: 8px 0;
    cursor: pointer;
    transition: background 0.15s;
  }
  .smp-project:last-child { border-bottom: 1px solid var(--smp-div); }
  .smp-project:hover { background: rgba(247,249,255,0.04); }

  /* Row: [num + title] left, [category] right */
  .smp-proj-head {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 8px;
    min-height: 40px;
  }
  .smp-proj-left { display: flex; align-items: flex-end; gap: 8px; min-width: 0; flex: 1; }

  .smp-proj-num {
    font-family: var(--smp-karla);
    font-weight: 700;
    font-size: 14px;
    line-height: 20px;
    flex-shrink: 0;
    padding-bottom: 2px;
    opacity: 0.75;
  }
  @media (min-width: 840px) { .smp-proj-num { font-size: 20px; line-height: 24px; padding-bottom: 0; } }

  .smp-proj-title {
    font-family: var(--smp-poppins);
    font-weight: 600;
    font-size: 26px;
    line-height: 34px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex: 1;
    min-width: 0;
  }
  @media (min-width: 600px)  { .smp-proj-title { font-size: 30px; line-height: 38px; } }
  @media (min-width: 840px)  { .smp-proj-title { font-size: 40px; line-height: 48px; } }
  @media (min-width: 1200px) { .smp-proj-title { font-size: 48px; line-height: 56px; } }
  @media (min-width: 1600px) { .smp-proj-title { font-size: 52px; line-height: 60px; } }

  .smp-proj-cat {
    font-family: var(--smp-karla);
    font-weight: 700;
    font-size: 14px;
    line-height: 20px;
    text-align: right;
    white-space: nowrap;
    flex-shrink: 0;
    opacity: 0.7;
  }
  @media (min-width: 840px) { .smp-proj-cat { font-size: 20px; line-height: 24px; } }

  /* Featured blue placeholder */
  .smp-proj-img {
    margin-top: 12px;
    background: var(--smp-blue);
    border-radius: 6px;
    width: 100%;
    height: 288px;
  }
  @media (min-width: 600px)  { .smp-proj-img { height: 360px; } }
  @media (min-width: 840px)  { .smp-proj-img { height: 471px; border-radius: 8px; } }

  /* About */
  .smp-about {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 0;
    gap: 12px;
    text-align: center;
  }
  @media (min-width: 840px) { .smp-about { padding: 60px 0; gap: 16px; } }

  .smp-about-img {
    background: rgba(247,249,255,0.07);
    border-radius: 8px;
    width: 100%;
    max-width: 368px;
    height: 288px;
  }
  @media (min-width: 600px)  { .smp-about-img { max-width: 552px; height: 308px; } }
  @media (min-width: 840px)  { .smp-about-img { max-width: 562px; height: 471px; } }
  @media (min-width: 1200px) { .smp-about-img { max-width: 708px; height: 471px; } }
  @media (min-width: 1600px) { .smp-about-img { max-width: 896px; height: 471px; } }

  .smp-about-text {
    font-family: var(--smp-karla);
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    opacity: 0.75;
    max-width: 640px;
  }

  /* Footer */
  .smp-footer {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding: 32px 0 48px;
    border-top: 1px solid var(--smp-div);
    gap: 16px;
  }
  @media (min-width: 840px)  { .smp-footer { padding: 48px 0 64px; } }
  @media (min-width: 1200px) { .smp-footer { padding: 56px 0 80px; } }

  .smp-footer-heading {
    font-family: var(--smp-poppins);
    font-weight: 600;
    font-size: 32px;
    line-height: 40px;
    flex: 1;
  }
  @media (min-width: 600px)  { .smp-footer-heading { font-size: 44px; line-height: 52px; } }
  @media (min-width: 840px)  { .smp-footer-heading { font-size: 64px; line-height: 76px; } }
  @media (min-width: 1200px) { .smp-footer-heading { font-size: 80px; line-height: 96px; } }
  @media (min-width: 1600px) { .smp-footer-heading { font-size: 96px; line-height: 115px; } }

  .smp-footer-links {
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-family: var(--smp-poppins);
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    text-align: right;
    flex-shrink: 0;
  }
  @media (min-width: 840px)  { .smp-footer-links { gap: 8px; font-size: 18px; } }
  @media (min-width: 1200px) { .smp-footer-links { gap: 12px; font-size: 20px; } }

  .smp-footer-links a { text-decoration: none; color: var(--smp-text); transition: opacity 0.2s; }
  .smp-footer-links a:hover { opacity: 0.5; }
`;

// ─── Component ────────────────────────────────────────────────────────────────
export default function HomePage() {
  useEffect(() => {
    if (!document.getElementById("smp-homepage-styles")) {
      const tag = document.createElement("style");
      tag.id = "smp-homepage-styles";
      tag.textContent = css;
      document.head.appendChild(tag);
    }
    const prevBg = document.body.style.background;
    document.body.style.background = "#2a2d3e";
    return () => {
      document.body.style.background = prevBg;
      document.getElementById("smp-homepage-styles")?.remove();
    };
  }, []);

  return (
    <div className="smp-page">

      {/* Navbar */}
      <nav className="smp-nav smp-anim smp-d1">
        <div className="smp-nav-logo">
          <img src={LOGO_MARK_TOP} alt="Sergio M Papagayo" />
        </div>
        <nav className="smp-nav-menu">
          <a href="#work">work</a>
          <a href="#about">about</a>
          <a href="#contact">contact</a>
        </nav>
      </nav>

      {/* Hero */}
      <section className="smp-hero">
        <div className="smp-hero-inner smp-anim smp-d2">
          <img className="smp-wordmark" src={LOGO_WORDMARK} alt="Sergio M Papagayo wordmark" />
          <p className="smp-bio">
            Hola! I am a graphic designer and engineer. I create visual
            experiences that blend creativity and technology.
          </p>
        </div>
        <p className="smp-scroll smp-anim smp-d2">[scroll to see my work]</p>
      </section>

      {/* Projects */}
      <section id="work" className="smp-projects smp-anim smp-d3">
        {PROJECTS.map((p) => (
          <div key={p.num} className="smp-project">
            <div className="smp-proj-head">
              <div className="smp-proj-left">
                <span className="smp-proj-num">{p.num}</span>
                <span className="smp-proj-title">{p.title}</span>
              </div>
              <span className="smp-proj-cat">{p.category}</span>
            </div>
            {p.featured && <div className="smp-proj-img" />}
          </div>
        ))}
      </section>

      {/* About / Section 3 */}
      <section id="about" className="smp-about smp-anim smp-d4">
        <div className="smp-about-img" />
        <p className="smp-about-text">Body text</p>
      </section>

      {/* Footer */}
      <footer id="contact" className="smp-footer">
        <p className="smp-footer-heading">Let's Talk</p>
        <div className="smp-footer-links">
          <a href="mailto:hello@sergiomapagayo.com">email</a>
          <a href="https://linkedin.com/in/sergiomapagayo" target="_blank" rel="noreferrer">linkedin</a>
          <a href="https://instagram.com/sergiomapagayo" target="_blank" rel="noreferrer">instagram</a>
          <a href="/resume.pdf" target="_blank" rel="noreferrer">resume</a>
        </div>
      </footer>

    </div>
  );
}
