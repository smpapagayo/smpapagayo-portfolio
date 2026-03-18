import { memo } from "react";

function LogoLetter({ svgData }) {
  const { viewBox, outlinePaths = [], fillPaths = [] } = svgData;

  return (
    <div className="logo-letter">
      <svg className="outline" viewBox={viewBox} aria-hidden="true">
        {outlinePaths.map((d, i) => (
          <path key={`outline-${i}`} d={d} className={`path path-${i}`} />
        ))}
      </svg>
      <svg className="fill" viewBox={viewBox} style={{ opacity: 0 }} aria-hidden="true">
        {fillPaths.map((d, i) => (
          <path key={`fill-${i}`} d={d} />
        ))}
      </svg>
    </div>
  );
}

export default memo(LogoLetter);