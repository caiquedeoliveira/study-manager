const { age, graduation, date } = require('../../lib/utils')
const Teacher = require('../../models/Teacher')


module.exports = {
    index(req,res){
        Teacher.all(teacher => {
            
            return res.render('teachers/index', {teachers})
        })
    },
    create(req,res){
        return res.render('teachers/create')

    },
    post(req,res){
        const keys = Object.keys(req.body)

        for(key of keys){
            if(req.body[key] == ""){
                return res.send('Please, fill all the fields!')
            }
        }

        Teacher.create(req.body, teacher => {
            return res.redirect(`/teachers/${teacher.id}`)
        })

    },
    show(req,res){
        Teacher.find(req.params.id, teacher => {
            if(!teacher) return res.send('Teacher not found')

            teacher.age = age(teacher.birth_date)
            teacher.subjects_taught = teacher.subjects_taught.split(",")
            teacher.education_level = graduation(teacher.education_level)
            teacher.created_at = date(teacher.created_at).format

            return res.render('teachers/show', {teacher})
        })

    },
    edit(req,res){
        Teacher.find(req.params.id, teacher => {
            if(!teacher) return res.send("Teacher not found!")

            return res.render("teachers/edit", {teacher})
        })
        
    },
    put(req,res){

        const keys = Object.keys(req.body)

        for(key of keys){
            if(req.body[key] == ""){
                return res.send('Please, fill all the fields!')
            }
        }
    
        Teacher.update(req.body, ()=>{
            return res.redirect(`/teachers/${req.body.id}`)
        })

    },
    delete(req,res){
        Teacher.delete(req.body.id, ()=>{
            return res.redirect('/teachers')
        })

    },
}
