import "./App.css";
import { Route } from "react-router-dom";
import RecipeDetail from "./components/RecipeDetail/RecipeDetail.jsx";
import Nav from "./components/Nav/Nav.jsx";
import createRecipe from "./components/createRecipe/CreateRecipe";
import DBRecipes from "./components/DBRecipes/DBRecipes";
import LandingPage from "./components/LandingPage/LandingPage";
import SearchRecipes from "./components/SearchRecipes/SearchRecipes";

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={LandingPage} />
      <Route path="/home" component={Nav} />
      <Route path="/home" component={SearchRecipes} />
      <Route path="/home/recipes/:id" component={RecipeDetail} />
      <Route path="/home/searchRecipes" component={SearchRecipes} />

      <Route exact path="/home/createRecipe/" component={createRecipe} />
      <Route exact path="/home/recipesInDataBase/" component={DBRecipes} />
    </div>
  );
}

export default App;
