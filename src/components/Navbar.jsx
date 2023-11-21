import React, { useState } from "react";
import styles from "./Navbar.module.css";
import { getImageUrl } from "../utils";
import cat from "./Hero/cat.json";
import catSlip from "../data/CatSlip.json";
import Lottie from "lottie-react";

const Navbar = ({ onToggleSnowfall, onToggleMatrix }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <a className={styles.title} href="/">
        Portfolio
        <span className={styles.titleHover}>
          <Lottie animationData={cat} className={styles.catHang} />
          <Lottie animationData={catSlip} className={styles.catSlip} />
        </span>
      </a>
      <button
        className={styles.matrixBtn}
        onClick={() => {
          onToggleMatrix();
        }}
      >
        🧪
      </button>
      <button
        className={styles.matrixBtn}
        onClick={() => {
          onToggleSnowfall();
        }}
      >
        ☃️
      </button>
      <div className={styles.menu}>
        <img
          className={styles.menuBtn}
          src={
            menuOpen
              ? getImageUrl("nav/closeIcon.png")
              : getImageUrl("nav/menuIcon.png")
          }
          alt="menuBtn"
          onClick={() => {
            setMenuOpen(!menuOpen);
            // Call the provided callback to toggle snowfall
          }}
        />
        <ul
          className={`${styles.menuItems} ${menuOpen && styles.menuOpen}`}
          onClick={() => setMenuOpen(false)}
        >
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#experience">Experience</a>
          </li>
          <li>
            <a href="#projects">Projects</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
