describe('Order', function () {
  it("creates a new order with given input", function() {
    var testOrder = new Order("Jack", 2, ["pepperoni", "basil"], "small");
    expect(testOrder.customerName).to.equal("Jack");
    expect(testOrder.quantity).to.equal(2);
    expect(testOrder.toppings).to.eql(["pepperoni", "basil"]);
    expect(testOrder.pizzaSize).to.eql("small");
  });

  it("adds the toppingslister method to format toppings", function() {
    var testOrder = new Order("Jack", 2, ["pepperoni", "basil"], "small");
    expect(testOrder.toppingsLister()).to.equal("pepperoni, basil");
  });

  it("adds the calculateCost method to calculate pizza cost", function() {
    var testOrder = new Order("Jack", 2, ["pepperoni", "basil"], "small");
    testOrder.calculateCost()
    expect(testOrder.cost).to.equal(27);
  });

});
