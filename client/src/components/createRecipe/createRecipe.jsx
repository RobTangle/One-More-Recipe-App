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
                onChange={handleOnChange}
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
              ></textarea>
            </div>
            <div>
              <label htmlFor="">diet </label>
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
            <div>
              <label htmlFor="">Gluten Free</label>
              <input
                type="checkbox"
                name="carnivore"
                id="carnivore_checkbox"
                value="Gluten Free"
              />
            </div>

            <div>
              <label htmlFor="">Ketogenic</label>
              <input
                type="checkbox"
                name="carnivore"
                id="carnivore_checkbox"
                value="Ketogenic"
              />
            </div>

            <div>
              <label htmlFor="">Vegeterian</label>
              <input
                type="checkbox"
                name="carnivore"
                id="carnivore_checkbox"
                value="Vegeterian"
              />
            </div>

            <div>
              <label htmlFor="">Lacto-Vegeterian</label>
              <input
                type="checkbox"
                name="carnivore"
                id="carnivore_checkbox"
                value="Lacto-vegeterian"
              />
            </div>

            <div>
              <label htmlFor="">Ovo-Vegeterian</label>
              <input
                type="checkbox"
                name="carnivore"
                id="carnivore_checkbox"
                value="Ovo-Vegeterian"
              />
            </div>

            <div>
              <label htmlFor="">Vegan</label>
              <input
                type="checkbox"
                name="carnivore"
                id="carnivore_checkbox"
                value="Vegan"
              />
            </div>

            <div>
              <label htmlFor="">Pescetarian</label>
              <input
                type="checkbox"
                name="carnivore"
                id="carnivore_checkbox"
                value="Pescetarian"
              />
            </div>

            <div>
              <label htmlFor="">Paleo</label>
              <input
                type="checkbox"
                name="carnivore"
                id="carnivore_checkbox"
                value="Paleo"
              />
            </div>

            <div>
              <label htmlFor="">Primal</label>
              <input
                type="checkbox"
                name="carnivore"
                id="carnivore_checkbox"
                value="Primal"
              />
            </div>

            <div>
              <label htmlFor="">Low FODMAP</label>
              <input
                type="checkbox"
                name="carnivore"
                id="carnivore_checkbox"
                value="Low FODMAP"
              />
            </div>

            <div>
              <label htmlFor="">Whole30</label>
              <input
                type="checkbox"
                name="carnivore"
                id="carnivore_checkbox"
                value="Whole30"
              />
            </div>

            <div>
              <label htmlFor="">Omnivore</label>
              <input
                type="checkbox"
                name="carnivore"
                id="carnivore_checkbox"
                value="Omnivore"
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
