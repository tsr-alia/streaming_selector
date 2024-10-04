const FilterDropdown = ({
  title,
  options,
  type,
  name,
  isOpen,
  handleOpen,
  dropdownRef,
  first,
  last,
  onFilterChange,
  selectedFilters

}) => {


  const toggleDropdown = () => {
    handleOpen(name, dropdownRef);
  };

  const handleInputChange = (e) => {
    const { value, checked } = e.target;
    onFilterChange(name, value, checked, type);
  }

  return (
    <>
      <div 
        className="relative ">
        <button
          className="p-2 rounded-md w-full text-left filterDropdown"
          onClick={toggleDropdown}
        >
          {title}
        </button>
        {isOpen && (
        <div
          ref={dropdownRef}
          className={`absolute top-full ${
            first
              ? "lg:left-0"
              : last
              ? "lg:right-0"
              : "lg:left-1/2  lg:transform lg:-translate-x-1/2"
          } w-max min-w-full bg-black bg-opacity-95 filterDropdown p-2 mt-2 transition-all duration-300 ease-in-out transform z-50 ${
            isOpen ? "opacity-100 " : " opacity-0 hidden"
          } `}
        >
          {options.map((option, index) => (
            <label
              key={option.value}
              className={`flex items-center justify-center text-center cursor-pointer w-full py-2 px-1 rounded-3xl hover:bg-support
          ${
            selectedFilters[name] &&
            selectedFilters[name].includes(option.value)
              ? "bg-red"
              : "bg-transparent"
          }
          `}
              htmlFor={option.value}
            >
              <input
                id={option.value}
                type="checkbox"
                className="hidden"
                value={option.value}
                onChange={handleInputChange}
                name={name}
                checked={
                  selectedFilters[name] &&
                  selectedFilters[name].includes(option.value)
                }
              />
              {option.text}
            </label>
          ))}
        </div>)}
      </div>
    </>
  );
};

export default FilterDropdown;
