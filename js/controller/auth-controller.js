function showMenu(status) {
    console.log(`currently showing menu: ${status}`);
    if (status === "customer") {
        console.log(`running the customer status`);
        $('#menuItemHome').parent().show();
        $('#menuItemLogout').parent().show();
        $('#menuItemProfile').parent().show();
        $('#menuItemWallet').parent().show();
        $('#menuItemCustomerBiddingList').parent().show();
        $('#menuItemSwitchUserType').parent().show();
        $('#menuItemSwitchUserType').html('Switch to  Selling');
        console.log($('#menuItemSwitchUserType').parent());
        $('#menuItemNewBid').parent().hide();
        $('#menuItemSellerOngoingBids').parent().hide();
        $('#menuItemSellerBidsHistory').parent().hide();
    } else if (status === "seller") {
        console.log(`running the seller status`);
        $('#menuItemHome').parent().show();
        $('#menuItemLogout').parent().show();
        $('#menuItemProfile').parent().show();
        $('#menuItemSwitchUserType').parent().remove();
        // $('#menuItemSwitchUserType').html('Switch to Buying');
        $('#menuItemWallet').parent().hide();
        $('#menuItemCustomerBiddingList').parent().hide();
        $('#menuItemNewBid').parent().show();
        $('#menuItemSellerOngoingBids').parent().show();
        $('#menuItemSellerBidsHistory').parent().show();
    } else {
        console.log(`running the else status`);
        $('#menuItemHome').parent().show();
        $('#menuItemLogout').parent().show();
        $('#menuItemProfile').parent().hide();
        $('#menuItemNewBid').parent().hide();
        $('#menuItemWallet').parent().hide();
        $('#menuItemCustomerBiddingList').parent().hide();
        $('#menuItemSellerOngoingBids').parent().hide();
        $('#menuItemSellerBidsHistory').parent().hide();
        $('#menuItemSwitchUserType').parent().hide();
        // $('#menuItemSwitchUserType').html('Switch to  Selling');
    }
}

// check saved user logins
function checkLogins() {
    if (localStorage.hasOwnProperty('nextbid_login')) {
        let loginCredentials = JSON.parse(localStorage.getItem("nextbid_login"));
        if (loginCredentials.username !== undefined && loginCredentials.password !== undefined && loginCredentials.userType !== undefined) {
            if (loginCredentials.userType === "customer") {
                showMenu("customer");
                return;
            }

            if (loginCredentials.userType === "seller") {
                showMenu("seller");
                return;
            }
        }
    }

    if (window.location.href !== baseUrl + 'user-login.html') {
        if (window.location.href === baseUrl + 'user-register.html') {
            if (!(window.location.href === baseUrl + 'user-register.html')) {
                window.location.href = baseUrl + 'user-register.html';
            }
        } else {
            window.location.href = baseUrl + 'user-login.html';
        }
    }
    showMenu(undefined);
}

checkLogins();