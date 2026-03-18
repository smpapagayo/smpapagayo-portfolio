
import React, { useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { DrawSVGPlugin } from "gsap/all";
import SvgLoadBar2 from "../components/SvgLoadBar2";

gsap.registerPlugin(DrawSVGPlugin);

export default function IntroPage() {
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const allPaths = gsap.utils.toArray(".load-bar path");

      const colors = {
        "tail-1": "#27a4d6",
        "tail-2": "#2e70bf",
        "tail-3": "#e40909",
        "wing-1": "#ffc14f",
        "wing-2": "#ffc14f",
        "wing-3": "#ff9624",
        "face": "#fff6ef",
        "beak-1": "#ddd",
        "beak-2": "#1e2234",
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

      const barTl2 = gsap.timeline({ paused: true });
      // Attach the onComplete to the timeline itself now
      const barTl = gsap.timeline({
        delay: 1, // INITIAL WAIT
        onComplete: () => barTl2.play()
      });

      // 3. Loop through the randomized parts and animate them one at a time
      partIds.forEach((id) => {
        const pathsInPart = groupedPaths[id];

        barTl.to(pathsInPart, {
          keyframes: [
            { opacity: 1, duration: 0.2, ease: "power1.inOut" },
            { fill: colors[id], duration: 0.15, ease: "power1.inOut", delay: 0.35 }
          ],
          stagger: {
            each: 0.008, // STAGGER TIME
            from: "random",
          },
        }, "-=0.75"); // OVERLAP
      });

      // 4. Fade in the credits text at the end of the timeline
      barTl.to(".intro__credits", {
        duration: 0.7,
        opacity: 1,
        ease: "power2.out"
      }, "+=0.2"); // slight wait before text appears

      barTl2.to(".load-bar", {
        opacity: 0,
        duration: 0.8,
        delay: 1, // OUTRO WAIT
        onComplete: () => navigate("/home"),
      });
    });

    return () => ctx.revert();
  }, [navigate]);

  return (
    <div className="intro">
      <div className="intro__art">
        <SvgLoadBar2 />
      </div>

      <div className="intro__text">
        <p>loading</p>
        <p className="intro__credits">
          designed and coded by<br />
          sergio m papagayo © 2025
        </p>
      </div>
    </div>
  );
}
