import React, { useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { projects } from "../scripts/projects";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ProjectPage3 = () => {
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
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location.pathname]);

  useEffect(() => {
    if (!project) {
      navigate("/projects");
      return;
    }

    const ctx = gsap.context(() => {
      // Intro animations
      const tl = gsap.timeline();
      tl.fromTo(
        ".p3-hero__title-line span",
        { yPercent: 100 },
        {
          yPercent: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power4.out",
          delay: 0.2
        }
      )
      .fromTo(
        ".p3-hero__meta",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.5"
      )
      .fromTo(
        ".p3-hero__image-inner",
        { scale: 1.1, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.5, ease: "power3.out" },
        "-=0.8"
      );

      // Text reveal on scroll
      gsap.utils.toArray('.p3-reveal-text').forEach((text) => {
        gsap.from(text, {
          scrollTrigger: {
            trigger: text,
            start: "top 85%",
          },
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "power3.out"
        });
      });

      // Parallax images
      gsap.utils.toArray('.p3-parallax-img').forEach((container) => {
        const img = container.querySelector('img');
        if (img) {
          gsap.fromTo(img, 
            { yPercent: -15 },
            {
              yPercent: 15,
              ease: "none",
              scrollTrigger: {
                trigger: container,
                start: "top bottom",
                end: "bottom top",
                scrub: true
              }
            }
          );
        }
      });

      // Background color change on scroll (dynamic feel)
      ScrollTrigger.create({
        trigger: ".p3-solution-section",
        start: "top 50%",
        end: "bottom 50%",
        onEnter: () => gsap.to("body", { backgroundColor: "#111", color: "#F7F9FF", duration: 0.8 }),
        onLeaveBack: () => gsap.to("body", { backgroundColor: "#F7F9FF", color: "#2D344E", duration: 0.8 }),
      });
      
      // Cleanup background color if navigating away
      return () => {
        gsap.to("body", { backgroundColor: "", color: "", duration: 0 });
      }
    });

    return () => ctx.revert();
  }, [project, navigate]);

  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      gsap.to("body", { backgroundColor: "", color: "", duration: 0 });
    };
  }, []);

  if (!project) return null;

  return (
    <main className="project3-detail">
      <nav className="p3-nav p3-reveal-text">
        <button onClick={() => navigate("/home")} className="p3-nav__back">
          ← Back to Projects
        </button>
      </nav>

      <section className="p3-hero">
        <div className="p3-hero__content">
          <div className="p3-hero__category p3-reveal-text">{project.category}</div>
          <h1 className="p3-hero__title">
            <span className="p3-hero__title-line">
              <span>{project.title}</span>
            </span>
          </h1>
          
          <div className="p3-hero__meta">
            <div className="p3-meta-item">
              <span>Roles</span>
              <p>{project.roles}</p>
            </div>
            <div className="p3-meta-item">
              <span>Timeframe</span>
              <p>{project.timeframe}</p>
            </div>
          </div>
        </div>
        
        <div className="p3-hero__image">
          <div className="p3-hero__image-inner" style={{ backgroundImage: project.images?.[0] ? `url(${project.images[0]})` : "none" }}></div>
        </div>
      </section>

      <section className="p3-problem-section">
        <div className="p3-problem__content">
          <h2 className="p3-reveal-text p3-section-title">{project.problem?.[0] || "Problem"}</h2>
          <p className="p3-reveal-text p3-body-large">{project.problem?.[1]}</p>
        </div>
        <div className="p3-problem__images">
          {project.images?.[1] && (
            <div className="p3-parallax-img p3-img-1">
              <img src={project.images[1]} alt="Project Detail 1" />
            </div>
          )}
          {project.images?.[2] && (
            <div className="p3-parallax-img p3-img-2">
              <img src={project.images[2]} alt="Project Detail 2" />
            </div>
          )}
        </div>
      </section>

      <section className="p3-solution-section">
        <div className="p3-solution__grid">
          <div className="p3-solution__text">
            <h2 className="p3-reveal-text p3-section-title">{project.solution?.[0] || "Solution"}</h2>
            <p className="p3-reveal-text p3-body-text">{project.solution?.[1]}</p>
            <p className="p3-reveal-text p3-body-text">{project.solution?.[2]}</p>
            <p className="p3-reveal-text p3-body-text">{project.solution?.[3]}</p>
          </div>
          <div className="p3-solution__images">
            {project.images?.[3] && (
              <div className="p3-parallax-img p3-img-3">
                <img src={project.images[3]} alt="Solution Detail 1" />
              </div>
            )}
            {project.images?.[4] && (
              <div className="p3-parallax-img p3-img-4">
                <img src={project.images[4]} alt="Solution Detail 2" />
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="p3-gallery">
        <div className="p3-gallery__title p3-reveal-text">More Details</div>
        <div className="p3-gallery__grid">
          {project.images?.slice(5, 11).map((img, i) => (
            <div key={i} className="p3-parallax-img">
              <img src={img} alt={`Gallery ${i}`} />
            </div>
          ))}
        </div>
      </section>

      <footer className="p3-footer p3-reveal-text">
        {prevProject ? (
          <button className="p3-footer__link" onClick={() => navigate(`/project3/${prevProject.id}`)}>
            <span className="p3-footer__label">Previous</span>
            <span className="p3-footer__title">{prevProject.title}</span>
          </button>
        ) : <div />}
        
        {nextProject ? (
          <button className="p3-footer__link p3-footer__link--next" onClick={() => navigate(`/project3/${nextProject.id}`)}>
            <span className="p3-footer__label">Next</span>
            <span className="p3-footer__title">{nextProject.title}</span>
          </button>
        ) : <div />}
      </footer>
    </main>
  );
};

export default ProjectPage3;
