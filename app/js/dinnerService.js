// Here we create an Angular service that we will use for our 
// model. In your controllers (or other services) you can include the
// dependency on any service you need. Angular will insure that the
// service is created first time it is needed and then just reuse it
// the next time.
dinnerPlannerApp.factory('Dinner',function ($resource) {
  
var nrGuests = 3;
  var menu = {"Appetizers":"", "Main Dish":"", "Desserts":""}; 
  //TODO Lab 2 implement the data structure that will hold number of guest
  // and selected dinner options for dinner menu


  //var currentDishId = "";
  var currentDish = "herj";
  var id = 178171;

  var filter = "Appetizer";
  var query = "hejhej";
  
  var dishList = [];

  var apiKey = "dvx6xnM6eJJ7D6eU5toZ9RnMtHN74Gye";
  var apiKey2 = "dvxF0CCPfnBJczzM0l3mACa6iROX43Py";

  this.getDishList = function(){
    //console.log(dishList);
    return dishList;
  }


  this.setFilterSearch = function(newFilter, newSearchText){
    filter = newFilter;
    searchText = newSearchText;
    this.getAllDishes();

  }
  this.getDish = function(){
    return currentDish;
  }
  this.setNumberOfGuests = function(num) {
    if (num>0) {
      nrGuests = num; 
      //console.log("changed nrG"); 
    }
  }

  // should return 
  this.getNumberOfGuests = function() {
    return nrGuests;
  }

  this.getCurrentDish = function() {
    return currentDish;
    
  }
  this.setCurrentDish = function(newDish) {
    console.log("currentdish ändras till: "+newDish);
    currentDish = newDish;

  }
  this.setCurrentDishId = function(id) {
    console.log("currentdishID ändras till: "+id);
    currentDishId = id;
    this.getDishAPI();
  }

  //Returns the dish that is on the menu for selected type 
  this.getSelectedDish = function(type) {
    return menu[type];
  }

  //Returns all the dishes on the menu.
  this.getFullMenu = function() {
    var array =[];
    if(menu.Appetizers!=""){
      array.push(menu.Appetizers);
    }
    if(menu["Main Dish"]!=""){
      array.push(menu["Main Dish"]);
    }
    if(menu.Desserts!=""){
      array.push(menu.Desserts);
    }

    return array;
  }

  //Returns all ingredients for all the dishes on the menu.
  this.getAllIngredients = function() {
    var menuDishes = this.getFullMenu();
    var ingredients = [];
    /*for (dish in menuDishes) {
      for(ing in dish.ingredients){
        ingredients.push(ing);
      }
    }*/
    return ingredients;
  }

  this.getDishPrice = function(obj) {
    var dish = obj;
    var dishPrice = 0;
    console.log("getDishPrice körs");
    try{
      console.log("går in i try");
      for (i in dish.Ingredients) {
        dishPrice += dish.Ingredients[i].MetricQuantity*nrGuests;
      }
      dishPrice = +(dishPrice.toFixed(2));
      console.log("går förbi toFixed");
      return dishPrice;
    }catch(e){
      console.log("går in i catch");
      console.log("currentdish är inget dish-objekt");
    }

  }

  //Returns the total price of the menu (all the ingredients multiplied by number of guests).
  this.getTotalMenuPrice = function() {
    var totalPrice = 0;
    var fullMenu = this.getFullMenu();
    for(dish in fullMenu){
      //console.log(dish);
      if(fullMenu[dish]!=""){
        for (i in fullMenu[dish].Ingredients) {
          
          totalPrice += fullMenu[dish].Ingredients[i].MetricQuantity*nrGuests;
        }
        
        
      }
    } 
    console.log(fullMenu + "cost: "+totalPrice);
    return +(totalPrice.toFixed(2));
  }

  //Adds the passed dish to the menu. If the dish of that type already exists on the menu
  //it is removed from the menu and the new one added.
  this.addDishToMenu = function(obj) {
    var type = obj.Category;
    console.log(type);
    if (menu[type] != "") {
      //this.removeDishFromMenu(menu[type]);
      menu[type] = obj;
    }
    else {
      menu[type] = obj;
    }
  }
    
  //Removes dish from menu
  this.removeDishFromMenu = function(type) {
    console.log("tar bort: "+type);
    menu[type] = "";
  }

  //function that returns all dishes of specific type (i.e. "starter", "main dish" or "dessert")
  //you can use the filter argument to filter out the dish by name or ingredient (use for search)
  //if you don't pass any filter all the dishes will be returned
  this.getAllDishes = $resource('http://api.bigoven.com/recipes',{pg:1,rpp:25,api_key:apiKey});

  this.getDishAPI = $resource('http://api.bigoven.com/recipe/:id',{api_key:apiKey});

  //function that returns a dish of specific ID



  // TODO in Lab 5: Add your model code from previous labs
  // feel free to remove above example code
  // you will need to modify the model (getDish and getAllDishes) 
  // a bit to take the advantage of Angular resource service
  // check lab 5 instructions for details





  // Angular service needs to return an object that has all the
  // methods created in it. You can consider that this is instead
  // of calling var model = new DinnerModel() we did in the previous labs
  // This is because Angular takes care of creating it when needed.
  return this;

});