'use strict'

var gTrans = {
    title: {
        en: 'Book Store',
        he: 'חנות ספרים '
    },
    'add-btn': {
        en: 'Add New Book',
        he: 'הוסף ספר חדש '
    },
    'table-title': {
        en: 'Title',
        he: 'כותרת'
    },
    'table-price': {
        en: 'Price',
        he: 'מחיר'
    },
    'table-actions': {
        en: 'Actions',
        he: 'פעולות'
    },
    'page-current': {
        en: 'Current Page',
        he: 'דף נוכחי'
    },
    'next-page-btn': {
        en: 'Next Page',
        he: 'עמוד הבא'
    },
    'read-btn': {
        en: 'Read',
        he: 'קריאה'
    },
    'update-btn': {
        en: 'Update',
        he: 'עדכון'
    },
    'delete-btn': {
        en: 'Delete',
        he: 'מחיקה'
    },
    'price-update-placeholder': {
        en: 'Price update',
        he: ' עדכון מחיר'
    },
    'title-update-placeholder': {
        en: 'Title update',
        he: 'עדכון כותרת'
    },
    'overview-update-placeholder': {
        en: 'Bookreview',
        he: 'ביקורת ספר'
    },
    'confirm-update-btn': {
        en: 'Confirm',
        he: 'אשר'
    }
}



var gCurrLang = 'en';

function setLang(lang) {
    gCurrLang = lang;
}

function getTrans(transKey) {
    var translation = gTrans[transKey][gCurrLang]
    if (!translation) return gTrans[transKey].en
    return translation
}

function doTrans() {
    var els = document.querySelectorAll('[data-trans]')
    els.forEach(function(el) {
        var transKey = el.dataset.trans
        var trans = getTrans(transKey)
        if (el.nodeName === 'INPUT' || el.nodeName === 'TEXTAREA') {
            el.placeholder = trans
        } else {
            el.innerText = trans
        }
    })

}

function formatCurrency(num) {
    if (gCurrLang === 'he') {
        var currencyToLocal = 'ILS';
        var region = 'he-IL';
    } else if (gCurrLang === 'en') {
        currencyToLocal = 'USD'
        region = 'en-US';
    }
    return new Intl.NumberFormat(region, { style: 'currency', currency: currencyToLocal }).format(num);
}