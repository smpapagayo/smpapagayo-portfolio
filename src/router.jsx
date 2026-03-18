import { BrowserRouter, Routes, Route } from "react-router-dom";
import IntroPage from "./pages/IntroPage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectPage from "./pages/ProjectPage";
import HomePage from "./pages/HomePage";
import ContactPage from "./pages/ContactPage";
import WindowPage from "./pages/WindowPage";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/home" element={<HomePage />} />
        {/* <Route path="/projects" element={<ProjectsPage />} /> */}
        {/* <Route path="/projects/:id" element={<ProjectPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/window" element={<WindowPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}