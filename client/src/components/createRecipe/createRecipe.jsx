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
    e.preventDefault();
    dispatch(actions.createRecipe(localState));
  }

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="">Title: </label>
        <input type="text" name="title" onChange={handleOnChange} />
        <label htmlFor="">Health score: </label>
        <input type="number" name="healthScore" onChange={handleOnChange} />
        {/* hacer validaciones de min=0 y max=100 */}
        <label htmlFor="">Summary: </label>
        <textarea
          name="summary"
          id=""
          cols="30"
          rows="10"
          onChange={handleOnChange}
        ></textarea>
        <label htmlFor="">diet: </label>
        <input type="text" name="diet" onChange={handleOnChange} />
        <button type="submit">Create Recipe</button>
      </form>
    </div>
  );
};

export default CreateRecipe;
