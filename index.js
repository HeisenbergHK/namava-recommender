const resultList = document.getElementById("result-list");
const inputField = document.getElementById("search-input");

async function fetchData(keyword) {
  const url = `http://127.0.0.1:5000/api/v1/top_match?keyword=${keyword}`;
  const response = await fetch(url);
  const data = await response.json();

  return data;
}

async function logToConsole(keyword) {
  const data = await fetchData(keyword);
  console.log(data);
}

// logToConsole("آخر")

async function renderResults(keyword) {
  const data = await fetchData(keyword);
  // console.log(data);
  let resultHTML = "";

  for (let i = 0; i < data.length; i++) {
    resultHTML += `<div class="result-item">${data[i].series_name}</div>`;
  }

  resultList.innerHTML = resultHTML;

  console.log(resultHTML);
}

inputField.addEventListener("input", function () {
  const keyword = inputField.value
  renderResults(keyword);
});

document.addEventListener("DOMContentLoaded", function() {
  resultList.innerHTML = "";
})