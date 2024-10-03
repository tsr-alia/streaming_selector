import React, { useEffect, useState } from "react";
import axios from "axios";
import FilterDropdown from "./FilterDropdown";

const FilterList = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [filters, setFilters] = useState([]);

  const handleDropdownToggle = (dropdownName) => {
    setOpenDropdown((prev) => (prev === dropdownName ? null : dropdownName));
  };

  useEffect(() => {
    // Fetching the movie data from the API
    const fetchFilters = async () => {
      try {
        const res = await axios.get("http://localhost:27017/api/questions");
        setFilters(res.data); // Assuming your API returns an array of movie objects in `data.movies`
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchFilters();
  }, []);

  return (
    <>
      <h3 className="text-white">Filters</h3>
      <div className="flex flex-row gap-x-4 gap-y-0 lg:justify-between pb-4 flex-wrap">
        {filters.map((filter, index) => (
          <FilterDropdown
            key={index}
            title={filter.title}
            name={filter.name}
            options={filter.options}
            isOpen={openDropdown === filter.name}
            handleOpen={handleDropdownToggle}
            first={index === 0}
            last={index === filters.length - 1}
          />
        ))}
        {/* <SliderDropdown title="Release Year" min={1900} max={2024} step={1} /> */}
      </div>
    </>
  );
};

export default FilterList;
