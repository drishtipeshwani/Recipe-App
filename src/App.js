import React,{useEffect ,useState} from "react" ; 
import './App.css';
import Recipe from './Recipe.js';
function App() {

  const API_ID = "ecba22f2";
  const API_KEY = "b3b166372adf56082c6cc61345d879d7" ; 

  const[recipes , setRecipes] = useState([]);
  const[search , setSearch] = useState(' ');
  const[query , setQuery] = useState('chicken');
  
useEffect(() => {
  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${API_ID}&app_key=${API_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
  } 

  getRecipes();

  
},[query]);

  

  const updateSearch = e => {
    setSearch(e.target.value) ; 
    
  }
  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return (
    <div className="App">
      <h1 className='title'>Your Favourite Food Recipes</h1>
      <form onSubmit={getSearch} className = 'search_form'>
        <input className = 'search_input' type ='text' value = {search} onChange ={updateSearch}/>
        <button  className='search_button' type = 'submit'>Search</button>
      </form>
      <div className='recipe_content'>
      {recipes.map(recipe => (
        <Recipe key = {recipe.recipe.calories}
        title = {recipe.recipe.label}
         calories = {recipe.recipe.calories} 
         image = {recipe.recipe.image}
         ingredients = {recipe.recipe.ingredients}
        />
      ))}
      </div>
    </div>
  );
}

export default App;
