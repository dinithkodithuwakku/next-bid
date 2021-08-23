const tableBody = $('#customerListTable tbody');

function _createCustomerTableRow(customer) {
    return `
        <tr>
            <th class="fw-normal" scope="row">${customer.Id}</th>
            <td class="fw-bold">${customer.FirstName} ${customer.LastName} </td>
            <td>${customer.Address}</td>
            <td><a class="badge bg-dark text-decoration-none">${customer.Email}</a></td>
            <td><a class="badge bg-dark text-decoration-none">${customer.ContactNumber}</a></td>
            <td><a class="badge bg-dark text-decoration-none">${customer.UserType === 2 ? "Seller" : "Buyer"}</a></td>
            <td>
                <!--<a class="btn btn-sm btn-dark border-0 me-1" href="admin-customer-view.html"-->
                   <!--title="View Details">-->
                    <!--View-->
                <!--</a>-->
                 <span id=${customer.Id}></span>
            </td>
        </tr>
    `;
}

function onClickBanUser(customer) {
    let userObj = {
        UserId: customer.Id,
        Email: customer.Email,
        BlacklistDate: moment().format('YYYY-MM-DD HH:mm:ss'),
        Reason: "By admin"
    };

    $.ajax({
        type: "POST",
        url: "https://localhost:44395/api/User/SaveBlackListUser",
        data: userObj,
        async: true,
        beforeSend: function () {
            // show loading
        },
        complete: function () {
            // hide loading
        },
        success: function (response) {
            Toast.fire({
                icon: "success",
                title: "User baned!",
            });
            window.location.href = baseUrl + 'admin-customer-list.html';
        },
        error: function (response) {
            console.log(response);
            // handle error
            Toast.fire({
                icon: "error",
                title: "Request failed! cannot preform this action!",
            });
        },
    });
}

function _loadAllCustomers() {
    $.ajax({
        type: 'GET',
        url: "https://localhost:44395/api/User/GetUsersList",
        async: true,
        beforeSend: function () {
            // show loading
        },
        complete: function () {
            // hide loading
        },
        success: function (response) {
            console.log(response);
            tableBody.empty();
            for (let customer of response) {
                console.log("customer : ", customer);
                tableBody.append(_createCustomerTableRow(customer));

                let banUserButton = document.createElement('button');
                banUserButton.className = "btn btn-sm btn-danger border-0";
                banUserButton.innerHTML = "<span class=\"fa fa-ban\"></span>";
                banUserButton.addEventListener('click', function () {
                    onClickBanUser(customer)
                });

                document.getElementById(customer.Id).appendChild(banUserButton);
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
    _loadAllCustomers();
});