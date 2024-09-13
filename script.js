'use strict';

import { FETCH_BASE_URL } from "./constants.js";
import { fetchProducts } from "./fetchData.js";


//task 1
const textContainerElement = document.getElementById('text-block');
document.addEventListener("keydown", (event) => {
  const textContainerElement = document.getElementById('text-block');
  const textAreaElement = document.getElementById('text-area');
  let text = textContainerElement.innerText;

  if (event.ctrlKey && event.code === 'KeyE') {
    event.preventDefault();
    const textContainerElement = document.getElementById('text-block');
    const textAreaElement = document.getElementById('text-area');
    let text = textContainerElement.innerText;
    textAreaElement.innerText = text;
    textContainerElement.classList.add('hidden-element');
    textAreaElement.classList.remove('hidden-element');
    textAreaElement.focus();
  }

  if (event.ctrlKey && event.code === 'KeyS') {
    event.preventDefault();
    text = textAreaElement.value;
    textContainerElement.innerText = text;
    textAreaElement.classList.add('hidden-element');
    textContainerElement.classList.remove('hidden-element');
  }
});

//task 2
class domApp {
  constructor(tableId) {
    this.productsData = [];
    this.tableId = tableId;
  }
  setProductsData = async () =>  {
    this.productsData = await fetchProducts(FETCH_BASE_URL);
    this.renderTable();
  }
  renderTable(data = this.productsData) {
    const tableElement = document.getElementById(this.tableId);
    tableElement.innerHTML = data.map(this.renderProduct).join('');
    document.removeEventListener('click', this.sortBy);
    this.addEventListeners();
  }
  renderProduct({title, price, id}) {
    return `<tr>
            <td title="${title}">${title}</td>
            <td>${price}</td>
            <td>${id}</td>
          </tr>`;
  }
  addEventListeners() {
  document.addEventListener('click', this.sortBy);
  }
  sortBy = (event) => {
    let sortedProducts = [];
    console.log('sort')
    if (event.target.id === 'productName') {
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
    }else if (event.target.id === 'productPrice') {
      sortedProducts = this.productsData.toSorted((a, b) => a.price - b.price);
      this.renderTable(sortedProducts);
    }else if (event.target.id === 'productId') {
      sortedProducts = this.productsData.toSorted((a, b) => a.id - b.id);
    this.renderTable(sortedProducts);
    }
  }
}

const productsTable = new domApp('tableContent');

productsTable.setProductsData();


//Task 3

function makeResizableBlock() {
  const resizeBlockElement = document.getElementById('resizeBlock');
  const resizerElement = document.getElementById('resizer');

  resizerElement.addEventListener('mousedown', (e) => {
    e.preventDefault();
    console.log(e);
    console.log(resizeBlockElement.getBoundingClientRect());

    window.addEventListener('mousemove', resizeElement);
    window.addEventListener('mouseup', stopResizing);
  });

  function resizeElement(e) {
    console.log('resizing');
    resizeBlockElement.style.width = e.clientX - resizeBlockElement.getBoundingClientRect().left + 'px';
    resizeBlockElement.style.height = e.clientY- resizeBlockElement.getBoundingClientRect().top + 'px';
  }

  function stopResizing() {
    console.log('stop');
    window.removeEventListener('mousemove', resizeElement);
  }
}

makeResizableBlock();