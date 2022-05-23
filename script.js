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
    cell = document.createElement('td')
    let button = document.createElement('button')
    button.classList.add('btn')
    button.classList.add('btn-danger')
    button.setAttribute('type', 'button')
    button.innerText = 'delete'
    button.addEventListener('click', function() {
        let cf = `ท่านต้องการลบคุณ ${student.name} หรือไม่`;
        if(confirm(cf)){
            deleteStudent(student.id)
        }
    })
    cell.appendChild(button)
    row.appendChild(cell)
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
function addStudentToDB(student){
    fetch('https://dv-student-backend-2019.appspot.com/students',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(student)
    }).then(response => {
        if (response.status === 200){
            return response.json()
        }else{
            throw Error(response.statusText)
        }
    }).then(data => {
        console.log('success',data)
        showAllStudents()
    }).catch(error => {
        return null
    })
}
function deleteStudent(id){
    fetch(`https://dv-student-backend-2019.appspot.com/student/${id}`,{
        method: 'DELETE'
    }).then(response => {
        if (response.status === 200){
            return response.json()
        }else{
            throw Error(response.statusText)
        }
    }).then(data => {
        alert(`student name ${data.name} is now deleted`)
        showAllStudents()
    }).catch(error => {
        alert('your input student id is not in database')
    })
}
function onAddStudentClick(){
    let student = {}
    student.name = document.getElementById('nameInput').value
    student.surname = document.getElementById('surnameInput').value
    student.studentId = document.getElementById('studentIdInput').value
    student.gpa = document.getElementById('gpaInput').value
    student.image = document.getElementById('imageLinkInput').value
    addStudentToDB(student)
}
document.getElementById('addButton').addEventListener('click',function() {
    onAddStudentClick()
})
document.getElementById('searchButton').addEventListener('click',() =>{
    let id = document.getElementById('inputText').value
    console.log(id)
    fetch(`https://dv-student-backend-2019.appspot.com/student/${id}`)
    .then(response => {
        return response.json()
    }).then(student => {
        addStudentData(student)
    })
})
function showAllStudents(){
    fetch('https://dv-student-backend-2019.appspot.com/students').then(response => {
        return response.json()
    })
        .then(data =>{
            addStudentList(data)
        })
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