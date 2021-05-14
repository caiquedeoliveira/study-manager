const express = require('express')
const routes = express.Router()
const teachers = require('./controllers/teachers')
const students = require('./controllers/students')

routes.get('/', (req, res) => {
    return res.redirect('teachers')
})

    .get('/teachers', teachers.index)
    .get('/teachers/create', teachers.create)
    .get('/teachers/:id', teachers.show)
    .get('/teachers/:id/edit', teachers.edit)
    .post('/teachers', teachers.post)
    .put("/teachers", teachers.put)
    .delete("/teachers", teachers.delete)


    .get('/students', students.index)
    .get('/students/create', students.create)
    .get('/students/:id', students.show)
    .get('/students/:id/edit', students.edit)
    .post('/students', students.post)
    .put("/students", students.put)
    .delete("/students", students.delete)

module.exports = routes