import React from "react";
import PropTypes from "prop-types";
import { getImageUrl } from "../../utils";
import styles from "./ProjectCard.module.css";

const ProjectCard = ({
  project: { imageSrc, title, description, skills, demo, sourceUrl },
  isVisible = false,
}) => {
  return (
    <div className={styles.container}>
      <img className={styles.image} src={getImageUrl(imageSrc)} alt={title} />
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      <ul className={styles.skills}>
        {skills.map((skill, id) => (
          <li className={styles.skill} key={id}>
            {skill}
          </li>
        ))}
      </ul>
      <div className={styles.links}>
        <a className={styles.link} href={sourceUrl}>
          Source
        </a>
        <a className={styles.link} href={demo}>
          Demo
        </a>
      </div>
    </div>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.shape({
    imageSrc: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    skills: PropTypes.arrayOf(PropTypes.string),
    demo: PropTypes.string,
    sourceUrl: PropTypes.string,
  }),
  isVisible: PropTypes.bool,
};

export default ProjectCard;
