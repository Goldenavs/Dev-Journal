// src/App.tsx
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutMe from './components/AboutMe';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Achievements from './components/Achievements';
import Others from './components/Others';
import Contact from './components/Contact';

function App() {
  return (
    <div className="bg-[#0a0a0a] text-white selection:bg-white selection:text-black">
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