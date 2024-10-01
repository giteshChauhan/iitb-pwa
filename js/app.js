const table = document.querySelector(".table");
const tools = document.querySelector(".tools");

import chemicals from '../chemicals.json' with {type: 'json'};

const showChemicals = () => {
  let output = "";

  output += `<tr>
      <th><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" height="18">
                  <path fill-rule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clip-rule="evenodd" />
      </svg></th>

      <th> </th>
      <th>Chemical Name</th>
      <th>Vendor</th>
      <th>Density</th>
      <th>Viscosity</th>
      <th>Packaging</th>
      <th>Pack Size</th>
      <th>Unit</th>
      <th>Quantity</th>
  </tr>`

  chemicals.forEach(
    ({ id, chemicalName, vendor, density, viscosity, packaging, packSize, unit, quantity }) =>
    (output += `
              <tr class="row">
                <td><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" height="18">
                  <path fill-rule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clip-rule="evenodd" />
                </svg></td>

                <td>${id}</td>
                <td>${chemicalName}</td>
                <td>${vendor}</td>
                <td>${density}</td>
                <td>${viscosity}</td>
                <td>${packaging}</td>
                <td>${packSize}</td>
                <td>${unit}</td>
                <td>${quantity}</td>
              </tr>
              `)
  );
  table.innerHTML = output;
};

document.addEventListener("DOMContentLoaded", showChemicals);


// To register service worker for our PWA
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then(res => console.log("Service worker registered"))
      .catch(err => console.log("Service worker not registered", err));
  });
}
