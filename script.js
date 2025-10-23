// script.js
console.log('--- Script started ---');

// --- 1. หา Element ที่เป็นคอนเทนเนอร์หลักสำหรับแสดงผลสินค้า ---
// ใช้ document.getElementById() เพื่อหา <div id="product-list-container"> ใน HTML
const productListContainer = document.getElementById('product-list-container');
// หา <span> ที่จะใช้อัปเดตจำนวนสินค้า
const itemCountSpan = document.getElementById('item-count');

console.log('Container element:', productListContainer); // เช็คว่าหา container เจอไหม

// --- Function สำหรับสร้างการ์ดสินค้า 1 ใบ ---
// สร้างเป็นฟังก์ชันแยกเพื่อให้โค้ดอ่านง่ายขึ้น
function createProductCard(product) {
    console.log(`Creating card for: ${product.title}`); // ดูว่าฟังก์ชันถูกเรียกไหม

    // สร้าง div หลักของการ์ด
    const card = document.createElement('div');
    card.classList.add('product-card'); // ใช้ class นี้สำหรับสไตล์ใน product-list.css

    // สร้างแท็ก img สำหรับรูปภาพ
    const productImage = document.createElement('img');
    productImage.src = product.image;
    productImage.alt = product.title; // ใส่ alt text สำคัญมาก!
    productImage.classList.add('product-image'); // ใช้ class นี้สำหรับสไตล์ใน product-list.css

    // สร้างแท็ก h3 สำหรับชื่อสินค้า
    const productTitle = document.createElement('h3');
    productTitle.textContent = product.title;
    productTitle.classList.add('product-title'); // ใช้ class นี้สำหรับสไตล์ใน product-list.css

    // สร้างแท็ก p สำหรับหมวดหมู่
    const productCategory = document.createElement('p');
    productCategory.textContent = product.category;
    productCategory.classList.add('product-category'); // ใช้ class นี้สำหรับสไตล์ใน product-list.css

    // สร้างแท็ก p สำหรับราคา
    const productPrice = document.createElement('p');
    // .toFixed(2) ทำให้ราคาแสดงทศนิยม 2 ตำแหน่งเสมอ (เช่น $109.00)
    productPrice.textContent = `$${product.price.toFixed(2)}`;
    productPrice.classList.add('product-price'); // ใช้ class นี้สำหรับสไตล์ใน product-list.css

    // --- ประกอบร่างการ์ด ---
    card.appendChild(productImage);
    card.appendChild(productTitle);
    card.appendChild(productCategory);
    card.appendChild(productPrice);

    // ส่งคืน Element การ์ดที่สร้างเสร็จแล้ว
    return card;
}

// --- 2. ดึงข้อมูลสินค้าจาก API ---
console.log('Fetching products...');
fetch('https://fakestoreapi.com/products')
  .then(response => {
    console.log('Received response:', response);
    // --- 3. ตรวจสอบว่าคำขอสำเร็จหรือไม่ ---
    if (!response.ok) {
      console.error('Fetch response not OK:', response.status);
      // โยน Error พร้อมข้อความสถานะ
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    console.log('Response OK, parsing JSON...');
    // แปลงข้อมูลเป็น JSON
    return response.json();
  })
  .then(products => {
    console.log('Products data received:', products);
    // --- 4. แสดงผลข้อมูลสินค้า ---

    // ตรวจสอบว่าเป็น Array หรือไม่ (ป้องกันข้อมูลผิดพลาดจาก API)
    if (!Array.isArray(products)) {
        console.error('Data received is not an array:', products);
        throw new Error('Received invalid data format from API.');
    }

    // ล้างเนื้อหาเก่าในคอนเทนเนอร์ (เช่น ข้อความ "Loading...")
    productListContainer.innerHTML = '';
    console.log('Container cleared.');

    // อัปเดตจำนวนสินค้าที่แสดง
    if (itemCountSpan) { // เช็คก่อนว่าหา span เจอ
        itemCountSpan.textContent = products.length;
        console.log(`Item count updated to: ${products.length}`);
    }

    // วนลูป Array สินค้าที่ได้มา
    products.forEach((product, index) => {
      // เรียกใช้ฟังก์ชันสร้างการ์ดสำหรับสินค้าแต่ละชิ้น
      const productCardElement = createProductCard(product);

      // --- 7. นำการ์ดไปแสดงผลบนหน้าเว็บ ---
      console.log('Appending card to container:', productCardElement);
      // เอาการ์ดที่สร้างเสร็จแล้วไปใส่ในคอนเทนเนอร์
      productListContainer.appendChild(productCardElement);
    });
    console.log('--- Finished processing products ---');
  })
  .catch(error => {
    // --- 8. จัดการกรณีเกิดข้อผิดพลาด ---
    console.error('!!! Error during fetch or processing:', error);

    // แสดงข้อความ Error ให้ผู้ใช้เห็นบนหน้าเว็บ
    if (productListContainer) { // เช็คก่อนว่าหา container เจอ
        productListContainer.innerHTML = `<p style="color: red; text-align: center;">ขออภัย ไม่สามารถโหลดข้อมูลสินค้าได้ (${error.message})</p>`;
    }
    // อัปเดตจำนวนเป็น 0 ถ้าเกิด Error
    if (itemCountSpan) {
        itemCountSpan.textContent = '0';
    }
  });

console.log('--- Script finished executing initial code ---');
// --- จบโค้ด ---