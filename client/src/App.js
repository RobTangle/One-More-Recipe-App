import "./App.css";
import { Route } from "react-router-dom";
import Nav from "./components/Nav/Nav.jsx";
import CreateRecipe from "./components/createRecipe/CreateRecipe";
import LandingPage from "./components/LandingPage/LandingPage";
import SearchRecipes from "./components/SearchRecipes/SearchRecipes";
import RenderRecipeCardsAPI from "./components/RenderRecipeCardsAPI/RenderRecipeCardsAPI";
import RenderRecipeDetail from "./components/renderRecipeDetails/RenderRecipeDetails";
// import DBRecipes from "./components/DBRecipes/DBRecipes";
// import ExpRender from "./components/Paginacion/ExpRender";
// import { ErrorBoundary } from "./components/ErrorBoundary/ErrorBoundary";

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={LandingPage} />
      <Route path="/home" component={Nav} />
      <Route exact path="/home" component={SearchRecipes} />
      <Route exact path="/home" component={RenderRecipeCardsAPI} />
      <Route path="/home/recipes/:id" component={RenderRecipeDetail} />
      {/* <Route path="/home/expRender" component={ExpRender} /> */}
      <Route exact path="/home/createRecipe/" component={CreateRecipe} />
      {/* <Route exact path="/home/recipesInDataBase/" component={DBRecipes} /> */}
    </div>
  );
}

export default App;
