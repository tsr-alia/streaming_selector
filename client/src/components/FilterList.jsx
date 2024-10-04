import React, { useEffect, useState } from "react";
import axios from "axios";
import FilterDropdown from "./FilterDropdown";

const FilterList = ({handleFiltering}) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [filterDropdowns, setFilterDropdowns] = useState([]);

  const handleDropdownToggle = (dropdownName) => {
    setOpenDropdown((prev) => (prev === dropdownName ? null : dropdownName));
  };

  const handleFilterChange = (name, value, checked) => {
    setSelectedFilters((prev) => {
      const updated = { ...prev };
      if (!updated[name]) {
        updated[name] = [];
      }
      if (checked) {
        updated[name].push(value);
      } else {
        updated[name] = updated[name].filter((item) => item !== value);
      }
      return updated;
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
      <div className="flex flex-row gap-x-4 gap-y-0 lg:justify-between pb-4 flex-wrap">
        {filterDropdowns.map((filter, index) => (
          <FilterDropdown
            key={index}
            title={filter.title}
            name={filter.name}
            options={filter.options}
            isOpen={openDropdown === filter.name}
            handleOpen={handleDropdownToggle}
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
