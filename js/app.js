import chemicals from '../chemicals.json' with {type: 'json'};
import { selectRow } from './tools.js';

const tbody = document.querySelector(".tbody");

// showChemicals function highlights all the chemicals in our table while managing the order of it.
const showChemicals = () => {
  let output = "";

  chemicals.forEach(
    ({ id, chemicalName, vendor, density, viscosity, packaging, packSize, unit, quantity }) => {
      output += `
              <tr id='row-${id}'>
                <td id='chemical-${id}'><svg xmlns="http://www.w3.org/2000/svg" style="color:gray;" class='tool' draggable={false} viewBox="0 0 16 16" fill="currentColor" height='24'>
                   <path fill-rule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clip-rule="evenodd" />
                  </svg></td>
                <td>${id}</td>
                <td>${chemicalName}</td>
                <td>${vendor}</td>
                <td class="input-dummy">${density}</td>
                <td class="input-dummy" >${viscosity}</td>
                <td>${packaging}</td>
                <td>${packSize}</td>
                <td>${unit}</td>
                <td class="input-dummy">${quantity}</td>
              </tr>
            `;

      setTimeout(() => document.getElementById(`chemical-${id}`).addEventListener("click", () => selectRow(id)), 500);
    }
  );
  tbody.innerHTML = output
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
