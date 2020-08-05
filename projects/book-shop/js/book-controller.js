'use strict'


function onInit() {
    renderBooks();
    doTrans();
}

function renderBooks() {
    var books = getBooks();
    var strHtmls = books.map(function(book) {
        var localprice = formatCurrency(book.price)
        return ` <tr>
        <td class="id-cell">${book.id}</td>
        <td> <img class="cover" src="${book.imgUrl}" alt="Book cover">${book.title}</td>
        <td>${localprice}</td> 
        <td><button class="read-btn" data-trans="read-btn" onclick="onReadBook('${book.id}')">read</button>
        <button class="update-btn" data-trans="update-btn" onclick="onReadBook('${book.id}')">update</button>
        <button class="delete-btn" data-trans="delete-btn" onclick="onDeleteBook('${book.id}')">delete</button></td>
</tr>`
    })
    document.querySelector('.book-wrap').innerHTML = strHtmls.join('');
    onShowPageNum();
    doTrans();
}

function onAddBook() {
    addBook();
    renderBooks();
}

function onDeleteBook(bookId) {
    deleteBook(bookId)
    renderBooks();
}

function onUpdateBook(bookId) {
    updateBook(bookId)
    renderBooks();
}

function onReadBook(bookId) {
    onShowModal(bookId);
    renderBooks();
}

function onShowModal(bookId) {
    var book = readBook(bookId);
    var localprice = formatCurrency(book.price)
    document.querySelector('.book-description').innerText = `${book.description}`;
    document.querySelector('.book-pic').innerHTML = `<img class="book-cover" src="${book.imgUrl}" alt="Book cover">`;
    document.querySelector('.book-price').innerText = `${localprice}`;
    document.querySelector('.book-rating').innerHTML = `
    <div class="book-rating-subcontainer">
      <button class="rate-button-minus" onclick="onMinusRate('${bookId}')"> - </button>
        <div class="rating-display">${book.rating}</div>
      <button  class="rate-button-plus" onclick="onPlusRate('${bookId}')"> + </button>
    </div>`
    document.querySelector('.confirm-btn').innerHTML = ` <button type="button" class="confirm-update" data-trans="confirm-update-btn" onclick="onUpdateBook('${bookId}')">Confirm</button>`
    var modal = document.querySelector('.modal')
    modal.classList.add("show")
    doTrans();
}

function onCloseModal() {
    var modal = document.querySelector('.modal')
    modal.classList.remove("show")
}

function onTitleSort() {
    gTitleSort = !gTitleSort;
    titleSort();
    renderBooks();


}

function onPriceSort() {
    gPriceSort = !gPriceSort;
    priceSort();
    renderBooks();

}

function onMinusRate(bookId) {
    document.querySelector('.rating-display').innerText = minusRate(bookId);

}

function onPlusRate(bookId) {
    document.querySelector('.rating-display').innerText = plusRate(bookId);
}

function onNextPage() {
    goNextPage();
    onShowPageNum()
    renderBooks();
}

function onShowPageNum() {
    document.querySelector('.page-current').textContent = `${showPageIdx()+1}`;
}

function onSetLang(lang) {
    setLang(lang);
    if (lang === 'he') {
        document.body.classList.add('rtl')
    } else {
        document.body.classList.remove('rtl')
    }
    renderBooks();
    doTrans();

}

