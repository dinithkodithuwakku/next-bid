const bidRow = $('#bidWinWrapper');


function _createBidCard(bidObj) {
    const format = "YYYY-MM-DD";

    return `
        <div class="col-md-12 col-lg-6 col-sm-12 mb-3">
            <div class="card" style="border-radius: 10px">
                <div class="card-body p-3 d-flex flex-row">
                    <img alt="bid-image" src=${bidObj.Item.Image1}
                         style="width: 50%;height: 300px;border-radius: 10px;object-fit: cover;object-position: center;">

                    <div class="d-flex flex-column m-3">
                        <h5 class="me-3 fw-bold"
                            style="display: block;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;overflow: hidden">
                            ${bidObj.Item.ItemName}</h5>

                        <p class="mb-0">Bid Ended</p>
                        <p class="fw-bold">${parseInt(moment().diff(moment(bidObj.itemBidding.BidEndDate),'hours', true))} hrs ago</p>

                        <p class="mb-0">Highest Bid <span class="badge bg-dark">Yours</span></p>
                        <p class="fw-bold">${bidObj.itemBidding.HighestBid}</p>

                        <p>Status : <span class="badge bg-success">Can Purchase</span></p>

                        
                        <div id=${bidObj.Item.ItemId}></div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function onClickPayNow(event){
    console.log('asdasd');
}

function createAndAppendBidsList(obj) {

    bidRow.append(_createBidCard(obj));

    let placeBidButton = document.createElement('button');
    placeBidButton.className = "btn btn-primary fw-bold w-100 py-3 border-0";
    placeBidButton.style.borderRadius = "10px";
    placeBidButton.innerHTML = "Pay now";
    placeBidButton.addEventListener('click', function () {
        onClickPayNow(obj)
    });

    document.getElementById(obj.Item.ItemId).appendChild(placeBidButton);
}

function _loadTrendingBids() {
    $.ajax({
        type: 'POST',
        url: "https://localhost:44395/api/Item/GetItemListByUserBidded",
        async: true,
        data:{
            UserId: parseInt(localStorage.getItem("nextbid_userId")),
        },
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
                if (moment().isAfter(moment(response.itemBidding[i].BidEndDate))) {
                    let item = response.Item[i];
                    let itemBidding = response.itemBidding[i];
                    let bidObj = {
                        Item: item,
                        itemBidding: itemBidding
                    };
                    createAndAppendBidsList(bidObj);
                }
            }
        },
        error: function (response) {

        }
    });
}

$(document).ready(function () {
    _loadTrendingBids();
});