var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require('cli-table');

var numOfItems = 0;

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
  inventory();
});

function inventory() {
    connection.query('SELECT * FROM products', function(err, res, fields) {
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

    res.forEach(function(item) {
      numOfItems = res.length;
      table.push(
        [item['item_id'], item['product_name'], item['department_name'], item['price'], item['stock']]);
    });

    console.log(table.toString());
    promptPurchase();

  });
}



function promptPurchase() {
  inquirer.prompt([
      {
        name: 'itemIdSelected',
        type: 'input',
        message: 'What is the item id of the item you would like to purchase?',
      },
      {
        name: 'itemQuantity',
        type: 'input',
        message: 'How many would you like to buy?',         
      }
    ]).then(function(res, err) {


      if ( (isNaN(res.itemIdSelected)) || (isNaN(res.itemQuantity)) || res.itemIdSelected < 1 || res.itemIdSelected > numOfItems ) {

          console.log(`      
          --    ______                     
          --   |  ____|                    
          --   | |__   _ __ _ __ ___  _ __ 
          --   |  __| | '__| '__/ _ \| '__|
          --   | |____| |  | | | (_) | |   
          --   |______|_|  |_|  \___/|_|   
          --                               
          --                               
          `);

        return console.log('Please enter a VALID item id and/or item quanity in the form of a number. RESTART node.');
      }

      var itemSelected = res.itemIdSelected;
      var itemQuantity = res.itemQuantity;

      purchaseInventory(itemSelected, itemQuantity); 
    })
}

  function purchaseInventory(itemId, itemQuantity) {
    connection.query('SELECT * FROM products WHERE item_id = ' + itemId, function(err, res) {
      if (err) throw err;

      if (itemQuantity <= res[0].stock) {
        var totalCost = res[0].price * itemQuantity;
        console.log('\n###################################################################\n');
        console.log('We\'ll get going on your order now!' + '\n');
        console.log('Your total cost for ' + itemQuantity + ' ' + res[0].product_name + ' is $' + totalCost);
        console.log('\n###################################################################\n');
        connection.query('UPDATE products SET stock = stock - ' + itemQuantity + ' WHERE item_id = ' + itemId)

      } else {
        console.log('\n###################################################################\n');
        console.log('Sorry, that item is either out of stock, or we do not have enough quantity to fill your order.')        
        console.log('\n###################################################################\n');

      }

      inventory();
    })
  }







