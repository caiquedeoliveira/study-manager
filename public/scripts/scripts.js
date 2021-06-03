const currentPage = location.pathname
const menuItems = document.querySelectorAll('header .links a')

for( let item of menuItems){
    if(currentPage.includes(item.getAttribute('href'))){
        item.classList.add('active')
    }
}


/* pagination */

function paginate(selectedPage, totalPages){
    let pages = [],
    oldPage

    for(let currentPage = 1; currentPage <= totalPages; currentPage++){

        const twoFirstTwoLast = currentPage == 1 || currentPage == 2 || currentPage == totalPages || currentPage == totalPages - 1
        const pageAfter = currentPage <= selectedPage + 1
        const pageBefore = currentPage >= selectedPage - 1

        if(twoFirstTwoLast || pageAfter && pageBefore){

            if(oldPage && currentPage - oldPage > 2) {
                pages.push("...")
            }

            if(oldPage && currentPage - oldPage == 2){
                pages.push(oldPage + 1)
            }

            pages.push(currentPage)
            oldPage = currentPage
        }
    }

    return pages
}

function createPagination(pagination){

    const filter = pagination.dataset.filter
    const page = +pagination.dataset.page
    const total = +pagination.dataset.total

    const pages = paginate(page, total)

    let elements = ""

    for(let el of pages){
        if(String(el).includes("...")){
            elements += `<span>${el}</span>`
        } else {
            if(filter){
                elements += `<a href="?page=${el}&filter=${filter}">${el}</a>`
            } else {
                elements += `<a href="?page=${el}">${el}</a>`
            }
        }
    }

    pagination.innerHTML = elements
}

const pagination = document.querySelector('.pagination')

if(pagination){
    createPagination(pagination)
}