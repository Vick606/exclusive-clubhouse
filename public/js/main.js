document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');

    // Handle form submissions
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    showError(field, `${field.name} is required`);
                } else {
                    clearError(field);
                }
            });

            if (!isValid) {
                e.preventDefault();
            }
        });
    });

    // Password confirmation check
    const passwordConfirmField = document.getElementById('confirmPassword');
    if (passwordConfirmField) {
        passwordConfirmField.addEventListener('input', function() {
            const passwordField = document.getElementById('password');
            if (this.value !== passwordField.value) {
                showError(this, 'Passwords do not match');
            } else {
                clearError(this);
            }
        });
    }

    // Auto-hide flash messages after 5 seconds
    const flashMessages = document.querySelectorAll('.alert');
    flashMessages.forEach(message => {
        setTimeout(() => {
            message.style.display = 'none';
        }, 5000);
    });

    // Helper functions
    function showError(field, message) {
        clearError(field);
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        field.parentNode.insertBefore(errorDiv, field.nextSibling);
        field.classList.add('error');
    }

    function clearError(field) {
        const errorDiv = field.parentNode.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.remove();
        }
        field.classList.remove('error');
    }
});