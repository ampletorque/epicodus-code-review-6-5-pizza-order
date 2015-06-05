function Order(customerName, quantity, toppings, pizzaSize) {
  this.customerName = customerName;
  this.quantity = quantity;
  this.toppings = toppings;
  this.pizzaSize = pizzaSize;
  this.orderDate = new Date();
  this.cost = 0;
}

Order.prototype.toppingsLister = function() {
  var toppingsList = "";
  for (var index = 0; index < this.toppings.length; index++) {
    if (index === 0) {toppingsList += this.toppings[index]} else {toppingsList += (", " + this.toppings[index])};
  }
  return toppingsList;
}

Order.prototype.calculateCost = function() {
  var cost = 0;
  var sizes = new Object();
      sizes['personal'] = 1; sizes['small'] = 2; sizes['medium'] = 3; sizes['large'] = 4; sizes['super'] = 5;
  var toppings = new Object();
      toppings["peppers"] = 1; toppings["pepperoni"] = 2; toppings["sausage"] = 2; toppings["basil"] = 1.5; toppings["tomatoes"] = 1.5; toppings["anchovies"] = 2.5;
      cost = 5*sizes[this.pizzaSize];
  this.toppings.forEach(function(topping) {
    cost += toppings[topping];
  })
  cost *= this.quantity;
  this.cost = cost;
}

function resetFields() {
  $("input#customer-name").val("");
}

function displayOrder(newOrder) {
  $("#show-order").fadeIn("slow");
  $("#show-order h2").text(newOrder.customerName);
  $(".order-date").text(newOrder.orderDate);
  $(".customer-name").text(newOrder.customerName);
  $(".quantity").text(newOrder.quantity);
  $(".pizza-size").text(newOrder.pizzaSize);
  $(".toppings-selected").text(newOrder.toppingsLister());
  $(".cost").text("$" + newOrder.cost);
}

function hideOrder() {
  $("#show-contact").fadeOut("slow");
}

$(function() {

  $("form#new-order").submit(function(event) {
    event.preventDefault();

    var inputCustomer = $("input#customer-name").val();

    var inputQuantity = $('#quantity').map(function() {
      return this.value;
      }).get();

    var inputPizzaSize = $('.pizza-size').map(function() {
      return this.value;
      }).get();

    var inputToppings = $(".toppings input:checkbox:checked").map(function(){
      return $(this).val();
      }).get();

    newOrder = new Order(inputCustomer, inputQuantity, inputToppings, inputPizzaSize);
    newOrder.calculateCost();

    $("ul#orders").hide();
    $("ul#orders").append("<li><span class='order-item'>" + newOrder.orderDate + "</span></li>");
    $("ul#orders").fadeIn("slow");

    $(".order-item").last().hover(function() {
      displayOrder(newOrder);
    }, function() {
      hideOrder();
    });

    resetFields();
  });

  });
