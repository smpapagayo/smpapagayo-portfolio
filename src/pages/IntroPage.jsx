import React, { useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { DrawSVGPlugin } from "gsap/all";
import SvgLoader from "../components/SvgLoader";
import LoadingText from "../components/LoadingText";

gsap.registerPlugin(DrawSVGPlugin);

export default function IntroPage() {
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const allPaths = gsap.utils.toArray(".load-bar path");

      const colors = {
        "tail-1": "#27a4d6",
        "tail-2": "#2e70bf",
        // "tail-3": "#e40909",
        "wing-1": "#ffc14f",
        // "wing-2": "#ffc14f",
        "wing-2": "#ff9624",
        "face": "#fff6ef",
        // "beak-1": "#ddd",
        "beak": "#1e2234",
        "body": "#ff2a2a",
      };

      // 1. Group paths by their parent <g> ID
      const groupedPaths = {};
      allPaths.forEach((path) => {
        const g = path.closest("g[id]");
        const id = g?.id;
        if (id && colors[id]) {
          if (!groupedPaths[id]) groupedPaths[id] = [];
          groupedPaths[id].push(path);

          // Pre-set fill to background color and hide them
          gsap.set(path, { fill: "#292f46", opacity: 0 });
        }
      });

      // 2. Extract the part IDs and shuffle them randomly
      const partIds = Object.keys(groupedPaths);
      gsap.utils.shuffle(partIds); // This randomizes the order on every page load

      // Hide credits initially
      gsap.set(".intro__credits", { opacity: 0 });

      // Identify letters in LoadingText and set initial state
      const letters = gsap.utils.toArray(".loading-text path");
      gsap.set(letters, { opacity: 0, y: 20, scale: 0.9, transformOrigin: "50% 50%" });

      const barTl2 = gsap.timeline({ paused: true });
      // Attach the onComplete to the timeline itself now
      const barTl = gsap.timeline({
        delay: 1, // INITIAL WAIT
        onComplete: () => barTl2.play()
      });

      // 3. Loop through the randomized parts and animate them one at a time
      partIds.forEach((id, index) => {
        const pathsInPart = groupedPaths[id];

        // Animate one letter exactly when this macaw part starts
        if (letters[index]) {
          barTl.to(letters[index], {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.01,
            ease: "power3.out"
          }, index === 0 ? undefined : "-=0.75");
        }

        // Animate the macaw part at the exact same start time
        if (pathsInPart && pathsInPart.length > 0) {
          barTl.to(pathsInPart, {
            keyframes: [
              { opacity: 1, duration: 0.2, ease: "power1.inOut" },
              { fill: colors[id], duration: 0.15, ease: "power1.inOut", delay: 0.35 }
            ],
            stagger: {
              each: 0.0065, // STAGGER TIME
              from: "random",
            },
          }, letters[index] ? "<" : (index === 0 ? undefined : "-=0.75")); // OVERLAP
        }
      });

      // 4. Fade in the credits text at the end of the timeline
      barTl.to(".intro__credits", {
        duration: 0.7,
        opacity: 1,
        ease: "power2.out"
      }, "+=0.2"); // slight wait before text appears

      barTl2.to(".load-bar", {
        opacity: 0,
        duration: 0.6,
        delay: 2, // OUTRO WAIT
      }).to(".loading-text", {
        opacity: 0,
        duration: 0.5,
      }, "-=0.2").to(".intro__credits", {
        opacity: 0,
        duration: 0.5,
        // onComplete: () => navigate("/projects"),
      }, "-=0.2");
    });

    return () => ctx.revert();
  }, [navigate]);

  return (
    <div className="intro">
      <div className="intro__art">
        <SvgLoader />
      </div>

      <div className="intro__text">
        <LoadingText />
        <p className="intro__credits">
          designed and coded by<br />
          sergio m papagayo © 2025
        </p>
      </div>
    </div>
  );
}
