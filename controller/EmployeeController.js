const Employee = require('../models/Employee')
const { response } = require('express')


// show list of Employees
const index = (req , res , next) =>  {
    Employee.find()
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message : 'An Error Occured!'
        })
    })
}


const show = (req, res, next) => {
    let emplyeeID = req.body.emplyeeID
    Employee.findById(emplyeeID)
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message: 'An error Occured'
        })
    })
}

//Add Employee 
const store = (req, res, next) =>  {
    let employee = new Employee({
        name: req.body.name,
        designation: req.body.designation,
        email: req.body.email,
        phone: req.body.phone,
        age: req.body.age
    })

    if(req.files){
        //employee.avatar = req.file.path
        let path = ''
        req.files.forEach(function(files, index, arr){
            path = path + files.path + ','
        })
        path = path.substring(0, path.lastIndexOf(","))
        employee.avatar  = path
    }

    employee.save()
    .then(response => {
        res.json({
            message: employee//'Employee Added Successfully!'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error Occured!'
        })
    })
}

// Update Employee
const update = (req, res, next) => {
    let employeeID = req.body.employeeID

    let updateData = {
            name: req.body.name,
            designation: req.body.designation,
            email: req.body.email,
            phone: req.body.phone,
            age: req.body.age
        }
        
        Employee.findOneAndUpdate(employeeID, {$set: updateData})
        .then(() => {
            res.json({
                message: 'Employee updated successfully'
            })
        })
        .catch(error => {
            res.json({
                message: 'An error Occured'
            })
        })
}

// Delete employee
const destroy = (req, res, next) => {
    let employeeID = req.body.employeeID
    Employee.findByIdAndRemove(employeeID)
    .then(() => {
        res.json({
            message: 'Employee deleted successfully'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error Occured'
        })
    })

}

module.exports = {
    index, show, store, update, destroy
}

