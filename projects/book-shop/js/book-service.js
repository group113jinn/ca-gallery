'use strict'
const KEY = 'books'
const PAGE_SIZE = 2;
var gTitleSort;
var gPriceSort;
var gPageIdx = 0;
var gBooks = [];

function addBook() {
    var book = _createBook();
    gBooks.unshift(book);
    _saveBooksToStorage();
}

function loadPageBooks() {
    getBooks()
    var startIdx = gPageIdx * PAGE_SIZE;
    return gBooks.slice(startIdx, startIdx + PAGE_SIZE);

}

function _createBook() {
    return {
        id: makeId(),
        title: getBookTitle(),
        price: getBookPrice(),
        description: getDescription(),
        rating: 0,
        imgUrl: "img/cover.jpg"
    }
}

function _saveBooksToStorage() {
    saveToStorage(KEY, gBooks)
}

function getBooks() {
    if (!localStorage.getItem(KEY)) {
        _saveBooksToStorage(KEY, gBooks)
    }
    var books = [];
    books = loadFromStorage(KEY);
    gBooks = books;
    var startIdx = gPageIdx * PAGE_SIZE;
    return gBooks.slice(startIdx, startIdx + PAGE_SIZE);
}

function getDescription() {
    return prompt('Describe the book');
}


function readBook(bookId) {
    var bookIdx = gBooks.findIndex(function(book) {
        return bookId === book.id;
    })
    _saveBooksToStorage();
    return gBooks[bookIdx];
}

function deleteBook(bookId) {
    var bookIdx = gBooks.findIndex(function(book) {
        return bookId === book.id;
    })
    gBooks.splice(bookIdx, 1)
    _saveBooksToStorage();
}

function updateBook(bookId) {
    var bookIdx = gBooks.findIndex(function(book) {
        return bookId === book.id;
    })
    var message = prompt('update description')
    if (message === 'null' || message === null || message === '') {
        return;
    } else {
        gBooks[bookIdx].description = message;
        _saveBooksToStorage();
    }
}


function getBookTitle() {
    return prompt('Please enter book\'s title');
}

function getBookPrice() {
    return +prompt('Please enter book\'s price');
}

function titleSort() {
    var books = gBooks.slice();
   if(gTitleSort){
    var titles = books.sort(function(a,b) {
        if (a.title > b.title) {
            return 1;
        }
        if (a.title < b.title) {
            return -1;
        }
        return 0;
    });
}else{
    var titles = books.sort(function(b,a) {
        if (a.title > b.title) {
            return 1;
        }
        if (a.title < b.title) {
            return -1;
        }
        return 0;
    });
}
    gBooks = titles;
    _saveBooksToStorage()
}

function priceSort() {
    var outputPrices = []
    var books = gBooks.map(function(book) {
        return book.price
    })
    var sorted;
    gPriceSort ? sorted = books.sort(function(a, b) { return a - b }) : sorted = books.sort(function(a, b) { return b - a });
    for (var i = 0; i < sorted.length; i++) {
        gBooks.find(function(sPrice) {
            if (sPrice.price === sorted[i]) {
                if (!outputPrices.includes(sPrice)) outputPrices.push(sPrice);
            }
        })
    }
    gBooks = outputPrices;
    _saveBooksToStorage()
}

function plusRate(bookId) {
    var bookIdx = gBooks.findIndex(function(book) {
        return bookId === book.id;
    })
    if (gBooks[bookIdx].rating >= 0 && gBooks[bookIdx].rating < 10) {
        gBooks[bookIdx].rating++;
        gBooks[bookIdx].description;
        _saveBooksToStorage();
    }
    return gBooks[bookIdx].rating;
}

function minusRate(bookId) {
    var bookIdx = gBooks.findIndex(function(book) {
        return bookId === book.id;
    })
    if (gBooks[bookIdx].rating > 0 && gBooks[bookIdx].rating <= 10) {
        gBooks[bookIdx].rating--;
        gBooks[bookIdx].description;
        _saveBooksToStorage();
    }
    return gBooks[bookIdx].rating;
}

function goNextPage() {
    (gPageIdx + 1 > gBooks.length / PAGE_SIZE) ? gPageIdx = 0: gPageIdx++;
}

function showPageIdx() {
    return gPageIdx;
}