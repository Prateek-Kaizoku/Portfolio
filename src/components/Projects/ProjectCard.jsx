import React, { useEffect, useState, useRef } from "react";
import projects from "../../data/projects.json";
import styles from "./Projects.module.css";
import ProjectCard from "./ProjectCard";

const Projects = () => {
  const [visibleProjects, setVisibleProjects] = useState([]);
  const projectRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleIds = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => parseInt(entry.target.getAttribute("data-id"), 10));
        setVisibleProjects(visibleIds);
      },
      { root: null, rootMargin: "0px", threshold: 0.5 }
    );

    projectRefs.current.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      projectRefs.current.forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  return (
    <section id="projects" className={styles.container}>
      <h2 className={styles.title}>Projects</h2>
      <div className={styles.projects}>
        {projects.map((project, id) => {
          const isVisible = visibleProjects.includes(id);
          const projectRef = useRef(null);
          projectRefs.current[id] = projectRef;

          return (
            <div key={id} data-id={id} ref={projectRef}>
              {/* Assign the actual element to the ref */}
              <ProjectCard project={project} isVisible={isVisible} />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Projects;
