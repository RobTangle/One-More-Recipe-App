import React from "react";
import { useDispatch } from "react-redux";
import * as actions from "../../redux/actions/index";
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
    healthScore: 10,
    steps: "",
    diet: "",
  });

  const dispatch = useDispatch();

  function handleOnChange(e) {
    setLocalState({ ...localState, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    console.log("handleSubmit invocado. localState: ", localState);
    e.preventDefault();
    dispatch(actions.createRecipe(localState));
  }

  return (
    <div>
      {console.log("En el return del componente. Me rendericé!")}
      <form action="" onSubmit={handleSubmit}>
        <fieldset>
          <legend>Create Recipe: </legend>
          <div className="createRecipe">
            <div>
              <label htmlFor="">Title: </label>
              <input type="text" name="title" onChange={handleOnChange} />
            </div>
            <div>
              <label htmlFor="">Health score: </label>
              <input
                type="number"
                name="healthScore"
                onChange={handleOnChange}
              />
            </div>
            {/* hacer validaciones de min=0 y max=100 */}
            <div>
              <label htmlFor="">Summary: </label>
              <textarea
                name="summary"
                id=""
                cols="30"
                rows="10"
                onChange={handleOnChange}
              ></textarea>
            </div>
            <div>
              <label>Step by step: </label>
              <textarea
                name="steps"
                id="steps"
                cols="30"
                rows="10"
                placeholder="Step by step..."
              ></textarea>
            </div>
            <div>
              <label htmlFor="">diet: </label>
              <input type="text" name="diet" onChange={handleOnChange} />
            </div>
            <div>
              <label htmlFor="">Vegan</label>
              <input
                type="checkbox"
                name="vegan"
                id="vegan_checkbox"
                value="vegan"
              />
            </div>
            <div>
              <label htmlFor="">Ketogenic</label>
              <input
                type="checkbox"
                name="ketogenic"
                id="ketogenic_checkbox"
                value="ketogenic"
              />
            </div>
            <div>
              <label htmlFor="">Gluten Free</label>
              <input
                type="checkbox"
                name="glutenFree"
                id="gluten_free_checkbox"
                value="gluten free"
              />
            </div>
            <div>
              <label htmlFor="">Carnivore</label>
              <input
                type="checkbox"
                name="carnivore"
                id="carnivore_checkbox"
                value="carnivore"
              />
            </div>
            <button type="submit">Create Recipe</button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default CreateRecipe;
