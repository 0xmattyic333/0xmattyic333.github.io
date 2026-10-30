import Footer from './components/Footer'
import GlowBackground from './components/GlowBackground'
import Nav from './components/Nav'

// App is the whole page. Each section is its own component in src/components/,
// listed here in the order it appears on screen.
function App() {
  return (
    <>
      <GlowBackground />
      <Nav />
      <main></main>
      <Footer />
    </>
  )
}

export default App
