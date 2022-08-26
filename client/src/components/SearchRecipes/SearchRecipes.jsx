import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import "./searchRecipes.css";
import * as actions from "../../redux/actions/index";

const SearchRecipes = () => {
  const [localState, setlocalState] = React.useState({
    query: "",
    diet: "",
  });
  // const [localStateDiet, setLocalStateDiet] = React.useState("");

  const recipesSearched = useSelector((state) => state.recipes);
  const dispatch = useDispatch();

  //h-------------------------------
  function fromQueryToURL(obj) {
    let urleado = "";
    for (const [key, value] of Object.entries(obj)) {
      urleado += `${key}=${value}&`;
    }
    return urleado;
  }

  function handleSubmitAll(e) {
    e.preventDefault();
    dispatch(actions.getRecipesByQuery(fromQueryToURL(localState)));
  }

  function handleOnChange(e) {
    setlocalState({ ...localState, [e.target.name]: e.target.value });
  }

  function onKeyDown(e) {
    if (e.keyCode === 13) {
      handleSubmitAll(e);
    }
  }
  //h------------------------------

  return (
    <div>
      <div>
        <h1>Search recipes by title</h1>
      </div>
      <label htmlFor="title">&gt; </label>
      <input
        type="text"
        name="query"
        id="title"
        onChange={handleOnChange}
        onKeyDown={onKeyDown}
      />{" "}
      <br />
      {/* <label htmlFor="">By diet </label>
      <input type="text" name="diet" onChange={handleOnChange} /> */}
      <div>
        <button type="submit" onClick={handleSubmitAll}>
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchRecipes;
