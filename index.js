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
                viewAllRoles();
                break;
        
            case "View all employees?":
                viewAllEmployees();
                break;

            case "Add a department?":
                addDepartment();
                break;

            case "Add a role?":
                addRole();
                break;

            case "Add a employee?":
                addEmployee();
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
// function to view all roles table
const viewAllRoles = () => {
    database.query("SELECT role.id, role.title, role.salary FROM role;",
        function(err, res) {
            if (err) throw err;
            console.table(res);
            start();
        } 
    )
}
// function to view all employees table
const viewAllEmployees = () => {
    database.query("SELECT employee.id, employee.first_name, employee.last_name, department.name, role.title, role.salary, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;",
        function(err, res) {
            if (err) throw err;
            console.table(res);
            start();
        } 
    )
}
// function to add a department
const addDepartment = () => {
    inquirer.prompt([
        {
        name: "name",
        type: "input",
        message: "Which department would you like to add?",
        },
    ])
    .then(function (res){
        database.query("INSERT INTO department SET ?",
        {
        name: res.name,
        },
        function(err, res) {
            if (err) throw err;
            console.table(res);
            start();
        }
        );
    });
}
// function to add a role
const addRole = () => {
    database.query("SELECT role.title AS title, role.salary AS salary FROM role;",
        function (err, res) {
          inquirer.prompt([
              {
                name: "title",
                type: "input",
                message: "What is the title of the new role?",
              },
              {
                name: "salary",
                type: "input",
                message: "What is the salary for this role?",
              },
            ])
            .then(function (res) {
              database.query(
                "INSERT INTO role SET ?",
                {
                  title: res.title,
                  salary: res.salary,
                },
                function (err) {
                  if (err) throw err;
                  console.table(res);
                  start();
                }
              );
            });
        }
    );
}

const addEmployee = () => {}