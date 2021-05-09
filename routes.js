const express = require('express')
const routes = express.Router()

routes.get('/', (req, res) => {
    return res.redirect('teachers')
})

    .get('/teachers', (req, res)=>{
        return res.render('teachers/index')
    })

    .get('/students', (req,res)=>{
        return res.render('/students')
    })



module.exports = routes