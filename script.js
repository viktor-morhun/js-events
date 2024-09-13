"use strict";

import { FETCH_BASE_URL } from "./constants.js";
import { fetchProducts } from "./fetchData.js";

//task 1
const textContainerElement = document.getElementById("text-block");
document.addEventListener("keydown", (event) => {
  const textContainerElement = document.getElementById("text-block");
  const textAreaElement = document.getElementById("text-area");
  let text = textContainerElement.innerText;

  if (event.ctrlKey && event.code === "KeyE") {
    event.preventDefault();
    const textContainerElement = document.getElementById("text-block");
    const textAreaElement = document.getElementById("text-area");
    let text = textContainerElement.innerText;
    textAreaElement.innerText = text;
    textContainerElement.classList.add("hidden-element");
    textAreaElement.classList.remove("hidden-element");
    textAreaElement.focus();
  }

  if (event.ctrlKey && event.code === "KeyS") {
    event.preventDefault();
    text = textAreaElement.value;
    textContainerElement.innerText = text;
    textAreaElement.classList.add("hidden-element");
    textContainerElement.classList.remove("hidden-element");
  }
});

//task 2
class domApp {
  constructor(tableId, tableHeadingId) {
    this.productsData = [];
    this.tableId = tableId;
    this.tableHeadingId = tableHeadingId;
  }
  setProductsData = async () => {
    this.productsData = await fetchProducts(FETCH_BASE_URL);
    this.renderTable();
  };
  renderTable(data = this.productsData) {
    const tableElement = document.getElementById(this.tableId);
    tableElement.innerHTML = data.map(this.renderProduct).join("");
    document.removeEventListener("click", this.sortBy);
    this.addEventListeners();
  }
  renderProduct({ title, price, id }) {
    return `<tr>
            <td title="${title}">${title}</td>
            <td>${price}</td>
            <td>${id}</td>
          </tr>`;
  }
  addEventListeners() {
    document
      .getElementById(this.tableHeadingId)
      .addEventListener("click", this.sortBy);
  }
  sortBy = (event) => {
    let sortedProducts = [];
    if (event.target.id === "productName") {
      sortedProducts = this.productsData.toSorted((a, b) => {
        if (a.title > b.title) {
          return 1;
        }
        if (a.title < b.title) {
          return -1;
        }
        return 0;
      });
      this.renderTable(sortedProducts);
    } else if (event.target.id === "productPrice") {
      sortedProducts = this.productsData.toSorted((a, b) => a.price - b.price);
      this.renderTable(sortedProducts);
    } else if (event.target.id === "productId") {
      sortedProducts = this.productsData.toSorted((a, b) => a.id - b.id);
      this.renderTable(sortedProducts);
    }
  };
}

const productsTable = new domApp("tableContent", "tableHeading");

productsTable.setProductsData();

//Task 3
function makeResizableBlock() {
  const resizeBlockElement = document.getElementById("resizeBlock");
  const resizerElement = document.getElementById("resizer");
  let elementWidth = 0;
  let elementHeight = 0;

  resizerElement.addEventListener("mousedown", (e) => {
    e.preventDefault();

    elementWidth = resizeBlockElement.getBoundingClientRect().left;
    elementHeight = resizeBlockElement.getBoundingClientRect().top;
    document.getElementById('body').style.cursor = 'nwse-resize';

    window.addEventListener("mousemove", resizeElement);
    window.addEventListener("mouseup", stopResizing);
  });

  function resizeElement(e) {
    resizeBlockElement.style.width = e.clientX - elementWidth + "px";
    resizeBlockElement.style.height = e.clientY - elementHeight + "px";
  }

  function stopResizing() {
    window.removeEventListener("mousemove", resizeElement);
    window.removeEventListener("mouseup", stop);
    document.getElementById('body').style.cursor = 'auto';
  }
}

makeResizableBlock();
