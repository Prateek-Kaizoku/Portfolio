import React, { useEffect, useRef, useState } from "react";
import { getImageUrl } from "../../utils";
import styles from "./About.module.css";
import { useInView } from "react-intersection-observer";

const About = () => {
  const { ref: ref, inView: eleVisible } = useInView();
  const { ref: rocketRef, inView: rocketIsVisible } = useInView();
  const { ref: imageRef, inView: imageIsVisible } = useInView();

  return (
    <section className={styles.container} id="about">
      <h2 className={styles.title}>About</h2>
      <div className={styles.content}>
        <ul className={styles.aboutItems}>
          <li ref={ref} className={styles.aboutItem}>
            <img src={getImageUrl("about/cursorIcon.png")} alt="cursor"></img>{" "}
            <div className={styles.aboutItemText}>
              <h3>
                FrontEnd Developer
                <span
                  ref={rocketRef}
                  className={`${styles.rocket} ${
                    rocketIsVisible ? styles.animateRocket : ""
                  }`}
                >
                  🚀
                </span>
              </h3>
              <p>
                I'm a FrontEnd Developer with experience in building responsive
                and accessible web applications.
              </p>
            </div>
          </li>
          <li className={styles.aboutItem}>
            <img src={getImageUrl("about/serverIcon.png")} alt="cursor"></img>{" "}
            <div className={styles.aboutItemText}>
              <h3>Back End Developer</h3>
              <p>
                I'm a BackEnd Developer with experience in building RESTful APIs
                using NodeJS and ExpressJS.
              </p>
            </div>
          </li>{" "}
          <li className={styles.aboutItem}>
            <img src={getImageUrl("about/serverIcon.png")} alt="cursor"></img>{" "}
            <div className={styles.aboutItemText}>
              <h3>UI designer</h3>
              <p>
                I'm a UI designer with experience in building responsive and
                accessible web applications.
              </p>
            </div>
          </li>
        </ul>
        <img
          ref={imageRef}
          src={getImageUrl("about/onePiece.png")}
          alt="about"
          className={`${styles.aboutImage} ${
            imageIsVisible ? styles.animateImage : ""
          }`}
        />
      </div>
    </section>
  );
};

export default About;
