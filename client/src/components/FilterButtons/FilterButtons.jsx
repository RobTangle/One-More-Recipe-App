import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./filterButtons.css";
import bananaGif from "../../assets/470.gif";
import * as actions from "../../redux/actions/index";

const FilterButtons = ({ onFilterOptionChange, resetFilter }) => {
  //! experimentar con mapeo de botones:
  // leo a todas las dietas:
  const dietsInState = useSelector((state) => state.diets);
  const dispatch = useDispatch();

  function getDietsFromDB() {
    dispatch(actions.setDietsToLoading());
    dispatch(actions.getDiets());
    console.log("dispatched getDiets()");
  }

  //! -----------------
  return (
    <>
      {/* //! ------experimentar map btns: */}
      <div
        className="filter-buttons-component"
        id="filter-buttons-component"
        key={Math.random()}
      >
        <label htmlFor="label-filter-diets">
          <span>Filter by diet</span>
        </label>
        {dietsInState?.loading ? (
          <div className="loading-gif">
            {/* <span>loading...</span> */}
            <img src={bananaGif} alt="gif de carga" />
          </div>
        ) : null}

        {dietsInState?.length > 0 ? (
          <div className="filter-buttons-container">
            <div className="filter-buttons">
              {" "}
              {dietsInState?.map((diet) => (
                <div key={diet.id}>
                  <button
                    key={Math.random()}
                    type="button"
                    name={diet.name}
                    value={diet.name}
                    onClick={onFilterOptionChange}
                  >
                    {" "}
                    {diet.name}
                  </button>
                </div>
              ))}
            </div>
            <div className="reset-filter">
              <button className="reset-filter" onClick={resetFilter}>
                Reset filter
              </button>
            </div>
          </div>
        ) : (
          <div className="no-diets">
            <div>No diets loaded to the state</div>
            <div className="get-diets-btn">
              <button type="button" onClick={getDietsFromDB}>
                Get diets
              </button>
            </div>
          </div>
        )}

        {dietsInState?.error ? (
          <div className="error-message">
            Ups! There was an ERROR: "{dietsInState.error}"
            <div>Try checking your internet connection</div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default FilterButtons;
