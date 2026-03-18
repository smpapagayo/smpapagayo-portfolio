import React from "react";

const ProjectVideo2 = ({ src}) => {
  return (
    <section className="video-section" >
      <video
        className="project-video"
        src={src}
        controls
        autoPlay={true}
        muted
        loop
        playsInline
        style={{
          width: "80%",
          // maxWidth: "900px",
          maxHeight: "80dvh",
          display: "block",
          margin: "0 auto",
          borderRadius: "12px",
        }}
      />
    </section>
  );
};

export default ProjectVideo2;