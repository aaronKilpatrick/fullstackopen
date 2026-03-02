import { useState } from 'react';
import Heading from './components/Heading';
import mealsService from './services/mealsService';
import { testRecipe } from './test/Recipe.test';
import './index.css';

const App = () => {
  const [value, setValue] = useState('');
  const [recipes, setRecipes] = useState(null);
  const [recipe, setRecipe] = useState(null);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    mealsService
      .search(value)
      .then((recipeResponse) => setRecipes(recipeResponse));
  };

  return (
    <>
      <Heading title="React Recipes" />
      <div>
        <form onSubmit={handleSearch}>
          <input value={value} onChange={handleChange} />
          <button>Search</button>
        </form>
      </div>
      <div>
        <div className="recipe-card">
          <img
            src={`${testRecipe.strMealThumb}/small`}
            alt={testRecipe.strMeal}
          />
          <h3>{testRecipe.strMeal}</h3>
        </div>
      </div>
    </>
  );
};

export default App;
