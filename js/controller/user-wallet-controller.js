$('form#addCardForm').on('submit', e => {
    e.preventDefault();
    e.stopPropagation();
    if (document.querySelector('#addCardForm').checkValidity()) {

        // save card data

    } else {
        Toast.fire({
            icon: 'error',
            title: 'Invalid user credentials! Please check again.'
        })
    }
});