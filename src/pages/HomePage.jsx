import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { DrawSVGPlugin, ScrollTrigger } from "gsap/all";
import { projects } from "../scripts/projects";
import useIsMobile from "../hooks/useIsMobile";

gsap.registerPlugin(DrawSVGPlugin, ScrollTrigger);

export default function HomePage() {
  const rootRef = useRef(null);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

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
      // 3. HERO ENTRANCE (Title & Intro Text)
      // ==========================================
      // Animates the main heading and bio text sliding up.
      // Tweak 'y' (e.g. 100 for a bigger slide) or 'stagger' to delay each line.
      tl.from(".smp-hero h1, .smp-bio, .smp-action", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
      }, "-=0.6");

      // ==========================================
      // 4. PROJECTS LIST ON SCROLL
      // ==========================================
      // As you scroll down, each project slides up individually.
      const projectsEl = gsap.utils.toArray(".smp-project");
      projectsEl.forEach((proj) => {
        gsap.from(proj, {
          scrollTrigger: {
            trigger: proj,
            start: "top 85%", // Triggers when the top of the project is 85% down the viewport
            toggleActions: "play none none reverse", // Set to "play none none none" to only animate once
          },
          y: 60, // Slide distance
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
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
          <div className="smp-hero-inner">
            <h1>SERGIO M PAPAGAYO</h1>
            <p className="smp-bio">
              Hola! I am a graphic designer and engineer. I create visual
              experiences that blend creativity and technology.
            </p>
          </div>
          <p className="smp-action" aria-hidden="true">[scroll to see my work]</p>
        </section>

        {/* --- Projects Section --- */}
        <section id="work" className="smp-projects" aria-label="Projects">
          {projects.map((p) => (
            <article 
              key={p.num} 
              className="smp-project" 
              onClick={() => navigate(`/home/${p.id}`)}
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
                <img src={p.images[1]} alt={p.title} />
              </div>
            </article>
          ))}
        </section>

        {/* --- About Section --- */}
        <section id="about" className="smp-about" aria-label="About">
          <div className="smp-about-img" aria-hidden="true" />
          <p className="smp-about-text">Body text</p>
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
    </div>
  );
}
