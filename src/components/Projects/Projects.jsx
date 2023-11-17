import React from "react";
import projects from "../../data/projects.json";
import styles from "./Projects.module.css";
import ProjectCard from "./ProjectCard";
import Fade from "react-reveal/Fade";

const Projects = () => {
  return (
    <section id="projects" className={styles.container}>
      <h2 className={styles.title}>Projects</h2>
      <div className={styles.projects}>
        {projects.map((project, id) => {
          return (
            <>
              <Fade>
                <ProjectCard key={id} project={project} />
              </Fade>
            </>
          );
        })}
      </div>
    </section>
  );
};

export default Projects;
