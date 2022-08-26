import React from "react";

import "./filterButtons.css";

const FilterButtons = ({ onFilterOptionChange, resetFilter }) => {
  return (
    <div
      className="filter-buttons-container"
      id="filter-buttons-container"
      key={Math.random()}
    >
      <label htmlFor="label-filter-diets">
        <span>Filter by diet</span>
      </label>

      <div className="filter-buttons">
        <button
          onClick={onFilterOptionChange}
          value="gluten free"
          id="glutenFree"
        >
          Gluten Free
        </button>
        <button value="dairyFree" id="dairyFree" onClick={onFilterOptionChange}>
          Dairy Free
        </button>
        <button value="vegan" id="vegan" onClick={onFilterOptionChange}>
          Vegan
        </button>
        <button
          value="vegetarian"
          id="vegetarian"
          onClick={onFilterOptionChange}
        >
          Vegetarian
        </button>
        <button
          value="lacto ovo vegetarian"
          id="lacto-ovo-vegetarian"
          onClick={onFilterOptionChange}
        >
          Lacto ovo vegetarian
        </button>
        <button
          value="pescetarian"
          id="pescetarian"
          onClick={onFilterOptionChange}
        >
          Pescetarian
        </button>
        <button value="ketogenic" id="ketogenic" onClick={onFilterOptionChange}>
          Ketogenic
        </button>
        <button value="paleo" id="paleo" onClick={onFilterOptionChange}>
          Paleo
        </button>
        <button value="primal" id="primal" onClick={onFilterOptionChange}>
          Primal
        </button>
        <button
          value="lowFodmap"
          id="low FODMAP"
          onClick={onFilterOptionChange}
        >
          Low FODMAP
        </button>
        <button value="whole30" id="whole30" onClick={onFilterOptionChange}>
          Whole30
        </button>
        <button value="omnivore" id="omnivore" onClick={onFilterOptionChange}>
          Omnivore
        </button>
      </div>
      <div className="reset-button">
        <button className="reset-filter" onClick={resetFilter}>
          Reset filter
        </button>
      </div>
    </div>
  );
};

export default FilterButtons;
