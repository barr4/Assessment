let url = `https://data.cinetica-tech.com/test/api/actors`;
fetch(url)
    .then(response => response.json())
    .then(data => showTable(data));

function showTable(data) {
    let table = "";
    for (let i = 0; i < data.length; i++) {
        table += `
            <tr>
                <td class="border">${i + 1}</td>
                <td class="border">${data[i].id}</td>
                <td class="border"><img src="${data[i].picture}" class="w-25 p-25""/></td>
                <td class="border" id="name">${data[i].name}</td>
                <td class="border">${data[i].gender === "M" ? "Actor" : "Actress"}</td>
                <td class="border">${calculateAge(data[i].bornDate)}</td>
                <td class="border"><input type="button" id="btnEdit" data-id="${data[i].id}" name="edit" value="Edit" class="btn btn-primary">
            </tr>`;
    }
    document.getElementById("actorsTableBody").innerHTML = table;
    console.log(data);
    editButtonInit();
}

function calculateAge(date) {
    let todayDate = new Date();
    let bornDate = new Date(date);
    let age = (Math.floor((todayDate - bornDate) / (1000 * 60 * 60 * 24 * 365)));
    return age;
}

function editButtonInit() {
    let buttons = document.getElementsByName("edit");
    buttons.forEach(function (element, i) {
        element.addEventListener("click", function () {
            let row = this.parentElement.parentElement;
            let nameCell = row.querySelector("#name");
            nameCell.innerHTML = `
                <input type='text' id='name' value='${nameCell.innerHTML}'/> 
                <input type='button' id='save' value='Save' onclick='editActor(this, ${element.dataset.id})' class='btn btn-primary'/>
                `;
        })
    });
}

function editActor(element, id) {
    let name = element.parentElement.querySelector('#name').value
    console.log(name, id)
    if (name.trim().length > 0 && isNaN(name)) {
        fetch('https://data.cinetica-tech.com/test/api/actors', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "id": id, "name": name })
        });

        element.parentElement.innerHTML = name;
    } else {
        alert("Name cannot be empty or a number")
    }
}
