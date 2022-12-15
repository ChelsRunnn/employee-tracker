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

function main() {
    inquirer
        .prompt([
            {
                name: 'intro',
                type: 'list',
                message: 'Choose where to start:',
                choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role']
            }
        ])
        .then((introAnswer) => {
            if(introAnswer.intro == 'view all departments') {
                console.log('view all departments!');
                // call func to view all depts
            } else if (introAnswer.intro == 'view all roles') {
                console.log('view all roles!');
            } else {
                console.log('Choice a valid option')
            }
            })
        //     switch (introAnswer) {
        //         case (introAnswer.intro == 'view all departments'):
        //             console.log('view all departments!');
        //             break;
        //         case ' add a department':
        //             console.log('add a department!');
        //             break;
        //         default:
        //             console.log('Whoops, please choose a valid option');
        //             break;
        //     }
        // })
};

const viewDepartments = () => {

}

main();

// EXAMPLE OF PREPAED STATEMENT: check act 21/22
// db.query('INSERT INTO ? (name, ) VALUES ("? ?")', [table, {id: someValue, name: someValue}], (err, result) => {
//     if (err) {
//         console.log(err);
//     }
//  else {
//     console.table(results)
//  }})