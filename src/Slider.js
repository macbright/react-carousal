import React, { useState } from "react";
import SliderData from "./sliderData.js";

function Slider() {
  const [touchStart, setTouchStart] = React.useState(0);
  const [touchEnd, setTouchEnd] = React.useState(0);

  function handleTouchStart(e) {
    setTouchStart(e.targetTouches[0].clientX);
  }

  function handleTouchMove(e) {
    setTouchEnd(e.targetTouches[0].clientX);
  }

  function handleTouchEnd() {
    if (touchStart - touchEnd > 150) {
      if (x === -100 * (SliderData.length - 1)) {
        setX(0); // go to first image
      } else {
        setX(x - 100); // go right
      }
    }

    if (touchStart - touchEnd < -150) {
      if (x === 0) {
        setX(-100 * (SliderData.length - 1)); // go to last image
      } else {
        setX(x + 100);
      }
    }
  }
  const [x, setX] = useState(0);
  const goLeft = () => {
    // if current image is first
    if (x === 0) {
      setX(-100 * (SliderData.length - 1)); // go to last image
    } else {
      setX(x + 100);
    }
  };
  const goRight = () => {
    // if current image is last
    if (x === -100 * (SliderData.length - 1)) {
      setX(0); // go to first image
    } else {
      setX(x - 100); // go right
    }
  };
  const goToSlide = (index) => {
    setX(-100 * index);
  };

  return (
    <div
      className="slider"
      onTouchStart={(touchStartEvent) => handleTouchStart(touchStartEvent)}
      onTouchMove={(touchMoveEvent) => handleTouchMove(touchMoveEvent)}
      onTouchEnd={() => handleTouchEnd()}
    >
      {SliderData.map((item, index) => {
        return (
          <div
            key={index}
            className="slide"
            style={{ transform: `translateX(${x}%)` }}
          >
            <div className="image-container">
              <img src={item.image} alt="slider"></img>
            </div>
          </div>
        );
      })}
      <button className="slider-button" id="left-button" onClick={goLeft}>
        <i className="arrow left"></i>
      </button>
      <button className="slider-button" id="right-button" onClick={goRight}>
        <i className="arrow right"></i>
      </button>
      <div className="slider-nav">
        {SliderData.map((item, index) => {
          return (
            <button
              className={`slider-indicator ${
                -(x / 100) === index ? "current-indicator" : ""
              }`}
              key={index.toString()}
              onClick={() => goToSlide(index)}
            ></button>
          );
        })}
      </div>
    </div>
  );
}

export default Slider;
