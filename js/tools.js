// All the table tools and their logos are globally accessed from single point to reduce code size

const toolDelete = document.getElementById('tool-delete').getElementsByTagName('svg')[0];
const toolEdit = document.getElementById('tool-edit').getElementsByTagName('svg')[0];
const toolDown = document.getElementById('tool-down').getElementsByTagName('svg')[0];
const toolUp = document.getElementById('tool-up').getElementsByTagName('svg')[0];
const toolAll = document.getElementById('table-head-select-all');
let table = document.querySelector(".table");
let selectedChemicalIds = new Set();
let isAddNew = true;

// Select Specific Row to Edit/Delete and to change its position in the table

export const selectRow = (id) => {
    const row = document.getElementById(`row-${id}`);
    const tickLogo = document.getElementById(`chemical-${id}`).getElementsByTagName('svg')[0];

    if (selectedChemicalIds.has(id)) {
        selectedChemicalIds.delete(id);
        tickLogo.style.color = "gray";
        row.style.backgroundColor = "white"
    }
    else {
        selectedChemicalIds.add(id);
        tickLogo.style.color = "blue";
        row.style.backgroundColor = "rgb(225, 225, 251)"
    }

    if (selectedChemicalIds.size) toolDelete.style.color = "red"
    else toolDelete.style.color = "gray"

    if (selectedChemicalIds.size === 1) {
        toolUp.style.color = "blue"
        toolDown.style.color = "blue"
        toolEdit.style.color = "blue"
    } else {
        toolUp.style.color = "gray"
        toolDown.style.color = "gray"
        toolEdit.style.color = "gray"
    }
}


// Function to refresh the table contents and brint it to the original form with initial data entries.

const onToolRefresh = () => {
    window.location = '/'
}

document.getElementById('tool-refresh').addEventListener('click', onToolRefresh)


// Funtion to delete the table contents when selected

const onToolDelete = () => {
    if (selectedChemicalIds.size) {
        toolDelete.style.color = "gray"
        toolUp.style.color = "gray"
        toolEdit.style.color = "gray"
        toolDown.style.color = "gray"
        toolAll.style.color = "gray"
        let rows = Array.from(table.rows).slice(1);
        rows = rows.filter((row, idx) => {
            let id = parseInt(row.cells[1].innerText);
            if (selectedChemicalIds.has(id)) return false;
            return true;
        })

        table.tBodies[0].innerHTML = ""
        rows.forEach(row => table.tBodies[0].appendChild(row));
        selectedChemicalIds = new Set([]);
        isAddNew = true;
    }
}

document.getElementById('tool-delete').addEventListener('click', onToolDelete)

// Function to select all the entities in our table

const onToolSelectAll = (flag = true) => {
    if (!isAddNew) return;
    let rows = Array.from(table.rows).slice(1)
    if (rows.length === selectedChemicalIds.size) flag = false;

    rows.forEach((row) => {
        let id = parseInt(row.cells[1].innerText);
        selectedChemicalIds.add(id);
        const tickLogo = document.getElementById(`chemical-${id}`).getElementsByTagName('svg')[0]
        if (flag) {
            row.style.backgroundColor = "rgb(225, 225, 251)";
            tickLogo.style.color = "blue";
        } else {
            row.style.backgroundColor = "white";
            tickLogo.style.color = "gray";
        }
    })

    if (flag) { toolDelete.style.color = "red"; toolAll.style.color = "blue" }
    else { selectedChemicalIds = new Set(); toolDelete.style.color = "gray"; toolAll.style.color = "gray" }
}

toolAll.addEventListener('click', onToolSelectAll)

// Function to move row down

const onToolMoveDown = () => {
    if (selectedChemicalIds.size === 1) {
        let rows = table.rows;
        for (let i = 0; i < rows.length - 1; i++) {
            if (selectedChemicalIds.has(parseInt(rows[i].cells[1].innerText))) {
                let nextRow = rows[i + 1];
                table.tBodies[0].insertBefore(nextRow, rows[i]);
                break;
            }
        }
    }
}

document.getElementById("tool-down").addEventListener('click', onToolMoveDown)

// Funtion to move row up

const onToolMoveUp = () => {
    if (selectedChemicalIds.size === 1) {
        let rows = table.rows;
        for (let i = 1; i < rows.length; i++) {
            if (selectedChemicalIds.has(parseInt(rows[i].cells[1].innerText))) {
                if (i > 1) {
                    table.tBodies[0].insertBefore(rows[i], rows[i - 1]);
                }
                break;
            }
        }
    }
}

document.getElementById("tool-up").addEventListener('click', onToolMoveUp)

