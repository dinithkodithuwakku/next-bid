function registerUser() {

}

$('#user_registration_form').on('submit', e => {
    e.preventDefault();
    e.stopPropagation();
    if (document.querySelector('#user_registration_form').checkValidity()) {
        registerUser();
    } else {
        Toast.fire({
            icon: 'error',
            title: 'Invalid date! Please check again.'
        })
    }
});

$('#user_registration_form').on('reset', e => {
    e.preventDefault();
    e.stopPropagation();
    document.querySelector('#user_registration_form').reset();
});

function ConfirmPassword(inputName) {
    let passwordInput = document.querySelector(`input#passwordInput`);
    let reEnterPasswordInput = document.querySelector(`input#passwordInput`);
    let input = document.querySelector(`input#${inputName}`);
    input.setCustomValidity("");
    if (passwordInput.value !== reEnterPasswordInput.value) {
        input.setCustomValidity("Passwords do not match.");
    }
}