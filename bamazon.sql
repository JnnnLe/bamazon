DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NULL,
  price DECIMAL(25, 2) NULL,
  stock INT(45) NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock)
VALUES ('Marble Mug', 'Home Goods', 15, 20), ('Mid-Century Modern Arm Chair', 'Furniture', 333.99, 10), ('Cute Cat Glass Tea Cup', 'Home Goods', 19.99, 100), ('First Aid Kit', 'Dissaster Readiness', 25.50, 20), ('Kid\'s Trampoline', 'Toys', 79.25, 75);