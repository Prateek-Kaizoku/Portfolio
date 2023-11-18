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
        color="grey"
        // Applied to the canvas element

        // Controls the number of snowflakes that are created (default 150)
        snowflakeCount={500}
        style={{
          width: "100%",
          height: "500%",
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
