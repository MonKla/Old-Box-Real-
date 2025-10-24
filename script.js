console.log('--- Script started ---');

const productListContainer = document.getElementById('product-list-container'); //หาidในhtml

const itemCountSpan = document.getElementById('item-count');

console.log('Container element:', productListContainer); //Find Container

function createProductCard(product) {
    console.log(`Creating card for: ${product.title}`);

    const card = document.createElement('div');
    card.classList.add('product-card');

    const productImage = document.createElement('img');
    productImage.src = product.image;
    productImage.alt = product.title;
    productImage.classList.add('product-image');

    const productTitle = document.createElement('h3');
    productTitle.textContent = product.title;
    productTitle.classList.add('product-title');


    const productCategory = document.createElement('p');
    productCategory.textContent = product.category;
    productCategory.classList.add('product-category');

    const productPrice = document.createElement('p');
    productPrice.textContent = `$${product.price.toFixed(2)}`;
    productPrice.classList.add('product-price');

    //Fusion Ahh
    card.appendChild(productImage);
    card.appendChild(productTitle);
    card.appendChild(productCategory);
    card.appendChild(productPrice);
    return card;
}

//ดึงจากApi
console.log('Fetching products...');
fetch('https://fakestoreapi.com/products')
  .then(response => {
    console.log('Received response:', response);
    if (!response.ok) {
      console.error('Fetch response not OK:', response.status);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    console.log('Response OK, parsing JSON...');
    return response.json();
  })
  .then(products => {
    console.log('Products data received:', products);
    // --โชว์สินค้า
    if (!Array.isArray(products)) {
        console.error('Data received is not an array:', products);
        throw new Error('Received invalid data format from API.');
    }
    productListContainer.innerHTML = '';
    console.log('Container cleared.');
    if (itemCountSpan) {
        itemCountSpan.textContent = products.length;
        console.log(`Item count updated to: ${products.length}`);
    }

    // วนลูป Array สินค้าที่ได้มา
    products.forEach((product, index) => {
      const productCardElement = createProductCard(product);
      //เอาการ์ดไปโผล่ในเว็บ
      console.log('Appending card to container:', productCardElement);
      productListContainer.appendChild(productCardElement);
    });
    console.log('--- Finished processing products ---');
  })
  
  .catch(error => {
    console.error('!!! Error during fetch or processing:', error);
    if (productListContainer) {
        productListContainer.innerHTML = `<p style="color: red; text-align: center;">ขอโ?ษด้วยนะคะ รูปมันไม่โหลด😭 (${error.message})</p>`;
    }
    if (itemCountSpan) {
        itemCountSpan.textContent = '0';
    }
  });

console.log('--- Script finished executing initial code ---');