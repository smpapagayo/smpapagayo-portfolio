import React, { useLayoutEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { projects } from "../scripts/projects";
import useIsMobile from "../hooks/useIsMobile";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import MagazineEmbed from "../components/MagazineEmbed";
import ProjectVideo1 from "../components/ProjectVideo1";
import ProjectVideo2 from "../components/ProjectVideo2";
import ProjectVideo3 from "../components/ProjectVideo3";
import ProjectVideo4 from "../components/ProjectVideo4";

gsap.registerPlugin(ScrollTrigger);

const ProjectPage2 = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const project = projects.find((p) => p.id === id);
  const isMobile = useIsMobile();

  // Select the appropriate hero video source based on screen width/orientation
  let heroVideoSrc = "";
  if (project?.heroVideo) {
    if (typeof project.heroVideo === "object") {
      heroVideoSrc = isMobile
        ? (project.heroVideo.vertical || project.heroVideo.horizontal || "")
        : (project.heroVideo.horizontal || project.heroVideo.vertical || "");
    } else if (typeof project.heroVideo === "string") {
      heroVideoSrc = project.heroVideo;
    }
  }

  const currentIndex = projects.findIndex((p) => p.id === id);
  const total = projects.length;
  const prevProject = projects[(currentIndex - 1 + total) % total];
  const nextProject = projects[(currentIndex + 1) % total];

  const solutionParagraphs = project?.solution ? project.solution.slice(1).filter(p => p.trim() !== "") : [];
  const halfLength = Math.ceil(solutionParagraphs.length / 2);
  const firstHalfSolution = solutionParagraphs.slice(0, halfLength);
  const secondHalfSolution = solutionParagraphs.slice(halfLength);

  const stripImages = project?.images ? project.images.slice(5, 8).filter(Boolean) : [];
  const galleryImages = project?.images ? project.images.slice(9).filter(Boolean) : [];

  useLayoutEffect(() => {
    // Forcing an 'instant' scroll synchronously before the next frame is painted
    // ensures GSAP ScrollTriggers calculate their offsets perfectly from the top.
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [location.pathname]);

  useLayoutEffect(() => {
    // Kill any lingering ScrollTriggers from a previous page before setting up new ones
    ScrollTrigger.getAll().forEach((t) => t.kill());

    if (!project) {
      navigate("/home");
      return;
    }

    const splits = [];

    const ctx = gsap.context(() => {

      const showcaseSplit = new SplitType(".project-showcase__body", { types: "lines" });
      const solutionSplit = new SplitType(".project-solution__body", { types: "lines" });
      const continueSplit = new SplitType(".project-continue__body", { types: "lines" });
      splits.push(showcaseSplit, solutionSplit, continueSplit);

      // ── Hero entrance ──────────────────────────────────────
      const tl = gsap.timeline({ delay: 0.05 });

      tl.fromTo(
        ".project-hero__bg",
        { scale: 1.08 },
        { scale: 1, duration: 1.6, ease: "power3.out" },
        0
      )
        .fromTo(
          ".project-nav",
          { opacity: 0, y: -16 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          0.4
        )
        .fromTo(
          ".project-intro__num",
          { opacity: 0 },
          { opacity: 1, duration: 0.5, ease: "power2.out" },
          0.5
        )
        // Title reveal: slides up from behind overflow-hidden wrapper
        .fromTo(
          ".project-intro__title-inner",
          { yPercent: 110 },
          { yPercent: 0, duration: 1.1, ease: "power4.out" },
          0.55
        )
        .fromTo(
          ".project-intro__category",
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          1.3
        )
        .fromTo(
          ".project-intro__scroll",
          { opacity: 0 },
          { opacity: 1, duration: 0.4 },
          1.5
        );

      // ── Problem section ────────────────────────────────────
      gsap.fromTo(
        ".project-showcase__heading-inner",
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".project-showcase",
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        showcaseSplit.lines,
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: ".project-showcase__body",
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".project-showcase__img",
        { scale: 1.08, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".project-showcase__img",
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // ── Full-width image parallax ──────────────────────────
      if (document.querySelector(".project-full")) {
        gsap.fromTo(
          ".project-full__img",
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: ".project-full",
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }

      // ── Solution section ───────────────────────────────────
      if (document.querySelector(".project-solution")) {
        gsap.fromTo(
          ".project-solution__heading-inner",
          { yPercent: 110 },
          {
            yPercent: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".project-solution",
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );

        if (solutionSplit.lines?.length > 0) {
          gsap.fromTo(
            solutionSplit.lines,
            { opacity: 0, y: 36 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
              stagger: 0.08,
              scrollTrigger: {
                trigger: ".project-solution__text",
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        if (document.querySelector(".project-solution__img")) {
          gsap.fromTo(
            ".project-solution__img",
            { scale: 1.08, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 1.1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: ".project-solution__img",
                start: "top 82%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      }

      // ── Image strip stagger ────────────────────────────────
      if (document.querySelector(".project-strip")) {
        gsap.fromTo(
          ".project-strip__img",
          { y: 70, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.14,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".project-strip",
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // ── Continue section ───────────────────────────────────
      if (document.querySelector(".project-continue")) {
        if (continueSplit.lines?.length > 0) {
          gsap.fromTo(
            continueSplit.lines,
            { opacity: 0, x: -50 },
            {
              opacity: 1,
              x: 0,
              stagger: 0.08,
              duration: 0.9,
              ease: "power2.out",
              scrollTrigger: {
                trigger: ".project-continue",
                start: "top 75%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        if (document.querySelector(".project-continue__img")) {
          gsap.fromTo(
            ".project-continue__img",
            { scale: 1.06, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 1.1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: ".project-continue__img",
                start: "top 82%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      }

      // ── Final gallery ──────────────────────────────────────
      if (document.querySelector(".project-gallery")) {
        gsap.fromTo(
          ".project-gallery__img",
          { y: 90, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".project-gallery",
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // ── Footer ─────────────────────────────────────────────
      gsap.fromTo(
        ".project-footer",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".project-footer",
            start: "top 92%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      splits.forEach((s) => s.revert());
    };
  }, [project, navigate]);

  if (!project) return null;

  return (
    <main key={project.id} className="project-detail">

      {/* ── Intro ─────────────────────────────────────────── */}
      <section className="project-intro">
        <div
          className="project-intro__bg"
          style={{
            backgroundImage: project.images?.[1]
              ? `url(${project.images[1]})`
              : "none",
          }}
        />
        <div className="project-intro__overlay" />

        <nav className="project-nav">
          <a onClick={() => navigate("/home")}>← Back</a>
        </nav>

        <span className="project-intro__num">Project {project.num} / {project.year}</span>

        <div className="project-intro__title-wrap">
          <h1 className="project-intro__title-inner">{project.title}</h1>
        </div>

        <div className="project-intro__bottom">
          <p className="project-intro__category">{project.category}</p>
          <p className="project-intro__scroll">[scroll ↓]</p>
        </div>
      </section>

      {/* ── Showcase ──────────────────────────────────────── */}
      <section className="project-showcase">
        <div className="project-showcase__text">
          <div className="project-showcase__heading-wrap">
            <h2 className="project-showcase__heading-inner">Problem</h2>
          </div>
          <p className="project-showcase__body">{project.problem?.[0]}</p>
          <div className="project-showcase__heading-wrap">
            <h2 className="project-showcase__heading-inner">Solution</h2>
          </div>
          <p className="project-showcase__body">{project.solution?.[0]}</p>
        </div>
        <div
          className="project-showcase__img"
          style={{
            backgroundImage: project.images?.[2]
              ? `url(${project.images[2]})`
              : "none",
          }}
        />
      </section>

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="project-hero">
        {heroVideoSrc ? (
          heroVideoSrc.includes("iframe") || heroVideoSrc.includes("videodelivery.net") ? (
            <iframe
              className="project-hero__bg"
              src={
                heroVideoSrc.includes("?")
                  ? `${heroVideoSrc}&autoplay=true&loop=true&muted=true&controls=false`
                  : `${heroVideoSrc}?autoplay=true&loop=true&muted=true&controls=false`
              }
              allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
              allowFullScreen
            />
          ) : (
            <video
              key={heroVideoSrc}
              className="project-hero__bg"
              src={heroVideoSrc}
              autoPlay
              loop
              muted
              playsInline
            />
          )
        ) : (
          <div
            className="project-hero__bg"
            style={{
              backgroundImage: project?.images?.[1]
                ? `url(${project.images[1]})`
                : "none",
            }}
          />
        )}
      </section>

      {/* ── Solution ─────────────────────────────────────── */}
      <section className="project-solution">
        <div className="project-solution__text">
          <p className="project-solution__body">{project.solution?.[1]}</p>
        </div>
        <div
          className="project-solution__img"
          style={{
            backgroundImage: project.images?.[3]
              ? `url(${project.images[3]})`
              : "none",
          }}
        />
      </section>

      {/* {(firstHalfSolution.length > 0 || project.images?.[4]) && (
        <section className="project-solution">
          {project.images?.[4] && (
            <div
              className="project-solution__img"
              style={{
                backgroundImage: `url(${project.images[4]})`,
              }}
            />
          )}
          <div className="project-solution__text">
            <div className="project-solution__heading-wrap">
              <h2 className="project-solution__heading-inner">{project.solution?.[3] || "Solution"}</h2>
            </div>
            {firstHalfSolution.map((text, idx) => (
              <p key={idx} className="project-solution__body">{text}</p>
            ))}
          </div>
        </section>
      )} */}

      {/* ── Full-width image ──────────────────────────────── */}
      {
        project.images?.[3] && (
          <section className="project-full">
            <div
              className="project-full__img"
              style={{
                backgroundImage: `url(${project.images[3]})`,
              }}
            />
          </section>
        )
      }

      {/* ── Image strip ──────────────────────────────────── */}
      {
        stripImages.length > 0 && (
          <section className="project-strip">
            {stripImages.map((img, idx) => (
              <div
                key={idx}
                className="project-strip__img"
                style={{
                  backgroundImage: `url(${img})`,
                }}
              />
            ))}
          </section>
        )
      }

      {/* ── Continue ─────────────────────────────────────── */}
      {
        (secondHalfSolution.length > 0 || project.images?.[8]) && (
          <section className="project-continue">
            {secondHalfSolution.length > 0 && (
              <div className="project-continue__text">
                {secondHalfSolution.map((text, idx) => (
                  <p key={idx} className="project-continue__body">{text}</p>
                ))}
              </div>
            )}
            {project.images?.[8] && (
              <div
                className="project-continue__img"
                style={{
                  backgroundImage: `url(${project.images[8]})`,
                }}
              />
            )}
          </section>
        )
      }

      {/* ── Final gallery ─────────────────────────────────── */}
      {
        galleryImages.length > 0 && (
          <section className="project-gallery">
            {galleryImages.map((img, i) => (
              <div
                key={i}
                className={`project-gallery__img project-gallery__img--${(i % 4) + 1}`}
                style={{
                  backgroundImage: `url(${img})`,
                }}
              />
            ))}
          </section>
        )
      }

      {/* ── Media embeds ─────────────────────────────────── */}
      {project.index === 0 && <MagazineEmbed />}
      {project.index === 1 && <ProjectVideo1 src="/videos/project-content-2.mp4" />}
      {project.index === 5 && <ProjectVideo2 src="/videos/the_horse.mp4" />}
      {project.index === 5 && <ProjectVideo3 src="/videos/Sergio_MP_Text.mp4" />}
      {project.index === 5 && <ProjectVideo4 src="/videos/colombia_land_birds.mp4" />}

      {/* ── Footer nav ───────────────────────────────────── */}
      <footer className="project-footer">
        {prevProject ? (
          <button className="project-footer__link" onClick={() => navigate(`/home/${prevProject.id}`)}>
            <span className="project-footer__title">{prevProject.title}</span>
            <span className="project-footer__label">[&larr; previous]</span>
          </button>
        ) : <div />}

        {nextProject ? (
          <button className="project-footer__link" onClick={() => navigate(`/home/${nextProject.id}`)}>
            <span className="project-footer__title">{nextProject.title}</span>
            <span className="project-footer__label">[next &rarr;]</span>
          </button>
        ) : <div />}
      </footer>
    </main >
  );
};

export default ProjectPage2;
