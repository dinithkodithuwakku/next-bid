// ui elements
let bidLostWrapper = $('#bidLostWrapper');

function createBidLostCard(response) {
    return `
    <div class="col-md-12 col-lg-6 col-sm-12 mb-3">
        <div class="card" style="border-radius: 10px">
            <div class="card-body p-3 d-flex flex-row">
                <img alt="bid-image" src="${response.image}"
                     style="width: 50%;height: 300px;border-radius: 10px;object-fit: cover;object-position: center;">
                     
                <div class="d-flex flex-column m-3">
                    <h5 class="me-3 fw-bold"
                        style="display: block;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;overflow: hidden"> ${response.bidTitle} </h5>

                    <p class="mb-0">Bid Ended</p>
                    <p class="fw-bold">${response.bidEnding})</p>

                    <p class="mb-0">Highest Bid <span class="badge bg-dark">@username</span></p>
                    <p class="fw-bold">${response.bidHighest} LKR</p>

                    <p>Status : <span class="badge bg-danger">${response.bidStatus}</span></p>

                    <a class="btn btn-dark fw-bold w-100 py-3 border-0" href="user-bid-detail.html?id=${response.id}"
                       style="border-radius: 10px;">
                        View Bid
                    </a>
                </div>
            </div>
        </div>
    </div>
    `;
}

function createBidWinCard(response) {
    return undefined;
}

function _loadWinBidList() {

    bidLostWrapper.empty();

    $.ajax({
        enctype: 'multipart/form-data',
        type: 'POST',
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
                bidLostWrapper.append(createBidWinCard(response.data));
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

function _loadLostBidList() {
    bidLostWrapper.empty();

    $.ajax({
        enctype: 'multipart/form-data',
        type: 'POST',
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
                bidLostWrapper.append(createBidLostCard(response.data));
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

$(document).ready(function (){
    _loadLostBidList();
    _loadWinBidList();
});