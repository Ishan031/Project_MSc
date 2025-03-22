document.addEventListener('DOMContentLoaded', () => {
    const cars = document.querySelectorAll('.car-card');
    const priceRange = document.getElementById('priceRange');
    const maxPriceDisplay = document.getElementById('maxPrice');
    const applyFiltersBtn = document.getElementById('applyFilters');
    const resetFiltersBtn = document.getElementById('resetFilters');
    const pageLinks = document.querySelectorAll('.page-link');

    // Update max price display
    priceRange.addEventListener('input', () => {
        maxPriceDisplay.textContent = `$${priceRange.value}`;
    });

 // Update max price display
 priceRange.addEventListener('input', () => {
    maxPriceDisplay.textContent = `$${priceRange.value}`;
});

// Apply Filters (Fixed)
applyFiltersBtn.addEventListener('click', () => {
    const selectedPrice = parseInt(priceRange.value);
    
    // Get selected types from the "Car Type" section
    const selectedTypes = Array.from(
        document.querySelectorAll('.filter-group:nth-child(2) .filter-option input:checked')
    ).map(cb => cb.value);
    
    // Get selected features from the "Features" section
    const selectedFeatures = Array.from(
        document.querySelectorAll('.filter-group:nth-child(3) .filter-option input:checked')
    ).map(cb => cb.value);

    cars.forEach(car => {
        const carPrice = parseInt(car.dataset.price);
        const carType = car.dataset.type;
        const carFeatures = car.dataset.features.split(',').map(f => f.trim());

        // Price match
        const priceMatch = carPrice <= selectedPrice;
        
        // Type match (if any types selected)
        const typeMatch = selectedTypes.length === 0 || selectedTypes.includes(carType);
        
        // Feature match (if any features selected)
        const featureMatch = selectedFeatures.length === 0 || 
                           selectedFeatures.some(feature => carFeatures.includes(feature));

        if (priceMatch || typeMatch || featureMatch) {
            car.style.display = 'block';
        } else {
            car.style.display = 'none';
        }
    });
});

// Reset Filters (Fixed)
resetFiltersBtn.addEventListener('click', () => {
    // Reset price range
    priceRange.value = 1000;
    maxPriceDisplay.textContent = '$1000';

    // Uncheck all checkboxes
    document.querySelectorAll('.filter-option input[type="checkbox"]').forEach(cb => {
        cb.checked = false;
    });

    // Show all cars
    cars.forEach(car => {
        car.style.display = 'block';
    });
});

// Debugging: Log initial state
console.log("Filters script loaded successfully!");
console.log("Cars found:", cars.length);
console.log("Apply Filters Button:", applyFiltersBtn);
console.log("Reset Filters Button:", resetFiltersBtn);
});

    // Pagination
    pageLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = parseInt(link.getAttribute('data-page'));
            const carsPerPage = 6;
            const startIndex = (page - 1) * carsPerPage;
            const endIndex = startIndex + carsPerPage;

            cars.forEach((car, index) => {
                if (index >= startIndex && index < endIndex) {
                    car.style.display = 'block';
                } else {
                    car.style.display = 'none';
                }
            });

            // Update active page link
            pageLinks.forEach(link => link.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Show first page by default
    pageLinks[0].click();