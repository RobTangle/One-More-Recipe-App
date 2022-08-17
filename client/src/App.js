import "./App.css";
import { Route } from "react-router-dom";
import RecipeDetail from "./components/RecipeDetail";

function App() {
  return (
    <div className="App">
      <h1>Henry Food</h1>
      <h3>Movie Detail:</h3>
      <Route path="/recipes/:id" component={RecipeDetail} />
    </div>
  );
}

export default App;
