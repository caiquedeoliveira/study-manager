const express = require('express')
const routes = express.Router()
const teachers = require('./teachers')

routes.get('/', (req, res) => {
    return res.redirect('teachers')
})

    .get('/teachers', teachers.index)

    .get('/teachers/create', (req, res)=>{
        return res.render('teachers/create')
    })

    .get('/teachers/:id', teachers.show)

    .get('/teachers/:id/edit', teachers.edit)

    .post('/teachers', teachers.post)

    .put("/teachers", teachers.put)

    .delete("/teachers", teachers.delete)

    .get('/students', (req,res)=>{
        return res.render('/students')
    })

module.exports = routes