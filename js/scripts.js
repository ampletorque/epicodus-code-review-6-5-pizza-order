function Order(customerName, quantity, toppings, pizzaSize) {
  this.customerName = customerName;
  this.quantity = quantity;
  this.toppings = toppings;
  this.pizzaSize = pizzaSize;
  this.orderDate = new Date();
  this.cost = 0;
  this.ident = Math.floor(Math.random()*10000);
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

// function displayOrder(newOrder) {
//   $("#show-order").fadeIn("slow");
//   $("#show-order h2").text(newOrder.customerName);
//   $(".order-date-output").text(newOrder.orderDate);
//   $(".customer-name-output").text(newOrder.customerName);
//   $(".quantity-output").text(newOrder.quantity);
//   $(".pizza-size-output").text(newOrder.pizzaSize);
//   $(".toppings-output").text(newOrder.toppingsLister());
//   $(".cost-output").text("$" + newOrder.cost);
// }

function displayOrder(newOrder) {
  $("#order-item-" + newOrder.ident + " .sub").html("<div class='description'>Name: <span id='sub-customer-name'></span><br>Date: <span id='sub-order-date'></span>" +
  "<br>Quantity: <span id='sub-quantity'></span><br>Size: <span id='sub-pizza-size'></span><br>Toppings: <span id='sub-toppings'></span><br>Cost: <span id='sub-cost'></span></div>");
  $("#order-item-" + newOrder.ident + " .description").hide();
  $("#order-item-" + newOrder.ident + " .description #sub-customer-name").text(newOrder.customerName);
  $("#order-item-" + newOrder.ident + " .description #sub-order-date").text(newOrder.orderDate);
  $("#order-item-" + newOrder.ident + " .description #sub-quantity").text(newOrder.quantity);
  $("#order-item-" + newOrder.ident + " .description #sub-pizza-size").text(newOrder.pizzaSize);
  $("#order-item-" + newOrder.ident + " .description #sub-toppings").text(newOrder.toppingsLister());
  $("#order-item-" + newOrder.ident + " .description #sub-cost").text("$" + newOrder.cost);
  $("#order-item-" + newOrder.ident + " .description").fadeIn();
}

function hideOrder(newOrder) {
  $("#order-item-" + newOrder.ident + " .description").fadeOut();
}

// function hideOrder() {
//   $("#show-order").fadeOut("slow");
// }

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
    $("ul#orders").append("<li><div id='order-item-" + newOrder.ident + "'> Name: " + newOrder.customerName + "     Date: " + newOrder.orderDate + "<br><div class='sub'></div></div></li>");
    $("ul#orders").fadeIn("slow");

    $("#order-item-" + newOrder.ident).hover(function() {
      displayOrder(newOrder);
    }, function() {
      hideOrder(newOrder);
    });

    // $("#order-item-" + newOrder.ident).click(function() {
    //   displayOrder(newOrder);
    // });


    resetFields();
  });

  });
