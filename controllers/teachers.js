const fs = require('fs')
const data = require('../data.json')
const { age, graduation, date } = require('../utils')


exports.index = (req, res)=>{

    const teachers = data.teachers.map(teacher => {
        let newTeacher ={
            ...teacher,
            services: teacher.services.split(",")
        }
        return newTeacher
    })

    return res.render('teachers/index', {teachers})
}

exports.create = (req, res)=>{
    return res.render('teachers/create')
}

exports.post = (req, res)=>{
    const keys = Object.keys(req.body)

    for(key of keys){
        if(req.body[key] == ""){
            return res.send('Please, fill all the fields!')
        }
    }

    let {avatar_url, name, birth, schooling, classtype, services} = req.body

    birth = Date.parse(birth)
    const created_at = Date.now()

    let id = 1
    const lastTeacher = data.teachers[data.teachers.length - 1].id

    if(lastTeacher){
        id = lastTeacher + 1
    }


    data.teachers.push({
        id, 
        avatar_url,
        name,
        birth,
        schooling,
        classtype, 
        services,
        created_at
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), err => {
        
        if (err) return res.send('Write file error')

        return res.redirect('/teachers')
    })
}

exports.show = (req, res) => {
    const {id} = req.params

    const foundTeacher = data.teachers.find(teacher =>{
        return teacher.id == id
    })

    if(!foundTeacher) return res.send('Teacher not found!')

    const teacher = {
        ...foundTeacher,
        age: age(foundTeacher.birth),
        services: foundTeacher.services.split(','),
        created_at: new Intl.DateTimeFormat("pt-BR").format(foundTeacher.created_at),
        schooling: graduation(foundTeacher.schooling)
    }

    return res.render('teachers/show', {teacher})
}

exports.edit = (req, res) => {

    const {id} = req.params

    const foundTeacher = data.teachers.find(teacher => {
        return teacher.id == id
    })

    if(!foundTeacher) return res.send('Teacher not found!')

    const teacher = {
        ...foundTeacher,
        birth: date(foundTeacher.birth).iso
    }

    return res.render('teachers/edit', {teacher})
}

exports.put = (req, res) => {
    const {id} = req.body

    let index = 0

    const foundTeacher = data.teachers.find((teacher, foundIndex) => {
        if(teacher.id == id){
            index = foundIndex
            return true
        }
    })

    if(!foundTeacher) return res.send('Teacher not found!')

    const teacher = {
        ...foundTeacher,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.teachers[index] = teacher

    fs.writeFile("data.json", JSON.stringify(data, null, 2), err => {
        if(err) return res.send("Write file error")

        return res.redirect(`/teachers/${id}`)
    })
}

exports.delete = (req, res) => {
    const {id} = req.body

    const filteredTeachers = data.teachers.filter(teacher => {
        return teacher.id != id
    })

    data.teachers = filteredTeachers

    fs.writeFile("data.json", JSON.stringify(data, null, 2), err => {
        if(err) return res.send("Write file error!")

        return res.redirect("/teachers")
    })
}