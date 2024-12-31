document.querySelector('.search-box').addEventListener('input', function (e) {
    const query = e.target.value.toLowerCase();
    const products = document.querySelectorAll('.product-div');
    products.forEach(product => {
        const title = product.querySelector('.product-title').textContent.toLowerCase();
        product.style.display = title.includes(query) ? 'block' : 'none';
    });
});
