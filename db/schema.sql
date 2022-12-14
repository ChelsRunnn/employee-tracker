CREATE DATABASE theRanch_db;

USE theRanch_db;

DROP TABLE IF EXISTS department;
CREATE TABLE department (
    id INT,
    name VARCHAR(30)
);

DROP TABLE IF EXISTS role;
CREATE TABLE role (
    id INT,
    title VARCHAR(30),
    salary DECIMAL, 
    department_id INT
);

DROP TABLE IF EXISTS employee;
CREATE TABLE employee (
    id INT, 
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT, 
    manager_id INT
);

SHOW TABLES; 

