import "./styles.css";

if (document.readyState !== "loading") {
  console.log("Document is ready!");
  initializeCode();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    console.log("Document is ready after waiting!");
    initializeCode();
  });
}

function initializeCode() {
  const url1 =
    "https://statfin.stat.fi/PxWeb/sq/4e244893-7761-4c4f-8e55-7a8d41d86eff";
  const url2 =
    "https://statfin.stat.fi/PxWeb/sq/5e288b40-f8c8-4f1e-b3b0-61b86ce5c065 ";
  getData(url1, url2)
    .then((res) => dataToTable(res.dataPromise1, res.dataPromise2))
    .catch((result) => console.log(result.message));
}

async function getData(url1, url2) {
  const dataPromise1 = await (await fetch(url1)).json();
  const dataPromise2 = await (await fetch(url2)).json();

  return { dataPromise1, dataPromise2 };
}

function dataToTable(res1, res2) {
  const dataTable = document.getElementById("input-tbody");

  //console.log(res2.dataset.value); //(res.dataset.dimension.Alue.category.index[0])

  for (let i = 0; i < res1.dataset.value.length; i++) {
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");

    let employmentPercentage = (
      (res2.dataset.value[i] / res1.dataset.value[i]) *
      100
    ).toFixed(2);
    if (employmentPercentage > 45) {
      tr.style.backgroundColor = "#abffbd";
    } else if (employmentPercentage < 25) {
      tr.style.backgroundColor = "#ff9e9e";
    } else {
    }

    td1.innerText = Object.values(res1.dataset.dimension.Alue.category.label)[
      i
    ];
    td2.innerText = res1.dataset.value[i];
    td3.innerText = res2.dataset.value[i];
    td4.innerText = employmentPercentage.concat("%");
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    dataTable.appendChild(tr);
  }
}
