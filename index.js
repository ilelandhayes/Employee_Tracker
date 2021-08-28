// Imports inquirer package
const inquirer = require('inquirer');
// Imports mysql package
const mysql = require('mysql2');
// Imports console table package
const cTable = require("console.table");
// Importing questions
const questions = require('./src/questions');

const database = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "company_db",
  });

database.connect(function(err) {
    if (err) throw err 
        console.log('Connected');
        start();
});

// start function to prompt questions
const start = () => {
    inquirer.prompt(questions) 
    .then(function(val) {
        switch (val.choice) {
            case "View all departments?":
                viewAllDepartments();
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
    })
};

// function to view all departments table
const viewAllDepartments = () => {
    database.query("SELECT * FROM department;",
        function(err, res) {
            if (err) throw err;
            console.table(res);
            start();
        } 
    )
};

const viewAllRoles = () => {}

const viewAllEmployees = () => {}

const addDepartment = () => {}

const addRole = () => {}

const addEmployee = () => {}