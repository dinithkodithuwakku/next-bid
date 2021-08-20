let addCategoryModal = new bootstrap.Modal(document.getElementById('add-category-modal'), {keyboard: true})

function createNewBid() {

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
