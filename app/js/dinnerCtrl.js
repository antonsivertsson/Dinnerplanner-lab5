// Dinner controller that we use whenever we have view that needs to 
// display or modify the dinner menu
dinnerPlannerApp.controller('DinnerCtrl', function ($scope,Dinner,$cookieStore) {

  

  $scope.numberOfGuests = Dinner.getNumberOfGuests();
  

  $scope.getDishAPI = function(dishId) {
    $scope.status = "Searching..."; 
    Dinner.getDishAPI.get({id:dishId},function(data){ 
      console.log(dishId);
      //var cat = data.Category;
      //$scope.fullMenu[cat]=data;
      Dinner.addDishToMenu(data);
      console.log("test: "+data.Category);
      $scope.status = "Showing " + data.Title;
    },function(data){ 
      $scope.status = "There was an error"; 
    }); 
  }

  var menu = {"Appetizers":"", "Main Dish":"", "Desserts":""};
  for (key in menu) {
    if ($cookieStore.get(key) != undefined) {
      console.log("Hittad i Cookies: "+$cookieStore.get(key));
      $scope.getDishAPI($cookieStore.get(key));
    }
  
  }

  $scope.fullMenu = Dinner.getFullMenu();

  $scope.getFullMenu = function() {
  	return Dinner.getFullMenu();
  }

  $scope.removeDishFromMenu = function(type) {
    Dinner.removeDishFromMenu(type);
  }

  $scope.setNumberOfGuest = function(number){
    Dinner.setNumberOfGuests(number);
  }

  $scope.getNumberOfGuests = function() {
    //console.log(Dinner.getFullMenu());
    return Dinner.getNumberOfGuests();
  }

  $scope.getTotalMenuPrice = function() {
    return Dinner.getTotalMenuPrice();
  }

  $scope.getDishPrice = function(obj){
	  return Dinner.getDishPrice(obj);
  }
  


  // TODO in Lab 5: Implement the methods to get the dinner menu
  // add dish to menu and get total menu price

});