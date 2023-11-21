import { useState, useEffect } from "react";
import styled, { css, keyframes } from "styled-components";

const blinking = keyframes`
    0% {
        opacity: 1;
    }
    25% {
        opacity: 0;
    }
    75% {
        opacity: 1;
    }
`;

const BlinkingMixin = css`
  animation: ${blinking} ${(props) => props.caretBlinkingSpeed}ms linear
    infinite;
`;

const RenderedText = styled.p`
  ${(props) => props.styling}
  position: relative;
  display: inline;
  &::after {
    content: "";
    position: absolute;
    right: -${(props) => (props.displayCaret ? props.caretWidth - 1 : 0)};
    height: 1em;
    border-right: ${(props) => (props.displayCaret ? props.caretWidth : 0)}px
      solid ${(props) => props.caretColor};
    ${(props) => props.blinkingCaret && BlinkingMixin}
  }
`;

const GlitchingTypingText = (props) => {
  const {
    children,
    element,
    styling,
    displayCaret = true,
    caretWidth = 10,
    caretColor = "currentColor",
    blinkingCaret = false,
    caretBlinkingSpeed = 500,
    nextCharProbability = 1.9,
    typingDuration = 3000,
    glitchProbability = 0.05,
    potentialGlitchInterval = 10,
  } = props;
  const text = children;
  const [renderedText, setRenderedText] = useState(text || "");
  const [sliceIndex, setSliceIndex] = useState(0);
  const [typingIntervalID, setTypingIntervalID] = useState(null);
  const typingInterval = Math.floor(typingDuration / (text?.length || 1));

  const possibleChars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  const randomizeTextCharacter = (textToAugment) => {
    const charToReplaceIndex = Math.floor(Math.random() * textToAugment.length);
    const randomChar = possibleChars.charAt(
      Math.floor(Math.random() * possibleChars.length)
    );
    const splitText = textToAugment.split("");
    splitText[charToReplaceIndex] = randomChar;
    const newText = splitText.join("");
    return newText;
  };

  useEffect(() => {
    const gID = setInterval(() => {
      if (Math.random() > 1 - glitchProbability) {
        setRenderedText(randomizeTextCharacter(text));
      } else {
        if (renderedText !== text) {
          setRenderedText(text);
        }
      }
    }, potentialGlitchInterval);
    const tID = setInterval(() => {
      if (Math.random() > 1 - nextCharProbability) {
        setSliceIndex((index) => index + 1);
      }
    }, typingInterval);
    setTypingIntervalID(tID);

    return () => {
      clearInterval(gID);
      clearInterval(tID);
    };
  }, []);

  useEffect(() => {
    if (sliceIndex >= text.length) {
      clearInterval(typingIntervalID);
    }
  }, [sliceIndex]);

  return (
    <RenderedText
      as={element}
      styling={styling}
      displayCaret={displayCaret}
      caretWidth={caretWidth}
      caretColor={caretColor}
      blinkingCaret={blinkingCaret}
      caretBlinkingSpeed={caretBlinkingSpeed}
    >
      {renderedText.slice(0, sliceIndex)}
    </RenderedText>
  );
};

export default GlitchingTypingText;
