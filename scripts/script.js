let booksArray = [];

function Book(title, pages, author) {
  this.title = title;
  this.pages = pages;
  this.author = author;
  this.read = false;
};
function storeBooksInArray(obj, arr) {
  return arr.push(obj)
};
function removeBook(event) {
  let bookIndexToRemove = event.target.getAttribute('data-index');
  booksArray.splice(bookIndexToRemove, 1);
  displayBooks(booksArray)
}

function changeStatus(event) {
  let indexOfBook = event.target.getAttribute('btn-index');
  // access to array with the index 
  // change status


  if (booksArray[indexOfBook].read === true) {
    booksArray[indexOfBook].read = false;
  } else {
    booksArray[indexOfBook].read = true;
  }
   displayBooks(booksArray);



}
function displayBooks(booksArray) {
  let divBigBox = document.querySelector('.big-box');
 

  //here I selected all cards i created previously for my books
  let cards = document.querySelectorAll('.card');
  //delete all cards before i display them again on the page
  cards.forEach(card => {
    card.remove();
  });

  booksArray.forEach((book, index) => {

    let divElement = document.createElement('div');
    divElement.classList.add("card");
    divBigBox.append(divElement);

    let newElement = document.createElement('p');
    newElement.innerText = `
    title : ${book.title} 
    pages : ${book.pages} 
    author : ${book.author}
    read : ${book.read}`;

    divElement.append(newElement);

    // remove button
    let removeButton = document.createElement('button');
    removeButton.setAttribute('data-index', index)
    removeButton.innerText = "Delete";
    divElement.append(removeButton);

    removeButton.addEventListener('click', removeBook);

    //read button chnager
    let readButton = document.createElement('button');
    readButton.setAttribute('btn-index', index);
    readButton.innerText = "change status of read";
    divElement.append(readButton);

    readButton.addEventListener('click', changeStatus);


  });
}



//to open modal button
let openModal = document.getElementById('open-modal');
let modal = document.querySelector('.modal');
openModal.addEventListener('click', open_modal);

function open_modal() {
  modal.showModal();
}


//submit button to add books to library
let submit_button = document.querySelector('#submit-btn');
submit_button.addEventListener("click", addBook);

function addBook(event) {
  event.preventDefault();

  let form = event.target.form;

  // Use FormData to collect form data
  const formData = new FormData(form);

  let title = formData.get('title');
  let pages = formData.get('pages');
  let author = formData.get('author');
  let read = formData.get('read');

  let newBook = new Book(title, pages, author, read);
  storeBooksInArray(newBook, booksArray);



  //display cards 
  displayBooks(booksArray);


}














