const fs = require('fs')
const data = require('../data.json')
const { date, schooling } = require('../utils')


exports.index = (req, res)=>{

    const students = data.students.map(student => {
        let newStudent ={
            ...student,
            school_year: schooling(student.school_year)
        }
        return newStudent
    })

    return res.render('students/index', {students})
}

exports.create = (req, res)=>{
    return res.render('students/create')
}


exports.post = (req, res)=>{
    const keys = Object.keys(req.body)

    for(key of keys){
        if(req.body[key] == ""){
            return res.send('Please, fill all the fields!')
        }
    }

    birth = Date.parse(req.body.birth)
    let id = 1 
    const lastStudent = data.students[data.students.length - 1].id

    if(lastStudent){
        id = lastStudent + 1
    }

    data.students.push({
        id,
        ...req.body
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), err => {
        
        if (err) return res.send('Write file error')

        return res.redirect('/students')
    })
}


exports.show = (req, res) => {
    const {id} = req.params

    const foundTeacher = data.students.find(student =>{
        return student.id == id
    })

    if(!foundTeacher) return res.send('Teacher not found!')

    const student = {
        ...foundTeacher,
        birth: date(foundTeacher.birth).birthDay,
        school_year: schooling(foundTeacher.school_year)
    }

    return res.render('students/show', {student})
}


exports.edit = (req, res) => {

    const {id} = req.params

    const foundTeacher = data.students.find(student => {
        return student.id == id
    })

    if(!foundTeacher) return res.send('Teacher not found!')

    const student = {
        ...foundTeacher,
        birth: date(foundTeacher.birth).iso
    }

    return res.render('students/edit', {student})
}


exports.put = (req, res) => {
    const {id} = req.body

    let index = 0

    const foundTeacher = data.students.find((student, foundIndex) => {
        if(student.id == id){
            index = foundIndex
            return true
        }
    })

    if(!foundTeacher) return res.send('Teacher not found!')

    const student = {
        ...foundTeacher,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.students[index] = student

    fs.writeFile("data.json", JSON.stringify(data, null, 2), err => {
        if(err) return res.send("Write file error")

        return res.redirect(`/students/${id}`)
    })
}


exports.delete = (req, res) => {
    const {id} = req.body

    const filteredTeachers = data.students.filter(student => {
        return student.id != id
    })

    data.students = filteredTeachers

    fs.writeFile("data.json", JSON.stringify(data, null, 2), err => {
        if(err) return res.send("Write file error!")

        return res.redirect("/students")
    })
}