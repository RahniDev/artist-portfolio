import { Routes, Route } from "react-router-dom";
import './styles/global.css'
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import Gallery from "./pages/Gallery";
import BackToTop from "./components/BackToTop";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/gallery/:id" element={<Gallery />} />
      </Routes>
      <BackToTop />
      <Footer />
    </>
  );
}