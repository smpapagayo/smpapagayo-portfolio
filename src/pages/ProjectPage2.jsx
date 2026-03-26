import React, { useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { projects } from "../scripts/projects";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
  const currentIndex = projects.findIndex((p) => p.id === id);
  const total = projects.length;
  const prevProject = projects[(currentIndex - 1 + total) % total];
  const nextProject = projects[(currentIndex + 1) % total];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location.pathname]);

  useEffect(() => {
    if (!project) {
      navigate("/home");
      return;
    }

    const ctx = gsap.context(() => {
      // ── Hero entrance ──────────────────────────────────────
      const tl = gsap.timeline({ delay: 0.05 });

      tl.fromTo(
        ".p2-hero__bg",
        { scale: 1.08 },
        { scale: 1, duration: 1.6, ease: "power3.out" },
        0
      )
        .fromTo(
          ".p2-nav",
          { opacity: 0, y: -16 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          0.4
        )
        .fromTo(
          ".p2-hero__num",
          { opacity: 0 },
          { opacity: 1, duration: 0.5, ease: "power2.out" },
          0.5
        )
        // Title reveal: slides up from behind overflow-hidden wrapper
        .fromTo(
          ".p2-hero__title-inner",
          { yPercent: 110 },
          { yPercent: 0, duration: 1.1, ease: "power4.out" },
          0.55
        )
        .fromTo(
          ".p2-hero__category",
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          1.3
        )
        .fromTo(
          ".p2-hero__scroll",
          { opacity: 0 },
          { opacity: 1, duration: 0.4 },
          1.5
        );

      // ── Meta bar ───────────────────────────────────────────
      gsap.fromTo(
        ".p2-meta__item",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".p2-meta",
            start: "top 85%",
          },
        }
      );

      gsap.fromTo(
        ".p2-meta__line",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.8,
          ease: "power2.out",
          transformOrigin: "left",
          scrollTrigger: {
            trigger: ".p2-meta",
            start: "top 85%",
          },
        }
      );

      // ── Problem section ────────────────────────────────────
      gsap.fromTo(
        ".p2-problem__heading-inner",
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".p2-problem",
            start: "top 75%",
          },
        }
      );

      gsap.fromTo(
        ".p2-problem__body",
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".p2-problem__body",
            start: "top 82%",
          },
        }
      );

      gsap.fromTo(
        ".p2-problem__img",
        { scale: 1.08, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".p2-problem__img",
            start: "top 82%",
          },
        }
      );

      // ── Full-width image parallax ──────────────────────────
      gsap.fromTo(
        ".p2-full__img",
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: ".p2-full",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );

      // ── Solution section ───────────────────────────────────
      gsap.fromTo(
        ".p2-solution__heading-inner",
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".p2-solution",
            start: "top 75%",
          },
        }
      );

      gsap.fromTo(
        ".p2-solution__body",
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: ".p2-solution__text",
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".p2-solution__img",
        { scale: 1.08, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".p2-solution__img",
            start: "top 82%",
          },
        }
      );

      // ── Image strip stagger ────────────────────────────────
      gsap.fromTo(
        ".p2-strip__img",
        { y: 70, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.14,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".p2-strip",
            start: "top 80%",
          },
        }
      );

      // ── Continue section ───────────────────────────────────
      gsap.fromTo(
        ".p2-continue__body",
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.2,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".p2-continue",
            start: "top 75%",
          },
        }
      );

      gsap.fromTo(
        ".p2-continue__img",
        { scale: 1.06, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".p2-continue__img",
            start: "top 82%",
          },
        }
      );

      // ── Final gallery ──────────────────────────────────────
      gsap.fromTo(
        ".p2-gallery__img",
        { y: 90, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".p2-gallery",
            start: "top 82%",
          },
        }
      );

      // ── Footer ─────────────────────────────────────────────
      gsap.fromTo(
        ".p2-footer",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".p2-footer",
            start: "top 92%",
          },
        }
      );
    });

    return () => ctx.revert();
  }, [project, navigate]);

  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  if (!project) return null;

  return (
    <main className="p2-detail">

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="p2-hero">
        <div
          className="p2-hero__bg"
          style={{
            backgroundImage: project.images?.[0]
              ? `url(${project.images[0]})`
              : "none",
          }}
        />
        <div className="p2-hero__overlay" />

        <nav className="p2-nav">
          <a onClick={() => navigate("/home")}>← Back</a>
        </nav>

        <span className="p2-hero__num">{project.num}</span>

        <div className="p2-hero__title-wrap">
          <h1 className="p2-hero__title-inner">{project.title}</h1>
        </div>

        <div className="p2-hero__bottom">
          <p className="p2-hero__category">{project.category}</p>
          <p className="p2-hero__scroll">[Scroll ↓]</p>
        </div>
      </section>

      {/* ── Meta bar ─────────────────────────────────────── */}
      <section className="p2-meta">
        <div className="p2-meta__line" />
        <div className="p2-meta__items">
          <div className="p2-meta__item">
            <span className="p2-meta__label">Roles</span>
            <p className="p2-meta__value">{project.roles}</p>
          </div>
          <div className="p2-meta__item">
            <span className="p2-meta__label">Timeframe</span>
            <p className="p2-meta__value">{project.timeframe}</p>
          </div>
          <div className="p2-meta__item">
            <span className="p2-meta__label">Tools</span>
            <p className="p2-meta__value">{project.tools}</p>
          </div>
          <div className="p2-meta__item p2-meta__item--right">
            <span className="p2-meta__label">Project</span>
            <p className="p2-meta__value">
              {project.num} / 0{total}
            </p>
          </div>
        </div>
        <div className="p2-meta__line" />
      </section>

      {/* ── Problem ──────────────────────────────────────── */}
      <section className="p2-problem">
        <div className="p2-problem__text">
          <div className="p2-problem__heading-wrap">
            <h2 className="p2-problem__heading-inner">{project.problem?.[0]}</h2>
          </div>
          <p className="p2-problem__body">{project.problem?.[1]}</p>
        </div>
        <div
          className="p2-problem__img"
          style={{
            backgroundImage: project.images?.[1]
              ? `url(${project.images[1]})`
              : "none",
          }}
        />
      </section>

      {/* ── Full-width image ──────────────────────────────── */}
      <section className="p2-full">
        <div
          className="p2-full__img"
          style={{
            backgroundImage: project.images?.[2]
              ? `url(${project.images[2]})`
              : "none",
          }}
        />
      </section>

      {/* ── Solution ─────────────────────────────────────── */}
      <section className="p2-solution">
        <div
          className="p2-solution__img"
          style={{
            backgroundImage: project.images?.[3]
              ? `url(${project.images[3]})`
              : "none",
          }}
        />
        <div className="p2-solution__text">
          <div className="p2-solution__heading-wrap">
            <h2 className="p2-solution__heading-inner">{project.solution?.[0]}</h2>
          </div>
          <p className="p2-solution__body">{project.solution?.[1]}</p>
          <p className="p2-solution__body">{project.solution?.[2]}</p>
        </div>
      </section>

      {/* ── Image strip ──────────────────────────────────── */}
      <section className="p2-strip">
        {[4, 5, 6].map((imgIdx) => (
          <div
            key={imgIdx}
            className="p2-strip__img"
            style={{
              backgroundImage: project.images?.[imgIdx]
                ? `url(${project.images[imgIdx]})`
                : "none",
            }}
          />
        ))}
      </section>

      {/* ── Continue ─────────────────────────────────────── */}
      <section className="p2-continue">
        <div className="p2-continue__text">
          <p className="p2-continue__body">{project.solution?.[3]}</p>
          <p className="p2-continue__body">{project.solution?.[4]}</p>
        </div>
        <div
          className="p2-continue__img"
          style={{
            backgroundImage: project.images?.[7]
              ? `url(${project.images[7]})`
              : "none",
          }}
        />
      </section>

      {/* ── Final gallery ─────────────────────────────────── */}
      <section className="p2-gallery">
        {[8, 9, 10, 11].map((imgIdx, i) => (
          <div
            key={imgIdx}
            className={`p2-gallery__img p2-gallery__img--${i + 1}`}
            style={{
              backgroundImage: project.images?.[imgIdx]
                ? `url(${project.images[imgIdx]})`
                : "none",
            }}
          />
        ))}
      </section>

      {/* ── Media embeds ─────────────────────────────────── */}
      {project.index === 0 && <MagazineEmbed />}
      {project.index === 1 && <ProjectVideo1 src="/videos/project-content-2.mp4" />}
      {project.index === 5 && <ProjectVideo2 src="/videos/the_horse.mp4" />}
      {project.index === 5 && <ProjectVideo3 src="/videos/Sergio_MP_Text.mp4" />}
      {project.index === 5 && <ProjectVideo4 src="/videos/colombia_land_birds.mp4" />}

      {/* ── Footer nav ───────────────────────────────────── */}
      <footer className="p2-footer">
        {prevProject ? (
          <button className="p2-footer__link" onClick={() => navigate(`/project2/${prevProject.id}`)}>
            <span className="p2-footer__label">Previous</span>
            <span className="p2-footer__title">{prevProject.title}</span>
          </button>
        ) : <div />}
        
        {nextProject ? (
          <button className="p2-footer__link p2-footer__link--next" onClick={() => navigate(`/project2/${nextProject.id}`)}>
            <span className="p2-footer__label">Next</span>
            <span className="p2-footer__title">{nextProject.title}</span>
          </button>
        ) : <div />}
      </footer>
    </main>
  );
};

export default ProjectPage2;
