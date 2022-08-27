import React from "react";
import { useDispatch } from "react-redux";
import * as actions from "../../redux/actions/index";
// import "./form.css";

//  Un formulario controlado con JavaScript con los siguientes campos:
// Nombre
// Resumen del plato
// Nivel de "comida saludable" (health score)
// Paso a paso

const Form = () => {
  const [localState, setLocalState] = React.useState({
    title: "",
    summary: "",
    healthScore: 0, //! se lo pongo en null por default?
    steps: "",
    image: "https://spoonacular.com/recipeImages/157103-312x231.jpg",
    diets: [],
  });

  //Este componente tiene que escuchar al state.newRecipe.
  // Según lo que escuche y el valor que tenga ese estado, va a renderizar una cosa u otra.

  const dispatch = useDispatch();

  //h ------------------------------
  //! Hacer funcionamiento para que cada checkbox me pushee/mande al dietId un número según la dieta.
  //! El objetivo es postear un array con números.
  //! Podría hacer que adentro de el handleSubmit, se chequee cuáles checkboxes están chequeados y ahí pushear esos valores al array.

  function handleOnChange(e) {
    setLocalState({ ...localState, [e.target.name]: e.target.value });
  }

  function handleHealthScoreChange(e) {
    setLocalState({
      ...localState,
      healthScore: Number(e.target.value),
    });
  }

  //h validate on Submit:
  function handleSubmit(e) {
    console.log("handleSubmit invocado. localState: ", localState);
    e.preventDefault();
    if (
      violatedTitleLength(localState.title) ||
      userIntroducedProhibitedSimbols(localState.title)
    ) {
      console.log("No pasé el primer test");
      return alert(
        "Invalid recipe title. Please, don't introduce simbols nor more than 100 characters"
      );
    }
    if (localState.summary.length > 500 || localState.summary.length < 1) {
      return alert(
        `Summary must have between 1 and 500 characters. Actual length: ${localState.summary.length}`
      );
    }
    if (userIntroducedProhibitedSimbols(localState.summary)) {
      return alert(`Prohibited simbols detected in the summary.`);
    }
    if (localState.healthScore > 100 || localState.healthScore < 0) {
      return alert("Health score must be a number between 0 and 100");
    }
    if (localState.steps.length > 3000) {
      return alert(
        `The 'steps' input exceeded the 3000 characters. Actual length: ${localState.steps.length}`
      );
    }

    console.log("Despues del validate. Despachando la action...");
    dispatch(actions.setNewRecipeToLoading());
    dispatch(actions.createRecipe(localState));
    // alert("Request sent. Search it by it's title in the /home search input.");
  }

  //h --- funciones auxiliares:
  function violatedTitleLength(title) {
    if (title.length > 100 || title.length < 1) {
      alert("The must have between 1 and 100 characters");
      return true;
    } else {
      return false;
    }
  }

  function userIntroducedProhibitedSimbols(inputString) {
    let charactersNotAllowed = /[^{};@>!<]*$/g;
    // /[^<;>@}{!]*$/g;
    if (inputString.search(charactersNotAllowed) !== 0) {
      console.log("ENTRË al !== 0 del USERiNTRODUCEDpHOsIMBOLS");
      return true;
    } else {
      return false;
    }
  }

  function handleCheckClick(e) {
    let diet = e.target.name;
    let isDietPresentInTheArray = localState.diets.includes(diet);

    if (e.target.checked === true && !isDietPresentInTheArray) {
      setLocalState({
        ...localState,
        diets: [...localState.diets, diet],
      });
      return;
    } else {
      if (e.target.checked === false && isDietPresentInTheArray) {
        let filteredArray = localState.diets.filter((el) => el !== diet);
        setLocalState({
          ...localState,
          diets: [...filteredArray],
        });
        return;
      }
    }
  }
  //h --- Fin funciones auxiliares ---

  return (
    <div className="create-recipe-container">
      {console.log("En el return del componente. Me rendericé!")}
      <form action="" onSubmit={handleSubmit}>
        <fieldset className="form-fieldset">
          <legend>Create Recipe: </legend>
          <div className="inside-form-container">
            <div className="form-text-input">
              <label htmlFor="title">Title * </label>
              <input
                required
                type="text"
                id="title"
                name="title"
                minLength={1}
                maxLength={100}
                onChange={handleOnChange}
              />
            </div>
            <div className="form-text-input">
              <label htmlFor="health-score">Health score * </label>
              <input
                required
                min="0"
                max="100"
                id="health-score"
                type="number"
                name="healthScore"
                onChange={handleHealthScoreChange}
              />
            </div>
            <div className="form-text-input">
              <label htmlFor="summary">Summary * </label>
              <textarea
                required
                name="summary"
                minLength="1"
                maxLength="500"
                id="summary"
                placeholder="Don't introduce simbols like ' ; @ ! { } > < ', nor more than 500 characters"
                cols="30"
                rows="10"
                onChange={handleOnChange}
              ></textarea>
            </div>
            <div className="form-text-input">
              <label htmlFor="steps">Step by step </label>
              <textarea
                name="steps"
                id="steps"
                cols="30"
                rows="10"
                maxLength={3000}
                placeholder="Step by step... (3000 characters maximum)"
                onChange={handleOnChange}
              ></textarea>
            </div>
            <div className="check-boxes">
              <div>
                <label htmlFor="">Gluten Free</label>
                <input
                  type="checkbox"
                  name="gluten free"
                  id="gluten_free_checkbox"
                  value="gluten free"
                  onClick={handleCheckClick}
                />
              </div>
              <div>
                <label htmlFor="">Ketogenic</label>
                <input
                  type="checkbox"
                  name="ketogenic"
                  id="ketogenic_checkbox"
                  value="ketogenic"
                  onClick={handleCheckClick}
                />
              </div>
              <div>
                <label htmlFor="">Lacto ovo vegetarian</label>
                <input
                  type="checkbox"
                  name="lacto ovo vegetarian"
                  id="lacto_ovo_vegetarian_checkbox"
                  value="lacto ovo vegeterian"
                  onClick={handleCheckClick}
                />
              </div>
              <div>
                <label htmlFor="">Low FODMAP</label>
                <input
                  type="checkbox"
                  name="lowFodmap"
                  id="lowFodmap_checkbox"
                  value="Low FODMAP"
                  onClick={handleCheckClick}
                />
              </div>

              <div>
                <label htmlFor="">Ovo Vegetarian</label>
                <input
                  type="checkbox"
                  name="ovo vegetarian"
                  id="ovovegetarian_checkbox"
                  value="Ovo-Vegeterian"
                  onClick={handleCheckClick}
                />
              </div>
              <div>
                <label htmlFor="">Paleolithic</label>
                <input
                  type="checkbox"
                  name="paleolithic"
                  id="paleolithic_checkbox"
                  value="paleolithic"
                  onClick={handleCheckClick}
                />
              </div>
              <div>
                <label htmlFor="">Pescetarian</label>
                <input
                  type="checkbox"
                  name="pescatarian"
                  id="pescatarian_checkbox"
                  value="pescatarian"
                  onClick={handleCheckClick}
                />
              </div>

              <div>
                <label htmlFor="">Primal</label>
                <input
                  type="checkbox"
                  name="primal"
                  id="primal_checkbox"
                  value="primal"
                  onClick={handleCheckClick}
                />
              </div>

              <div>
                <label htmlFor="">Vegan</label>
                <input
                  type="checkbox"
                  name="vegan"
                  id="vegan_checkbox"
                  value="vegan"
                  onClick={handleCheckClick}
                />
              </div>
              <div>
                <label htmlFor="">Vegeterian</label>
                <input
                  type="checkbox"
                  name="vegetarian"
                  id="vegetarian_checkbox"
                  value="vegetarian"
                  onClick={handleCheckClick}
                />
              </div>
              <div>
                <label htmlFor="">Whole30</label>
                <input
                  type="checkbox"
                  name="whole 30"
                  id="whole30_checkbox"
                  value="whole 30"
                  onClick={handleCheckClick}
                />
              </div>
            </div>
            <button type="submit" className="submit-recipe-btn">
              Create Recipe
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default Form;
