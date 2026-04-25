// src/App.tsx
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutMe from './components/AboutMe';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Achievements from './components/Achievements';
import Others from './components/Others';
import Contact from './components/Contact';
import Background from './components/Background'; // <-- Import it here

function App() {
  return (
    // Note: I removed the bg-[#0a0a0a] here because the Background component now handles it
    <div className="text-white selection:bg-orange-500 selection:text-black min-h-screen">
      <Background /> {/* <-- Drop it here at the absolute top */}
      <Navbar />
      <main>
        <div id="hero"><Hero /></div>
        <div id="about"><AboutMe /></div>
        <div id="projects"><Projects /></div>
        <div id="skills"><Skills /></div>
        <div id="achievements"><Achievements /></div>
        <div id="others"><Others /></div>
        <div id="contact"><Contact /></div>
      </main>
    </div>
  )
}

export default App;