// Function to add new row in our table (I am adding this to the top)

const onToolAddNew = () => {
    if (!isAddNew) return;

    onToolSelectAll(false);
    let rows = table.rows;
    let newId = (rows.length);
    let newRow = document.createElement('tr');
    newRow.id = `row-${newId}`
    newRow.style.backgroundColor = 'rgb(225, 225, 251)'

    let innerBody = `
            <td id='chemical-${newId}'><svg xmlns="http://www.w3.org/2000/svg" style="color:blue;" class='tool' draggable={false} viewBox="0 0 16 16" fill="currentColor" height='24'>
                <path fill-rule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clip-rule="evenodd" />
            </svg></td>
            <td>${newId}</td>
            <td><input required value='' focus /></td>
            <td><input value='LG Chem' /></td>
            <td><input value=${0} /></td>
            <td><input value=${0} /></td>
            <td><input value='Bag' /></td>
            <td><input value=${100.0} /></td>
            <td><input value='kg' /></td>
            <td><input value=${0} /></td>
    `
    newRow.innerHTML = innerBody;
    selectedChemicalIds.add(newId);
    table.tBodies[0].insertBefore(newRow, rows[1]);
    toolDelete.style.color = "red"
    toolDown.style.color = "blue"
    toolUp.style.color = "blue"
    isAddNew = false;
}

document.getElementById('tool-add').addEventListener('click', onToolAddNew)

// Function to edit the row data

const onToolEdit = () => {
    if (!isAddNew || selectedChemicalIds.size !== 1) return;
    isAddNew = false;

    const id = [...selectedChemicalIds][0]
    const row = document.getElementById(`row-${id}`);
    let data = [];

    for (let i = 0; i < row.cells.length; i++) {
        data.push(row.cells[i].innerText);
    }

    let innerBody = `
        <td id='chemical-${id}'><svg xmlns="http://www.w3.org/2000/svg" style="color:blue;" class='tool' draggable={false} viewBox="0 0 16 16" fill="currentColor" height='24'>
            <path fill-rule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clip-rule="evenodd" />
        </svg></td>
        <td>${id}</td>
        <td><input required value=${data[2]} focus /></td>
        <td><input value=${data[3]} /></td>
        <td><input value=${parseFloat(data[4])} /></td>
        <td><input value=${parseFloat(data[5])} /></td>
        <td><input value=${data[6]} /></td>
        <td><input value=${parseFloat(data[7])} /></td>
        <td><input value=${data[8]} /></td>
        <td><input value=${parseFloat(data[9])} /></td>
    `
    row.innerHTML = innerBody;
}

document.getElementById('tool-edit').addEventListener('click', onToolEdit)

// Funtion to save the edit draft or to save new entry

const onToolSave = () => {
    if (isAddNew) return;

    const id = [...selectedChemicalIds][0]
    const row = document.getElementById(`row-${id}`);
    const tickLogo = document.getElementById(`chemical-${id}`).getElementsByTagName('svg')[0];
    selectedChemicalIds = new Set();

    isAddNew = true;
    toolDelete.style.color = "gray"
    toolDown.style.color = "gray"
    toolDown.style.color = "gray"
    toolUp.style.color = "gray"
    tickLogo.style.color = "gray"
    row.style.backgroundColor = "white";

    let data = [];
    let rows = Array.from(table.rows).slice(1);

    for (let i = 0; i < rows.length; i++) {
        if (parseInt(rows[i].cells[1].innerText) === id) {
            for (let j = 0, cell; cell = rows[i].cells[j]; j++) {
                let input = cell.querySelector("input");
                if (input) data.push(input.value);
            }
            break;
        }
    }

    let innerBody = `
                <td id='chemical-${id}'><svg xmlns="http://www.w3.org/2000/svg" style="color:gray;" class='tool' draggable={false} viewBox="0 0 16 16" fill="currentColor" height='24'>
                   <path fill-rule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clip-rule="evenodd" />
                  </svg></td>
                <td>${id}</td>
                <td>${data[0]}</td>
                <td>${data[1]}</td>
                <td class="input-dummy">${data[2]}</td>
                <td class="input-dummy" >${data[3]}</td>
                <td>${data[4]}</td>
                <td>${data[5]}</td>
                <td>${data[6]}</td>
                <td class="input-dummy">${data[7]}</td>
            `

    row.innerHTML = innerBody;
    setTimeout(() => document.getElementById(`chemical-${id}`).addEventListener("click", () => selectRow(id)), 500);
}

document.getElementById('tool-save').addEventListener('click', onToolSave);