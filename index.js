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
            message: 'New department name:',
        }
    ])
        .then((deptAnswer) => {
            const params = deptAnswer.newDept
            const sql = `INSERT INTO department(name) VALUES (?)`
            db.query(sql, params, (err, results) => {
                if (err) {
                    console.log(err)
                } else {
                    db.query(`SELECT * FROM department`, (err, results) => {
                        err ? console.log(err) : console.table(results);
                        main();
                    })
                };
            })
        })
};

const addRole = () => {
    inquirer.prompt([
        {
            name: 'roleID',
            type: 'input',
            message: 'Role id:',
        },
        {
            name: 'title',
            type: 'input',
            message: 'Role title:',
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
            const params = [roleAnswer.roleID, roleAnswer.title, roleAnswer.salary, roleAnswer.deptID];
            const sql = `INSERT INTO role (id, title, salary, department_id) VALUES (?, ?, ?, ?)`;
            db.query(sql, params, (err, results) => {
                if (err) {
                    console.log(err)
                } else {
                    db.query(`SELECT * FROM role`, (err, results) => {
                        err ? console.log(err) : console.table(results);
                        main();
                    })
                }
            })
        });
};

const addEmployee = () => {
    // Query pulls list of roles to display as choices in role_id question
    db.query(`SELECT * FROM role`, (err, results) => {
        if (err) {
            console.log(err)
            return err
        } 

        inquirer.prompt([
            {
                name: 'first_name',
                type: 'input',
                message: 'Employee first name:',
            },
            {
                name: 'last_name',
                type: 'input',
                message: 'Employee last name:',
            },
            {
                name: 'role_id',
                type: 'list',
                message: 'What does this employee do around the Ranch?',
                choices: results.map((role) => ({
                   name: role.title,
                   value: role.id
                }))
            },
            {
                name: 'manager_id',
                type: 'input',
                message: "Who is this employee's manager?",
            }
        ])
            .then((employeeAnswer) => {
                const sql = `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES(?, ?, ?, ?)`
                const params = [employeeAnswer.first_name, employeeAnswer.last_name, employeeAnswer.role_id, employeeAnswer.manager_id]
                    db.query(sql, params, (err, results) => {
                        if (err) {
                            console.log(err)
                        } else {
                            db.query(`SELECT * FROM employee`, (err, results) => {
                                err ? console.log(err) : console.table(results);
                                main();
                            })
                        }
                    })
            })
    })
    
};

const updateEmployee = () => {
    inquirer.prompt([
        {
            name: "first_name",
            type: "input",
            message: "Please enter the first name of the employee you want update."
        },
        {
            name: "role_id",
            type: "number",
            message: "Please enter the new role number id associated with the employee you want to update."
        }
    ])
    .then((updateAnswer) => {
        const params = [updateAnswer.role_id, updateAnswer.first_name];
        const sql = `UPDATE employee SET role_id = ? WHERE first_name = ?`
        db.query(sql, params, (err, results) => {
            if (err) {
                console.log(err)
            } else {
                db.query(`SELECT * FROM employee`, (err, results) => {
                    err ? console.log(err) : console.table(results);
                    main();
                })
            };
        })
    })
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