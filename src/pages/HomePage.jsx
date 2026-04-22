import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { DrawSVGPlugin, ScrollTrigger, SplitText } from "gsap/all";
import {
  useRive,
  Layout,
  Fit,
  Alignment,
  useViewModel,
  useViewModelInstance,
  useStateMachineInput
} from '@rive-app/react-canvas';
import { projects } from "../scripts/projects";
import useIsMobile from "../hooks/useIsMobile";

gsap.registerPlugin(DrawSVGPlugin, ScrollTrigger, SplitText);

export default function HomePage() {
  const rootRef = useRef(null);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useLayoutEffect(() => {
    // Snap to top synchronously on mount before GSAP calculates positions
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      // ==========================================
      // 1. PAGE TRANSITION (Blue Block Sweep)
      // ==========================================
      // This animates the solid color block covering the screen on page load.
      // Tweak 'duration' or 'ease' to make the swipe faster or softer.
      gsap.set(".page-transition", { scaleY: 1, transformOrigin: "bottom" });
      const tl = gsap.timeline();
      tl.to(".page-transition", {
        scaleY: 0,
        transformOrigin: "top", // Sweeps up towards the top
        duration: 0.8,
        ease: "power3.inOut",
        delay: 0.1,
      });

      // ==========================================
      // 2. NAVBAR ENTRANCE
      // ==========================================
      // Animates the logo and menu items dropping down from the top.
      // Tweak 'y' for drop distance, 'stagger' for the delay between links.
      tl.from(".smp-nav-logo, .smp-nav-menu a", {
        y: -30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      }, "-=0.4"); // Starts 0.4s before the page transition finishes

      // ==========================================
      // 3. HERO ENTRANCE (Line Mask Reveal)
      // ==========================================
      // Split h1 and bio into lines, each masked so text slides up from behind
      // its own clipping boundary — matching the landonorris.com reveal style.
      const headingSplit = new SplitText(".smp-hero h1", {
        type: "lines",
        mask: "lines",
      });
      const bioSplit = new SplitText(".smp-bio", {
        type: "lines",
        mask: "lines",
      });
      const actionSplit = new SplitText(".smp-action", {
        type: "lines",
        mask: "lines",
      });

      const heroLines = [...headingSplit.lines, ...bioSplit.lines];

      tl.from(".smp-uc-container", {
        opacity: 0,
        scale: 0.95,
        duration: 1,
        ease: "power3.inOut",
      }, "-=0.8")
        .from(heroLines, {
          yPercent: 110,
          duration: 1,
          stagger: 0.08,
          ease: "power4.out",
        }, "-=0.8")
        .from(".smp-uc-badge", {
          opacity: 0,
          y: 10,
          duration: 0.6,
          ease: "power3.out",
        }, "-=0.6")
        .from(actionSplit.lines, {
          yPercent: 110,
          duration: 0.8,
          ease: "power4.out",
        }, "-=0.6");

      // ==========================================
      // 4. PROJECTS — ELEMENT-LEVEL SCROLL ANIMATIONS
      // ==========================================
      // Each element inside every project card has its own ScrollTrigger
      // so it appears as soon as scrolling reaches that specific element.

      const projectEls = gsap.utils.toArray(".smp-project");

      projectEls.forEach((proj) => {
        const imgWrapper = proj.querySelector(".smp-proj-img");
        const img = proj.querySelector(".smp-proj-img img");
        const num = proj.querySelector(".smp-proj-num");
        const title = proj.querySelector(".smp-proj-title");
        const cat = proj.querySelector(".smp-proj-cat");

        // — Image reveal: clip-path wipe + subtle de-scale —
        if (imgWrapper && img) {
          gsap.set(imgWrapper, { clipPath: "inset(100% 0% 0% 0%)" });
          gsap.set(img, { scale: 1.15 });

          const imgTl = gsap.timeline({
            scrollTrigger: {
              trigger: imgWrapper,
              start: "top 95%",
              toggleActions: "play none none reverse",
            },
          });

          imgTl
            .to(imgWrapper, {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 1,
              ease: "power4.inOut",
            })
            .to(img, {
              scale: 1,
              duration: 1.2,
              ease: "power3.out",
            }, "<0.15");
        }

        // — Text elements: each one has its own trigger —
        [num, title, cat].forEach((el) => {
          if (!el) return;

          const split = new SplitText(el, { type: "lines", mask: "lines" });

          gsap.from(split.lines, {
            scrollTrigger: {
              trigger: el,
              start: "top 97%",
              toggleActions: "play none none reverse",
            },
            yPercent: 120,
            duration: 0.8,
            stagger: 0.06,
            ease: "power4.out",
          });
        });
      });

      // ==========================================
      // 5. ABOUT SECTION ON SCROLL
      // ==========================================
      gsap.from(".smp-about-img, .smp-about-text", {
        scrollTrigger: {
          trigger: ".smp-about",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2, // Image animates first, text follows 0.2s later
        ease: "power3.out",
      });

      // ==========================================
      // 6. FOOTER ON SCROLL
      // ==========================================
      gsap.from(".smp-footer-heading, .smp-footer-links a", {
        scrollTrigger: {
          trigger: ".smp-footer",
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1, // Links appear one by one
        ease: "power3.out",
      });

    }, rootRef); // rootRef scopes all animations strictly to this component

    return () => ctx.revert(); // Cleanup GSAP on unmount
  }, [isMobile]); // Re-run if layout completely changes structure

  return (
    <div className="smp-page" ref={rootRef}>
      {/* --- Header / Navigation --- */}
      <header className={`smp-nav ${isScrolled ? 'is-scrolled' : ''}`}>
        <div className="smp-nav-logo"></div>
        <nav className="smp-nav-menu" aria-label="Main navigation">
          <a href="#work">work</a>
          <a href="#about">about</a>
          <a href="#contact">contact</a>
        </nav>
      </header>

      <main>
        {/* --- Hero Section --- */}
        <section className="smp-hero" aria-label="Introduction">
          <div className="smp-hero-container">
            <div className="smp-hero-rive" key={isMobile ? 'mobile' : 'desktop'}>
              <ResponsiveHeroRive isMobile={isMobile} />
            </div>
          </div>
          <p className="smp-action" aria-hidden="true">[scroll to see my work]</p>
        </section>

        {/* --- Projects Section --- */}
        <section id="work" className="smp-projects" aria-label="Projects">
          {projects.map((p) => (
            <article
              key={p.num}
              className={`smp-project`}
              id={`project-${p.id}`}
              onClick={(e) => {
                navigate(`/home/${p.id}`);
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  navigate(`/home/${p.id}`);
                }
              }}
            >


              <div className="smp-proj-head">
                {isMobile ? (
                  // Mobile Layout: Number and Category together, Title below
                  <>
                    <div className="smp-proj-group">
                      <p className="smp-proj-num">{p.num}</p>
                      <p className="smp-proj-cat">{p.category}</p>
                    </div>
                    <h2 className="smp-proj-title">{p.title}</h2>
                  </>
                ) : (
                  // Desktop Layout: Number and Title together, Category floats right
                  <>
                    <div className="smp-proj-group">
                      <p className="smp-proj-num">{p.num}</p>
                      <h2 className="smp-proj-title">{p.title}</h2>
                    </div>
                    <p className="smp-proj-cat">{p.category}</p>
                  </>
                )}
              </div>
              <div className="smp-proj-img">
                <img src={p.images[0]} alt={p.title} />
              </div>
            </article>
          ))}
        </section>

        {/* --- About Section --- */}
        <section id="about" className="smp-about" aria-label="About">
          <div className="smp-about-img" aria-hidden="true">
            <div className="smp-uc-container smp-uc-container--fill">
              <p className="smp-bio">
                🚧 This section is under reconstruction.
              </p>
              <p className="smp-bio">
                Rive Canvas Coming Soon
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* --- Footer / Contact --- */}
      <footer id="contact" className="smp-footer">
        <h2 className="smp-footer-heading">Let's Talk</h2>
        <nav aria-label="Footer navigation" className="smp-footer-links">
          <a href="mailto:smpapagayo@gmail.com">email</a>
          <a href="https://www.linkedin.com/in/smpapagayo" target="_blank" rel="noreferrer">linkedin</a>
          <a href="https://www.instagram.com/smpapagayo" target="_blank" rel="noreferrer">instagram</a>
          <a href="https://github.com/smpapagayo" target="_blank" rel="noreferrer">github</a>
        </nav>
      </footer>

      {/* Global Transition Block */}
      <div className="page-transition"></div>
    </div >
  );
}

function ResponsiveHeroRive({ isMobile }) {
  const { RiveComponent } = useRive({
    src: isMobile ? '/smp-hero-400px.riv' : '/smp-hero-1200px.riv',
    stateMachines: "smp-hero Animation",
    autoplay: true,
    autoBind: true,
    isTouchScrollEnabled: true,
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.Center,
    }),
  });
  return <RiveComponent style={{ touchAction: "pan-y" }} />;
}
