const button = document.querySelector("button");

button.addEventListener("click", () => {
  alert("تم! رح نخلي الطلب عبر واتساب لاحقًا.");
});

const PRODUCTS = [
  {
    name: "براية مايل",
    category: "stationery",
    code: "BR-01",
    price: "5000 ل.س",
    unit: "قطعة",
    desc: "براية مزدوجة بألوان متعددة.",
    images: ["img/braya.webp"]
  },
  {
    name: "محاية قلم",
    category: "stationery",
    code: "ER-01",
    price: "3000 ل.س",
    unit: "قطعة",
    desc: "محاية ناعمة مناسبة للمدرسة.",
    images: ["img/mahaya.webp"]
  },
  {
    name: "مقص أطفال بلاستيك",
    category: "stationery",
    code: "SC-01",
    price: "12000 ل.س",
    unit: "قطعة",
    desc: "مقص آمن للأطفال.",
    images: ["img/meqas.webp"]
  },
  {
    name: "مقلمة",
    category: "stationery",
    code: "PC-01",
    price: "25000 ل.س",
    unit: "قطعة",
    desc: "مقلمة عملية بسحاب.",
    images: ["img/maklama.webp"]
  },
  {
  name: "كأس مزخرف",
  code: "GF-01",
  price: "35000 ل.س",
  unit: "قطعة",
  category: "gifts",
  desc: "كأس أنيق مناسب كهدية للمناسبات.",
  images: ["img/cup.webp"]
},

{
  name: "دفتر مزخرف هدية",
  code: "GF-02",
  price: "22000 ل.س",
  unit: "قطعة",
  category: "gifts",
  desc: "دفتر بتصميم جميل مناسب للإهداء.",
  images: ["img/daftr.webp"]
},

{
  name: "علبة أقلام ملونة فاخرة",
  code: "GF-03",
  price: "45000 ل.س",
  unit: "علبة",
  category: "gifts",
  desc: "علبة أقلام ملونة بتغليف أنيق.",
  images: ["img/alwan.webp"]
},

{
  name: "صندوق هدايا صغير",
  code: "GF-04",
  price: "18000 ل.س",
  unit: "قطعة",
  category: "gifts",
  desc: "صندوق مناسب لتغليف الهدايا الصغيرة.",
  images: ["img/sandok.webp"]
},

{
  name: "طقم أقلام هدية",
  code: "GF-05",
  price: "60000 ل.س",
  unit: "طقم",
  category: "gifts",
  desc: "طقم أقلام فاخر مناسب للهدايا الرسمية.",
  images: ["img/qalamwebp.webp"]
}
];

const grid = document.getElementById("productsGrid");

// عناصر المودال
const modal = document.getElementById("productModal");
const modalOverlay = document.getElementById("modalOverlay");
const modalClose = document.getElementById("modalClose");
const modalMainImg = document.getElementById("modalMainImg");
const modalThumbs = document.getElementById("modalThumbs");
const modalName = document.getElementById("modalName");
const modalCode = document.getElementById("modalCode");
const modalPrice = document.getElementById("modalPrice");
const modalDesc = document.getElementById("modalDesc");

function pickRandom4(arr) {
  // نعمل نسخة ونخلطها
  const copy = [...arr];
  copy.sort(() => Math.random() - 0.5);
  return copy.slice(0, 4);
}

function renderProducts(list) {
  grid.innerHTML = "";

  list.forEach((p) => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img class="product-img" src="${p.images[0]}" alt="${p.name}">
      <div class="product-body">
        <h3 class="product-name">${p.name}</h3>
        <p class="product-meta">رقم المنتج: ${p.code}</p>
        <p class="price">${p.price} / ${p.unit}</p>
        <button class="details-btn">تفاصيل</button>
      </div>
    `;

    // زر التفاصيل
    card.querySelector(".details-btn").addEventListener("click", () => {
      openModal(p);
    });

    grid.appendChild(card);
  });
}

function openModal(product) {
  document.body.classList.add("modal-open");
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");

  modalName.textContent = product.name;
  modalCode.textContent = `رقم المنتج: ${product.code}`;
  modalPrice.textContent = product.price;
  modalDesc.textContent = product.desc;

  // الصورة الرئيسية
  modalMainImg.src = product.images[0];

  // الصور المصغرة
  modalThumbs.innerHTML = "";
  product.images.forEach((src, idx) => {
    const img = document.createElement("img");
    img.src = src;
    if (idx === 0) img.classList.add("active");

    img.addEventListener("click", () => {
      modalMainImg.src = src;
      // تمييز الصورة الحالية
      modalThumbs.querySelectorAll("img").forEach(i => i.classList.remove("active"));
      img.classList.add("active");
    });

    modalThumbs.appendChild(img);
  });
}

function closeModal() {
  document.body.classList.remove("modal-open");
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}

modalClose.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", closeModal);

const page = document.body.dataset.page;

if (page === "home") {
  renderProducts(pickRandom4(PRODUCTS));
} else {
  renderProducts(PRODUCTS.filter(p => p.category === page));
}