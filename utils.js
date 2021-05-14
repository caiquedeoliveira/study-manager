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
    },
    date: timestamp => {
        const date = new Date(timestamp)

        const year = date.getUTCFullYear()
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)
        const day = `0${date.getUTCDate()}`.slice(-2)

        return {
            year,
            month,
            day,
            iso: `${year}-${month}-${day}`,
            birthDay: `${day}/${month}`
        }
    },
    schooling: schooling => {

        let schoolYear = ""

        if(schooling == "5EF"){
            schoolYear = "5º ano do ensino fundamental"
        } else if(schooling == "6EF"){
            schoolYear = "6º ano do ensino fundamental"
        } else if(schooling == "7EF"){
            schoolYear = "7º ano do ensino fundamental"
        } else if(schooling == "8EF"){
            schoolYear = "8º ano do ensino fundamental"
        } else if(schooling == "9EF"){
            schoolYear = "9º ano do ensino fundamental"
        } else if(schooling == "1EM"){
            schoolYear = "1º ano do ensino médio"
        } else if(schooling == "2EM"){
            schoolYear = "2º ano do ensino médio"
        } else if(schooling == "3EM"){
            schoolYear = "3º ano do ensino médio"
        }

        return schoolYear
    } 
}