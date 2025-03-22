// Initialize Date Picker
flatpickr("#rentalDates", {
    mode: "range",
    minDate: "today",
    dateFormat: "Y-m-d",
    onChange: function(selectedDates) {
        const days = Math.ceil((selectedDates[1] - selectedDates[0]) / (1000 * 60 * 60 * 24)) || 0;
        document.getElementById('daysCount').textContent = days;
        updateTotal();
    }
});

// Update Pricing
function updateTotal() {
    const dailyRate = 199; // Get from car data
    const days = parseInt(document.getElementById('daysCount').textContent) || 0;
    const extras = Array.from(document.querySelectorAll('input[name="extra"]:checked'))
                      .reduce((sum, extra) => sum + parseInt(extra.value), 0);
    
    const basePrice = dailyRate * days;
    const extrasTotal = extras * days;
    const total = basePrice + extrasTotal;

    document.getElementById('extrasTotal').textContent = `$${extrasTotal.toFixed(2)}`;
    document.getElementById('totalAmount').textContent = `$${total.toFixed(2)}`;
}

// Event Listeners
document.querySelectorAll('input[name="extra"]').forEach(checkbox => {
    checkbox.addEventListener('change', updateTotal);
});

// Form Submission
// document.getElementById('bookingForm').addEventListener('submit', (e) => {
//     e.preventDefault();
    
//     // Add payment processing logic here (e.g., Stripe integration)
//     alert('Booking confirmed! Redirecting to payment...');
//     // window.location.href = 'payment.html';
// });

function updateTotal() {
    const dailyRate = 199; // Get from car data (ideally dynamic)
    const days = parseInt(document.getElementById('daysCount').textContent) || 0;
    
    // Get extras cost per day
    const extras = Array.from(document.querySelectorAll('input[name="extra"]:checked'))
                      .reduce((sum, extra) => {
                          const value = parseInt(extra.getAttribute('data-daily-cost')) || 0;
                          return sum + value;
                      }, 0);
    
    const basePrice = dailyRate * days;
    const extrasTotal = extras * days;
    const total = basePrice + extrasTotal;

    document.getElementById('extrasTotal').textContent = `$${extrasTotal.toFixed(2)}`;
    document.getElementById('totalAmount').textContent = `$${total.toFixed(2)}`;
}

// validation for payment form
function validateCardNumber(number) {
    // Basic card number validation (16 digits, may include spaces)
    return /^(\d{4}\s?){4}$/.test(number);
}

// function validateExpiryDate(date) {
//     // MM/YY format and not expired
//     const [month, year] = date.split('/');
//     if (!month || !year || month.length !== 2 || year.length !== 2) return false;
    
//     const currentYear = new Date().getFullYear() % 100;
//     const currentMonth = new Date().getMonth() + 1;
    
//     return (
//         parseInt(month) >= 1 &&
//         parseInt(month) <= 12 &&
//         (parseInt(year) > currentYear || 
//         (parseInt(year) === currentYear && parseInt(month) >= currentMonth))
//     );
// }

function validateCVV(cvv) {
    // 3 or 4 digits
    return /^\d{3,4}$/.test(cvv);
}

// Add input event listeners
document.getElementById('cardNumber').addEventListener('input', function(e) {
    const isValid = validateCardNumber(e.target.value.replace(/\s/g, ''));
    e.target.classList.toggle('invalid', !isValid);
    e.target.classList.toggle('valid', isValid);
});

document.getElementById('expiryDate').addEventListener('input', function(e) {
    const isValid = validateExpiryDate(e.target.value);
    e.target.classList.toggle('invalid', !isValid);
    e.target.classList.toggle('valid', isValid);
});

document.getElementById('cvv').addEventListener('input', function(e) {
    const isValid = validateCVV(e.target.value);
    e.target.classList.toggle('invalid', !isValid);
    e.target.classList.toggle('valid', isValid);
});

// Update form submission
document.getElementById('bookingForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get all inputs
    const cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, '');
    const expiryDate = document.getElementById('expiryDate').value;
    const cvv = document.getElementById('cvv').value;
    
    // Validate all fields
    let isValid = true;
    
    if (!validateCardNumber(cardNumber)) {
        document.getElementById('cardNumber').classList.add('invalid');
        isValid = false;
    }
    
    if (!validateExpiryDate(expiryDate)) {
        document.getElementById('expiryDate').classList.add('invalid');
        isValid = false;
    }
    
    if (!validateCVV(cvv)) {
        document.getElementById('cvv').classList.add('invalid');
        isValid = false;
    }
    
    if (isValid) {
        // Proceed with payment
        alert('Payment details valid! Processing...');
        // window.location.href = 'confirmation.html';
    } else {
        alert('Please check your payment details!');
    }
});
