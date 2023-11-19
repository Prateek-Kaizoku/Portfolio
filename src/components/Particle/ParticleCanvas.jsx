import React, { useEffect, useState } from "react";

const ParticleCanvas = () => {
  const [mouse, setMouse] = useState({
    x: null,
    y: null,
    radius: (window.innerHeight / 100) * (window.innerWidth / 100),
  });

  const [particleArray, setParticleArray] = useState([]);

  const Particle = class {
    constructor(x, y, directionX, directionY, size, color) {
      this.x = x;
      this.y = y;
      this.directionX = directionX;
      this.directionY = directionY;
      this.size = size;
      this.color = color;
    }

    draw() {
      const canvas = document.getElementById("canvas1");
      const ctx = canvas.getContext("2d");
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
      ctx.fillStyle = "#ffffff";
      ctx.fill();
    }

    update() {
      const canvas = document.getElementById("canvas1");
      const ctx = canvas.getContext("2d");

      if (this.x > canvas.width || this.x < 0) {
        this.directionX = -this.directionX;
      }
      if (this.y > canvas.height || this.y < 0) {
        this.directionY = -this.directionY;
      }

      let dx = mouse.x - this.x;
      let dy = mouse.y - this.y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < mouse.radius + this.size) {
        if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
          this.x += 10;
        }
        if (mouse.x > this.x && this.x > this.size * 10) {
          this.x -= 10;
        }
        if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
          this.y += 10;
        }
        if (mouse.y > this.y && this.y > this.size * 10) {
          this.y -= 10;
        }
      }

      this.x += this.directionX;
      this.y += this.directionY;
      this.draw();
    }
  };

  const init = () => {
    let tempParticleArray = [];
    let numberOfParticles = (window.innerHeight * window.innerWidth) / 9000;

    for (let i = 0; i < numberOfParticles * 3; i++) {
      let size = Math.random() * 5 + 1;
      let x =
        Math.random() * (window.innerWidth - size * 2 - size * 2) + size * 2;
      let y =
        Math.random() * (window.innerHeight - size * 2 - size * 2) + size * 2;
      let directionX = Math.random() * 5 - 2.5;
      let directionY = Math.random() * 5 - 2.5;
      let color = "#ffffff";

      tempParticleArray.push(
        new Particle(x, y, directionX, directionY, size, color)
      );
    }

    setParticleArray(tempParticleArray);
  };

  const connect = () => {
    const canvas = document.getElementById("canvas1");
    const ctx = canvas.getContext("2d");

    let opacityValue = 1;

    for (let a = 0; a < particleArray.length; a++) {
      for (let b = a; b < particleArray.length; b++) {
        let distance =
          (particleArray[a].x - particleArray[b].x) *
            (particleArray[a].x - particleArray[b].x) +
          (particleArray[a].y - particleArray[b].y) *
            (particleArray[a].y - particleArray[b].y);

        if (distance < (canvas.width / 5) * (canvas.height / 5)) {
          opacityValue = 1 - distance / 25000;
          ctx.strokeStyle = "rgba(140,85,31," + opacityValue + ")";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particleArray[a].x, particleArray[a].y);
          ctx.lineTo(particleArray[b].x, particleArray[b].y);
          ctx.stroke();
        }
      }
    }
  };

  const animate = () => {
    const canvas = document.getElementById("canvas1");
    const ctx = canvas.getContext("2d");

    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for (let i = 0; i < particleArray.length; i++) {
      particleArray[i].update();
    }

    connect();
  };

  const throttle = (callback, delay) => {
    let lastTime = 0;

    return function (event) {
      const currentTime = new Date();

      if (currentTime - lastTime >= delay) {
        callback(event);
        lastTime = currentTime;
      }
    };
  };

  const createParticlesOnClick = (event, particlesToAdd) => {
    for (let i = 0; i < particlesToAdd; i++) {
      let size = Math.random() * 5 + 1;
      let x = event.x;
      let y = event.y;
      let directionX = Math.random() * 5 - 2.5;
      let directionY = Math.random() * 5 - 2.5;
      let color = "#ffffff";

      setParticleArray((prevParticles) => [
        ...prevParticles,
        new Particle(x, y, directionX, directionY, size, color),
      ]);
    }
  };

  const handleResize = () => {
    const canvas = document.getElementById("canvas1");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    setMouse({
      ...mouse,
      radius: (window.innerHeight / 2000) * (window.innerHeight / 2000),
    });
    init();
  };

  const handleMouseOut = () => {
    setMouse({ x: undefined, y: undefined });
  };

  useEffect(() => {
    init();
    animate();

    // Resize event listener
    window.addEventListener("resize", handleResize);

    // Mouse out event listener
    window.addEventListener("mouseout", handleMouseOut);

    // Cleanup function
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, []); // Empty dependency array to run the effect only once

  const handleMouseMove = throttle((event) => {
    setMouse({ x: event.x, y: event.y });
  }, 16);

  // Event listeners
  window.addEventListener("mousemove", handleMouseMove);

  return (
    <canvas
      id="particle-canvas"
      style={{ width: "100%", height: "100%", position: "fixed", zIndex: 1 }}
      onClick={(event) => createParticlesOnClick(event, 5)} // Adjust the number of particles to add
    ></canvas>
  );
};

export default ParticleCanvas;
