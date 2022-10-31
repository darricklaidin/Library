let myLibrary = [];
let shelfElement = document.querySelector('.shelf');
// unique primary key id
let id = 1;

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = id++;
}

function reloadLibrary() {
    // remove all books
    let childCount = shelfElement.childElementCount;
    for (let i = 0; i < childCount - 1; i++) {
        shelfElement.removeChild(shelfElement.children[0]);
    }
    // add all books
    for (let i = myLibrary.length - 1; i > -1; i--) {
        let bookElement = createNewBookElement(myLibrary[i]);
        shelfElement.prepend(bookElement);
    }
}

// Update book status
function toggleRead(e) {
    // toggle read status in UI
    e.target.textContent = e.target.textContent === 'Read' ? 'Not Read' : 'Read';
    e.target.classList.toggle('unread');
    
    // toggle read status in array
    let bookElement = e.target.parentElement.parentElement;
    let bookIndex = Array.from(shelfElement.children).indexOf(bookElement);
    myLibrary[bookIndex].read = !myLibrary[bookIndex].read;
}

// Remove book from library
function removeBook(e) {
    // remove book from ui
    let bookElement = e.target.parentElement.parentElement;
    shelfElement.removeChild(bookElement);
    // remove book from array
    let bookIndex = Array.from(shelfElement.children).indexOf(bookElement);
    myLibrary.splice(bookIndex, 1);
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function createNewBookElement(book) {
    let bookElement = document.createElement('div');
    bookElement.classList.add('book');
    bookElement.setAttribute('data-id', book.id);
    bookElement.innerHTML = `
        <div class="info">
            <h6>${book.title}</h6>
            <p>By ${book.author}</p>
            <p>Pages: ${book.pages}</p>
        </div>
        <div>
            <button id="book-status-btn">Read</button>
            <button id="delete-book-btn"><svg width="22" height="22" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M38.4978 10.9994H29.3317V7.93789C29.2887 6.76429 28.7821 5.65563 27.923 4.85494C27.0639 4.05424 25.9223 3.62686 24.7486 3.66647H19.2489C18.0752 3.62686 16.9337 4.05424 16.0746 4.85494C15.2154 5.65563 14.7089 6.76429 14.6658 7.93789V10.9994H5.4997C5.0135 10.9994 4.54721 11.1925 4.20341 11.5363C3.85962 11.8801 3.66647 12.3464 3.66647 12.8326C3.66647 13.3188 3.85962 13.7851 4.20341 14.1289C4.54721 14.4727 5.0135 14.6658 5.4997 14.6658H7.33293V34.8314C7.33293 36.29 7.91236 37.6888 8.94375 38.7202C9.97514 39.7516 11.374 40.3311 12.8326 40.3311H31.1649C32.6235 40.3311 34.0224 39.7516 35.0538 38.7202C36.0852 37.6888 36.6646 36.29 36.6646 34.8314V14.6658H38.4978C38.984 14.6658 39.4503 14.4727 39.7941 14.1289C40.1379 13.7851 40.3311 13.3188 40.3311 12.8326C40.3311 12.3464 40.1379 11.8801 39.7941 11.5363C39.4503 11.1925 38.984 10.9994 38.4978 10.9994ZM18.3323 7.93789C18.3323 7.64457 18.7173 7.33293 19.2489 7.33293H24.7486C25.2802 7.33293 25.6652 7.64457 25.6652 7.93789V10.9994H18.3323V7.93789ZM32.9981 34.8314C32.9981 35.3176 32.805 35.7839 32.4612 36.1277C32.1174 36.4715 31.6511 36.6646 31.1649 36.6646H12.8326C12.3464 36.6646 11.8801 36.4715 11.5363 36.1277C11.1925 35.7839 10.9994 35.3176 10.9994 34.8314V14.6658H32.9981V34.8314Z" fill="white"/>
                <path d="M16.4991 31.1649C16.9853 31.1649 17.4516 30.9718 17.7954 30.628C18.1392 30.2842 18.3323 29.8179 18.3323 29.3317V21.9988C18.3323 21.5125 18.1392 21.0463 17.7954 20.7025C17.4516 20.3587 16.9853 20.1655 16.4991 20.1655C16.0129 20.1655 15.5466 20.3587 15.2028 20.7025C14.859 21.0463 14.6659 21.5125 14.6659 21.9988V29.3317C14.6659 29.8179 14.859 30.2842 15.2028 30.628C15.5466 30.9718 16.0129 31.1649 16.4991 31.1649Z" fill="white"/>
                <path d="M27.4985 31.1649C27.9847 31.1649 28.4509 30.9718 28.7947 30.628C29.1385 30.2842 29.3317 29.8179 29.3317 29.3317V21.9988C29.3317 21.5125 29.1385 21.0463 28.7947 20.7025C28.4509 20.3587 27.9847 20.1655 27.4985 20.1655C27.0122 20.1655 26.546 20.3587 26.2022 20.7025C25.8584 21.0463 25.6652 21.5125 25.6652 21.9988V29.3317C25.6652 29.8179 25.8584 30.2842 26.2022 30.628C26.546 30.9718 27.0122 31.1649 27.4985 31.1649Z" fill="white"/>
                </svg>
                </button>
            </div>
        </div>
    `;
    return bookElement;
}

// Add new book to library
function addBook(book) {
    // add book to library
    addBookToLibrary(book);
    // add book to ui
    reloadLibrary();
}

let modalElement = document.querySelector('.new-book-modal');

shelfElement.addEventListener('click', (e) => {
    if (e.target.id === 'book-status-btn') {
        toggleRead(e);
    } else if (e.target.id === 'delete-book-btn') {
        removeBook(e);
    } else if (e.target.classList.contains('add-book-div') || e.target.id === 'add-book-btn') {
        // Display modal
        modalElement.style.display = 'flex';
    }
});

modalElement.addEventListener('click', (e) => {
    let title = document.querySelector('#title').value;
    let author = document.querySelector('#author').value;
    let pages = document.querySelector('#pages').value;
    let read = document.querySelector('#read').checked;
    
    if (e.target.id === 'close-modal-btn') {
        modalElement.style.display = 'none';
    } else if (e.target.id === 'add-book-modal-btn') {
        // validate that all field forms are filled
        if (title === '' || author === '' || pages === '') return false;
        let book = new Book(title, author, pages, read);
        addBook(book);
        modalElement.style.display = 'none';
        e.preventDefault();
    } else {
        return;
    }
    
    // reset form values
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#pages').value = '';
    document.querySelector('#read').checked = false;
    
});

addBookToLibrary(new Book('The Hobbit', 'J.R.R. Tolkien', 295, true));
addBookToLibrary(new Book('The Lord of the Rings', 'J.R.R. Tolkien', 1178, false));
addBookToLibrary(new Book('The Two Towers', 'J.R.R. Tolkien', 352, true));

reloadLibrary();
