const questions = [
    {
        name: "choice",
        type: "list",
        message: "What do you want to do?",
        choices: [
            "View all departments", 
            "View all roles", 
            "View all employees",
            "Add a department",
            "Add a role",
            "Add a employee",
            "Update an employee role",
        ]
    }
]

module.exports = questions;