function authChecking() {
    if (localStorage.hasOwnProperty('nextbid_login')) {
        let loginCredentials = JSON.parse(localStorage.getItem("nextbid_login"));
        if (loginCredentials.username === undefined && loginCredentials.password === undefined) {
            window.location.href = baseUrl + 'user-login.html';
        } else {
            $('#menuItemDashboard').show();
            $('#menuItemBidCreate').show();
            $('#menuItemBidAll').show();
            $('#menuItemCustomerAll').show();
        }
    } else {
        window.location.href = baseUrl + 'user-login.html';
    }
}

authChecking();

function logoutFromAdmin() {
    localStorage.clear();
    window.location.href = baseUrl + 'user-login.html';
}