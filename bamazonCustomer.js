require("dotenv").config();
var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require("console.table");

//establish connection
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: process.env.password,
  database: "bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connection established. " + connection.threadId);
});

function inventory() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.table(res);
    promptCustomerForItem(res);
  });
}

inventory();

//starting prompt message to users
var promptCustomerForItem = function(inventory) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "choice",
        message: "Enter the item_id of the product you would like to buy."
      },
    ])
    .then(function(answer) {
      connection.query("SELECT * FROM products WHERE item_id=?",[answer.choice], function(err,res) {
        if (err) throw err;
        var product;
        for (var i = 0; i < inventory.length; i++) {
            if (answer.choice==inventory[i].item_id) {
            product = inventory[i];
            }
        }
        promptCustomerForQuantity(product);
      });
    });
};

var promptCustomerForQuantity = function(product) {
    inquirer
      .prompt([
        {
          type: "input",
          name: "quantity",
          message: "How many would you like?"
        },
      ])
      .then(function(answer) {
          if (answer.quantity < product.stock_quantity) {
            connection.query("UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?", [answer.quantity, product.item_id], function(
                err,
                res
              ) {
                if (err) throw err;
                console.log("Successfully Purhcased!");
                inventory();
              });
          }
        else {
            console.log("Insufficient Quantity")}
      });
  };


function makePurchase() {

};

function checkInventory() {

};
