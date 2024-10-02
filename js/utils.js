const table = document.querySelector(".table");
let previousIndex = 1, order = "asc", numericalKeys = new Set(['Id', 'Pack Size', 'Density', 'Viscosity', 'Quantity'])

// to sort rows based on the table header key and sorting order
function sortTable(columnIndex) {
    let rows = Array.from(table.rows).slice(1), toParse = false;
    if (previousIndex === columnIndex) {
        order = order === "asc" ? "desc" : "asc";
        order === "asc" ? table.rows[0].cells[columnIndex].classList = "asc" : table.rows[0].cells[columnIndex].classList = "desc";
    }
    else {
        table.rows[0].cells[previousIndex].classList = ""
        table.rows[0].cells[columnIndex].classList = "asc"
        previousIndex = columnIndex;
        order = "asc"
    }

    if (numericalKeys.has(table.rows[0].cells[columnIndex].innerText)) toParse = true;

    rows.sort((rowA, rowB) => {
        let cellA = rowA.cells[columnIndex].innerText.toLowerCase();
        let cellB = rowB.cells[columnIndex].innerText.toLowerCase();

        if (toParse) {
            cellA = parseFloat(cellA) === NaN ? order === "asc" ? Number.MAX_VALUE : Number.MIN_VALUE : parseFloat(cellA);
            cellB = parseFloat(cellB) === NaN ? order === "asc" ? Number.MAX_VALUE : Number.MIN_VALUE : parseFloat(cellB);
        }

        if (cellA < cellB) return order === "asc" ? -1 : 1;
        if (cellA > cellB) return order === "asc" ? 1 : -1;
        return 0;
    });

    rows.forEach(row => table.tBodies[0].appendChild(row));

}