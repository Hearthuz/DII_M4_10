var singleStudentResult = document.getElementById('single_student_result')
var listStudentResult = document.getElementById('output')
var addUserDetail = document.getElementById('addUserDetail')
var editUserDetail = document.getElementById('editUserDetail')

function hideAll(){
    singleStudentResult.style.display='none'
    listStudentResult.style.display='none'
    addUserDetail.style.display='none'
    editUserDetail.style.display='none'
}

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
    cell.addEventListener('click', function() {
        showStudentBlock(student)
    })
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
    button.classList.add('btn-warning')
    button.setAttribute('type', 'button')
    button.innerText = 'edit'
    button.addEventListener('click', function() {
        let text = `Edit ${student.name}`;
        if (confirm(text)) {
            onEditStudent(student)

        }
    })
    cell.appendChild(button)
    row.appendChild(cell)
    cell = document.createElement('td')
    button = document.createElement('button')
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
        alert(`student name ${data.name} is now added`)
        showAllStudents()
    }).catch(error => {
        return null
    })
}
function editStudentToDB(student){
    fetch('http://dv-student-backend-2019.appspot.com/students', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(student)
    }).then(respond => {
        if (respond.status === 200) {
            return respond.json()
        }
        else {
            throw Error(respond.statusText)
        }
    }).then(data => {
        console.log('success', data)
        alert(`student name ${data.name} is now edit`)
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
function onEditStudent(editStudent) {
    hideAll()
    editUserDetail.style.display = 'block'
    document.getElementById('idTemp').value = editStudent.id
    document.getElementById('editNameInput').value = editStudent.name
    document.getElementById('editSurnameInput').value = editStudent.surname
    document.getElementById('editStudentIdInput').value = editStudent.studentId
    document.getElementById('editGpaInput').value = editStudent.gpa
    document.getElementById('editImageLinkInput').value = editStudent.image
}
function onEditStudentClick(){
    let student = {}
    student.id = document.getElementById('idTemp').value
    student.name = document.getElementById('editNameInput').value
    student.surname = document.getElementById('editSurnameInput').value
    student.studentId = document.getElementById('editStudentIdInput').value
    student.gpa = document.getElementById('editGpaInput').value
    student.image = document.getElementById('editImageLinkInput').value
    editStudentToDB(student)
}
document.getElementById('addButton').addEventListener('click',function() {
    onAddStudentClick()
})
document.getElementById('editButton').addEventListener('click',function() {
    onEditStudentClick()
})
document.getElementById('searchButton').addEventListener('click',() =>{
    hideAll()
    singleStudentResult.style.display='block'
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
            hideAll()
            listStudentResult.style.display='block'
            addStudentList(data)
        })
}
function showStudentBlock(student){
    hideAll()
    singleStudentResult.style.display='block'
    addStudentData(student)
}
function onLoad(){
    hideAll()
}
document.getElementById('allStudentMenu').addEventListener('click',(event) => {
    hideAll()
    listStudentResult.style.display='block'
    showAllStudents()
})
document.getElementById('addStudentMenu').addEventListener('click',(event) => {
    hideAll()
    addUserDetail.style.display='block'
})