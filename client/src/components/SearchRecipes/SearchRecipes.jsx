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

  // React.useEffect(() => {
  //   dispatch(actions.getRecipesByTitle);
  // }, [dispatch]);

  //h-------------------------------
  function fromQueryToURL(obj) {
    let urleado = "";
    for (const [key, value] of Object.entries(obj)) {
      urleado += `${key}=${value}&`;
    }
    return urleado;
  }
  //h------------------------------

  function handleSubmitTitle(e) {
    e.preventDefault();
    dispatch(actions.getRecipesByTitle(localState.query));
  }

  function handleSubmitDiet(e) {
    e.preventDefault();
    dispatch(actions.getRecipesByDiet(localState.diet));
  }

  function handleSubmitAll(e) {
    e.preventDefault();
    dispatch(actions.getRecipesByQuery(fromQueryToURL(localState)));
  }

  function handleOnChange(e) {
    setlocalState({ ...localState, [e.target.name]: e.target.value });
  }

  return (
    <div>
      <div>
        <h1>Search recipes:</h1>
      </div>
      <form action="" onSubmit={handleSubmitTitle}>
        <label htmlFor="">By title: </label>
        <input type="text" name="query" onChange={handleOnChange} />
        <button type="submit">Search</button>
      </form>
      <form action="" onSubmit={handleSubmitDiet}>
        <label htmlFor="">By diet</label>
        <input type="text" name="diet" onChange={handleOnChange} />
        <button type="submit">Search</button>
      </form>
      <div>
        Search by title and diet:
        <button type="submit" onClick={handleSubmitAll}>
          Search title and diet
        </button>
      </div>
    </div>
  );
};

export default SearchRecipes;
