let addCategoryModal = new bootstrap.Modal(document.getElementById('add-category-modal'), {keyboard: true})

function saveBid() {

}

function createNewBid() {
    $.ajax({
        enctype: 'multipart/form-data',
        type: 'POST',
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        url: baseUrl + "/api/v1/Bid/create",
        processData: false,
        contentType: false,
        dataType: "JSON",
        data: new FormData($('#loginForm')[0]),
        async: true,
        beforeSend: function () {
            // show loading

        },
        complete: function () {
            // hide loading

        },
        success: function (response) {
            // handle success
            saveBid();
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

$('#createNewBidForm').on('submit', e => {
    e.preventDefault();
    e.stopPropagation();
    if (document.querySelector('#createNewBidForm').checkValidity()) {
        createNewBid();
    } else {
        Toast.fire({
            icon: 'error',
            title: 'Invalid form data! Please check again.'
        })
    }
});

$('#newCategoryAddForm').on('submit', e => {
    e.preventDefault();
    e.stopPropagation();
    if (document.querySelector('#newCategoryAddForm').checkValidity()) {

        // save category
        addCategoryModal.toggle();

    } else {
        Toast.fire({
            icon: 'error',
            title: 'Invalid form data! Please check again.'
        })
    }
});
