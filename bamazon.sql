CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
  item_id  INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL (10, 4),
  stock_quantity  INT,
  PRIMARY KEY (item_id)
);

Select * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tacos", "Taco Department", 2.99, 15),
("Sunglasses", "Glasses Department", 14.99, 20),
("Beer", "Beer Department", 11.99, 10),
("Computer", "Electronics Department", 800.99, 9),
("Soap", "Soap Department", 4.99, 11),
("Tylenol", "Medicine Department", 5.99, 18),
("Paper Towels", "Cleaning Department", 3.99, 20),
("DVDs", "Electronics Department", 7.99, 15),
("Potatoes", "Produce Department", 2.99, 14),
("Stickers", "Stationery Department", 3.99, 19)



