function addStudentToTable(index,student){
    const tableBody = document.getElementById('tableBody')
    let row = document.createElement('tr')
    let cell = document.createElement('th')
    let div = document.createElement('div')
    let image = document.createElement('img')
    cell.setAttribute('scope','row')
    cell.innerHTML = index
    row.appendChild(cell)
    cell = document.createElement('td')
    cell.innerHTML = student.studentId
    row.appendChild(cell)
    cell = document.createElement('td')
    cell.innerHTML = `${student.name} ${student.surname}`
    row.appendChild(cell)
    cell = document.createElement('td')
    cell.innerHTML = student.gpa
    row.appendChild(cell)
    cell = document.createElement('td')
    cell.appendChild(div)
    div.appendChild(image)
    image.setAttribute('src',student.image)
    image.height = 200
    image.classList.add('img-thumbnail')
    row.appendChild(cell)
    cell = document.createElement('td')
    cell.innerHTML = student.penAmount
    row.appendChild(cell)
    cell = document.createElement('td')
    cell.innerHTML = student.description
    row.appendChild(cell)
    tableBody.appendChild(row)
}
function addStudentList(studentlist){
    let counter = 1
    for(student of studentlist){
        addStudentToTable(counter++ ,student)
    }
}
function addStudentData(student){
    let idElem = document.getElementById('id')
    idElem.innerHTML = student.id
    let studentIdElem = document.getElementById('studentId')
    studentIdElem.innerHTML = student.studentId
    let nameElem = document.getElementById('name')
    nameElem.innerHTML = `${student.name} ${student.surname}`
    let gpaElem = document.getElementById('gpa')
    gpaElem.innerHTML = student.gpa
    let profileElem = document.getElementById('image')
    profileElem.setAttribute('src', student.image)
}
function onLoad(){
    fetch('https://dv-student-backend-2019.appspot.com/students').then(response => {
        return response.json()
    })
        .then(data =>{
            addStudentList(data)
        })
    fetch('https://dv-student-backend-2019.appspot.com/student').then(response => {
        return response.json()
    })
        .then(data =>{
            addStudentData(data)
        })
}
