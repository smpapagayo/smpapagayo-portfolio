import { BrowserRouter, Routes, Route } from "react-router-dom";
import IntroPage from "./pages/IntroPage";
import HomePage from "./pages/HomePage";
import ProjectPage from "./pages/ProjectPage";



export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/home/:id" element={<ProjectPage />} />
      </Routes>
    </BrowserRouter>
  );
}