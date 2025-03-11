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

  const quantityObjects = 12; // Количество карточек
  const timerGenerateCardData = 60000 * 5; // Обновляем раз в 5 минут

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

  // Функция для генерации данных одной карточки
  function generateCardData(i) {
    // i - индекс карточки
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
  }

  // Функция для генерации и обновления карточек
  function generateAndRenderCards() {
    const lastUpdateTimestamp = localStorage.getItem("lastUpdateTimestamp");

    if (lastUpdateTimestamp) {
      const now = new Date().getTime();
      const timeSinceLastUpdate = now - parseInt(lastUpdateTimestamp);

      if (timeSinceLastUpdate < timerGenerateCardData) {
        // Если прошло меньше 5 минут, используем данные из localStorage
        const storedCardData = localStorage.getItem("cardData");
        if (storedCardData) {
          const cardData = JSON.parse(storedCardData);
          // Отрисовываем карточки
          createCardHTML(cardData);
          console.log("Используем данные из localStorage:", cardData);
          return; // Прерываем выполнение функции, чтобы не генерировать новые данные
        }
      }
    }

    // Если прошло больше 5 минут или нет данных в localStorage, генерируем новые данные
    const cardData = Array.from({ length: quantityObjects }, (_, i) =>
      generateCardData(i)
    );

    // Сохраняем данные в localStorage
    localStorage.setItem("cardData", JSON.stringify(cardData));
    localStorage.setItem(
      "lastUpdateTimestamp",
      new Date().getTime().toString()
    );

    // Отрисовываем карточки на странице
    const objectsGrid = document.querySelector(".objects__grid");
    const cardsHTML = createCardHTML.map(cardData).join("");
    objectsGrid.innerHTML = cardsHTML;
    console.log("Сгенерировали новые данные:", cardData);
  }

  // Запускаем генерацию карточек сразу после загрузки страницы
  generateAndRenderCards();

  // Функция генерации HTML для одной карточки
  function createCardHTML(data) {
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
            <button class="objects__card-favorite">
              <svg
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.55 18.6456L15.725 12.4456H11.725L12.45 6.77064L7.82497 13.4456H11.3L10.55 18.6456ZM8.99997 15.4456H5.89997C5.49997 15.4456 5.20414 15.2665 5.01247 14.9081C4.8208 14.5498 4.84164 14.204 5.07497 13.8706L12.55 3.12064C12.7166 2.88731 12.9333 2.72481 13.2 2.63314C13.4666 2.54148 13.7416 2.54564 14.025 2.64564C14.3083 2.74564 14.5166 2.92064 14.65 3.17064C14.7833 3.42064 14.8333 3.68731 14.8 3.97064L14 10.4456H17.875C18.3083 10.4456 18.6125 10.6373 18.7875 11.0206C18.9625 11.404 18.9083 11.7623 18.625 12.0956L10.4 21.9456C10.2166 22.1623 9.99164 22.304 9.72497 22.3706C9.4583 22.4373 9.19997 22.4123 8.94997 22.2956C8.69997 22.179 8.50414 21.9998 8.36247 21.7581C8.2208 21.5165 8.16664 21.254 8.19997 20.9706L8.99997 15.4456Z"
                />
              </svg>
            </button>`;

    return `<div class="objects__card-wrapper">
          <div class="objects__card">
            <!-- Содержимое карточки -->
            <div class="objects__card-header">
              <div class="objects__card-info">
                <div class="objects__card-square">${data.square}</div>
                <div class="objects__card-number">${data.number}</div>
              </div>
              <button class="objects__card-options">
                <svg
                  id="options-icon"
                  width="4"
                  height="17"
                  viewBox="0 0 4 17"
                  fill="#6F77FE"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 16.2227C1.45 16.2227 0.979167 16.0268 0.5875 15.6352C0.195833 15.2435 0 14.7727 0 14.2227C0 13.6727 0.195833 13.2018 0.5875 12.8102C0.979167 12.4185 1.45 12.2227 2 12.2227C2.55 12.2227 3.02083 12.4185 3.4125 12.8102C3.80417 13.2018 4 13.6727 4 14.2227C4 14.7727 3.80417 15.2435 3.4125 15.6352C3.02083 16.0268 2.55 16.2227 2 16.2227ZM2 10.2227C1.45 10.2227 0.979167 10.0268 0.5875 9.63516C0.195833 9.24349 0 8.77266 0 8.22266C0 7.67266 0.195833 7.20182 0.5875 6.81016C0.979167 6.41849 1.45 6.22266 2 6.22266C2.55 6.22266 3.02083 6.41849 3.4125 6.81016C3.80417 7.20182 4 7.67266 4 8.22266C4 8.77266 3.80417 9.24349 3.4125 9.63516C3.02083 10.0268 2.55 10.2227 2 10.2227ZM2 4.22266C1.45 4.22266 0.979167 4.02682 0.5875 3.63516C0.195833 3.24349 0 2.77266 0 2.22266C0 1.67266 0.195833 1.20182 0.5875 0.810156C0.979167 0.41849 1.45 0.222656 2 0.222656C2.55 0.222656 3.02083 0.41849 3.4125 0.810156C3.80417 1.20182 4 1.67266 4 2.22266C4 2.77266 3.80417 3.24349 3.4125 3.63516C3.02083 4.02682 2.55 4.22266 2 4.22266Z"
                  />
                </svg>
              </button>
            </div>
            <div class="objects__card-image">
              <img
                src="${data.plan}"
                alt="Планировка квартиры"
                onerror="this.onerror=null; this.src='/public/objects/placeholder.svg';"
              />
              ${
                data.pagination > 0
                  ? `<div class="objects__card-pagination">${paginationHTML}</div>`
                  : ""
              }</div>
            <div class="objects__card-content">
              <div class="objects__card-price">${data.price}</div>
              <div class="objects__card-price-per-meter">${
                data.pricePerMeter
              }</div>
              <div class="objects__card-address">${data.address}</div>
              <div class="objects__card-developer">
                <img src="${data.developerLogo}" alt="Логотип застройщика">
              </div>
            </div>
            ${data.isFavorite ? favoriteIcon : ""}
          </div>

          <!-- Action Sheet (скрыт по умолчанию) -->
          <div class="action-sheet">
            <div class="action-sheet__content">
              <button class="action-sheet__item">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="#6F77FE"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14 14C14.2833 14 14.5208 13.9042 14.7125 13.7125C14.9042 13.5208 15 13.2833 15 13V11H17C17.2833 11 17.5208 10.9042 17.7125 10.7125C17.9042 10.5208 18 10.2833 18 10C18 9.71667 17.9042 9.47917 17.7125 9.2875C17.5208 9.09583 17.2833 9 17 9H15V7C15 6.71667 14.9042 6.47917 14.7125 6.2875C14.5208 6.09583 14.2833 6 14 6C13.7167 6 13.4792 6.09583 13.2875 6.2875C13.0958 6.47917 13 6.71667 13 7V9H11C10.7167 9 10.4792 9.09583 10.2875 9.2875C10.0958 9.47917 10 9.71667 10 10C10 10.2833 10.0958 10.5208 10.2875 10.7125C10.4792 10.9042 10.7167 11 11 11H13V13C13 13.2833 13.0958 13.5208 13.2875 13.7125C13.4792 13.9042 13.7167 14 14 14ZM8 18C7.45 18 6.97917 17.8042 6.5875 17.4125C6.19583 17.0208 6 16.55 6 16V4C6 3.45 6.19583 2.97917 6.5875 2.5875C6.97917 2.19583 7.45 2 8 2H20C20.55 2 21.0208 2.19583 21.4125 2.5875C21.8042 2.97917 22 3.45 22 4V16C22 16.55 21.8042 17.0208 21.4125 17.4125C21.0208 17.8042 20.55 18 20 18H8ZM8 16H20V4H8V16ZM4 22C3.45 22 2.97917 21.8042 2.5875 21.4125C2.19583 21.0208 2 20.55 2 20V7C2 6.71667 2.09583 6.47917 2.2875 6.2875C2.47917 6.09583 2.71667 6 3 6C3.28333 6 3.52083 6.09583 3.7125 6.2875C3.90417 6.47917 4 6.71667 4 7V20H17C17.2833 20 17.5208 20.0958 17.7125 20.2875C17.9042 20.4792 18 20.7167 18 21C18 21.2833 17.9042 21.5208 17.7125 21.7125C17.5208 21.9042 17.2833 22 17 22H4Z"
                  />
                </svg>
                Множественный выбор
              </button>
              <button class="action-sheet__item">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="#6F77FE"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 20.3254C11.7667 20.3254 11.5292 20.2837 11.2875 20.2004C11.0458 20.1171 10.8333 19.9837 10.65 19.8004L8.925 18.2254C7.15833 16.6087 5.5625 15.0046 4.1375 13.4129C2.7125 11.8212 2 10.0671 2 8.15039C2 6.58372 2.525 5.27539 3.575 4.22539C4.625 3.17539 5.93333 2.65039 7.5 2.65039C8.38333 2.65039 9.21667 2.83789 10 3.21289C10.7833 3.58789 11.45 4.10039 12 4.75039C12.55 4.10039 13.2167 3.58789 14 3.21289C14.7833 2.83789 15.6167 2.65039 16.5 2.65039C18.0667 2.65039 19.375 3.17539 20.425 4.22539C21.475 5.27539 22 6.58372 22 8.15039C22 10.0671 21.2917 11.8254 19.875 13.4254C18.4583 15.0254 16.85 16.6337 15.05 18.2504L13.35 19.8004C13.1667 19.9837 12.9542 20.1171 12.7125 20.2004C12.4708 20.2837 12.2333 20.3254 12 20.3254ZM11.05 6.75039C10.5667 6.06706 10.05 5.54622 9.5 5.18789C8.95 4.82956 8.28333 4.65039 7.5 4.65039C6.5 4.65039 5.66667 4.98372 5 5.65039C4.33333 6.31706 4 7.15039 4 8.15039C4 9.01706 4.30833 9.93789 4.925 10.9129C5.54167 11.8879 6.27917 12.8337 7.1375 13.7504C7.99583 14.6671 8.87917 15.5254 9.7875 16.3254C10.6958 17.1254 11.4333 17.7837 12 18.3004C12.5667 17.7837 13.3042 17.1254 14.2125 16.3254C15.1208 15.5254 16.0042 14.6671 16.8625 13.7504C17.7208 12.8337 18.4583 11.8879 19.075 10.9129C19.6917 9.93789 20 9.01706 20 8.15039C20 7.15039 19.6667 6.31706 19 5.65039C18.3333 4.98372 17.5 4.65039 16.5 4.65039C15.7167 4.65039 15.05 4.82956 14.5 5.18789C13.95 5.54622 13.4333 6.06706 12.95 6.75039C12.8333 6.91706 12.6917 7.04206 12.525 7.12539C12.3583 7.20872 12.1833 7.25039 12 7.25039C11.8167 7.25039 11.6417 7.20872 11.475 7.12539C11.3083 7.04206 11.1667 6.91706 11.05 6.75039Z"
                    fill="#6F77FE"
                  />
                </svg>
                Добавить в избранное
              </button>
              <button class="action-sheet__item">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="#6F77FE"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 18L7.8 19.8C7.13333 20.0833 6.5 20.0292 5.9 19.6375C5.3 19.2458 5 18.6917 5 17.975V5C5 4.45 5.19583 3.97917 5.5875 3.5875C5.97917 3.19583 6.45 3 7 3H17C17.55 3 18.0208 3.19583 18.4125 3.5875C18.8042 3.97917 19 4.45 19 5V17.975C19 18.6917 18.7 19.2458 18.1 19.6375C17.5 20.0292 16.8667 20.0833 16.2 19.8L12 18ZM12 15.8L17 17.95V5H7V17.95L12 15.8ZM12 5H7H17H12Z"
                  />
                </svg>
                Добавить в подборки
              </button>
              <button class="action-sheet__item">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="#6F77FE"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 22C5.45 22 4.97917 21.8042 4.5875 21.4125C4.19583 21.0208 4 20.55 4 20V10C4 9.45 4.19583 8.97917 4.5875 8.5875C4.97917 8.19583 5.45 8 6 8H7V6C7 4.61667 7.4875 3.4375 8.4625 2.4625C9.4375 1.4875 10.6167 1 12 1C13.3833 1 14.5625 1.4875 15.5375 2.4625C16.5125 3.4375 17 4.61667 17 6V8H18C18.55 8 19.0208 8.19583 19.4125 8.5875C19.8042 8.97917 20 9.45 20 10V20C20 20.55 19.8042 21.0208 19.4125 21.4125C19.0208 21.8042 18.55 22 18 22H6ZM6 20H18V10H6V20ZM12 17C12.55 17 13.0208 16.8042 13.4125 16.4125C13.8042 16.0208 14 15.55 14 15C14 14.45 13.8042 13.9792 13.4125 13.5875C13.0208 13.1958 12.55 13 12 13C11.45 13 10.9792 13.1958 10.5875 13.5875C10.1958 13.9792 10 14.45 10 15C10 15.55 10.1958 16.0208 10.5875 16.4125C10.9792 16.8042 11.45 17 12 17ZM9 8H15V6C15 5.16667 14.7083 4.45833 14.125 3.875C13.5417 3.29167 12.8333 3 12 3C11.1667 3 10.4583 3.29167 9.875 3.875C9.29167 4.45833 9 5.16667 9 6V8Z"
                  />
                </svg>
                Зафиксировать
              </button>
              <button class="action-sheet__item">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="#6F77FE"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 23.0004C5.45 23.0004 4.97917 22.8046 4.5875 22.4129C4.19583 22.0212 4 21.5504 4 21.0004V10.0004C4 9.45039 4.19583 8.97956 4.5875 8.58789C4.97917 8.19622 5.45 8.00039 6 8.00039H8C8.28333 8.00039 8.52083 8.09622 8.7125 8.28789C8.90417 8.47956 9 8.71706 9 9.00039C9 9.28372 8.90417 9.52122 8.7125 9.71289C8.52083 9.90456 8.28333 10.0004 8 10.0004H6V21.0004H18V10.0004H16C15.7167 10.0004 15.4792 9.90456 15.2875 9.71289C15.0958 9.52122 15 9.28372 15 9.00039C15 8.71706 15.0958 8.47956 15.2875 8.28789C15.4792 8.09622 15.7167 8.00039 16 8.00039H18C18.55 8.00039 19.0208 8.19622 19.4125 8.58789C19.8042 8.97956 20 9.45039 20 10.0004V21.0004C20 21.5504 19.8042 22.0212 19.4125 22.4129C19.0208 22.8046 18.55 23.0004 18 23.0004H6ZM11 4.82539L10.1 5.72539C9.9 5.92539 9.66667 6.02122 9.4 6.01289C9.13333 6.00456 8.9 5.90039 8.7 5.70039C8.51667 5.50039 8.42083 5.26706 8.4125 5.00039C8.40417 4.73372 8.5 4.50039 8.7 4.30039L11.3 1.70039C11.5 1.50039 11.7333 1.40039 12 1.40039C12.2667 1.40039 12.5 1.50039 12.7 1.70039L15.3 4.30039C15.4833 4.48372 15.575 4.71289 15.575 4.98789C15.575 5.26289 15.4833 5.50039 15.3 5.70039C15.1 5.90039 14.8625 6.00039 14.5875 6.00039C14.3125 6.00039 14.075 5.90039 13.875 5.70039L13 4.82539V15.0004C13 15.2837 12.9042 15.5212 12.7125 15.7129C12.5208 15.9046 12.2833 16.0004 12 16.0004C11.7167 16.0004 11.4792 15.9046 11.2875 15.7129C11.0958 15.5212 11 15.2837 11 15.0004V4.82539Z"
                  />
                </svg>
                Поделиться
              </button>
            </div>
            <div class="action-sheet__cancel"></div>
          </div>
        </div>
    `;
  }

  // Обработчики событий для options и favorite
  const cards = document.querySelectorAll(".objects__card");

  // Обработчик событий для isFavorite
  cards.forEach((card, index) => {
    const favoriteElement = card.querySelector(".objects__card-favorite");
    card.addEventListener("click", () => {
      cardData[index].isFavorite = !cardData[index].isFavorite;
      favoriteElement.classList.toggle("objects__card-favorite--active");
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
