const mongoose = require("mongoose");
const Recipe = require("./models/Recipe.model"); // Import of the model Recipe from './models/Recipe.model.js'
const data = require("./data.js"); // Import of the data from './data.js'

// const recipeModel = mongoose.model("Recipe", Recipe);

// Connection to the database "recipeApp"
mongoose
  .connect("mongodb://localhost/recipe-app-dev", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(x =>
    console.log(
      `Connected to Mongo! 🔌 Database name: "${x.connections[0].name}"`
    )
  )
  .catch(err => console.error("Error connecting to mongo", err))
  .then(() => {
    return Recipe.insertMany(data);
  })
  .then(recipe => {
    recipe.forEach(element => console.log(`👉🏽${element.title}`));
  })
  .then(() => {
    Recipe.updateOne({ title: "Rigatoni alla Genovese" }, { duration: 100 });
  })
  .then(() => {
    Recipe.findOne({ title: "Rigatoni alla Genovese" }, function(
      error,
      newDuration
    ) {
      if (newDuration.duration === 100) {
        console.log(" dutation was updated");
      }
    });
  })
  .then(() => {
    Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .then(() => {
    console.log("Carrot Cake was removed successfully 👍🏽  !!");
  })
  .then(() => {
    mongoose.connection.close();
  })
  .catch(err => console.error("Error closing mongo 🖖🏽 ", err));
