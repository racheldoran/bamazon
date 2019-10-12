var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon_DB"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
  if (err) throw err;
  // pulls the items for the user to select from
  queryItems();
});
console.log("READY")

// query the database for all items up for sale
function queryItems() {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].item_id + " | " + res[i].product_name + " | " + "$" + res[i].price + " | " + res[i].stock_quantity);
    }

    chooseItem();
    // function to allow the user to choose an item and the amount of how many they want to purchase
    function chooseItem() {
      inquirer.prompt([
        {
          name: "choice",
          type: "input",
          message: "What item id would you like to purchase?",
          choices: function (value) {
            var choiceArray = [];
            return choiceArray;
          }
        },
        {
          name: "quantity",
          type: "input",
          message: "How many would you like to purchase?",
          validate: function (value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
        }]).then(function (answer) {



          var chosenItem = answer.choice - 1;
          var amountChosen = answer.quantity;
          // Checks if the amount of items available for purchase
          if (amountChosen >
            res[chosenItem].stock_quantity) {
            console.log("We do not have enough " + res[chosenItem].product_name + "'s in stock.  Please choose another amount.")
          }
          // If enought items are available thanks the customer and gives them their total
          else {
            console.log("Thank you for your purchase.  You're total is $" + amountChosen * res[chosenItem].price);
            updateQuantity(res[chosenItem], amountChosen);
          }
          repeat();
        });

    }
  })
}
// function to update the item's quantity in the db
function updateQuantity(item, amountChosen) {
  var newQuantity = item.stock_quantity - amountChosen;
  var query = connection.query(
    "UPDATE products SET ? WHERE ?",
    [
      { stock_quantity: newQuantity },
      { item_id: item.item_id }
    ],
    function (err, res) {
      if (err) throw err;
    })
}
function repeat() {
  inquirer.prompt({
    // Ask user if he wants to purchase another item
    name: "purchased again",
    type: "list",
    choices: ["Yes", "No"],
    message: "Would you like to purchase another item?"
  }).then(function (answer) {
    if (answer.repurchase == "Sure!") {
      queryAllItems();
    }
    else {
      console.log("You're all set! Thanks")
      connection.end();
    }
  });
}

