import React from "react";
import skils from "../../data/skills.json";
import { getImageUrl } from "../../utils";
import styles from "./Experience.module.css";
import { useInView } from "react-intersection-observer";
import history from "../../data/history.json";
const Experience = () => {
  const { ref: mref, inview: isSkillsVisible } = useInView();
  const { ref: skillRef, inview: isHistoryVisible } = useInView();
  return (
    <section className={styles.container} id="experience">
      <h2
        ref={skillRef}
        className={`${styles.title} ${
          isHistoryVisible ? styles.animateImage : ""
        }`}
      >
        {" "}
        Experience{" "}
      </h2>
      <div className={styles.content}>
        <div className={styles.skills}>
          {skils.map((skills, id) => {
            return (
              <div key={id} className={styles.skill}>
                <div className={styles.skillImageContainer}>
                  <img
                    ref={mref}
                    src={getImageUrl(skills.imageSrc)}
                    alt={skills.title}
                    className={`${styles.aboutImage} ${
                      isSkillsVisible ? styles.animateImage : ""
                    }`}
                  />
                </div>
                <p>{skills.title}</p>
              </div>
            );
          })}
        </div>

        <ul
          className={`${styles.history} ${
            isHistoryVisible ? styles.animateImage : ""
          }`}
        >
          {history.map((historyItem, id) => {
            return (
              <li className={styles.historyItem} key={id}>
                <img
                  src={getImageUrl(historyItem.imageSrc)}
                  alt={`${historyItem.organisation} Logo`}
                />
                <div className={styles.historyItemDetails}>
                  <h3>{`${historyItem.organisation},${historyItem.role}`}</h3>
                  <p>{`${historyItem.startDate} - ${historyItem.endDate} `}</p>
                  <ul>
                    {historyItem.experiences.map((experience, id) => {
                      return <li key={id}>{experience} </li>;
                    })}
                  </ul>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default Experience;
