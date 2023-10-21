//! HTML'den gelenler
const addBtn = document.getElementById("add-btn");
const priceInp = document.getElementById("price-inp");
const titleInp = document.querySelector("#title-inp");
const checkBox = document.querySelector("#checked");
const list = document.querySelector("#list");
const totalSpan = document.querySelector("#price-info");
const select = document.querySelector("select");
const userInp = document.querySelector("#user-inp");

//! Olay İzleyicileri
addBtn.addEventListener("click", addExpense);
list.addEventListener("click", handleUpdate);
select.addEventListener("change", handleFilter);
userInp.addEventListener("change", saveUser);
document.addEventListener("DOMContentLoaded", getUser);

// toplam fiyat bilgisi
let totalPrice = 0;

//!Fonksiyonlar
//hem toplam değişkenini hem arayüzü günceller
function updateTotal(price) {
  //js de tutulan değişkenigünceller
  totalPrice += price;

  //hmlde toplam alanını günceller
  totalSpan.innerText = totalPrice;
}

//yeni harcama ekler
function addExpense(event) {
  event.preventDefault();

  const title = titleInp.value;
  const price = priceInp.valueAsNumber;

  if (!title || !price) {
    alert("Lütfen formu doldurunuz");
    return;
  }

  //div oluşturma
  const expenseDiv = document.createElement("div");

  //class ekleme
  expenseDiv.classList.add("expense");

  if (checkBox.checked === true) {
    expenseDiv.classList.add("paid");
  }

  // div içeriğini belirleme
  expenseDiv.innerHTML = `
            <h2 id="title">${title}</h2>
            <h2 id="price">${price}</h2>
            <div class="btns">
                <img id='update' src="images/money.png" >
                <img id='delete' src="images/delete.png" >
            </div>
`;

  //oluşan kartı html'e gönderme
  list.appendChild(expenseDiv);

  //toplamı güncelle
  updateTotal(price);

  //input temizle
  titleInp.value = "";
  priceInp.value = "";
  checkBox.checked = false;
}

//harcamayı siler / günceller
function handleUpdate(event) {
  //tıklanılan eleman
  const ele = event.target;
  //tıklanılan butonun kapsayıcısına ulaşmak
  const parent = ele.parentElement.parentElement;

  //tıklanılan eleman idsi delete ise çalışır
  if (ele.id === "delete") {
    //sildiğimiz elemanın fiyatına erişme
    const price = Number(parent.children[1].innerText);

    updateTotal(-price);
    //elemanı html'den kaldırma
    parent.remove();
  }

  //tıklanılaneleman güncelle ise
  if (ele.id === "update") {
    parent.classList.toggle("paid");
  }
}

// note'ları filtreler
function handleFilter(event) {
  const selected = event.target.value;
  // listedeki elemanlara erişme
  const items = list.childNodes;

  // listedki her bir eleman için switch ile yapıcağımız
  //  sorgu elemanını gözüküceğine karar vericek
  items.forEach((item) => {
    // seçilen değere göre yapılacak işleme karar verme
    switch (selected) {
      case "all":
        // class' paid olsada olamasada göster
        item.style.display = "flex";
        break;
      case "paid":
        //  class'ında paid olmayanlar gizlenicek
        if (item.classList.contains("paid")) {
          item.style.display = "flex";
        } else {
          item.style.display = "none";
        }
        break;
      case "not-paid":
        //   class'ında paid olanlar gizlenicek
        if (item.classList.contains("paid")) {
          item.style.display = "none";
        } else {
          item.style.display = "flex";
        }
        break;
    }
  });
}

//kullanıcıyı kaydeder
function saveUser(event) {
  localStorage.setItem("username", event.target.value);
}

//kullanıcıyı lokalden alıp inputa yazar
function getUser() {
  const username = localStorage.getItem("username") || "";
}

//kullanıcı ismini inputa aktar
userInp.value = username;
