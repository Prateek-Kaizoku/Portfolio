import React from "react";
import { getImageUrl } from "../../utils";
import styles from "./Hero.module.css";
import cat from "./cat.json";
import Lottie from "lottie-react";
import GlitchingTypingText from "../Canvas/GlitchTypingText";

const Hero = () => {
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Hi, I'm </h1>
        <GlitchingTypingText
          element="p"
          styling={{
            color: "#white",
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "4em",
            paddingRight: "10px",
          }}
          caretColor="White"
          caretWidth="5"
          caretblinkingspeed={500}
          blinkingCaret
        >
          Prateek!
        </GlitchingTypingText>
        <p className={styles.description}>
          {" "}
          I'm a FrontEnd Developer with 3.5 years of experience with React and
          NodeJS. Reach out if you'd like to learn more!{" "}
        </p>
        <a href="mailto:PrateekReachMe@gmail.com" className={styles.contactBtn}>
          Contact Me
        </a>
      </div>
      {/* <img
        src={getImageUrl("hero/jollyRoger.png")}
        className={styles.heroImg}
        alt="hero"
      /> */}
      <div className={styles.topBlur} />
      <div className={styles.bottomBlur} />
    </section>
  );
};

export default Hero;
