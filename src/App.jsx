import styles from "./App.module.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Experience from "./components/Experience/Experience";
import Projects from "./components/Projects/Projects";
import Contact from "./components/Contact/Contact";
import Snowfall from "react-snowfall";

function App() {
  return (
    <div className={styles.App}>
      <Snowfall
        // Changes the snowflake color
        color="white"
        wind={[0.5, 2.0]}
        // Applied to the canvas element

        // Controls the number of snowflakes that are created (default 150)
        snowflakeCount={216}
        style={{
          position: "fixed",
          width: "100%",
          height: "100%",
          zIndex: 1,
        }}
      />
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Contact />
    </div>
  );
}

export default App;
