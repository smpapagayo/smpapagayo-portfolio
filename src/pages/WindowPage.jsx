import React, { useEffect, useState, useRef } from "react";


import img1 from "../assets/p1-1.jpg";
import img2 from "../assets/p2-1.jpg";
import img3 from "../assets/p5-1.jpg";
import img4 from "../assets/p5-5.jpg";
import img5 from "../assets/p6-1.jpg";
import img6 from "../assets/p6-3.jpg";
import img7 from "../assets/p6-4.jpg";
import img8 from "../assets/p6-6.jpg";
import img9 from "../assets/p6-7.jpg";

const mediaList = [
  { type: "video", src: "/videos/window_v1.mp4" },
  { type: "video", src: "/videos/window_v2.mp4" },
  { type: "video", src: "/videos/window_v3.mp4" },
  { type: "video", src: "/videos/window_v4.mp4" },
  { type: "video", src: "/videos/project-content-2.mp4" },
  { type: "image", src: img1 },
  { type: "image", src: img2 },
  { type: "image", src: img3 },
  { type: "image", src: img4 },
  { type: "image", src: img5 },
  { type: "image", src: img6 },
  { type: "image", src: img7},
  { type: "image", src: img8 },
  { type: "image", src: img9 },
  { type: "video", src: "/videos/window_i1.jpg" },
  { type: "video", src: "/videos/window_i2.jpg" },
  { type: "video", src: "/videos/window_i3.jpg" },
  { type: "video", src: "/videos/window_i4.jpg" },
  { type: "video", src: "/videos/window_i5.jpg" },
  { type: "video", src: "/videos/window_i6.jpg" },
  { type: "video", src: "/videos/window_i7.jpg" },
  { type: "video", src: "/videos/window_i8.jpg" },
  { type: "video", src: "/videos/window_i9.jpg" },
  { type: "video", src: "/videos/window_i10.jpg" },
  { type: "video", src: "/videos/window_i11.jpg" },
  { type: "video", src: "/videos/window_i12.jpg" },
  { type: "video", src: "/videos/window_i3.jpg" },
  { type: "video", src: "/videos/window_i4.jpg" },
  { type: "video", src: "/videos/window_i5.jpg" },

  // Agrega más elementos según necesites
];

export default function WindowPage() {


  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef = useRef();

  useEffect(() => {
    const currentMedia = mediaList[currentIndex];

    if (currentMedia.type === "video") {
      videoRef.current?.play();
      videoRef.current.onended = () => showNext();
    } else {
      const timer = setTimeout(() => showNext(), 5000); // Mostrar imagen por 5s
      return () => clearTimeout(timer);
    }
  }, [currentIndex]);

  const showNext = () => {
    let next = Math.floor(Math.random() * mediaList.length);
    while (next === currentIndex) {
      next = Math.floor(Math.random() * mediaList.length); // Evitar mismo consecutivo
    }
    setCurrentIndex(next);
  };

  const currentMedia = mediaList[currentIndex];

  return (
    <div style={{ width: "100vw", height: "100vh", background: "black" }}>
      {currentMedia.type === "video" ? (
        <video
          ref={videoRef}
          src={currentMedia.src}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          muted
          playsInline
        />
      ) : (
        <img
          src={currentMedia.src}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          alt=""
        />
      )}
    </div>
  );
}

// const [currentIndex, setCurrentIndex] = useState(0);
//   const [isVideoReady, setIsVideoReady] = useState(true);
//   const videoRef = useRef(null);

//   const showNext = () => {
//     let next = Math.floor(Math.random() * mediaList.length);
//     while (next === currentIndex) {
//       next = Math.floor(Math.random() * mediaList.length); // evita repetir el mismo
//     }
//     setCurrentIndex(next);
//   };

//   useEffect(() => {
//     const currentMedia = mediaList[currentIndex];

//     if (currentMedia.type === "video") {
//       setIsVideoReady(false);
//       const video = videoRef.current;
//       video.src = currentMedia.src;
//       video.load();
//       video.oncanplay = () => {
//         setIsVideoReady(true);
//         video.play();
//       };
//       video.onended = () => showNext();
//     } else {
//       const timer = setTimeout(() => showNext(), 5000); // 5s para imágenes/GIFs
//       return () => clearTimeout(timer);
//     }
//   }, [currentIndex]);

//   const currentMedia = mediaList[currentIndex];

//   return (
//     <div
//       style={{
//         width: "100vw",
//         height: "100vh",
//         backgroundColor: "#2d344e",
//         overflow: "hidden",
//         position: "relative",
//       }}
//     >
//       {currentMedia.type === "video" ? (
//         <video
//           ref={videoRef}
//           muted
//           playsInline
//           preload="auto"
//           style={{
//             width: "100%",
//             height: "100%",
//             objectFit: "cover",
//             opacity: isVideoReady ? 1 : 0,
//             transition: "opacity 0.3s ease",
//           }}
//         />
//       ) : (
//         <img
//           src={currentMedia.src}
//           alt=""
//           style={{
//             width: "100%",
//             height: "100%",
//             objectFit: "cover",
//             opacity: 1,
//             transition: "opacity 0.3s ease",
//           }}
//         />
//       )}
//     </div>
//   );
// }




// const [currentIndex, setCurrentIndex] = useState(0);
//   const videoRef = useRef(null);
//   const timeoutRef = useRef(null);

//   useEffect(() => {
//     const currentMedia = mediaList[currentIndex];

//     if (currentMedia.type === "video") {
//       const video = videoRef.current;

//       const handleEnded = () => {
//         showNext();
//       };

//       video.addEventListener("ended", handleEnded);
//       video.play().catch(() => {}); // silent fail for autoplay restrictions

//       return () => {
//         video.removeEventListener("ended", handleEnded);
//       };
//     } else {
//       timeoutRef.current = setTimeout(() => {
//         showNext();
//       }, 5000);

//       return () => clearTimeout(timeoutRef.current);
//     }
//   }, [currentIndex]);

//   const showNext = () => {
//     let next = Math.floor(Math.random() * mediaList.length);
//     while (next === currentIndex) {
//       next = Math.floor(Math.random() * mediaList.length);
//     }
//     setCurrentIndex(next);
//   };

//   const currentMedia = mediaList[currentIndex];

//   return (
//     <div
//       style={{
//         width: "100vw",
//         height: "100vh",
//         backgroundColor: "#2d344e",
//         overflow: "hidden",
//       }}
//     >
//       {currentMedia.type === "video" ? (
//         <video
//           key={currentMedia.src} // fuerza remount para evitar glitches
//           ref={videoRef}
//           src={currentMedia.src}
//           autoPlay
//           muted
//           playsInline
//           preload="auto"
//           style={{
//             width: "100%",
//             height: "100%",
//             objectFit: "cover",
//             display: "block",
//           }}
//         />
//       ) : (
//         <img
//           key={currentMedia.src}
//           src={currentMedia.src}
//           alt=""
//           style={{
//             width: "100%",
//             height: "100%",
//             objectFit: "cover",
//             display: "block",
//           }}
//         />
//       )}
//     </div>
//   );
// }