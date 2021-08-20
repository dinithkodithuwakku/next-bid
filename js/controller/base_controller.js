// swal tost configs
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
});

let baseUrl = undefined;

function getBaseUrl() {
    let urlArr = window.location.href.split('/');
    if (urlArr[urlArr.length - 1].length > 0) {
        baseUrl = window.location.href.split(urlArr[urlArr.length - 1])[0];
    } else {
        baseUrl = window.location.href;
    }
}

getBaseUrl();

function logoutNRedirectToLogin() {
    localStorage.clear();
    window.location.href = baseUrl + 'user-login.html';
}

function switchToOtherAccount() {
    if (localStorage.hasOwnProperty("nextbid_login")) {
        let loginData = JSON.parse(localStorage.getItem("nextbid_login"));
        loginData.userType = loginData.userType === "customer" ? "seller" : "customer";
        localStorage.setItem("nextbid_login", JSON.stringify(loginData));
        window.location.href = baseUrl + 'index.html';
    } else {
        checkLogins();
    }
}

// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            console.log(form);
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })
})();