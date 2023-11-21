import styles from "./App.module.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Experience from "./components/Experience/Experience";
import Projects from "./components/Projects/Projects";
import Contact from "./components/Contact/Contact";
import Snowfall from "react-snowfall";
import { loadSlim } from "tsparticles-slim";
import { useCallback, useState } from "react";
import Particles from "react-particles";
import MatrixBG from "./components/Canvas/MatrixBG";

function App() {
  const [showSnowfall, setShowSnowfall] = useState(false);
  const [showMatrix, setShowMatrix] = useState(false);
  const particlesInit = useCallback(async (engine) => {
    console.log(engine);
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    //await loadFull(engine);
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    console.log(container);
  }, []);

  const toggleSnowfall = () => {
    console.log("toggleSnowfall");
    setShowSnowfall(!showSnowfall);
  };
  const toggleMatrix = () => {
    console.log("toggleSnowfall");
    setShowMatrix(!showMatrix);
  };

  return (
    <div className={styles.App}>
      {showMatrix && (
        <div
          style={{
            position: "fixed",
            width: "100%",
            height: "100%",
            opacity: 0.5,
          }}
        >
          <MatrixBG />
        </div>
      )}
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 11,
              },
              repulse: {
                distance: 100,
                duration: 0.4,
              },
              bubble: {
                distance: 400,
                size: 20,
                duration: 2,
                opacity: 8,
                speed: 3,
              },
            },
          },
          particles: {
            color: {
              value: "#ffffff",
            },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 6,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 5 },
            },
          },
          detectRetina: true,
        }}
      />

      {showSnowfall && (
        <Snowfall
          color="white"
          wind={[0.5, 2.0]}
          snowflakeCount={51}
          style={{
            position: "fixed",
            width: "100%",
            height: "100%",
            zIndex: 1,
          }}
        />
      )}

      <Navbar onToggleSnowfall={toggleSnowfall} onToggleMatrix={toggleMatrix} />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Contact />
    </div>
  );
}

export default App;
