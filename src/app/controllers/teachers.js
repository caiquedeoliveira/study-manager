const { age, graduation, date } = require('../../lib/utils')
const Teacher = require('../../models/Teacher')


module.exports = {
    index(req,res){

        let {filter, page, limit} = req.query

        page = page || 1
        limit = limit || 2
        let offset = limit * (page - 1)

        const params = {
            filter, 
            page,
            limit,
            offset,
            callback(selectedTeachers){
                const pagination = {
                    total: Math.ceil(selectedTeachers[0].total / limit),
                    page
                }

               const teachers = selectedTeachers.map(teacher => {
                    const fixSubject = {
                        ...teacher,
                        subjects_taught: teacher.subjects_taught.split(",")
                    }
                    return fixSubject
                })

                return res.render('teachers/index', {teachers, pagination, filter})
            }
        }

        Teacher.paginate(params)

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

            teacher.birth_date = date(teacher.birth_date).iso

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
