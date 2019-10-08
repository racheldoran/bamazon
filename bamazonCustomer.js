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
});

var query = function () {
  connection.query("SELECT * FROM products", function (err, results) {
    if (err) throw err;
    console.table(results);
  })
};
    inquirer.prompt([
      {
        name: "itemId",
        type: "list",
        choices: function () {
          var choiceArray = [];
          for (var i = 0; i < results.length; i++) {
            choiceArray.push(results[i].product_name);
          }
          return choiceArray;
        },
        message: "What would you like to purchase?"
      },
      {
        name: "quantity",
        type: "input",
        message: "How many would you like?"
      }
    ]).then(function (answer) {
      var quantity;
      for (var i = 0; i < results.length; i++) {
        if (results[i].product_name === answer.product) {
          quantity = results[i];
        }
      }

      if (quantity.stock_quantity > parseInt(answer.amount)) {
        connection.query("UPDATE products SET ? WHERE ?", [
          {
            stock_quantity: quantity.stock_quantity - parseInt(answer.amount)
          },
          {
            id: quantity.id
          }], function (error) {
            if (error) throw err;
            console.log("Product purchased successfully!");
            query();
            start();
          })
      } else {
        console.log("Insufficient stock.");
        query();
        start();
      }
    });

query();
start();

function display() {

  displayItems = 'SELECT * FROM products';

  connection.items(displayIems, function (err, data) {
    if (err) throw err;

    console.log('This is what we have: ');
display()

    var products = '';
    for (var i = 0; i < data.length; i++) {
      products = '';
      products += 'Item ID: ' + data[i].item_id + "";
      products += 'Product Name: ' + data[i].product_name + "" ;
      products += 'Department: ' + data[i].department_name + "";
      products += 'Price: ' + data[i].price + "";

      console.log(products);
    }
   
  })
}