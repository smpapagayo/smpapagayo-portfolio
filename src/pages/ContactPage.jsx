import React, { useLayoutEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { DrawSVGPlugin } from "gsap/all";
import Logo from "../components/Logo";

gsap.registerPlugin(DrawSVGPlugin);

export default function IntroPage() {
  const rootRef = useRef(null);
  const logoTlRef = useRef();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // gsap.set(".logo-container", { opacity: 0 });
      gsap.set(".logo-letter", { opacity: 0, y: 20 });
      gsap.set(".intro-subtitle", { opacity: 0, y: -40 });
      gsap.set(".button", { opacity: 0 });
      const colors = ["#fcbb47", "#37a0d3", "#f07075"];

      const logoTl = gsap.timeline({ paused: true });
      const bgTl = gsap.timeline();
      logoTlRef.current = logoTl;

      const fillTl = gsap.timeline({ paused: true });

      bgTl
        // .to(".logo-container", { opacity: 1, duration: 0.5 })
        .fromTo(
          ".logo-container",
          {
            clipPath: "inset(45% 50% 45% 50%)",
          },
          {
            clipPath: "inset(45% 0% 45% 0%)",
            duration: 0.5,
            ease: "power1.out",
          },
        )
        .fromTo(
          ".logo-container",
          {
            clipPath: "inset(45% 0% 45% 0%)",
          },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.2,
            ease: "power1.out",
            onComplete: () => logoTl.play(),
          }
        );

      logoTl
        .to(".logo-letter", {
          opacity: 1,
          y: -10,
          duration: 0.6,
          ease: "elastic.out(2, 0.5)",
          stagger: 0.04,
        })
        .to(".intro-subtitle", {
          opacity: 1,
          y: 20,
          duration: 0.2,
          ease: "back.out(4)",
        })
        .to(".button", {
          opacity: 1,
          y: 40,
          duration: 0.2,
          ease: "back.out(4)"
        })
        .to(".contact", {
          opacity: 1,
          y: 60,
          duration: 0.2,
          ease: "back.out(4)",
          onComplete: () => fillTl.play(),
        });

      fillTl.fromTo(
        ".fill",
        {
          opacity: 1,
          x: 5,
          y: -5,
          scale: 1.3,
        },
        {
          x: 0,
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: "elastic.out(2, 0.5)",
          stagger: {
            each: 0.05,
            onStart() {
              const color = colors[Math.floor(Math.random() * colors.length)];
              this.targets()[0].style.fill = color;
            },
          },
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="mask" ref={rootRef}>
      <div className="logo-container">
        <div className="logo-mask">
          <div className="logo">
            <Logo />
          </div>
        </div>
        <p className="intro-subtitle">
          Hola! I am a graphic designer and engineer.
        </p>
        <p className="intro-subtitle">
          I create visual experiences that blend creativity and technology.
        </p>
        {/* <button className="button" onClick={() => navigate("/projects")}>
        see my work
      </button> */}

        <button
          className="button"
          onClick={() => {
            const logoTl = logoTlRef.current;

            if (!logoTl || logoTl.isActive()) return;

            logoTl.reverse();

            logoTl.eventCallback("onReverseComplete", () => {
              navigate("/projects");
            });
          }}
        >
          see my work
        </button>

        <ul className="contact">
          <li>
            <a
              href="https://www.instagram.com/smpapagayo"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
              >
                <path d="M13.028 2c1.125.003 1.696.009 2.189.023l.194.007c.224.008.445.018.712.03c1.064.05 1.79.218 2.427.465c.66.254 1.216.598 1.772 1.153a4.9 4.9 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428c.012.266.022.487.03.712l.006.194c.015.492.021 1.063.023 2.188l.001.746v1.31a79 79 0 0 1-.023 2.188l-.006.194c-.008.225-.018.446-.03.712c-.05 1.065-.22 1.79-.466 2.428a4.9 4.9 0 0 1-1.153 1.772a4.9 4.9 0 0 1-1.772 1.153c-.637.247-1.363.415-2.427.465l-.712.03l-.194.006c-.493.014-1.064.021-2.189.023l-.746.001h-1.309a78 78 0 0 1-2.189-.023l-.194-.006a63 63 0 0 1-.712-.031c-1.064-.05-1.79-.218-2.428-.465a4.9 4.9 0 0 1-1.771-1.153a4.9 4.9 0 0 1-1.154-1.772c-.247-.637-.415-1.363-.465-2.428l-.03-.712l-.005-.194A79 79 0 0 1 2 13.028v-2.056a79 79 0 0 1 .022-2.188l.007-.194c.008-.225.018-.446.03-.712c.05-1.065.218-1.79.465-2.428A4.9 4.9 0 0 1 3.68 3.678a4.9 4.9 0 0 1 1.77-1.153c.638-.247 1.363-.415 2.428-.465c.266-.012.488-.022.712-.03l.194-.006a79 79 0 0 1 2.188-.023zM12 7a5 5 0 1 0 0 10a5 5 0 0 0 0-10m0 2a3 3 0 1 1 .001 6a3 3 0 0 1 0-6m5.25-3.5a1.25 1.25 0 0 0 0 2.5a1.25 1.25 0 0 0 0-2.5" />
              </svg>

              <p className="social-link-text">Instagram</p>
            </a>
          </li>
          <li>
            <a
              href="https://github.com/smpapagayo"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
              >
                <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2" />
              </svg>

              <p className="social-link-text">GitHub</p>
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/smpapagayo"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
              >
                <path d="M17.303 2.25H6.697A4.447 4.447 0 0 0 2.25 6.697v10.606a4.447 4.447 0 0 0 4.447 4.447h10.606a4.447 4.447 0 0 0 4.447-4.447V6.697a4.447 4.447 0 0 0-4.447-4.447m-8.46 15.742a.4.4 0 0 1-.4.423h-1.78a.41.41 0 0 1-.4-.412V10.6a.4.4 0 0 1 .4-.411h1.78a.4.4 0 0 1 .4.411zM7.52 8.632a1.467 1.467 0 1 1 .022-2.935A1.467 1.467 0 0 1 7.52 8.63m10.817 9.35a.39.39 0 0 1-.378.388H16.08a.39.39 0 0 1-.378-.389v-3.424c0-.511.156-2.223-1.356-2.223c-1.179 0-1.412 1.2-1.457 1.734v3.991a.39.39 0 0 1-.378.39h-1.823a.39.39 0 0 1-.389-.39v-7.493a.39.39 0 0 1 .39-.378h1.822a.39.39 0 0 1 .39.378v.645a2.59 2.59 0 0 1 2.434-1.112c3.035 0 3.024 2.835 3.024 4.447z" />
              </svg>

              <p className="social-link-text">LinkedIn</p>
            </a>
          </li>
          <li>
            <a href="mailto:hello@smpapagayo.com">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
              >
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m-.4 4.25l-7.07 4.42c-.32.2-.74.2-1.06 0L4.4 8.25a.85.85 0 1 1 .9-1.44L12 11l6.7-4.19a.85.85 0 1 1 .9 1.44" />
              </svg>

              <p className="social-link-text">Email</p>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
