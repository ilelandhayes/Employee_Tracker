// Imports inquirer package
const inquirer = require('inquirer');
// Imports mysql package
const mysql = require('mysql2');
// Imports console table package
const cTable = require('console.table');
// Importing questions
const questions = require('./src/questions');

const database = mysql.createConnection({
    host: "localhost",
    port: 3001,
    user: "root",
    password: "",
    database: "company_db",
  });

database.connect(function(err) {
    if (err) {
        console.log('Something went wrong..');
        start();
        return;
    }
    console.log(res)
});

// start function to prompt questions
const start = () => {
    return inquirer.prompt(questions);
    try {
        switch (val.action) {
            case "View all departments?":
                console.log(val.action);
                viewAllEmployees();
                break;
            
            case "View all roles?":
                break;
            
            case "View all employees?":
                break;

            case "Add a department?":
                break;

            case "Add a role?":
                break;

            case "Add a employee?":
                break;

            case "Update an employee role?":
                break;
        }
    } catch (error) {
        console.log(error);
    }
};

