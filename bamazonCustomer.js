require("dotenv").config();
var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require('console.table');

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
    promptCustomer();
});

inventory();

    function inventory() {
    connection.query("SELECT * FROM products", function (err,res) {
    if (err) throw err;
    console.table(res);
    connection.end();
   
}
)};




//starting prompt message to users
    var promptCustomer = function(res) {
        inquirer
        .prompt ([
            {
                type: "input",
                name: "choice",
                message: "Enter the item_id of the product you would like to buy."
            }
        ]).then (function(answer){
            var correct = false;
            for (var i=0; i < res.length; i++) {
                if(res[i].item_id==answer.choice) {
                    correct = true;
                    var product = answer.choice;
                    var id=i;
                }
            }
          })
    }

