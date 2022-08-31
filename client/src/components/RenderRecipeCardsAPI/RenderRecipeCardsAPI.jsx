import React from "react";
import RecipeCardAPI from "../RecipeCardAPI/RecipeCardAPI";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../redux/actions";
import "./renderRecipeCardsAPI.css";
import { Paginacion } from "../Paginacion/Paginacion";
import FilterButtons from "../FilterButtons/FilterButtons";
import {
  callBackFilter,
  orderByHealthScore,
  orderByHealthScoreInvert,
  orderByTitleInvertExp,
  orderByTitleExp,
  checkDietsAndListThem,
} from "../../auxiliaryModules/functions";
import bananaGif from "../../assets/470.gif";

const RenderRecipeCardsAPI = (props) => {
  const recipesSearched = useSelector((state) => state.recipes);
  const newRecipeState = useSelector((state) => state.newRecipe);
  const recipeDetailState = useSelector((state) => state.recipeDetail);

  const dispatch = useDispatch();

  const [localState, setLocalState] = React.useState([]);

  React.useEffect(() => {
    setLocalState(recipesSearched);
    console.log(
      "setLocalState re valorizado por cambio en recipesSearched o por remontada. Resetea los filtros asi figuran todas las tarjetas."
    );
  }, [recipesSearched]);

  //h Cuando se monta el componente chequea recipeDetail y newRecipe para limpiarlos si hace falta:
  React.useEffect(() => {
    console.log("Me monté y chequeo recipeDetail y newRecipe");
    if (
      recipeDetailState.pure ||
      recipeDetailState.title ||
      recipeDetailState.error
    ) {
      dispatch(actions.clearDetail());
      console.log("despaché el clearDetail");
    }
    if (newRecipeState.title || newRecipeState.error) {
      dispatch(actions.clearNewRecipe());
      console.log("despaché el clearNewRecipe");
    }
  }, []);

  //h Para paginado:
  const [page, setPage] = React.useState(1);
  const [quantity, setQuantity] = React.useState(9);
  let maxPages = localState.length / quantity;

  //h Cuando aprieto un botón de filtrado:
  function onFilterOptionChange(e) {
    // console.log(`e.target.value: `, e.target.value);
    if (Array.isArray(recipesSearched)) {
      let filteredRecipes = recipesSearched.filter((receta) =>
        callBackFilter(receta, e.target.value)
      );

      setLocalState([...filteredRecipes]);
      // setea la Page a 1 cuando filtro así no queda con un valor inapropiado:
      setPage(1);
    }
  }

  //h --- Reset filters:
  function resetFilter() {
    // console.log("Reset filter...");
    setLocalState(recipesSearched);
    setPage(1);
  }

  return (
    <div key={Math.random()} id="render-container">
      <span id="arriba"></span>
      <FilterButtons
        onFilterOptionChange={onFilterOptionChange}
        resetFilter={resetFilter}
      />
      <div className="order-by-container">
        <div className="order-title">
          <span>Order by title: </span>
          <button onClick={(e) => orderByTitleExp(localState, setLocalState)}>
            ¡
          </button>
          <button
            onClick={(e) => orderByTitleInvertExp(localState, setLocalState)}
          >
            !
          </button>
        </div>
        <div className="order-healthScore">
          <span>Order by health score: </span>
          <button
            onClick={(e) => orderByHealthScore(localState, setLocalState)}
          >
            ¡
          </button>
          <button
            onClick={(e) => orderByHealthScoreInvert(localState, setLocalState)}
          >
            !
          </button>
        </div>
      </div>
      {localState?.length > 9 ? (
        <Paginacion
          // key={Math.random()}
          page={page}
          setPage={setPage}
          maxPages={maxPages}
          localState={localState}
          quantity={quantity}
        />
      ) : null}

      {recipesSearched?.loading ? (
        <div className="loading-gif">
          {/* <span>loading...</span> */}
          <img src={bananaGif} alt="gif de carga" />
        </div>
      ) : null}

      {localState?.error ? (
        <div className="error-message">
          Ups! There was an ERROR: "{localState.error}"
          <div>Try checking your internet connection</div>
        </div>
      ) : null}

      {Array.isArray(localState) && localState.length === 0 ? (
        <div className="cero-coincidencias"> No matches...</div>
      ) : null}

      <div className="render-cards">
        {Array.isArray(localState) && localState.length > 0
          ? localState
              .slice((page - 1) * quantity, (page - 1) * quantity + quantity)
              .map((recipeAPI) => {
                return (
                  <RecipeCardAPI
                    key={recipeAPI.id}
                    id={recipeAPI.id}
                    title={recipeAPI.title}
                    image={recipeAPI.image}
                    diets={checkDietsAndListThem(recipeAPI)}
                    // diets={recipeAPI.diets}
                    healthScore={recipeAPI.healthScore}
                  />
                );
              })
          : null}
      </div>
      {/* {localState.length > 9 ? (
        <Paginacion page={page} setPage={setPage} maxPages={maxPages} localState={localState} quantity={quantity} />
      ) : null} */}
      {localState.length > 3 ? (
        <div className="go-top">
          <a href="#arriba">Go to the top</a>
        </div>
      ) : null}
    </div>
  );
};

export default RenderRecipeCardsAPI;
