module.exports = {
    age: timestamp => {
        const today = new Date()
        const birth = new Date(timestamp)

        let age = today.getFullYear() - birth.getFullYear()
        const month = today.getMonth() - birth.getMonth()

        const isBday = today.getDate() < birth.getDate()

        if(month < 0 || month == 0 && isBday){
            age -= 1
        }

        return age
    },
    graduation: schooling => {

        let schoolDegree = ""

        if(schooling == "highschool"){
            schoolDegree = "Ensino Médio Completo"
        } else if(schooling == "college"){
            schoolDegree = "Ensino Superior Completo"
        } else if(schooling == "master"){
            schoolDegree = "Mestrado"
        } else if(schooling == "doctorate"){
            schoolDegree = "Doutorado"
        }

        return schoolDegree
    }
}