
// calling show notes on load.
showNotes();

// Adding EventListener  to text area.
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', function (e) {
    let addTxt = document.getElementById('addTxt');
    let titleTxt = document.getElementById('titleTxt');
    let notesLocalstg = localStorage.getItem('notes');
    if (notesLocalstg == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notesLocalstg)
    }
    notesObj.push({ desc: addTxt.value, title: titleTxt.value, imp: false });
    localStorage.setItem('notes', JSON.stringify(notesObj));
    addTxt.value = '';
    titleTxt.value = '';
    showNotes();
});

//Function to read notes for localstorage.
function showNotes() {
    let notesLocalstg = localStorage.getItem('notes');

    if (notesLocalstg == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notesLocalstg)
    }
    let html = '';
    let bgC = '';
    notesObj.forEach(function (element, index) {
        if (element.imp === true) {
            bgC = 'background-color: red';
        } else {
            bgC = '';
        }
        html += `<div class="my-2 mx-2 cards">
        <div id = "notecard-${index}" class="noteCard" style="width: 18rem; border: 1px solid; ${bgC}">
            <div class=" card-body show-card-body-${index}">
                <h5 class="card-title"> ${element.title}</h5>
                <p class="card-text">${element.desc}</p>
                <button id="${index}" onclick="deleteNotes(this.id)" class="btn btn-primary">Delete Note</button>
                  <input type="checkbox" id="imp-${index}" onclick="markImportant(this.id, ${index})" class="impBtn btn btn-default btn-lg mx-2" onclick="myFunction()">
                </div>
        </div>
        </div>`;
    });
    let notesElm = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `Nothing to Show !! Please add Notes form Above.`;
    }
}

// Function to Delete notes.
function deleteNotes(index) {
    let notesLocalstg = localStorage.getItem('notes');
    if (notesLocalstg == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notesLocalstg)
    }
    notesObj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    showNotes();
}

// serach function. By title or by content.

let srchTxt = document.getElementById('srchTxt');
srchTxt.addEventListener('input', function () {
    let srchVal = srchTxt.value.toUpperCase();
    let noteCrad = document.getElementsByClassName('noteCard');
    Array.from(noteCrad).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        let titleTxt = element.getElementsByTagName("h5")[0].innerText;
        if (cardTxt.toUpperCase().indexOf(srchVal) > -1 || titleTxt.toUpperCase().indexOf(srchVal) > -1) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    });
});

// MakeNote Important and unimportnant.
function markImportant(id, index) {
    let markImportant = document.getElementById(id);
    let markImportantDiv = document.getElementById('notecard-' + index);
    let notesLocalstg = localStorage.getItem('notes');
    if (notesLocalstg == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notesLocalstg);
        for (var key in notesObj[index]) {
            if (notesObj[index].imp == true) {
                notesObj[index].imp = false;
            } else {
                notesObj[index].imp = true;
            }
        }
    }
    localStorage.setItem('notes', JSON.stringify(notesObj));
    showNotes();
}
