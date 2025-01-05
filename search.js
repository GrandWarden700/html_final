document.querySelector('.search-button').addEventListener('click', function () {
        const query = document.querySelector('.search-box').value.toLowerCase();
        const products = document.querySelectorAll('.product-div');
        products.forEach(product => {
            const title = product.querySelector('.product-title').textContent.toLowerCase();
            product.style.display = title.includes(query) ? 'block' : 'none';
        });
    });
