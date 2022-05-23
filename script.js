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
    image.style.height = '200px'
    image.classList.add('img-thumbnail')
    row.appendChild(cell)
    cell = document.createElement('td')
    cell.innerHTML = student.penAmount
    row.appendChild(cell)
    cell = document.createElement('td')
    cell.innerHTML = student.description
    row.appendChild(cell)
    row.addEventListener('click', function() {
        showStudentBlock(student)
    })
    tableBody.appendChild(row)
}
function addStudentList(studentlist){
    let counter = 1
    const tableBody = document.getElementById('tableBody')
    tableBody.innerHTML = ''
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
    image.style.height = '200px'
}
function showAllStudents(){
    fetch('https://dv-student-backend-2019.appspot.com/students').then(response => {
        return response.json()
    })
        .then(data =>{
            addStudentList(data)
        })
}
function showStudentBlock(student){
    addStudentData(student)
}
// function onLoad(){
//     student = {
//         studentId: "642110332",
//         name: "Ariya",
//         surname: "Watchara-apanukorn",
//         gpa: "6.78",
//         image: "https://i.pinimg.com/474x/fe/5b/8c/fe5b8c05c2a4d1e50e3d0cf9925e1556.jpg"
//     }
//     addStudentToDB(student)
//     fetch('https://dv-student-backend-2019.appspot.com/students').then(response => {
//         return response.json()
//     })
//         .then(data =>{
//             addStudentList(data)
//         })
// }
function onLoad(){
    // deleteStudent(27)
    fetch('https://dv-student-backend-2019.appspot.com/students').then(response => {
        return response.json()
    })
        .then(data =>{
            addStudentList(data)
        })
}