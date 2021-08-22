function saveCardData() {
    $.ajax({
        enctype: 'multipart/form-data',
        type: 'POST',
        url: baseUrl + "/api/v1/",
        processData: false,
        contentType: false,
        dataType: "JSON",
        data: new FormData($('#user_registration_form')[0]),
        async: true,
        beforeSend: function () {
            // show loading

        },
        complete: function () {
            // hide loading

        },
        success: function (response) {
            // handle success
            if (response.status === 200) {
                Toast.fire({
                    icon: 'success',
                    title: 'Successfully saved the card!'
                })
            }
        },
        error: function (response) {
            // handle error
            Toast.fire({
                icon: 'error',
                title: 'Request failed! cannot preform this action!'
            })
        }
    });
}

$('form#addCardForm').on('submit', e => {
    e.preventDefault();
    e.stopPropagation();
    if (document.querySelector('#addCardForm').checkValidity()) {
        // save card data
        saveCardData();
    } else {
        Toast.fire({
            icon: 'error',
            title: 'Invalid user credentials! Please check again.'
        })
    }
});

function _createTransactionRow() {

}

function createAndAppendTransactionsList(resp) {

}

function loadWalettHistory() {

    $.ajax({
        enctype: 'multipart/form-data',
        type: 'GET',
        url: baseUrl + "/api/v1/",
        processData: false,
        contentType: false,
        dataType: "JSON",
        async: true,
        beforeSend: function () {
            // show loading

        },
        complete: function () {
            // hide loading

        },
        success: function (response) {
            // handle success
            if (response.status === 200) {
                createAndAppendTransactionsList(response.data);
            }
        },
        error: function (response) {
            // handle error
            Toast.fire({
                icon: 'error',
                title: 'Request failed! cannot preform this action!'
            })
        }
    });
}

$(document).ready(function () {
    loadWalettHistory();
});