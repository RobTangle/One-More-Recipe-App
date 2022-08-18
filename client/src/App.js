import "./App.css";
import { Route } from "react-router-dom";
import RecipeDetail from "./components/RecipeDetail/RecipeDetail.jsx";
import Nav from "./components/Nav/Nav.jsx";
import createRecipe from "./components/createRecipe/CreateRecipe";
import DBRecipes from "./components/DBRecipes/DBRecipes";

function App() {
  return (
    <div className="App">
      <h1>Henry Food</h1>
      <h3>RECIPES!</h3>
      <Route path="/" component={Nav} />
      <Route path="/recipes/:id" component={RecipeDetail} />
      <Route exact path="/createRecipe/" component={createRecipe} />
      <Route exact path="/recipesInDataBase/" component={DBRecipes} />
    </div>
  );
}

export default App;
