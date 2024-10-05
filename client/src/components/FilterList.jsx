import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import FilterDropdown from "./FilterDropdown";

const FilterList = ({ handleFiltering }) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);
  const containerRef = useRef(null);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [filterDropdowns, setFilterDropdowns] = useState([]);

  const handleDropdownToggle = (dropdownName, refDropdown) => {
    dropdownRef.current = refDropdown.current;
    setOpenDropdown((prev) => (prev === dropdownName ? null : dropdownName));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // If there is an open dropdown and the click is outside of it, close it
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && containerRef.current && !containerRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };
    // Listen for clicks outside
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleFilterChange = (name, value, checked, type) => {
    setSelectedFilters((prev) => {
      const updatedFilters = { ...prev };
      if (type === "checkbox") {
        if (!updatedFilters[name]) {
          updatedFilters[name] = [];
        }

        if (checked && !updatedFilters[name].includes(value)) {
          updatedFilters[name].push(value);
        } else {
          updatedFilters[name] = updatedFilters[name].filter(
            (item) => item !== value
          );
        }
      } else if (type === "radio") {
        updatedFilters[name] = value;
      }
      return updatedFilters;
    });
  };

  useEffect(() => {
    handleFiltering(selectedFilters);
  }, [selectedFilters]);

  // Fetching the quesions from the database
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const res = await axios.get("http://localhost:27017/api/questions");
        setFilterDropdowns(res.data); // Assuming your API returns an array of movie objects in `data.movies`
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchFilters();
  }, []);

  return (
    <>
      <h3 className="text-white">Filters</h3>
      <div className="flex flex-row gap-x-4 gap-y-0 w-[85%] lg:w-100 lg:justify-between pb-4 flex-wrap"
      ref={containerRef}>
        {filterDropdowns.map((filter, index) => (
          <FilterDropdown
            key={index}
            title={filter.title}
            name={filter.name}
            options={filter.options}
            type={filter.type}
            isOpen={openDropdown === filter.name}
            handleOpen={handleDropdownToggle}
            dropdownRef={dropdownRef}
            containerRef={containerRef}
            first={index === 0}
            last={index === filter.length - 1}
            selectedFilters={selectedFilters}
            onFilterChange={handleFilterChange}
          />
        ))}
      </div>
    </>
  );
};

export default FilterList;
