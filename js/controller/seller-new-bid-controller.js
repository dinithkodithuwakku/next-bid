// update preview card
function updateCardTitle(element) {
    $(`#bidTitleInputPreview`).html(element.value);
}

function updateEndsIn(element) {
    const format = "YYYY-MM-DD HH:mm:ss";
    $(`#bidEndsDatePreview`).html(moment(new Date(element.value)).format(format));
}

function updateStartFrom(element) {
    let value = element.value !== '' ? parseFloat(element.value).toFixed(2) : 0;
    $(`#bidStartFromPreview`).html(`${value} LKR`);
}

function updateImagePreview(event) {
    console.log(URL.createObjectURL(event.target.files[0]));
    $(`#bidImageInputPreview`).attr("src", URL.createObjectURL(event.target.files[0]));
}


$('#createNewBidForm').on('submit', e => {
    e.preventDefault();
    e.stopPropagation();
    if (document.querySelector('#createNewBidForm').checkValidity()) {

        // save bid

    } else {
        Toast.fire({
            icon: 'error',
            title: 'Invalid date! Please check again.'
        })
    }
});
