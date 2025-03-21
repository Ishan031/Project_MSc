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

    // Apply Filters
    applyFiltersBtn.addEventListener('click', () => {
        const selectedPrice = parseInt(priceRange.value);
        const selectedTypes = Array.from(document.querySelectorAll('.filter-option input[type="checkbox"]:checked')).map(cb => cb.value);
        const selectedFeatures = Array.from(document.querySelectorAll('.filter-option input[type="checkbox"]:checked')).map(cb => cb.value);

        cars.forEach(car => {
            const carPrice = parseInt(car.getAttribute('data-price'));
            const carType = car.getAttribute('data-type');
            const carFeatures = car.getAttribute('data-features').split(',');

            const priceMatch = carPrice <= selectedPrice;
            const typeMatch = selectedTypes.length === 0 || selectedTypes.includes(carType);
            const featureMatch = selectedFeatures.length === 0 || selectedFeatures.every(feature => carFeatures.includes(feature));

            if (priceMatch && typeMatch && featureMatch) {
                car.style.display = 'block';
            } else {
                car.style.display = 'none';
            }
        });
    });

    // Reset Filters
    resetFiltersBtn.addEventListener('click', () => {
        priceRange.value = 1000;
        maxPriceDisplay.textContent = '$1000';
        document.querySelectorAll('.filter-option input[type="checkbox"]').forEach(cb => cb.checked = false);
        cars.forEach(car => car.style.display = 'block');
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
});