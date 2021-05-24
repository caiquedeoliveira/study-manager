const { schooling, date } = require('../../lib/utils')
const Student = require('../../models/Student')


module.exports = {
    index(req,res){
        Student.all(allStudents => {
            
            const students = allStudents.map(student => {
                let newStudent = {
                    ...student,
                    school_year: schooling(student.school_year)
                }
                return newStudent
            })
            
            return res.render('students/index', {students})
        })
    },
    create(req,res){

        Student.teacherSelectOptions(options => {
            
            return res.render('students/create', {teacherOptions: options})
        })
        
    },
    post(req,res){
        const keys = Object.keys(req.body)

        for(key of keys){
            if(req.body[key] == ""){
                return res.send('Please, fill all the fields!')
            }
        }

        Student.create(req.body, student => {
            return res.redirect(`/students/${student.id}`)
        })

    },
    show(req,res){
        Student.find(req.params.id, student => {
            if(!student) return res.send('Student not found')

            student.birth_date = date(student.birth_date).birthDay
            student.school_year = schooling(student.school_year)
            student.created_at = date(student.created_at).format

            return res.render('students/show', {student})
        })

    },
    edit(req,res){
        Student.find(req.params.id, student => {
            if(!student) return res.send("Student not found!")

            student.birth_date = date(student.birth_date).iso

            Student.teacherSelectOptions( options => {
                return res.render("students/edit", {student, teacherOptions: options})
            })

        })
        
    },
    put(req,res){

        const keys = Object.keys(req.body)

        for(key of keys){
            if(req.body[key] == ""){
                return res.send('Please, fill all the fields!')
            }
        }
    
        Student.update(req.body, ()=>{
            return res.redirect(`/students/${req.body.id}`)
        })

    },
    delete(req,res){
        Student.delete(req.body.id, ()=>{
            return res.redirect('/students')
        })

    },
}