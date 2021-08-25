// update preview card
function updateCardTitle(element) {
    $(`#bidTitleInputPreview`).html(element.value);
}

function updateEndsIn(element) {
    const format = "YYYY-MM-DD";
    $(`#bidEndsDatePreview`).html(moment(new Date(element.value)).format(format));
}

function updateStartFrom(element) {
    let value = element.value !== '' ? parseFloat(element.value).toFixed(2) : 0;
    $(`#bidStartFromPreview`).html(`${value} LKR`);
}

function updateImagePreview(event) {
    $(`#bidImageInputPreview`).attr("src", URL.createObjectURL(event.target.files[0]));
}

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}


async function saveNewBid() {
    // let coverImageByte = await getAsByteArray(document.getElementById('bidCoverImageInput'));
    // let image1Byte = await getAsByteArray(document.getElementById('bidImageOneInput'));
    // let image2Byte = await getAsByteArray(document.getElementById('bidImageTwoInput'));

    let coverImageBase64, image1Base64, image2Base64, videoBase64;

    await getBase64(document.getElementById('bidCoverImageInput').files[0]).then(data => {
        coverImageBase64 = data;
    });

    if (document.getElementById('bidImageOneInput').files[0]) {
        await getBase64(document.getElementById('bidImageOneInput').files[0]).then(data => {
            image1Base64 = data;
        });
    }

    if (document.getElementById('bidImageTwoInput').files[0]) {
        await getBase64(document.getElementById('bidImageTwoInput').files[0]).then(data => {
            image2Base64 = data;
        });
    }

    await getBase64(document.getElementById('bidVideoInput').files[0]).then(data => {
        videoBase64 = data;
    });


    // let videoByte = uploadFile(document.getElementById('bidVideoInput')).byteAr;

    let bidObj = {
        Item: {
            ItemName: $('input[name=bidTitle]').val(),
            ItemDiscription: $('textarea[name=bidDescription]').val(),
            ItemValue: parseFloat($('input[name=productValue]').val()),
            Location: $('input[name=location]').val(),


            Image1: coverImageBase64,
            Image2: image1Base64,
            Image3: image2Base64,
            Video: videoBase64,

            CategoryId: parseInt($('#bidCategoryInput option:selected').val()),

            UserId: parseInt(localStorage.getItem("nextbid_userId")),
        },
        itemBidding: {
            BidStartDate: $('input[name=bidStartsDateTime]').val(),
            BidEndDate: $('input[name=bidEndsDate]').val(),
            InspectionStartDate: $('input[name=bidInspectionStartsDateTime]').val(),
            InspectionEndDate: $('input[name=bidInspectionEndsDate]').val(),
            StartingBid: parseFloat($('input[name=bidInitialValue]').val())
        }
    };

    console.log(bidObj);

    $.ajax({
        type: 'POST',
        url: "https://localhost:44395/api/Item/SaveItem",
        data: bidObj,
        async: true,
        beforeSend: function () {
            // show loading
            $(`#saveNewBidBtn`).prop("disabled", true);
            $(`#clearNewBidBtn`).prop("disabled", true);
        },
        complete: function () {
            // hide loading
            $(`#saveNewBidBtn`).prop("disabled", false);
            $(`#clearNewBidBtn`).prop("disabled", true);
        },
        success: function (response) {
            // handle success

            Toast.fire({
                icon: 'success',
                title: 'New Bid successfully created!'
            });

            window.location.href = baseUrl + 'seller-add-new-bid.html';
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

async function previewVideo() {
    await getBase64(document.getElementById('bidVideoInput').files[0]).then(data => {
        var video = document.getElementById("bidVideoPreview");
        video.src = data;
    });

}

$('#createNewBidForm').on('submit', e => {
    e.preventDefault();
    e.stopPropagation();
    if (document.querySelector('#createNewBidForm').checkValidity()) {
        // save bid
        saveNewBid();
    } else {
        Toast.fire({
            icon: 'error',
            title: 'Invalid data! Please check again.'
        })
    }
});

// ui elements
const selectInput = $('#bidCategoryInput');

function _loadAllCategories() {
    $.ajax({
        type: 'GET',
        url: "https://localhost:44395/api/Category/GetCategoryList",
        async: true,
        beforeSend: function () {
            // show loading
        },
        complete: function () {
            // hide loading
        },
        success: function (response) {
            selectInput.empty();
            for (let category of response) {
                selectInput.append(_createSelectOptions(category));
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

function _createSelectOptions(category) {
    return `
        <option value="${category.CategoryId}">${category.CategoryName}</option> 
    `;
}

$(document).ready(function () {
    _loadAllCategories();
});