import React from "react";
import { getImageUrl } from "../../utils";
import styles from "./Contact.module.css";

const Contact = () => {
  return (
    <footer id="contact" className={styles.container}>
      <div className={styles.text}>
        <h2>Contact</h2>
        <p>Feel free to reach out</p>
      </div>
      <ul className={styles.links}>
        <li className={styles.link}>
          <a href="mailto:PrateekReachMe@gmail.com">
            <img src={getImageUrl("contact/emailIcon.png")} alt="Email" />
          </a>
        </li>
        <li className={styles.link}>
          <a href="https://www.linkedin.com/in/contact-prateek">
            {" "}
            <img src={getImageUrl("contact/linkedinIcon.png")} alt="Linkedin" />
          </a>
        </li>
        <li className={styles.link}>
          <a href="https://github.com/Prateek-Kaizoku">
            <img src={getImageUrl("contact/githubIcon.png")} alt="github" />
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Contact;
