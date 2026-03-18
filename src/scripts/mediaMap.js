const images = import.meta.glob("../assets/*.{jpg,png,gif,svg}", { eager: true });

const media = (filename) => {
  const file = Object.entries(images).find(([key]) =>
    key.endsWith(`/` + filename)
  );
  return file?.[1]?.default || "";
};

export default media;