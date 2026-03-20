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

const ProjectDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find((p) => p.id === id);
  const currentIndex = projects.findIndex((p) => p.id === id);
  const total = projects.length;
  const prevIndex = (currentIndex - 1 + total) % total;
  const nextIndex = (currentIndex + 1) % total;

  const prevProject = projects[prevIndex];
  const nextProject = projects[nextIndex];
  const location = useLocation();


  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" }); // o "smooth"
  }, [location.pathname]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!project) {
        navigate("/projects");
        return;
      }
      const tl = gsap.timeline();

      tl.fromTo(
        ".intro__title",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
        }
      )
        .fromTo(
          ".intro__back",
          { opacity: 0, x: 30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.2,
            ease: "power2.out",
          }
        )
        .fromTo(
          ".intro__scroll",
          { opacity: 0, y: -30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.2,
            ease: "power2.out",
          }
        )
        .fromTo(
          ".roles",
          { opacity: 0, x: 30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.1,
            ease: "power2.out",
          }
        );
    });

    return () => ctx.revert();
  }, [project, navigate]);

  useEffect(() => {
    const frame = document.querySelector(".grid-intro");
    if (!frame) return;

    const title = frame.querySelector(".intro__title");
    if (!title) return;

    gsap
      .timeline({
        scrollTrigger: {
          trigger: frame,
          start: "center center",
          end: "+=80%",
          scrub: true,
        },
      })
      .fromTo(
        title,
        { color: "#F7F9FF" },
        {
          color: "#2D344E",
          ease: "sine.out",
        },
        0
      );
  }, []);


  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!project?.images?.length) return;

      const grid = document.querySelector(".grid-1");
      if (!grid) return;

      const gridImages = grid.querySelectorAll(".grid-1-img");

      try {
        gsap.from(".problem", {
          opacity: 0,
          x: 100,
          duration: 0.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".problem",
            start: "top 80%",
            end: "bottom 50%",
            scrub: true,
          },
        });

        gsap
          .timeline({
            defaults: { ease: "power3" },
            scrollTrigger: {
              trigger: grid,
              start: "top 30%",
              end: "bottom 90%",
              scrub: true,
            },
          })
          .from(gridImages, {
            stagger: 0.06,
            y: 600,
            transformOrigin: "50% 0%",
          });

        gsap.from(".solution", {
          opacity: 0,
          x: 100,
          duration: 0.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".solution",
            start: "top 80%",
            end: "bottom 50%",
            scrub: true,
          },
        });

        gsap.from(".solution-2", {
          opacity: 0,
          x: 100,
          duration: 0.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".solution-2",
            start: "top 80%",
            end: "bottom 50%",
            scrub: true,
          },
        });

        gsap.from(".solution-3", {
          opacity: 0,
          x: 100,
          duration: 0.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".solution-3",
            start: "top 80%",
            end: "bottom 50%",
            scrub: true,
          },
        });

        gsap.from(".timeframe", {
          opacity: 0,
          x: -100,
          duration: 0.4,
          ease: "power2.out",
        });

        gsap.from(".tools", {
          opacity: 0,
          x: -100,
          duration: 0.4,
          ease: "power2.out",
        });
      } catch (e) {
        console.error("GSAP error:", e);
      }
    });

    return () => ctx.revert();
  }, [project]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const images = document.querySelectorAll(".grid-2-img");
      if (images.length === 0) return;

      // Evalúa si las imágenes están en la misma fila
      const isRowLayout = () => {
        if (images.length < 2) return false;
        const top1 = images[0].getBoundingClientRect().top;
        const top2 = images[1].getBoundingClientRect().top;
        return Math.abs(top1 - top2) < 5; // tolerancia por layout shift
      };

      if (isRowLayout()) {
        // Desktop layout: animación en grupo
        gsap.from(images, {
          x: -300,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: ".grid-2",
            start: "top 80%",
            end: "bottom 90%",
            scrub: true,
          },
        });
      } else {
        // Mobile layout: animación individual
        images.forEach((img) => {
          gsap.from(img, {
            x: -300,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: img,
              start: "top 80%",
              end: "bottom 50%",
              scrub: true,
            },
          });
        });
      }
    });

    return () => ctx.revert(); // Limpieza segura al desmontar
  }, []);

  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  if (!project) return null;

  return (
    <main className="project-detail">
      <section className="grid-intro">
        <h1 className="intro__title">{project.title}</h1>
        <p className="intro__scroll">Scroll down ↓</p>
        <nav className="intro__back">
          <a onClick={() => navigate("/home")}>← Back to Projects</a>
        </nav>
        <div className="info roles">
          <span>Roles:</span>
          <p>{project.roles}</p>
        </div>
      </section>

      <section className="grid-1">
        <div className="info problem">
          <span>{project.problem?.[0]}</span>
          <p>{project.problem?.[1]}</p>
        </div>
        <div
          className="grid-img grid-1-img"
          style={{
            backgroundImage: project?.images?.[0]
              ? `url(${project.images[6]})`
              : "none",
          }}
        ></div>
        <div
          className="grid-img grid-1-img"
          style={{
            backgroundImage: project?.images?.[0]
              ? `url(${project.images[5]})`
              : "none",
          }}
        ></div>
        <div
          className="grid-img grid-1-img"
          style={{
            backgroundImage: project?.images?.[0]
              ? `url(${project.images[4]})`
              : "none",
          }}
        ></div>
        <div
          className="grid-img grid-1-img"
          style={{
            backgroundImage: project?.images?.[0]
              ? `url(${project.images[3]})`
              : "none",
          }}
        ></div>
        <div
          className="grid-img grid-1-img"
          style={{
            backgroundImage: project?.images?.[0]
              ? `url(${project.images[2]})`
              : "none",
          }}
        ></div>

        <div className="info solution">
          <span>{project.solution?.[0]}</span>
          <p>{project.solution?.[1]}</p>
          <p></p>
          <p>{project.solution?.[2]}</p>
        </div>
      </section>

      <section className="grid-2">
        <div
          className="grid-img grid-2-img"
          style={{
            backgroundImage: project?.images?.[0]
              ? `url(${project.images[7]})`
              : "none",
          }}
        ></div>
        <div
          className="grid-img grid-2-img"
          style={{
            backgroundImage: project?.images?.[0]
              ? `url(${project.images[8]})`
              : "none",
          }}
        ></div>
        <div
          className="grid-img grid-2-img"
          style={{
            backgroundImage: project?.images?.[0]
              ? `url(${project.images[9]})`
              : "none",
          }}
        ></div>
        <div
          className="grid-img grid-2-img"
          style={{
            backgroundImage: project?.images?.[0]
              ? `url(${project.images[10]})`
              : "none",
          }}
        ></div>
        <div
          className="grid-img grid-2-img"
          style={{
            backgroundImage: project?.images?.[0]
              ? `url(${project.images[11]})`
              : "none",
          }}
        ></div>

        <div className="info solution-2">
          <p>{project.solution?.[3]}</p>
        </div>
        <div className="info solution-3">
          <p>{project.solution?.[4]}</p>
        </div>

        <div className="info timeframe">
          <span>Timeframe:</span>
          <p>{project.timeframe}</p>
        </div>

        <div className="info tools">
          <span>Tools:</span>
          <p>{project.tools}</p>
        </div>
      </section>

      {project.index === 0 && <MagazineEmbed />}
      {project.index === 1 && (
        <ProjectVideo1 src="/videos/project-content-2.mp4" />
      )}
      {project.index === 5 && (
        <ProjectVideo2 src="/videos/the_horse.mp4" />
      )}
      {project.index === 5 && (
        <ProjectVideo3 src="/videos/Sergio_MP_Text.mp4" />
      )}
      {project.index === 5 && (
        <ProjectVideo4 src="/videos/colombia_land_birds.mp4" />
      )}

      <footer className="footer info">
        {prevProject ? (

          <a onClick={() => navigate(`/projects/${prevProject.id}`)}>
            ← {prevProject.title}
          </a>
        ) : (
          <span></span>
        )}

        <span>
          <a onClick={() => navigate("/home")}>↑ Back to Projects</a>
        </span>

        {nextProject ? (
          <a onClick={() => navigate(`/projects/${nextProject.id}`)}>{nextProject.title} →</a>

        ) : (
          <span></span>
        )}
      </footer>
    </main>
  );




};

export default ProjectDetailPage;
