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
          ".project-hero__num",
          { opacity: 0 },
          { opacity: 1, duration: 0.5, ease: "power2.out" },
          0.5
        )
        // Title reveal: slides up from behind overflow-hidden wrapper
        .fromTo(
          ".project-hero__title-inner",
          { yPercent: 110 },
          { yPercent: 0, duration: 1.1, ease: "power4.out" },
          0.55
        )
        .fromTo(
          ".project-hero__category",
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          1.3
        )
        .fromTo(
          ".project-hero__scroll",
          { opacity: 0 },
          { opacity: 1, duration: 0.4 },
          1.5
        );

      // ── Meta bar ───────────────────────────────────────────
      gsap.fromTo(
        ".project-meta__item",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".project-meta",
            start: "top 85%",
          },
        }
      );

      gsap.fromTo(
        ".project-meta__line",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.8,
          ease: "power2.out",
          transformOrigin: "left",
          scrollTrigger: {
            trigger: ".project-meta",
            start: "top 85%",
          },
        }
      );

      // ── Problem section ────────────────────────────────────
      gsap.fromTo(
        ".project-problem__heading-inner",
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".project-problem",
            start: "top 75%",
          },
        }
      );

      gsap.fromTo(
        ".project-problem__body",
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".project-problem__body",
            start: "top 82%",
          },
        }
      );

      gsap.fromTo(
        ".project-problem__img",
        { scale: 1.08, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".project-problem__img",
            start: "top 82%",
          },
        }
      );

      // ── Full-width image parallax ──────────────────────────
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

      // ── Solution section ───────────────────────────────────
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
          },
        }
      );

      gsap.fromTo(
        ".project-solution__body",
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: ".project-solution__text",
            start: "top 80%",
          },
        }
      );

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
          },
        }
      );

      // ── Image strip stagger ────────────────────────────────
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
          },
        }
      );

      // ── Continue section ───────────────────────────────────
      gsap.fromTo(
        ".project-continue__body",
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.2,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".project-continue",
            start: "top 75%",
          },
        }
      );

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
          },
        }
      );

      // ── Final gallery ──────────────────────────────────────
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
          },
        }
      );

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
    <main className="project-detail">

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="project-hero">
        <div
          className="project-hero__bg"
          style={{
            backgroundImage: project.images?.[0]
              ? `url(${project.images[0]})`
              : "none",
          }}
        />
        <div className="project-hero__overlay" />

        <nav className="project-nav">
          <a onClick={() => navigate("/home")}>← Back</a>
        </nav>

        <span className="project-hero__num">{project.num}</span>

        <div className="project-hero__title-wrap">
          <h1 className="project-hero__title-inner">{project.title}</h1>
        </div>

        <div className="project-hero__bottom">
          <p className="project-hero__category">{project.category}</p>
          <p className="project-hero__scroll">[Scroll ↓]</p>
        </div>
      </section>

      {/* ── Meta bar ─────────────────────────────────────── */}
      <section className="project-meta">
        <div className="project-meta__line" />
        <div className="project-meta__items">
          <div className="project-meta__item">
            <span className="project-meta__label">Roles</span>
            <p className="project-meta__value">{project.roles}</p>
          </div>
          <div className="project-meta__item">
            <span className="project-meta__label">Timeframe</span>
            <p className="project-meta__value">{project.timeframe}</p>
          </div>
          <div className="project-meta__item">
            <span className="project-meta__label">Tools</span>
            <p className="project-meta__value">{project.tools}</p>
          </div>
          <div className="project-meta__item project-meta__item--right">
            <span className="project-meta__label">Project</span>
            <p className="project-meta__value">
              {project.num} / 0{total}
            </p>
          </div>
        </div>
        <div className="project-meta__line" />
      </section>

      {/* ── Problem ──────────────────────────────────────── */}
      <section className="project-problem">
        <div className="project-problem__text">
          <div className="project-problem__heading-wrap">
            <h2 className="project-problem__heading-inner">{project.problem?.[0]}</h2>
          </div>
          <p className="project-problem__body">{project.problem?.[1]}</p>
        </div>
        <div
          className="project-problem__img"
          style={{
            backgroundImage: project.images?.[1]
              ? `url(${project.images[1]})`
              : "none",
          }}
        />
      </section>

      {/* ── Full-width image ──────────────────────────────── */}
      <section className="project-full">
        <div
          className="project-full__img"
          style={{
            backgroundImage: project.images?.[2]
              ? `url(${project.images[2]})`
              : "none",
          }}
        />
      </section>

      {/* ── Solution ─────────────────────────────────────── */}
      <section className="project-solution">
        <div
          className="project-solution__img"
          style={{
            backgroundImage: project.images?.[3]
              ? `url(${project.images[3]})`
              : "none",
          }}
        />
        <div className="project-solution__text">
          <div className="project-solution__heading-wrap">
            <h2 className="project-solution__heading-inner">{project.solution?.[0]}</h2>
          </div>
          <p className="project-solution__body">{project.solution?.[1]}</p>
          <p className="project-solution__body">{project.solution?.[2]}</p>
        </div>
      </section>

      {/* ── Image strip ──────────────────────────────────── */}
      <section className="project-strip">
        {[4, 5, 6].map((imgIdx) => (
          <div
            key={imgIdx}
            className="project-strip__img"
            style={{
              backgroundImage: project.images?.[imgIdx]
                ? `url(${project.images[imgIdx]})`
                : "none",
            }}
          />
        ))}
      </section>

      {/* ── Continue ─────────────────────────────────────── */}
      <section className="project-continue">
        <div className="project-continue__text">
          <p className="project-continue__body">{project.solution?.[3]}</p>
          <p className="project-continue__body">{project.solution?.[4]}</p>
        </div>
        <div
          className="project-continue__img"
          style={{
            backgroundImage: project.images?.[7]
              ? `url(${project.images[7]})`
              : "none",
          }}
        />
      </section>

      {/* ── Final gallery ─────────────────────────────────── */}
      <section className="project-gallery">
        {[8, 9, 10, 11].map((imgIdx, i) => (
          <div
            key={imgIdx}
            className={`project-gallery__img project-gallery__img--${i + 1}`}
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
      <footer className="project-footer">
        {prevProject ? (
          <button className="project-footer__link" onClick={() => navigate(`/home/${prevProject.id}`)}>
            <span className="project-footer__label">Previous</span>
            <span className="project-footer__title">{prevProject.title}</span>
          </button>
        ) : <div />}

        {nextProject ? (
          <button className="project-footer__link project-footer__link--next" onClick={() => navigate(`/home/${nextProject.id}`)}>
            <span className="project-footer__label">Next</span>
            <span className="project-footer__title">{nextProject.title}</span>
          </button>
        ) : <div />}
      </footer>
    </main>
  );
};

export default ProjectPage2;
