import React from "react";
import { useDispatch } from "react-redux";
import * as actions from "../../redux/actions/index";
import "./createRecipe.css";
// Importar las actions como Object Modules, sino los test no funcionarán!

//  Un formulario controlado con JavaScript con los siguientes campos:
// Nombre
// Resumen del plato
// Nivel de "comida saludable" (health score)
// Paso a paso

const CreateRecipe = () => {
  const [localState, setLocalState] = React.useState({
    title: "",
    summary: "",
    healthScore: 0, //! se lo pongo en null por default?
    steps: "",
    diets: [],
  });

  const dispatch = useDispatch();

  //h --- función de validación de createRecipe:
  //h La idea es que me devuelva true si todo está ok, o false si hay un error.

  // function validateForm(obj) {
  //   if (
  //     typeof obj.title !== "string" ||
  //     obj.title.length <= 2 ||
  //     obj.title.length > 70
  //   ) {
  //     return false;
  //   }
  //   if (obj.title) {
  //   }
  // }

  // function check_if_input_has_special_chars(element) {
  //   let textInput = element.value;
  //   let pattern = /[^a-zA-Z0-9 ]+$/gm;
  //   if (pattern.test(textInput)) {
  //     console.log("String contains special characters.");
  //   }

  //   element.value = textInput;
  // }

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

  function handleSubmit(e) {
    console.log("handleSubmit invocado. localState: ", localState);
    e.preventDefault();
    validateTitle(localState.title);
    console.log("Despues del validate");
    //! sigue enviando el dispatch aunque validateTitle retorne alert. Tengo que solucionar esto.
    dispatch(actions.createRecipe(localState));
  }

  //h --- función validadora:
  function validateTitle(title) {
    if (title.length > 60) {
      return alert("The title can't have more than 60 characters");
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

  return (
    <div>
      {console.log("En el return del componente. Me rendericé!")}
      <form action="" onSubmit={handleSubmit}>
        <fieldset>
          <legend>Create Recipe: </legend>
          <div className="createRecipe">
            <div>
              <label htmlFor="title">Title * </label>
              <input
                required
                type="text"
                id="title"
                name="title"
                onChange={handleOnChange}
              />
            </div>
            <div>
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
            {/* hacer validaciones de min=0 y max=100 */}
            <div>
              <label htmlFor="summary">Summary * </label>
              <textarea
                required
                name="summary"
                minLength="1"
                id="summary"
                placeholder="Don't introduce simbols like '[ ] { } > < '"
                cols="30"
                rows="10"
                onChange={handleOnChange}
              ></textarea>
            </div>
            <div>
              <label htmlFor="steps">Step by step </label>
              <textarea
                name="steps"
                id="steps"
                cols="30"
                rows="10"
                placeholder="Step by step..."
                onChange={handleOnChange}
              ></textarea>
            </div>
            <div className="check-boxes">
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
            <button type="submit">Create Recipe</button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default CreateRecipe;
