import { useState } from "react";

const SliderDropdown = ({ title, min, max, step }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [range, setRange] = useState({ minValue: min, maxValue: max });

  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleChange = (event, type) => {
    setRange((prev) => ({
      ...prev,
      [type]: Number(event.target.value),
    }));
  };

  const handleMinChange = (event) => {
    const value = Math.min(Number(event.target.value), range.maxValue - step);
    setRange((prev) => ({ ...prev, minValue: value }));
  };

  const handleMaxChange = (event) => {
    const value = Math.max(Number(event.target.value), range.minValue + step);
    setRange((prev) => ({ ...prev, maxValue: value }));
  };

  return (
    <div className="relative z-10">
      <button
        className="p-2 rounded-md w-full text-left filterDropdown"
        onClick={() => {
          setRange(!range);
          toggleDropdown();
        }}
      >
        {title}
      </button>
      <div
        className={`absolute top-full right-0 md:min-w-[300px] min-w-full bg-black bg-opacity-95 filterDropdown p-2 mt-2 transition-all duration-300 ease-in-out transform ${
          isOpen ? "opacity-100" : " opacity-0"
        } `}
        style={{ zIndex: 100 }}
      >
        <div className="relative flex items-center">
          {/* Slider track */}
          <span>Min: {range.minValue}</span>
          <div className="relative w-full h-2 bg-white rounded-full m-1">
            <div
              className="absolute h-2 bg-support rounded-full"
              style={{
                left: `${((range.minValue - min) / (max - min)) * 100}%`,
                right: `${100 - ((range.maxValue - min) / (max - min)) * 100}%`,
              }}
            ></div>
          </div>
          <span>Max: {range.maxValue}</span>
          {/* Min slider */}

          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={range.minValue}
            onChange={handleMinChange}
            className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none  bg-support"
            style={{
              pointerEvents: "auto",
              zIndex: range.minValue > max - 10 ? 2 : 1,
            }}
          />

          {/* Max slider */}
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={range.maxValue}
            onChange={handleMaxChange}
            className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none  text-support"
            style={{
              pointerEvents: "auto",
              zIndex: range.maxValue < min + 10 ? 2 : 1,
            }}
          />
        </div>

        {/* Display the selected min and max values */}
        <div className="flex justify-between mt-4"></div>
      </div>
    </div>
  );
};

export default SliderDropdown;
