import { BrowserRouter, Routes, Route } from "react-router-dom";
import IntroPage from "./pages/IntroPage";
import HomePage from "./pages/HomePage";
import ProjectPage from "./pages/ProjectPage";
import ProjectsPage from "./pages/ProjectsPage";



export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/home/:id" element={<ProjectPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        {/* <Route path="/contact" element={<ContactPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}