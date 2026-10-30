import { projects } from './data/projects'
import About from './components/About'
import Certifications from './components/Certifications'
import Contact from './components/Contact'
import CursorGlow from './components/CursorGlow'
import Footer from './components/Footer'
import GlowBackground from './components/GlowBackground'
import Hero from './components/Hero'
import Nav from './components/Nav'
import Projects from './components/Projects'

// App is the whole page. Each section is its own component in src/components/,
// listed here in the order it appears on screen.
function App() {
  return (
    <>
      <GlowBackground />
      <CursorGlow />
      <Nav />
      <main>
        <Hero />
        <Projects items={projects} />
        <Certifications />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
