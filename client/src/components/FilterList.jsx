import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import FilterDropdown from "./FilterDropdown";
import { API_URL } from '../config';

const FilterList = ({ handleFiltering }) => {
  // states for opening and closing dropdowns
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);
  const containerRef = useRef(null);
  // state for saving filter selection
  const [selectedFilters, setSelectedFilters] = useState({});
  // state for populating the filters
  const [filterDropdowns, setFilterDropdowns] = useState([]);

  // Toggle open/close for filter menus
  const handleDropdownToggle = (dropdownName, refDropdown) => {
    dropdownRef.current = refDropdown.current;
    setOpenDropdown((prev) => (prev === dropdownName ? null : dropdownName));
  };

  // handle closing for clicking outside of the filters
  useEffect(() => {
    const handleClickOutside = (event) => {
      // If there is an open dropdown and the click is outside of it, close it
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setOpenDropdown(null);
      }
    };
    // Listen for clicks outside
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // log change in filter as soon as user clicks on them
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

  // pass selected filters to the function in Library to update filters and trigger fetching movies
  useEffect(() => {
    handleFiltering(selectedFilters);
  }, [selectedFilters]);

  // Fetching the questions from the database and populating the filters
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const res = await axios.get(`${API_URL}questions/`);
        setFilterDropdowns(res.data); 
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchFilters();
  }, []);

  return (
    <>
      <h3 className="text-white">Filters</h3>
      <div
        className="flex flex-row gap-x-4 gap-y-0 w-[85%] lg:w-100 lg:justify-between pb-4 flex-wrap"
        ref={containerRef}
      >
        {/* rendering filters according to fetched data and passing functions */}
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
