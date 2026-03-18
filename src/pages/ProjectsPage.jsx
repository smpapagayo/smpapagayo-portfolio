import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { projects } from "../scripts/projects";
import { useLocation } from "react-router-dom";
import useIsMobile from "../hooks/useIsMobile";

const ProjectsPage = () => {
  const navigate = useNavigate();
  const [currentProject, setCurrentProject] = useState(projects[0]);
  const [index, setIndex] = useState(0);
  const location = useLocation();
  const isMobile = useIsMobile();
  const firstAnimation = useRef(false);
  const scrollContainerRef = useRef(null);
  const isScrolling = useRef(false);

  useEffect(() => {
    if (isMobile) return;
    if (
      location.pathname === "/projects" &&
      firstAnimation.current !== "/projects"
    ) {
      const title = document.querySelector(".title");
      const logo = document.querySelector(".main-logo");
      const works = document.querySelector(".frame__works");
      const category = document.querySelector(".category");
      const content1 = document.querySelector(".frame__content-1");
      const content2 = document.querySelector(".frame__content-2");
      const instructions = document.querySelector(".instructions");

      if (logo) {
        gsap
          .timeline({ defaults: { duration: 0.6, ease: "power2.out" } })
          .fromTo(logo, { opacity: 0, y: -100 }, { opacity: 1, y: 0 });
      }

      if (works && instructions) {
        gsap
          .timeline({ defaults: { duration: 0.95, ease: "power2.out" } })
          .fromTo(works, { opacity: 0, x: -400 }, { opacity: 1, x: 0 });
      }
      if (title && category) {
        gsap
          .timeline({ defaults: { duration: 0.95, ease: "power2.out" } })
          .fromTo(
            [title, category],
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, stagger: 0.05 }
          );
      }
      if (content1) {
        gsap.fromTo(
          content1,
          {
            yPercent: 20,
            filter: "brightness(150%)",
            clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
          },
          {
            yPercent: 0,
            filter: "brightness(100%)",
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 1,
            ease: "power2.out",
          }
        );
      }
      if (content2) {
        gsap.fromTo(
          content2,
          {
            yPercent: -20,
            filter: "brightness(150%)",
            clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          },
          {
            yPercent: 0,
            filter: "brightness(100%)",
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 1,
            ease: "power2.out",
          }
        );
      }
    }
    firstAnimation.current = location.pathname;
  }, [location.pathname, isMobile]);

  const handleHover = (id) => {
    const project = projects.find((p) => p.id === id);
    setCurrentProject(project);

    const title = document.querySelector(".title");
    const category = document.querySelector(".category");
    const content1 = document.querySelector(".frame__content-1");
    const content2 = document.querySelector(".frame__content-2");

    if (title && category) {
      gsap
        .timeline({ defaults: { duration: 0.95, ease: "power2.out" } })
        .fromTo(
          [title, category],
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, stagger: 0.05 }
        );
    }
    if (content1) {
      gsap.fromTo(
        content1,
        {
          yPercent: 20,
          filter: "brightness(150%)",
          clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
        },
        {
          yPercent: 0,
          filter: "brightness(100%)",
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 1,
          ease: "power2.out",
        }
      );
    }
    if (content2) {
      gsap.fromTo(
        content2,
        {
          yPercent: -20,
          filter: "brightness(150%)",
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        },
        {
          yPercent: 0,
          filter: "brightness(100%)",
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 1,
          ease: "power2.out",
        }
      );
    }
  };

  const handleClick = (e, href) => {
    console.log(href)
    e.preventDefault();
    gsap.timeline({ defaults: { duration: 0.9, ease: "power2.out" } }).fromTo(
      ".frame__content, .frame__works, .instructions, .frame__logo, .frame__content-1, .frame__content-2",
      { opacity: 1, x: 0 },
      {
        opacity: 0,
        x: -400,
        stagger: 0.05,
        onComplete: () => navigate(href)

      }
    );
  };


  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let touchStartY = 0;

    const handleScroll = (deltaY) => {
      if (Math.abs(deltaY) < 50 || isScrolling.current) return;

      isScrolling.current = true;
      setTimeout(() => {
        isScrolling.current = false;
      }, 800);

      if (deltaY > 0) {
        // abajo → siguiente
        const nextIndex = (index + 1) % projects.length;
        setIndex(nextIndex);
        setCurrentProject(projects[nextIndex]);
      } else {
        // arriba → anterior
        const prevIndex = (index - 1 + projects.length) % projects.length;
        setIndex(prevIndex);
        setCurrentProject(projects[prevIndex]);
      }
    };

    const handleWheel = (e) => {
      handleScroll(e.deltaY);
    };

    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY - touchEndY;
      handleScroll(deltaY);
    };

    container.addEventListener("wheel", handleWheel, { passive: true });
    container.addEventListener("touchstart", handleTouchStart, { passive: true });
    container.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchend", handleTouchEnd);
    };
  }, [index, projects.length]);

  const renderMobile = () => (
    <main
      className="project-fullscreen-container"
      ref={scrollContainerRef}
      style={{ height: "100vh", overflow: "hidden" }}
    >
      <a

        onClick={(e) => handleClick(e, "/contact")}
        className="frame__logo"
      >
        <div className="main-logo"></div>
      </a>

      <div className="project-card">
        <div className="instructions">
          <span>↑ scroll</span>
        </div>

        <a
          // href={`#/projects/${currentProject.id}`}
          onClick={(e) => handleClick(e, `${currentProject.id}`)}
          className="frame__content"
        >
          <p className="project-title">{currentProject.title}</p>
          <p className="project-category">{currentProject.category}</p>
          {currentProject.images?.[1] && (
            <div className="frame__content-1">
              <div
                className="frame__img-1"
                style={{
                  backgroundImage: currentProject?.images?.[1]
                    ? `url(${currentProject.images[0]})`
                    : "none",
                }}
              ></div>
            </div>
          )}
        </a>
        <div className="instructions">
          <span>↓ scroll</span>
        </div>
      </div>
    </main>
  );

  const renderDesktop = () => (
    <main>
      <div className="frame">
        <nav className="frame__works">
          <p>Projects</p>
          {projects.map((project) => (
            <a
              key={project.id}
              // href={`projects/${project.id}`}
              onMouseEnter={() => handleHover(project.id)}
              onClick={(e) => handleClick(e, `${currentProject.id}`)}
              className={currentProject?.id === project.id ? "active" : ""}
            >
              {project.reference}
            </a>
          ))}
        </nav>

        <ul className="frame__links">
          <li>
            <a
              href="https://www.linkedin.com/in/smpapagayo"
              target="_blank"
              rel="noopener noreferrer"
            >
              <p className="social-link-text">LinkedIn</p>
            </a>
          </li>
          <li>
            <a href="mailto:hello@smpapagayo.com">
              <p className="social-link-text">Email</p>
            </a>
          </li>
        </ul>

        <div className="frame__logo">
          <a onClick={(e) => handleClick(e, "/contact")}>
            <div className="main-logo"></div>
          </a>
        </div>
        <div className="frame__content">
          <div className="title">
            <p>{currentProject?.title || "Select a project"}</p>
          </div>

          <div className="category">
            <p>{currentProject?.category}</p>
          </div>

          <div className="frame__content-1">
            <a onClick={(e) => handleClick(e, `${currentProject.id}`)}>
              <div
                className="frame__img-1"
                style={{
                  backgroundImage: currentProject?.images?.[0]
                    ? `url(${currentProject.images[1]})`
                    : "none",
                }}
              ></div>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
  return isMobile ? renderMobile() : renderDesktop();
};

export default ProjectsPage;
