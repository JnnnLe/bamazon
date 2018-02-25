var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require('cli-table');

var connection = mysql.createConnection({
  host : 'localhost',
  port : 3306,

  // Your username
  user : 'root',

  // Your password
  password : '',
  database : 'bamazonDB'
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  ;

  connection.query('SELECT * FROM products', function(err, result, fields) {
    if (err) throw err;
    var table = new Table({
      chars: { 'top': '' , 'top-mid': '' , 'top-left': '' , 'top-right': ''
             , 'bottom': '' , 'bottom-mid': '' , 'bottom-left': '' , 'bottom-right': ''
             , 'left': '' , 'left-mid': '' , 'mid': '' , 'mid-mid': ''
             , 'right': '' , 'right-mid': '' , 'middle': ' ' },
      style: { 'padding-left': 0, 'padding-right': 0 },
      head: ['item id', 'product_name', 'department_name', 'price', 'stock'],
      colWidths: [10, 30, 20, 10, 10]
    });

    result.forEach(function(item) {
      table.push(
        [item['item_id'], item['product_name'], item['department_name'], item['price'], item['stock']]);
    });

    console.log(table.toString());
  });
});