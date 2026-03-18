import React from "react";

const ProjectVideo1 = ({ src}) => {
  return (
    <section className="content--padded video-section">
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
          maxHeight: "80dvh",
          display: "block",
          margin: "0 auto",
          borderRadius: "12px",
        }}
      />
    </section>
  );
};

export default ProjectVideo1;