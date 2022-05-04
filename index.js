const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');
const { deleteOne } = require('./models/Recipe.model');

const MONGODB_URI = 'mongodb+srv://Klaus2132:Knerten123@cluster0.2rfd3.mongodb.net/Recipes?retryWrites=true&w=majority';

let newRecipe= {
  title: "Hamburger",
  level: "Easy Peasy",
  ingredients: ["bread", "meat", "lettuce", "cheese", "tomato", "cucumber", "hamburger-dressing"],
  cuisine: "Amarican",
  image: "https://www.thespruceeats.com/thmb/c5W9eiifMTA2_OZ8tKfAL94q8q0=/2667x2000/smart/filters:no_upscale()/Hamburger-Hot-Dog-58add5f03df78c345bdef6ff.jpg",
  duration: 30,
  creator: "Klaus Haugnæss",
  created: 1885-01-01,
};


// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {newRecipe})
  .then(() => console.log(newRecipe.title))
    // Run your code here, after you have insured that the connection was made    Recipe.create({
  .then(() => Recipe.insertMany(data))
  .then((recipes) =>  recipes.forEach((element) => 
    console.log(element.title)))
  .then(() => Recipe.updateOne({ title: 'Rigatoni alla Genovese' }, { duration: 100 }),
	  console.log(`The recipe Rigatoni alla Genovese is updated`))
  .then(() => Recipe.deleteOne({ title: "Carrot Cake"}))
  .then (() => console.log("it deleted succsessfully"))

  .then(()=> mongoose.connection.close())
  .catch(error => {
    console.error('Error connecting to the database', error);
  });


/*
After completing every task, you need to close the database. 
Otherwise, the connection will stay open until the node.js process dies. 
Pay attention to the asynchronicity of the operation.
You should only close the connection after everything is done! :wink:
*/

