// Dependencies 
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

// Connect to sql db I want to use (theRanch_db)
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Password',
        database: 'theRanch_db'
    },
    console.log('Connected to theRanch_db successfully!')
);
