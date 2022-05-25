import React, { useState, useEffect, useRef } from "react";
import "./style.css";
import Slider from "./Slider";
import Indicator from "./indicator";

const CAROUSEL_LENGTH = 6;
const TOUCH_BUFFER = 100;

const Carousel = ({
  data = [],
  sliderLenth = CAROUSEL_LENGTH,
  auto = true,
  indicator = true,
  timer = 5000,
}) => {
  const ref = useRef(null);
  const [activePosition, setActivePosition] = useState(0);
  const [touchStart, setTouchStart] = React.useState(0);
  const [touchEnd, setTouchEnd] = React.useState(0);

  useEffect(() => {
    ref.current.style.transition = "all 0.25s ease-in-out";
    ref.current.style.transform = `translateX(-${activePosition}00%)`;
  }, [activePosition]);

  const goToSlide = (index) => {
    const totalSlideLength =
      data.length < sliderLenth ? data.length : sliderLenth;
    setActivePosition(() => {
      if (index < 0) {
        return totalSlideLength - 1;
      }
      return Math.abs(parseInt(index % totalSlideLength));
    });
  };

  function handleTouchStart(e) {
    setTouchStart(e.targetTouches[0].clientX);
  }

  function handleTouchMove(e) {
    setTouchEnd(e.targetTouches[0].clientX);
  }

  function handleTouchEnd() {
    if (touchStart - touchEnd > TOUCH_BUFFER) {
      goToSlide(activePosition + 1);
    }
    if (touchStart - touchEnd < -TOUCH_BUFFER) {
      goToSlide(activePosition - 1);
    }
  }

  useEffect(() => {
    let timeOut = null;
    console.log("render");
    if (!!auto) {
      const totalSlideLength =
        data.length < sliderLenth ? data.length : sliderLenth;
      timeOut = setInterval(() => {
        setActivePosition((prev) => {
          console.log(
            prev,
            totalSlideLength,
            "Math.abs(parseInt((prev + 1) % totalSlideLength))",
            (prev + 1) % 6
          );
          return parseInt((prev + 1) % 6);
        });
      }, timer);
    }
    return () => {
      auto && clearInterval(timeOut);
    };
  }, []);

  if (!Array.isArray(data)) return <></>;
  return (
    <div className={"carousel"}>
      <div className={"carousel__frame"}>
        <div
          className={"slider__contaienr"}
          onTouchEnd={handleTouchEnd}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          ref={ref}
        >
          {data?.slice(0, sliderLenth).map((item, index) => {
            console.log("i", index);
            return <Slider key={index} data={item} />;
          })}
        </div>
      </div>

      {indicator ? (
        <div className={"indicator__container"}>
          {data?.slice(0, sliderLenth).map((_, index) => {
            return (
              <Indicator
                key={index}
                active={index === activePosition}
                onClick={() => goToSlide(index)}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default Carousel;
