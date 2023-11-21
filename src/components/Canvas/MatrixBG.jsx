import React, { useState } from "react";
import Canvas from "../Canvas/Canvas";

const MatrixBG = (props) => {
  const [ctx, setCtx] = useState(null);
  const [canvasWidth, setCanvasWidth] = useState(null);

  const establishContext = (context) => {
    setCtx(context);
  };

  const establishCanvasWidth = (width) => {
    setCanvasWidth(width);
  };
  // Setting up the letters
  // Move the array outside draw so it is not needlessly recalculated on each call to draw
  const chars =
    "2率ネカリ電批意変げちつら掌授エヲネ当融ハトキノ質均イ書少じこ日紙べ摘囲ひぐル代築だひち格社状ゃだぐ由寄へに焦父寄ワ確戦さびり環要ホ披情ノ不越取ょもつ。現へりっ策新カヨ山91学ぶさらざ余7違ふれう鮮天例オミ鹿筆炎ホヲタ世判てかばで再退ヌネサ首場イコ初膜でち裕応ぞ刻歩ヘネセヤ妊無ょ真傍ケニ育粘ヲムハ会郎再秘";
  const letters = chars.split("");

  // Font-size remains constant, so similarly move outside draw
  const fontSize = 10;
  const columns = canvasWidth ? canvasWidth / fontSize : 200;
  const drops = [];
  for (let i = 0; i < columns; i++) {
    drops[i] = 0;
  }

  const convertMousePosToRowsAndCols = (x, y) => {
    // get col position
    const col = Math.floor(x / fontSize);

    // get row pos
    const row = Math.min(
      Math.ceil(y / fontSize),
      Math.floor(ctx.canvas.height)
    );

    return { row, col };
  };

  // Disturbance Effect Handlers
  let disturbanceRow = -100;
  let disturbanceCol = -10;
  let timeout;

  const disturbanceEffect = (e) => {
    clearTimeout(timeout);
    const bounds = e.target.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top;
    const { row, col } = convertMousePosToRowsAndCols(x, y);
    disturbanceRow = row;
    disturbanceCol = col;
    timeout = setTimeout(() => {
      disturbanceRow = -1;
      disturbanceCol = -1;
    }, 1);
  };

  const isDisturbanceAffectedPosition = (dropIndex) => {
    return (
      drops[dropIndex] * fontSize > disturbanceRow &&
      dropIndex === disturbanceCol
    );
  };

  const draw = () => {
    if (ctx) {
      ctx.fillStyle = "rgba(0, 0, 0, .1)";
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillStyle = "#0f0";
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        drops[i]++;
        if (drops[i] * fontSize > ctx.canvas.height && Math.random() > 0.95) {
          drops[i] = 0;
        }
        if (isDisturbanceAffectedPosition(i)) {
          const h = Math.max(i - 1, 0);
          const j = Math.min(i + 1, Math.floor(columns));
          drops[h] = disturbanceRow;
          drops[i] = disturbanceRow;
          drops[j] = disturbanceRow;
        }
      }
    }
  };

  // Disturbance Effect Handlers

  return (
    <Canvas
      draw={draw}
      onMouseMove={disturbanceEffect}
      establishContext={establishContext}
      establishCanvasWidth={establishCanvasWidth}
    />
  );
};

export default MatrixBG;
