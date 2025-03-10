document.addEventListener("DOMContentLoaded", () => {
  const batteryLevel = document.querySelector(".status-bar__battery-level");

  function updateBatteryLevel(level) {
    batteryLevel.style.width = `${level}%`;
    // Дополнительно можно менять цвет в зависимости от уровня (зеленый, желтый, красный)
  }

  // Пример вызова функции (например, раз в минуту):
  updateBatteryLevel(50);
  setInterval(() => {
    const randomLevel = Math.floor(Math.random() * 101); // Случайное значение от 0 до 100
    updateBatteryLevel(randomLevel);
  }, 60000); // Обновляем раз в минуту

  /*
  const quantityObjects = 12; // Количество карточек

  const builderLogos = [
    "public/builders/builder_logos/logo_1.svg",
    "public/builders/builder_logos/logo_2.svg",
    "public/builders/builder_logos/logo_3.svg",
    "public/builders/builder_logos/logo_4.svg",
    "public/builders/builder_logos/logo_5.svg",
    "public/builders/builder_logos/logo_6.svg",
    "public/builders/builder_logos/logo_7.svg",
    "public/builders/builder_logos/logo_8.svg",
    "public/builders/builder_logos/logo_9.svg",
    "public/builders/builder_logos/logo_10.svg",
    "public/builders/builder_logos/logo_11.svg",
    "public/builders/builder_logos/logo_12.svg",
  ];
  let logoIndex = 0; // Индекс для перебора builderLogos

  const objectPlans = [
    "public/objects/object_plans/plan_1.svg",
    "public/objects/object_plans/plan_2.svg",
    "public/objects/object_plans/plan_3.svg",
    "public/objects/object_plans/plan_4.svg",
    "public/objects/object_plans/plan_5.svg",
    "public/objects/object_plans/plan_6.svg",
    "public/objects/object_plans/plan_7.svg",
    "public/objects/object_plans/plan_8.svg",
    "public/objects/object_plans/plan_9.svg",
    "public/objects/object_plans/plan_10.svg",
    "public/objects/object_plans/plan_11.svg",
    "public/objects/object_plans/plan_12.svg",
  ];
  let planIndex = 0;

  const generateRandomNumber = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;
  const generateRandomPrice = () => generateRandomNumber(3000000, 15000000);

  // Функция, которая генерирует карточки объектов с минимальными вариациями
  const cardData = Array.from({ length: quantityObjects }, (_, i) => {
    const rooms = generateRandomNumber(1, 4);
    const square = generateRandomNumber(40, 150);
    const number = `№ ${generateRandomNumber(1000, 9999)}`;
    const pagination = i === 0 ? 0 : 3;
    const price = generateRandomPrice();
    const pricePerMeter = (price / square).toFixed(0); // Расчет стоимости за м²
    const floor = generateRandomNumber(1, 25);
    const totalFloors = generateRandomNumber(1, 25);
    const currentLogo = builderLogos[logoIndex]; // Изображения по порядку
    logoIndex = (logoIndex + 1) % builderLogos.length; // Циклический перебор
    const currentPlan = objectPlans[planIndex];
    planIndex = (planIndex + 1) % objectPlans.length;

    return {
      isFavorite: false,
      square: `${rooms}-к, ${square.toFixed(2)} м²`,
      number: number,
      plan: currentPlan,
      pagination: pagination,
      price: `${price.toLocaleString("ru-RU")} ₽`,
      pricePerMeter: `${pricePerMeter.toLocaleString("ru-RU")} ₽/м²`,
      address: `Краснодар · ЖК «ITRIELT» · Литер ${generateRandomNumber(
        1,
        5
      )} · Подъезд ${generateRandomNumber(
        1,
        4
      )} · Этаж ${floor} из ${totalFloors} · Жилая площадь ${square.toFixed(
        2
      )} м²`,
      developerLogo: currentLogo,
    };
  });

  // Функция генерации HTML
  function createCard(data) {
    const paginationHTML =
      data.pagination > 0
        ? Array.from(
            { length: data.pagination },
            (_, i) =>
              `<span class="objects__card-pagination-dot ${
                i === 0 ? "active" : ""
              }"></span>`
          ).join("")
        : ""; // Условие для пагинации

    const favoriteIcon = `
        <div class="objects__card-favorite style.display=${
          data.isFavorite ? "block" : "none"
        }" >
          <svg width="24" height="25" viewBox="0 0 24 25" fill="white"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M10.55 18.6456L15.725 12.4456H11.725L12.45 6.77064L7.82497 13.4456H11.3L10.55 18.6456ZM8.99997 15.4456H5.89997C5.49997 15.4456 5.20414 15.2665 5.01247 14.9081C4.8208 14.5498 4.84164 14.204 5.07497 13.8706L12.55 3.12064C12.7166 2.88731 12.9333 2.72481 13.2 2.63314C13.4666 2.54148 13.7416 2.54564 14.025 2.64564C14.3083 2.74564 14.5166 2.92064 14.65 3.17064C14.7833 3.42064 14.8333 3.68731 14.8 3.97064L14 10.4456H17.875C18.3083 10.4456 18.6125 10.6373 18.7875 11.0206C18.9625 11.404 18.9083 11.7623 18.625 12.0956L10.4 21.9456C10.2166 22.1623 9.99164 22.304 9.72497 22.3706C9.4583 22.4373 9.19997 22.4123 8.94997 22.2956C8.69997 22.179 8.50414 21.9998 8.36247 21.7581C8.2208 21.5165 8.16664 21.254 8.19997 20.9706L8.99997 15.4456Z"/>
          </svg>
        </div>
      `;

    return `
      <div class="objects__card">
        <div class="objects__card-header">
          <div class="objects__card-info">
            <div class="objects__card-square">${data.square}</div>
            <div class="objects__card-number">${data.number}</div>
          </div>
          <button class="objects__card-options">
            <svg width="4" height="17" viewBox="0 0 4 17" fill="#6F77FE" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 16.2227C1.45 16.2227 0.979167 16.0268 0.5875 15.6352C0.195833 15.2435 0 14.7727 0 14.2227C0 13.6727 0.195833 13.2018 0.5875 12.8102C0.979167 12.4185 1.45 12.2227 2 12.2227C2.55 12.2227 3.02083 12.4185 3.4125 12.8102C3.80417 13.2018 4 13.6727 4 14.2227C4 14.7727 3.80417 15.2435 3.4125 15.6352C3.02083 16.0268 2.55 16.2227 2 16.2227ZM2 10.2227C1.45 10.2227 0.979167 10.0268 0.5875 9.63516C0.195833 9.24349 0 8.77266 0 8.22266C0 7.67266 0.195833 7.20182 0.5875 6.81016C0.979167 6.41849 1.45 6.22266 2 6.22266C2.55 6.22266 3.02083 6.41849 3.4125 6.81016C3.80417 7.20182 4 7.67266 4 8.22266C4 8.77266 3.80417 9.24349 3.4125 9.63516C3.02083 10.0268 2.55 10.2227 2 10.2227ZM2 4.22266C1.45 4.22266 0.979167 4.02682 0.5875 3.63516C0.195833 3.24349 0 2.77266 0 2.22266C0 1.67266 0.195833 1.20182 0.5875 0.810156C0.979167 0.41849 1.45 0.222656 2 0.222656C2.55 0.222656 3.02083 0.41849 3.4125 0.810156C3.80417 1.20182 4 1.67266 4 2.22266C4 2.77266 3.80417 3.24349 3.4125 3.63516C3.02083 4.02682 2.55 4.22266 2 4.22266Z"/>
            </svg>
          </button>
        </div>
        <div class="objects__card-image">
          <img src="${
            data.plan
          }" alt="Планировка квартиры" onerror="this.onerror=null; this.src='/public/objects/placeholder.svg';">
          ${
            data.pagination > 0
              ? `<div class="objects__card-pagination">${paginationHTML}</div>`
              : ""
          }  </div>
        <div class="objects__card-content">
          <div class="objects__card-price">${data.price}</div>
          <div class="objects__card-price-per-meter">${data.pricePerMeter}</div>
          <div class="objects__card-address">${data.address}</div>
          <div class="objects__card-developer">
            <img src="${data.developerLogo}" alt="Логотип застройщика">
          </div>
        </div>
        ${favoriteIcon}
      </div>
    `;
  }

  const objectsGrid = document.querySelector(".objects__grid");
  const cardsHTML = cardData.map(createCard).join("");
  objectsGrid.innerHTML = cardsHTML;
*/

  // Обработчики событий для options и favorite
  const cards = document.querySelectorAll(".objects__card");

  // Обработчик событий для isFavorite
  cards.forEach((card, index) => {
    const favoriteElement = card.querySelector(".objects__card-favorite");
    card.addEventListener("click", () => {
      cardData[index].isFavorite = !cardData[index].isFavorite;
      favoriteElement.classList.toggle("objects__card-favorite--active");
      favoriteElement.querySelector("svg").style.fill = cardData[index]
        .isFavorite
        ? "true"
        : "false";
    });
  });

  // Логика для отображения и скрытия Action Sheet
  const cardWrappers = document.querySelectorAll(".objects__card-wrapper");
  console.log(cardWrappers);
  const actionSheets = document.querySelectorAll(".action-sheet");
  console.log(actionSheets);

  cardWrappers.forEach((cardWrapper, index) => {
    const optionsButton = cardWrapper.querySelector(".objects__card-options");
    console.log(optionsButton);
    const actionSheet = cardWrapper.querySelector(".action-sheet");
    const cancelButton = actionSheet.querySelector(".action-sheet__cancel");

    optionsButton.addEventListener("click", (event) => {
      event.stopPropagation(); // Предотвращаем всплытие события
      actionSheet.classList.add("action-sheet--active");
    });

    cancelButton.addEventListener("click", () => {
      actionSheet.classList.remove("action-sheet--active");
    });

    cardWrapper.addEventListener("click", () => {
      actionSheets.forEach((sheet) => {
        sheet.classList.remove("action-sheet--active");
      });
    });
  });

  cards.forEach((card) => {
    card
      .querySelector(".objects__card-favorite")
      .addEventListener("click", () => {
        // Здесь логика для добавления/удаления из избранного
        alert("Избранное!");
      });
  });
});
