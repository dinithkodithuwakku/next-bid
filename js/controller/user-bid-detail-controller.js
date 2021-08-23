$(document).ready(function () {
    if (localStorage.hasOwnProperty("nextbid_bid_obj")) {
        let bidObj = JSON.parse(localStorage.getItem("nextbid_bid_obj"));

        const bidDetailBase = $('#bidDetailBase');
        bidDetailBase.append(_createBidDetailBase(bidObj));

    }
});

function _createBidDetailBase(bidObj) {
    const format = "YYYY-MM-DD";
    console.log(bidObj);
    return `
        <div class="col-md-6 col-lg-6">
            <div class="w-100 mb-3">
                <video controls class="form-control border-0 bg-light" id="bidVideoPreview" src=${bidObj.Item.Video}
                       style="margin-top: 10px">
                    Your browser does not support HTML video.
                </video>
            </div>
        </div>

        <div class="col-md-6 col-lg-6">
            <div class="row">
                <h1 class="text-primary-dark">${bidObj.Item.ItemName}</h1>

                <p id="trailerDescription">${bidObj.Item.ItemDiscription}</p>

                <div class="d-flex flex-column">
                    <p class="mb-0">Ends In</p>
                    <h3 class="mb-0 fw-bold">${moment(new Date(bidObj.itemBidding.BidEndDate)).format(format)}</h3>
                </div>

                <div class="d-flex flex-column mt-2">
                    <p class="mb-0">Starting Bid</p>
                    <h3 class="mb-0 fw-bold text-primary">${bidObj.itemBidding.StartingBid}</h3>
                </div>
            </div>

            <div class="card border-0 bg-light" style="margin-top: 10px">
                 <form class="row needs-validation" id="placeBidForm" novalidate>
                    <div class="card-body">
                        <div class="row m-0 p-0 justify-content-center">
                           <label class="form-label" for="bidInspectionStartsDateTime">
                                Inspection date
                            </label>
                            <input class="form-control border-0 bg-white" id="bidInspectionStartsDateTime" required
                                   name="bidInspectionStartsDate"
                                   type="date">
                            <div class="invalid-feedback">
                                Please enter valid inspection in date!
                            </div>
                        </div>
                        <div class="row m-0 p-0 justify-content-center" style="margin-top: 10px">
                                <input class="form-control border-1 bg-white" type="number" required name="bidValue">
                            <div class="col-auto">
                                <button class="btn btn-primary border-0" style="width: fit-content" type="submit" onclick="onClickPlaceBid(event)" id="placeBid"> 
                                    Place Bid
                                </button>
                                <div class="invalid-feedback">
                                    Please enter bid value!
                                </div>
                            </div>
                        </div>
                    </div>
               </form>
            </div>
        </div>
    `;
}

function onClickPlaceBid(event) {
    event.preventDefault();
    event.stopPropagation();
    if (document.querySelector('#placeBidForm').checkValidity()) {
        let bidObj = JSON.parse(localStorage.getItem("nextbid_bid_obj"));
        if(parseFloat($('input[name=bidValue]').val()) > bidObj.itemBidding.StartingBid) {

            let obj = {
                ItemId: bidObj.Item.ItemId,
                UserId: parseInt(localStorage.getItem("nextbid_userId")),
                InspectionDate: $('input[name=bidInspectionStartsDate]').val(),
                BidValue: parseFloat($('input[name=bidValue]').val())
            };

            $.ajax({
                type: 'POST',
                url: "https://localhost:44395/api/User/SaveUserBid",
                data: obj,
                async: true,
                beforeSend: function () {
                    // show loading
                    $(`#placeBid`).prop("disabled", true);
                },
                complete: function () {
                    // hide loading
                    $(`#placeBid`).prop("disabled", false);
                },
                success: function (response) {
                    // handle success

                    Toast.fire({
                        icon: 'success',
                        title: 'Bid successfully placed!'
                    });

                    window.location.href = baseUrl + 'user-bid-detail.html';
                },
                error: function (response) {
                    // handle error
                    Toast.fire({
                        icon: 'error',
                        title: 'Request failed! cannot preform this action!'
                    })
                }
            });
        }else{
            Toast.fire({
                icon: 'error',
                title: 'Bid value should grater than starting bid!'
            })
        }
    } else {
        Toast.fire({
            icon: 'error',
            title: 'InspectionDate and bid value required.'
        })
    }

}

