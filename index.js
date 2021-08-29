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
// Role queries
// function selectRole 
let roleArr = [];
const selectRole = () => {
    database.query("SELECT * FROM role;", function(err, res) {
        if (err) throw err
        for (var i = 0; i < res.length; i++) {
            roleArr.push(res[i].title);
        }
    })
    return roleArr;
};
// manager queries
// function selectManager
let managersArr = [];
const selectManager = () => {
    database.query("SELECT first_name, last_name FROM employee WHERE manager_id IS NULL;", function(err, res) {
        if (err) throw err
        for (var i = 0; i < res.length; i++) {
            managersArr.push(res[i].first_name);
        }
    })
    return managersArr;
};
// function to add an employee
const addEmployee = () => {
    inquirer.prompt([
        {
            name: "firstname",
            type: "input",
            message: "Enter first name:",
        },
        {
            name: "lastname",
            type: "input",
            message: "Enter last name:",
        },
        {
            name: "role",
            type: "list",
            message: "What is their role?",
            choices: selectRole(),
        },
        {
            name: "manager",
            type: "list",
            message: "What's their managers name?",
            choices: selectManager(),
        },
    ])
    .then(function (val) {
        let roleId = selectRole().indexOf(val.role) + 1;
        let managerId = selectManager().indexOf(val.manager) + 1;
        database.query(
          "INSERT INTO employee SET ?",
          {
            first_name: val.firstname,
            last_name: val.lastname,
            manager_id: managerId,
            role_id: roleId,
          },
          function (err) {
            if (err) throw err;
            console.table(val);
            start();
          }
        );
      });
}
// function to update an employee
const updateEmployee = () => {}