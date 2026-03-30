import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { DrawSVGPlugin, ScrollTrigger, SplitText } from "gsap/all";
import { projects } from "../scripts/projects";
import useIsMobile from "../hooks/useIsMobile";

gsap.registerPlugin(DrawSVGPlugin, ScrollTrigger, SplitText);

export default function HomePage() {
  const rootRef = useRef(null);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeProject, setActiveProject] = useState(null);

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
      // 4. PROJECTS LIST ON SCROLL + HOVER EFFECTS
      // ==========================================
      const projectsEl = gsap.utils.toArray(".smp-project");

      // We will define a custom intense cubic-bezier similar to Lando's duration and snap
      const hoverEase = "power4.inOut";

      projectsEl.forEach((proj, index) => {
        const border = proj.querySelector(".smp-proj-border");
        const num = proj.querySelector(".smp-proj-num");
        const title = proj.querySelector(".smp-proj-title");
        const cat = proj.querySelector(".smp-proj-cat");
        const imgWrapper = proj.querySelector(".smp-proj-img");
        const img = proj.querySelector(".smp-proj-img img");

        const numSplit = new SplitText(num, { type: "lines", mask: "lines" });
        const titleSplit = new SplitText(title, { type: "lines", mask: "lines" });
        const catSplit = new SplitText(cat, { type: "lines", mask: "lines" });

        // Scroll entry timeline
        const projTl = gsap.timeline({ paused: true });

        projTl
          .from(border, {
            scaleX: 0,
            transformOrigin: "left",
            duration: 0.6,
            ease: "power3.inOut",
          })
          .from(
            [...numSplit.lines, ...titleSplit.lines, ...catSplit.lines],
            { yPercent: 110, duration: 0.9, stagger: 0.06, ease: "power4.out" },
            "-=0.4"
          );

        const isInitiallyVisible = proj.getBoundingClientRect().top <= window.innerHeight * 0.9;
        let isFirstPlay = true;
        let delayCall = null;

        ScrollTrigger.create({
          trigger: proj,
          start: "top 88%",
          onEnter: () => {
            if (isFirstPlay && isInitiallyVisible) {
              isFirstPlay = false;
              // Wait for initial page enter animations to finish
              delayCall = gsap.delayedCall(1.4 + (index * 0.15), () => projTl.play());
              return;
            }
            isFirstPlay = false;
            projTl.play();
          },
          onLeaveBack: () => {
            if (delayCall) delayCall.kill();
            projTl.reverse();
          }
        });

        // Hover intense timeline
        const hoverTl = gsap.timeline({ paused: true });

        // Ensure values are read fresh on hover by using functional updates if needed,
        // but passing the var() right into GSAP lets the browser handle responsive values dynamically 
        // provided the CSS var is updated correctly on resize.
        hoverTl
          .to(imgWrapper, {
            height: "var(--target-height)",
            marginTop: 12,
            duration: 0.75,
            ease: hoverEase,
          })
          .to(img, {
            clipPath: "inset(0% 0% 0% 0%)",
            scale: 1,
            duration: 0.75,
            ease: hoverEase,
          }, "<")
          .to([title, num], {
            x: 10,
            duration: 0.75,
            ease: "power3.out",
          }, "<0.1");

        // Stash the timeline on the DOM element for access in onMouseEnter
        proj._hoverTl = hoverTl;
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
          <div className="smp-uc-container">
            <div className="smp-hero-inner">
              <h1>SERGIO M PAPAGAYO</h1>
              <p className="smp-bio">
                Hola! I am a graphic designer and engineer. I create visual
                experiences that blend creativity and technology.
              </p>
            </div>
            <div className="smp-uc-badge">
              <span className="smp-uc-icon">🚧</span>
              <span className="smp-uc-text">Rive Canvas Coming Soon</span>
            </div>
          </div>
          <p className="smp-action" aria-hidden="true">[scroll to see my work]</p>
        </section>

        {/* --- Projects Section --- */}
        <section id="work" className="smp-projects" aria-label="Projects">
          {projects.map((p) => (
            <article
              key={p.num}
              className={`smp-project ${activeProject === p.id ? 'is-active' : ''}`}
              id={`project-${p.id}`}
              onClick={(e) => {
                const isTouch = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
                if (isTouch) {
                  if (activeProject !== p.id) {
                    e.preventDefault();

                    // Revert previously active project
                    if (activeProject) {
                      const prevProjectEl = document.getElementById(`project-${activeProject}`);
                      if (prevProjectEl && prevProjectEl._hoverTl) {
                        prevProjectEl._hoverTl.reverse();
                      }
                    }

                    setActiveProject(p.id);
                    const target = e.currentTarget;
                    if (target._hoverTl) target._hoverTl.play();

                    if (window.hoverScrollTimeout) {
                      clearTimeout(window.hoverScrollTimeout);
                    }

                    window.hoverScrollTimeout = setTimeout(() => {
                      const navHeight = window.innerWidth >= 840 ? 100 : 95;
                      const projectRect = target.getBoundingClientRect();

                      // Scroll if the project isn't already positioned right under the navbar
                      if (Math.abs(projectRect.top - navHeight) > 5) {
                        window.scrollTo({
                          top: window.scrollY + projectRect.top - navHeight,
                          behavior: 'smooth'
                        });
                      }
                    }, 750); // match duration of GSAP hover ease
                  } else {
                    navigate(`/home/${p.id}`);
                  }
                } else {
                  navigate(`/home/${p.id}`);
                }
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  navigate(`/home/${p.id}`);
                }
              }}
              onMouseEnter={(e) => {
                const isTouch = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
                if (!isTouch) {
                  const target = e.currentTarget;
                  if (target._hoverTl) target._hoverTl.play();

                  if (window.hoverScrollTimeout) {
                    clearTimeout(window.hoverScrollTimeout);
                  }

                  window.hoverScrollTimeout = setTimeout(() => {
                    const navHeight = window.innerWidth >= 840 ? 100 : 95;
                    const projectRect = target.getBoundingClientRect();

                    // Scroll if the project isn't already positioned right under the navbar
                    if (Math.abs(projectRect.top - navHeight) > 5) {
                      window.scrollTo({
                        top: window.scrollY + projectRect.top - navHeight,
                        behavior: 'smooth'
                      });
                    }
                  }, 750); // match duration of GSAP hover ease
                }
              }}
              onMouseLeave={(e) => {
                const isTouch = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
                if (!isTouch) {
                  const target = e.currentTarget;
                  if (target._hoverTl) target._hoverTl.reverse();

                  if (window.hoverScrollTimeout) {
                    clearTimeout(window.hoverScrollTimeout);
                  }
                }
              }}
            >
              <div className="smp-proj-border" aria-hidden="true" />
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
          <div className="smp-about-img" aria-hidden="true">
            <div className="smp-uc-container smp-uc-container--fill">
              <p className="smp-bio">
                This section is under reconstruction.
              </p>
              <div className="smp-uc-badge">
                <span className="smp-uc-icon">🚧</span>
                <span className="smp-uc-text">Rive Canvas Coming Soon</span>
              </div>
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
    </div>
  );
}
