import React, { useState, useRef } from "react";
import {
  BsArrowLeftCircleFill,
  BsArrowRightCircleFill,
  BsFullscreen,
  BsFullscreenExit,
} from "react-icons/bs";

const Presentation = ({ data }) => {
  const [slide, setSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false); // State to track fullscreen mode
  const presentationRef = useRef(null); // Reference to the presentation container

  const nextSlide = () => {
    setSlide(slide === data.length - 1 ? 0 : slide + 1);
  };

  const prevSlide = () => {
    setSlide(slide === 0 ? data.length - 1 : slide - 1);
  };

  const goToSlide = (index) => {
    setSlide(index);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      presentationRef.current.requestFullscreen().catch((err) => {
        console.error(
          `Error attempting to enable full-screen mode: ${err.message}`
        );
      });
      setIsFullscreen(true); // Enable fullscreen mode
    } else {
      document.exitFullscreen();
      setIsFullscreen(false); // Exit fullscreen mode
    }
  };

  return (
    <>
      <div
        className={`relative w-full h-auto min-h-[300px] md:min-h-[400px] flex justify-center items-center overflow-hidden ${
          isFullscreen ? "fullscreen-class" : ""
        }`}
        ref={presentationRef}
      >
        <div
          className="absolute top-1/2 left-4 transform -translate-y-1/2 hover:cursor-pointer drop-shadow-lg z-20"
          style={{ color: "white" }}
          onClick={prevSlide}
        >
          <BsArrowLeftCircleFill size={30} />
        </div>

        {data &&
          data.map((item, index) => {
            return (
              <img
                src={item.src}
                alt={item.alt}
                key={index}
                className={`rounded-sm shadow-md object-contain transition-transform duration-400 ease-in-out absolute top-1/2 left-0 transform -translate-y-1/2 w-full ${
                  isFullscreen ? "h-screen" : "h-full"
                } ${
                  slide === index
                    ? "translate-x-0 z-10 opacity-100"
                    : slide > index
                    ? "-translate-x-full z-0 opacity-0"
                    : "translate-x-full z-0 opacity-0"
                }`}
              />
            );
          })}

        <div
          className="absolute top-1/2 right-4 transform -translate-y-1/2 hover:cursor-pointer drop-shadow-lg z-10"
          style={{ color: "white" }}
          onClick={nextSlide}
        >
          <BsArrowRightCircleFill size={30} />
        </div>

        <div
          className="absolute top-4 right-4 hover:cursor-pointer drop-shadow-lg z-20"
          style={{ color: "white" }}
          onClick={toggleFullscreen}
        >
          {document.fullscreenElement || isFullscreen ? (
            <BsFullscreenExit size={30} />
          ) : (
            <BsFullscreen size={30} />
          )}
        </div>

        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex justify-center items-center z-10">
          <span className="flex space-x-2">
            {data &&
              data.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-4 h-4 rounded-full shadow-lg ${
                    slide === index ? "bg-gray-500" : "bg-white"
                  } hover:cursor-pointer`}
                ></button>
              ))}
          </span>
        </div>
      </div>
    </>
  );
};

export default Presentation;
