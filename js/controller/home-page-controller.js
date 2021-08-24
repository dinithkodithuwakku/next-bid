const bidRow = $('#bidRow');

function onclickPlaceBid(bidObj) {
    event.preventDefault();

    localStorage.setItem("nextbid_bid_obj", JSON.stringify(bidObj));

    window.location.href = baseUrl + 'user-bid-detail.html';
}

function _createBidCard(bidObj) {
    const format = "YYYY-MM-DD";

    return `
        <div class="col-md-6 col-lg-4 col-sm-12 mb-3">
            <div class="card" style="border-radius: 10px">
                <div class="card-body p-3">
                    <div class="d-flex flex-row justify-content-between mb-3">
                        <div>
                            <p class="mb-0">Ends In</p>
                            <p class="mb-0 fw-bold">${moment.duration(moment(new Date(bidObj.itemBidding.BidEndDate)).diff(moment(new Date(bidObj.itemBidding.BidStartDate)))).asHours()} hrs</p>
                        </div>
                        <div class="text-end">
                            <p class="mb-0">Starting Bid</p>
                            <p class="mb-0 fw-bold">${bidObj.itemBidding.StartingBid}</p>
                        </div>
                    </div>

                    <img alt="bid-image" src=${bidObj.Item.Image1}
                        style="width: 100%;height: 300px;border-radius: 10px;object-fit: cover;object-position: center;">

                    <h5 class="text-center my-3 fw-bold">${bidObj.Item.ItemName}</h5>
                    <h6 class="text-center my-3 fw-bold">${bidObj.Item.ItemDiscription}</h6>

                    <span id=${bidObj.Item.ItemId}></span>
                </div>
            </div>
        </div>
    `;
}

function createAndAppendBidsList(obj) {

    bidRow.append(_createBidCard(obj));

    let placeBidButton = document.createElement('button');
    placeBidButton.className = "btn btn-primary fw-bold w-100 py-3 border-0";
    placeBidButton.style.borderRadius = "10px";
    placeBidButton.innerHTML = "View details";
    placeBidButton.addEventListener('click', function () {
        onclickPlaceBid(obj)
    });

    document.getElementById(obj.Item.ItemId).appendChild(placeBidButton);
}

function _loadTrendingBids() {
    $.ajax({
        type: 'GET',
        url: "https://localhost:44395/api/Item/GetItemList",
        async: true,
        beforeSend: function () {
            // show loading

        },
        complete: function () {
            // hide loading

        },
        success: function (response) {
            // handle success
            bidRow.empty();
            for (let i = 0; i < response.Item.length; i++) {
                let item = response.Item[i];
                let itemBidding = response.itemBidding[i];
                let bidObj = {
                    Item: item,
                    itemBidding: itemBidding
                };
                createAndAppendBidsList(bidObj);
            }
        },
        error: function (response) {

        }
    });
}

$(document).ready(function () {
    _loadTrendingBids();
});