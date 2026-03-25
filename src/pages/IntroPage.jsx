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
      // ----------------------------------------------------
      // 1. INITIAL SETUP
      // ----------------------------------------------------
      const allPaths = gsap.utils.toArray(".load-bar path");

      // Custom colors for different parts of the macaw SVG
      const colors = {
        "tail-1": "#27a4d6",
        "tail-2": "#2e70bf",
        "wing-1": "#ffc14f",
        "wing-2": "#ff9624",
        "face": "#fff6ef",
        "beak": "#1e2234",
        "body": "#ff2a2a",
      };

      // Group SVG paths by their parent <g> ID
      const groupedPaths = {};
      allPaths.forEach((path) => {
        const g = path.closest("g[id]");
        const id = g?.id;
        if (id && colors[id]) {
          if (!groupedPaths[id]) groupedPaths[id] = [];
          groupedPaths[id].push(path);

          // Pre-set fill to dark background color and hide them
          gsap.set(path, { fill: "#292f46", opacity: 0 });
        }
      });

      // Extract the part IDs and shuffle them randomly for a varied fill order on every load
      const partIds = Object.keys(groupedPaths);
      gsap.utils.shuffle(partIds);

      // Hide credits text initially and set reveal-block scale to 0
      gsap.set(".intro__credits-text", { opacity: 0 });
      gsap.set(".intro__credits-block", { scaleX: 0, transformOrigin: "left" });

      // Identify letters in LoadingText and set initial state
      const letters = gsap.utils.toArray(".loading-text path");
      gsap.set(letters, { opacity: 0, y: 20, scale: 0.9, transformOrigin: "50% 50%" });

      // ----------------------------------------------------
      // 2. ANIMATION TIMELINES
      // ----------------------------------------------------
      
      // Secondary timeline (Transition out): Starts playing when barTl completes
      const outTl = gsap.timeline({ paused: true });
      
      // Main timeline (Intro load):
      // - delay: Initial wait time before the loading animation starts
      const barTl = gsap.timeline({
        delay: 1, 
        onComplete: () => outTl.play()
      });

      // Loop through the randomized macaw parts and animate them one at a time
      partIds.forEach((id, index) => {
        const pathsInPart = groupedPaths[id];

        // A. Animate one LOADING LETTER exactly when this macaw part starts animating
        // - duration: How fast the letter fades and slides up
        if (letters[index]) {
          barTl.to(letters[index], {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.01,
            ease: "power3.out"
          }, index === 0 ? undefined : "-=0.75");
        }

        // B. Animate the MACAW PART at the exact same start time
        // - keyframes duration: How fast each path fades in, then changes fill color
        // - stagger 'each': The micro-delay between individual strokes in a single group
        if (pathsInPart && pathsInPart.length > 0) {
          barTl.to(pathsInPart, {
            keyframes: [
              { opacity: 1, duration: 0.2, ease: "power1.inOut" },
              { fill: colors[id], duration: 0.15, ease: "power1.inOut", delay: 0.35 }
            ],
            stagger: {
              each: 0.0065, // Time between each stroke filling up
              from: "random",
            },
          }, letters[index] ? "<" : (index === 0 ? undefined : "-=0.75")); // "<" syncs it with the letter animation
        }
      });

      // ----------------------------------------------------
      // 3. CREDITS REVEAL (Color Block Sweep)
      // ----------------------------------------------------
      // Add a label to synchronize the credits lines
      // - "+=0.2": Tiny wait time before the credits reveal starts perfectly
      barTl.addLabel("revealCredits", "+=0.2");
      const lines = gsap.utils.toArray(".intro__credits-line");
      
      lines.forEach((line, i) => {
        const block = line.querySelector(".intro__credits-block");
        const text = line.querySelector(".intro__credits-text");

        // The block sweeps across, text appears, the block shrinks away
        // - duration (0.4s): How fast each half of the sweep is
        // - i * 0.15: Creates the stagger between the two credit lines
        barTl.to(block, { scaleX: 1, duration: 0.4, ease: "power2.inOut" }, `revealCredits+=${i * 0.15}`)
             .set(text, { opacity: 1 }, `revealCredits+=${i * 0.15 + 0.4}`)
             .set(block, { transformOrigin: "right" }, `revealCredits+=${i * 0.15 + 0.4}`)
             .to(block, { scaleX: 0, duration: 0.4, ease: "power2.inOut" }, `revealCredits+=${i * 0.15 + 0.4}`);
      });

      // ----------------------------------------------------
      // 4. PAGE TRANSITION (Out)
      // ----------------------------------------------------
      // Wait for credits to display (delay: 1.2s), then animate out the elements,
      // and finally sweep the background block upward to cover the screen.
      outTl
        // Exit credits: fade + drift up (mirrors the block-reveal entrance)
        .to(".intro__credits-text", {
          opacity: 0,
          y: -8,
          duration: 0.4,
          stagger: 0.1,
          ease: "power2.in",
          delay: 1.2,
        })
        // Exit loading letters: continue upward + fade (reverse of entry slide-up)
        .to(letters, {
          opacity: 0,
          y: -20,
          scale: 0.9,
          transformOrigin: "50% 50%",
          duration: 0.6,
          stagger: { each: 0.05, from: "end" },
          ease: "power3.in",
        }, "<")
        // Exit macaw: fade out paths with random stagger (mirrors entry fill-in)
        .to(allPaths, {
          opacity: 0,
          duration: 0.2,
          stagger: { each: 0.002, from: "random" },
          ease: "power1.in",
        }, "<")
        // Block sweep: covers the screen and navigates
        .set(".page-transition", { transformOrigin: "bottom" })
        .to(".page-transition", {
          scaleY: 1,
          duration: 0.5,
          ease: "power3.inOut",
          onComplete: () => navigate("/home"),
        }, "+=0.2");
           
    });

    return () => ctx.revert();
  }, [navigate]);

  return (
    <div className="intro">
      {/* Intro Parrot SVG Container */}
      <div className="intro__art">
        <SvgLoader />
      </div>

      <div className="intro__text">
        {/* Loading "loading..." string SVG */}
        <LoadingText />
        
        {/* Color-block text reveal lines */}
        <div className="intro__credits">
          <div className="intro__credits-line">
            <div className="intro__credits-block"></div>
            <span className="intro__credits-text">designed and coded by</span>
          </div>
          <div className="intro__credits-line">
            <div className="intro__credits-block"></div>
            <span className="intro__credits-text">sergio m papagayo © 2025</span>
          </div>
        </div>
      </div>

      {/* Sweep Transition Block */}
      <div className="page-transition"></div>
    </div>
  );
}
