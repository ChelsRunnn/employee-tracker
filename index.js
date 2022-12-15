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

// main function that houses all potential options
function main() {
    inquirer
        .prompt([
            {
                name: 'intro',
                type: 'list',
                message: 'Choose where to start:',
                choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Exit']
            }
        ])
        .then((introAnswer) => {
            if (introAnswer.intro == 'View all departments') {
                viewDepartment()
                // call func to view all depts
            } else if (introAnswer.intro == 'View all roles') {
                viewRole()
            } else if (introAnswer.intro == 'View all employees') {
                viewEmployee()
            } else if (introAnswer.intro == 'Add a department') {
                addDepartment()
            } else if (introAnswer.intro == 'Add a role') {
                addRole()
            } else if (introAnswer.intro == 'Add an employee') {
                addEmployee()
            } else if (introAnswer.intro == 'Update an employee role') {
                updateEmployee()
            } else if (introAnswer.intro == 'Exit') {
                console.log('Thank you, goodbye');
                prompt.ui.close();
                // this works to close the prompt but throws an error
                return
            } else {
                console.log('Choose a valid option')
            }
            return
        })
        // .then(ans => {
        //     switch (ans.initialize) {
        //         case "View all departments": viewDepartment();
        //             break;
        //         case "View all roles": viewRole();
        //             break;
        //         case "View all employees": viewEmployee();
        //             break;
        //         case "Add a department": addDepartment();
        //             break;
        //         case "Add a role": addRole();
        //             break;
        //         case "Add an employee": addEmployee();
        //             break;
        //         case "Update an employee role": updateEmployee();
        //             break;
        //         case "Exit":
        //             console.log("Thank you very much!");
        //             process.exit();
        //     }
        // }).catch(err => console.error(err));
};

const viewDepartment = () => {
    db.query(`SELECT * FROM department`, (err, results) => {
        err ? console.log(err) : console.table(results);
        main();
    })
};

const viewRole = () => {
    db.query(`SELECT * FROM role`, (err, results) => {
        err ? console.log(err) : console.table(results);
        main();
    })
};

const viewEmployee = () => {
    db.query(`SELECT * FROM employee`, (err, results) => {
        err ? console.log(err) : console.table(results);
        main();
    })
};

const addDepartment = () => {
    inquirer.prompt([
        {
            name: 'newDept',
            type: 'input',
            message: 'Department name:',
        }
    ])
        .then((deptAnswer) => {
            const newDeptName = deptAnswer.newDept
            db.query('INSERT INTO department (name) VALUES (' ? ')' : newDeptName, (err, results) => {
                console.log('Department successfully added')
            });
            db.query('SELECT * FROM department', (err, results) => {
                console.table(results);
            })
        });
}

const addRole = () => {
    inquirer.prompt([
        {
            name: 'newRole',
            type: 'input',
            message: 'Role title:',
        },
        {
            name: 'roleID',
            type: 'input',
            message: 'Role id:',
        },
        {
            name: 'salary',
            type: 'input',
            message: 'Role salary:',
        },
        {
            name: 'deptID',
            type: 'input',
            message: 'Department ID:',
        }
    ])
        .then((roleAnswer) => {
            const newRoleName = roleAnswer.newRole;
            const newRoleId = roleAnswer.roleID;
            const newRoleSalary = roleAnswer.salary;
            const newRoleDeptId = roleAnswer.deptID;

            db.query('INSERT INTO role (name) VALUES ("? ? ? ?")', [newRoleId, newRoleName, newRoleSalary, newRoleDeptId], (err, results) => {
                console.log('Department successfully added')
            })
        });
        // .then(function() {
            db.query('SELECT * FROM department', (err, results) => {
                console.table(results);
            });
        // })
// });
};

main();

// EXAMPLE OF PREPARED STATEMENT: check act 21/22
// db.query('INSERT INTO ? (name, ) VALUES ("? ?")', [table, {id: someValue, name: someValue}], (err, result) => {
//     if (err) {
//         console.log(err);
//     }
//  else {
//     console.table(results)
//  }})