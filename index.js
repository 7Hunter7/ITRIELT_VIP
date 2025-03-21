document.addEventListener("DOMContentLoaded", () => {
  const displayResolution = window.innerWidth;

  // Функция определения мобильного устройства
  function isMobileDevice(displayResolution) {
    return displayResolution < 744; // Mobile Device
  }
  // Определяем тип устройства как isMobile
  function isMobile() {
    const currentResolution = window.innerWidth;
    return isMobileDevice(currentResolution);
  }
  // ------------------ 1. Status Bar - Часы ------------------
  const batteryLevel = document.querySelector(".status-bar__battery-level");

  // Функция часов
  function updateTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    document.querySelector(
      ".status-bar__time"
    ).textContent = `${hours}:${minutes}`;
  }
  setInterval(updateTime, 60000); // Обновляем раз в минуту
  updateTime();

  // ------------------ 2. Status Bar - Батарея ------------------
  let currentBatteryLevel = 100; // Начальный заряд
  const batteryDecreaseInterval = 60 * 1000; // 1 минута

  // Функция обновления уровня заряда и цвета батареи
  function updateBatteryLevel(level) {
    batteryLevel.style.width = `${level}%`;
    batteryLevel.style.backgroundColor = "#3c3d48"; //  Цвет по умолчанию

    // Проверяем диапазоны значений
    switch (true) {
      case level === 100:
        batteryLevel.style.backgroundColor = "#25a25f";
        break;
      case level <= 98:
        batteryLevel.style.backgroundColor = "#3c3d48";
        break;
      case level <= 20:
        batteryLevel.style.backgroundColor = "orange";
        break;
      case level <= 5:
        batteryLevel.style.backgroundColor = "red";
        break;
      default: //  Цвет по умолчанию
        break;
    }
  }
  // Функция разряда батареи
  function decreaseBattery() {
    if (currentBatteryLevel > 0) {
      currentBatteryLevel--;
      updateBatteryLevel(currentBatteryLevel);
    } else {
      //  Если батарея разряжена, начинаем цикл заново
      currentBatteryLevel = 100;
      updateBatteryLevel(currentBatteryLevel);
    }
  }
  //  Первое обновление
  updateBatteryLevel(currentBatteryLevel);
  //  Запускаем уменьшение заряда
  const batteryInterval = setInterval(decreaseBattery, batteryDecreaseInterval);

  // ------------------ 3. Builders - Карточки объектов ------------------
  const quantityObjects = 12; // Количество карточек для показа
  const maxQuantityObjects = 37; // Максимальное количество карточек

  const timerGenerateCardData = 5 * 60 * 1000; // 5 минут в миллисекундах (время жизни данных в localStorage)

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

  const favorites = [false, true]; // Для генерации случайного значения

  const generateRandomNumber = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;
  const generateRandomPrice = () => generateRandomNumber(3000000, 15000000);

  // Функция генерации данных одной карточки
  function generateCardData(i) {
    // i - индекс карточки
    const id =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15); // Генерируем случайный ID
    const rooms = generateRandomNumber(1, 4);
    const square = generateRandomNumber(40, 150);
    const number = `№ ${generateRandomNumber(1000, 9999)}`;
    const pagination = i === 0 ? 0 : 3;
    const price = generateRandomPrice();
    const pricePerMeter = (price / square).toFixed(0); // Расчет стоимости за м²
    const totalFloors = generateRandomNumber(1, 25);
    const floor = generateRandomNumber(1, totalFloors);
    const currentLogo = builderLogos[logoIndex]; // Изображения по порядку
    logoIndex = (logoIndex + 1) % builderLogos.length; // Циклический перебор
    const currentPlan = objectPlans[planIndex];
    planIndex = (planIndex + 1) % objectPlans.length;
    const isFavorite = favorites[generateRandomNumber(0, 1)];

    return {
      id: id,
      isFavorite: isFavorite,
      square: `${rooms}-к, ${square.toFixed(2)} м&sup2;`,
      number: number,
      plan: currentPlan,
      pagination: pagination,
      clearPrice: price, // Цена для сортировки
      price: `${price.toLocaleString("ru-RU")} ₽`,
      pricePerMeter: `${pricePerMeter.toLocaleString("ru-RU")} ₽/м&sup2;`,
      address: `Краснодар &middot; ЖК&nbsp;&laquo;ITRIELT&raquo;&nbsp;&middot; Литер&nbsp;${generateRandomNumber(
        1,
        5
      )}&nbsp;&middot; Подъезд&nbsp;${generateRandomNumber(
        1,
        4
      )}&nbsp;&middot; Этаж&nbsp;${floor}&nbsp;из&nbsp;${totalFloors}&nbsp;&middot; Жилая&nbsp;площадь&nbsp;${square.toFixed(
        2
      )}&nbsp;м&sup2;`,
      developerLogo: currentLogo,
      area: square, // Площадь для сортировки
    };
  }

  // Глобальная переменная для хранения иконки избранного
  const favoriteIcon = `
            <div class="objects__card-favorite">
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
            </div>`;

  // Функция генерации HTML одной карточки
  function createCardHTML(data) {
    const paginationHTML =
      data.pagination > 0
        ? Array.from(
            { length: data.pagination },
            (_, i) =>
              `<span class="objects__card__pagination_dot ${
                i === 0 ? "active" : ""
              }"></span>`
          ).join("")
        : ""; // Условие пагинации

    return `<div class="objects__card-wrapper" id="${data.id}">
          <div class="objects__card">
            <!-- Содержимое карточки -->
            <div class="objects__card__header">
              <div class="objects__card__header_info">
                <h3 class="objects__card__header_square">${data.square}</h3>
                <p class="objects__card__header_number">${data.number}</p>
              </div>
              <button class="objects__card__options" aria-label="Опции для объекта №${
                data.number
              }">
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
            <div class="objects__card__image">
              <img
                src="${data.plan}"
                alt="Планировка квартиры"
                onerror="this.onerror=null; this.src='/public/objects/placeholder.svg';"
              />
              ${
                data.pagination > 0
                  ? `<div class="objects__card__pagination">${paginationHTML}</div>`
                  : ""
              }</div>
            <div class="objects__card__content">
              <h2 class="objects__card__content_price">${data.price}</h2>
              <p class="objects__card__content_price-per-meter">${
                data.pricePerMeter
              }</p>
              <p class="objects__card__content_address">${data.address}</p>
              <p class="objects__card__content_developer">
                <img src="${data.developerLogo}" alt="Логотип застройщика">
              </p>
            </div>
            ${favoriteIcon}
          </div>

          <!-- Action Sheet (скрыт по умолчанию) -->
          <div class="action-sheet">
            <div class="action-sheet__content"
              id="action-sheet-content-${data.id}">
              <div class="action-sheet__header">
                <h4 class="action-sheet__header_title">
                  ЖК&nbsp;&laquo;Стартап&raquo;, ${data.number}, ${data.square}
                </h4>
                <p class="action-sheet__header_price">${data.price}</p>
              </div>
              <div class="action-sheet__button">
                <svg class="action-sheet__button_icon-selections"></svg>
                <button class="action-sheet__button-select"
                  aria-label="Выбрать несколько объектов">
                  Множественный выбор
                </button>
              </div>
              <div class="action-sheet__button">
                <svg class="action-sheet__button_icon-additions"></svg>
                <button class="action-sheet__button-favorite"
                  aria-label="${
                    data.isFavorite
                      ? "Убрать из избранного"
                      : "Добавить в избранное"
                  }"
                >
                  ${
                    data.isFavorite
                      ? "Убрать из&nbsp;избранного"
                      : "Добавить в&nbsp;избранное"
                  }
                </button>
              </div>
              <button class="action-sheet__button" aria-label="Добавить в подборки">
                <svg class="action-sheet__button_icon-collections"></svg>
                Добавить в&nbsp;подборки
              </button>
              <button class="action-sheet__button" aria-label="Зафиксировать">
                <svg class="action-sheet__button_icon-fixies"></svg>
                Зафиксировать
              </button>
              <button class="action-sheet__button" aria-label="Поделиться">
                <svg class="action-sheet__button_icon-shares"></svg>
                Поделиться
              </button>
            </div>
            <button class="action-sheet__сancel-button" aria-label="Закрыть"></button>
          </div>
        </div>
    `;
  }

  // Функция генерации и обновления карточек
  function generateAndRenderCards() {
    const lastUpdateTimestamp = localStorage.getItem("lastUpdateTimestamp");
    let cardData;

    if (lastUpdateTimestamp) {
      const now = new Date().getTime();
      const timeSinceLastUpdate = now - parseInt(lastUpdateTimestamp);

      if (timeSinceLastUpdate < timerGenerateCardData) {
        // Если прошло меньше 5 минут, используем данные из localStorage
        const storedCardData = localStorage.getItem("cardData");
        if (storedCardData) {
          cardData = JSON.parse(storedCardData);
        } else {
          // Если в localStorage нет данных, генерируем новые
          cardData = Array.from({ length: maxQuantityObjects }, (_, i) =>
            generateCardData(i)
          );
        }
      } else {
        // Если прошло больше 5 минут или нет данных в localStorage, генерируем новые данные
        cardData = Array.from({ length: maxQuantityObjects }, (_, i) =>
          generateCardData(i)
        );
      }
    } else {
      // Если нет данных в localStorage, генерируем новые данные
      cardData = Array.from({ length: maxQuantityObjects }, (_, i) =>
        generateCardData(i)
      );
    }

    // Сохраняем данные в localStorage
    localStorage.setItem("cardData", JSON.stringify(cardData));
    localStorage.setItem(
      "lastUpdateTimestamp",
      new Date().getTime().toString()
    );

    return cardData;
  }

  // ------------------  4. Show more - Логика и отображение карточек  ------------------
  let cardData = generateAndRenderCards();
  const objectsGrid = document.querySelector(".objects__grid");
  const showMoreButton = document.querySelector(".show-more__button");
  const initialCardsToShow = Math.min(quantityObjects, cardData.length); // Сколько карточек показать изначально (не больше, чем доступно)
  let displayedCards = 0; // Счетчик отображенных карточек

  // Функция генерации данных для указанного количества карточек, начиная с определенного индекса
  function getCardDataForDisplay(startIndex, quantity) {
    return cardData.slice(startIndex, startIndex + quantity); // Срез массива
  }

  // Функция отрисовки карточек (добавляет карточки в objectsGrid)
  function renderCards(cards) {
    const cardsHTML = cards
      .map((card) => {
        let cardHTML = createCardHTML(card);
        cardHTML = card.isFavorite
          ? cardHTML.replace(
              '<div class="objects__card-favorite">',
              '<div class="objects__card-favorite objects__card-favorite--active">'
            )
          : cardHTML;
        return cardHTML;
      })
      .join("");
    objectsGrid.insertAdjacentHTML("beforeend", cardsHTML); // Добавляем в конец
  }

  // Функция отображения текста на кнопке
  function updateShowMoreButton() {
    const remainingCards = cardData.length - displayedCards;
    const currentResolution = window.innerWidth; // Получаем текущее значение

    if (currentResolution <= 320) {
      // Если разрешение 320px, то покажем кнопку без количества оставшихся для отображения объектов
      showMoreButton.textContent = `Показать ещё ${Math.min(
        12,
        remainingCards
      )}`;
    } else {
      showMoreButton.textContent = `Показать ещё ${Math.min(
        12,
        remainingCards
      )} из ${remainingCards} объектов`; // не более 12
    }
    // Если больше нечего показывать, скрываем кнопку
    showMoreButton.style.display = remainingCards > 0 ? "block" : "none";
  }

  // Добавляем обработчик события resize
  function handleResize() {
    updateShowMoreButton(); // Вызываем функцию обновления кнопки при изменении размеров окна
  }
  window.addEventListener("resize", updateShowMoreButton);
  handleResize(); // Вызываем функцию при загрузке страницы

  // Отображаем начальные карточки
  const initialCards = getCardDataForDisplay(
    displayedCards,
    initialCardsToShow
  );
  renderCards(initialCards);
  displayedCards += initialCardsToShow;

  // Обновляем текст кнопки и скрываем ее, если все карточки отображены
  updateShowMoreButton();

  // Обработчик клика на кнопку "Показать ещё"
  showMoreButton.addEventListener("click", () => {
    const cardsToShow = Math.min(12, cardData.length - displayedCards); // Сколько карточек показать (12 или сколько осталось)

    const newCards = getCardDataForDisplay(displayedCards, cardsToShow); // Выбираем карточки, которые нужно показать
    renderCards(newCards); // Добавляем новые карточки на страницу

    displayedCards += cardsToShow; // Увеличиваем количество отображенных карточек

    updateShowMoreButton();
  });

  // Запускаем генерацию карточек сразу после загрузки страницы
  generateAndRenderCards();

  // --------------------   Обработчики событий  --------------------
  // -------------------- 5.Установка флага isFavorite --------------------
  const cardWrappers = document.querySelectorAll(".objects__card-wrapper");

  // Функция для добавления класса для actionSheet
  function addIsFavoriteClass(favoriteObjectCard, isFavorite) {
    if (isFavorite) {
      favoriteObjectCard.classList.add("objects__card-favorite--active");
    } else {
      favoriteObjectCard.classList.remove("objects__card-favorite--active");
    }
  }

  // Функция для смены текста кнопки
  function updateFavoriteButtonText(button, isFavorite) {
    if (isFavorite) {
      button.textContent = "Убрать из избранного";
    } else {
      button.textContent = "Добавить в избранное";
    }
  }

  // Функция для смены иконки кнопки
  function updateFavoriteButtonIcon(iconButton, isFavorite) {
    if (isFavorite) {
      iconButton.classList.add("action-sheet__button_icon-additions--active");
    } else {
      iconButton.classList.remove(
        "action-sheet__button_icon-additions--active"
      );
    }
  }

  cardWrappers.forEach((cardWrapper) => {
    const favoriteObject = cardWrapper.querySelector(".objects__card-favorite");
    const actionSheetItemFavoriteButton = cardWrapper.querySelector(
      ".action-sheet__button-favorite"
    );
    const actionSheetItemFavoriteIcon = cardWrapper.querySelector(
      ".action-sheet__button_icon-additions"
    );
    const actionSheetSelectButton = cardWrapper.querySelector(
      ".action-sheet__button-select"
    );
    const multipleSelect = document.querySelector(".multiple-select");
    const multipleSelectCount = multipleSelect.querySelector(
      ".multiple-select__header_count"
    );
    const multipleSelectCancelButton = multipleSelect.querySelector(
      ".multiple-select__сancel-button"
    );
    const multipleSelectCancelButtonIcon = multipleSelect.querySelector(
      ".action-sheet__button_icon-cancel"
    );

    const cardId = cardWrapper.id; //  Получаем id
    let selectCounter = 0; // Счетчик выбранных объектов
    localStorage.setItem("localSelectCounter", selectCounter);

    // Получаем индекс карточки, в cardData
    const cardIndex = cardData.findIndex((card) => card.id === cardId);
    if (cardIndex === -1) {
      console.warn("Не удалось найти карточку с ID:", cardId);
      return; // Пропускаем эту карточку
    }

    // Изначальное состояние иконки и текста при загрузке
    if (cardData[cardIndex].isFavorite) {
      favoriteObject.classList.add("objects__card-favorite--active");
      updateFavoriteButtonIcon(
        actionSheetItemFavoriteIcon,
        cardData[cardIndex].isFavorite
      );
      updateFavoriteButtonText(
        actionSheetItemFavoriteButton,
        cardData[cardIndex].isFavorite
      );
    }

    actionSheetItemFavoriteButton?.addEventListener("click", (event) => {
      event.stopPropagation();
      // Изменяем состояние "избранное" для текущей карточки
      cardData[cardIndex].isFavorite = !cardData[cardIndex].isFavorite;

      updateFavoriteButtonText(
        actionSheetItemFavoriteButton,
        cardData[cardIndex].isFavorite
      );
      updateFavoriteButtonIcon(
        actionSheetItemFavoriteIcon,
        cardData[cardIndex].isFavorite
      );

      addIsFavoriteClass(favoriteObject, cardData[cardIndex].isFavorite);
      // Сохраняем данные в LocalStorage
      localStorage.setItem("cardData", JSON.stringify(cardData));
    });

    // Обработчики для кнопки "Множественный выбор"
    actionSheetSelectButton?.addEventListener("click", (event) => {
      const localStorageSelectCounter = Number(
        localStorage.getItem("localSelectCounter")
      );
      event.stopPropagation();

      selectCounter = localStorageSelectCounter + 1;
      localStorage.setItem("localSelectCounter", selectCounter);
      multipleSelect.style.display = "flex"; // Показываем элемент "Выбрано"
      multipleSelectCount.textContent = selectCounter;
    });

    // Для мобильной версии
    multipleSelectCancelButtonIcon?.addEventListener("click", (event) => {
      event.stopPropagation();
      selectCounter = 0;
      localStorage.setItem("localSelectCounter", selectCounter);
      multipleSelect.style.display = "none"; // Скрываем элемент "Выбрано"
    });
    // Для десктопной версии
    multipleSelectCancelButton?.addEventListener("click", (event) => {
      event.stopPropagation();
      selectCounter = 0;
      localStorage.setItem("localSelectCounter", selectCounter);
      multipleSelect.style.display = "none";
    });
  });

  // ------------------ 6. Логика для отображения и скрытия Action Sheet ------------------
  const statusBar = document.querySelector(".status-bar");
  let currentOpenActionSheetContent = null; // Переменная для хранения текущего открытого actionSheetContent

  // Функция для добавления/удаления класса "status-bar--mobile"
  function toggleStatusBarMobile() {
    if (isMobile()) {
      if (!statusBar.classList.contains("status-bar--mobile")) {
        statusBar.classList.add("status-bar--mobile");
      } else {
        statusBar.classList.remove("status-bar--mobile");
      }
    }
  }

  // Функция для позиционирования Action Sheet на десктопе
  function positionActionSheet(actionSheetContent, optionsButton, cardWrapper) {
    // Получаем координаты относительно окна браузера
    const cardRect = cardWrapper.getBoundingClientRect();
    const buttondRect = optionsButton.getBoundingClientRect();
    const actionSheetWidth = actionSheetContent.offsetWidth; // Ширина ActionSheet
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop; // Учет прокрутки

    // Проверяем, помещается ли ActionSheet справа
    if (
      buttondRect.right + actionSheetWidth >
      document.documentElement.clientWidth
    ) {
      // Если не помещается, позиционируем слева
      actionSheetContent.style.top = `${buttondRect.top + scrollTop + 20}px`;
      actionSheetContent.style.left = `${
        cardRect.right - actionSheetWidth - 20
      }px`;
    } else {
      // Если помещается, позиционируем справа
      actionSheetContent.style.top = `${buttondRect.top + scrollTop + 20}px`;
      actionSheetContent.style.left = `${buttondRect.right - 20}px`;
    }
  }

  // Обработчики для Action Sheet
  cardWrappers.forEach((cardWrapper, index) => {
    const optionsButton = cardWrapper.querySelector(".objects__card__options");
    const actionSheet = cardWrapper.querySelector(".action-sheet");
    const actionSheetContent = cardWrapper.querySelector(
      ".action-sheet__content"
    );
    const cancelButton = actionSheet
      ? actionSheet.querySelector(".action-sheet__сancel-button")
      : null; // Проверка actionSheet

    // Обработчик клика на кнопку опций
    optionsButton.addEventListener("click", (event) => {
      event.stopPropagation();

      // Если есть открытый actionSheetContent, закрываем его
      if (
        currentOpenActionSheetContent &&
        currentOpenActionSheetContent !== actionSheetContent
      ) {
        currentOpenActionSheetContent.classList.remove(
          "action-sheet__content--active"
        );
        currentOpenActionSheetContent
          .closest(".action-sheet")
          .classList.remove("action-sheet--active");
      }

      if (isMobile()) {
        // Мобильное устройство: добавляем затемнение и позиционируем модально
        actionSheet.classList.add("action-sheet--active");
        actionSheet.classList.add("action-sheet--mobile");
        toggleStatusBarMobile();
      } else {
        // Отображаем как dropdown
        actionSheet.classList.remove("action-sheet--mobile");
        actionSheet.classList.add("action-sheet--active");
        actionSheetContent.classList.add("action-sheet__content--active");
        positionActionSheet(actionSheetContent, optionsButton, cardWrapper); //  Передаем cardWrapper
      }
      // Обновляем текущий открытый actionSheetContent
      currentOpenActionSheetContent = actionSheetContent;
    });

    // Обработчик клика на кнопку отмены (только для мобильных)
    if (cancelButton) {
      cancelButton.addEventListener("click", () => {
        actionSheet.classList.remove("action-sheet--active");
        actionSheet.classList.remove("action-sheet--mobile");
        toggleStatusBarMobile();
        currentOpenActionSheetContent = null; // Сбрасываем, когда закрываем через cancel
      });
    }

    // Закрытие Action Sheet при клике вне карточки
    document.addEventListener("click", (event) => {
      // Проверяем, находится ли клик вне actionSheet И вне actionSheetContent
      if (!actionSheetContent.contains(event.target)) {
        actionSheet.classList.remove("action-sheet--active");
        actionSheet.classList.remove("action-sheet--mobile");
        statusBar.classList.remove("status-bar--mobile");
        actionSheetContent.classList.remove("action-sheet__content--active");
        currentOpenActionSheetContent = null; // Сбрасываем при закрытии кликом вне
      }
    });
  });

  // ------------------ 7. Логика для отображения и скрытия Custom select ------------------
  const customSelect = document.querySelector(".header__sort");
  const selectedOption = customSelect.querySelector(".selected-option");
  const optionsWrapper = customSelect.querySelector(".options__wrapper");
  const optionsContainer = customSelect.querySelector(".options");
  const options = customSelect.querySelectorAll(".option");
  const originalSelect = document.getElementById("sort-select");
  const sortChevron = customSelect.querySelector(".header__sort_chevron");
  const closeOptionsButton = customSelect.querySelector(
    ".options__wrapper_сancel-button"
  );

  // Обработчик клика на header__sort
  customSelect.addEventListener("click", (event) => {
    event.stopPropagation(); // Предотвращаем всплытие события

    if (isMobile()) {
      // Мобильное устройство: добавляем класс для модального отображения
      optionsWrapper.classList.add("options__wrapper--mobile"); // Добавляем класс к обертке
      optionsWrapper.classList.toggle("open"); // Открываем/закрываем
      sortChevron.classList.toggle("rotate");
      toggleStatusBarMobile();
    } else {
      // Отображаем как dropdown
      optionsWrapper.classList.toggle("open"); // Открываем/закрываем
      sortChevron.classList.toggle("rotate");
    }
  });

  // Обработчик клика на кнопку отмены (только для мобильных)
  if (closeOptionsButton) {
    closeOptionsButton.addEventListener("click", () => {
      optionsWrapper.classList.remove("options__wrapper--mobile");
      optionsWrapper.classList.remove("open");
      sortChevron.classList.remove("rotate");
      toggleStatusBarMobile();
    });
  }

  // Функция сортировки объектов
  function sortCards(sortBy) {
    switch (sortBy) {
      case "price-asc":
        cardData.sort((a, b) => a.clearPrice - b.clearPrice);
        break;
      case "price-desc":
        cardData.sort((a, b) => b.clearPrice - a.clearPrice);
        break;
      case "area-asc":
        cardData.sort((a, b) => a.area - b.area);
        break;
      case "area-desc":
        cardData.sort((a, b) => b.area - a.area);
        break;
      default:
        break;
    }
  }

  // Обработчик клика на option
  options.forEach((option) => {
    const optionIcon = option.querySelector(".header__sort_option-icon");

    option.addEventListener("click", () => {
      const optionIconActive = document.querySelector(".active");
      if (optionIconActive) {
        optionIconActive.classList.remove("active");
      }

      selectedOption.textContent = option.textContent;
      originalSelect.value = option.dataset.value; // Обновляем значение оригинального select
      optionIcon.classList.add("active");

      optionsWrapper.classList.remove("options__wrapper--mobile");
      optionsWrapper.classList.remove("open");
      sortChevron.classList.remove("rotate");
      toggleStatusBarMobile();

      // Сортируем и перерисовываем карточки
      sortCards(option.dataset.value);
      objectsGrid.innerHTML = ""; // Очищаем контейнер
      displayedCards = 0; // сбрасываем счетчик

      const initialCards = getCardDataForDisplay(
        displayedCards,
        initialCardsToShow
      );
      //
      renderCards(initialCards);
      displayedCards += initialCardsToShow;
      updateShowMoreButton();
    });
  });

  // Закрытие списка опций при клике вне элемента
  document.addEventListener("click", function (event) {
    if (!customSelect.contains(event.target)) {
      optionsWrapper.classList.remove("options__wrapper--mobile");
      optionsContainer.classList.remove("open");
      sortChevron.classList.remove("rotate");
    }
  });

  // ------------------ 8. Desktop Menu Hover Logic ------------------
  const desktopMenu = document.querySelector(".desktop-menu");
  const desktopMenuWidth = 80; // Ширина меню в px

  if (desktopMenu) {
    desktopMenu.style.left = `-${desktopMenuWidth}px`; // Скрываем меню изначально

    desktopMenu.addEventListener("mouseenter", () => {
      if (!isMobile()) {
        desktopMenu.style.transition = "left 0.2s ease"; // Добавляем плавный переход
        desktopMenu.style.left = "0"; // Показываем меню
      }
    });

    desktopMenu.addEventListener("mouseleave", () => {
      desktopMenu.style.transition = "left 0.3s ease"; // Добавляем плавный переход
      desktopMenu.style.left = `-${desktopMenuWidth}px`; // Скрываем меню
    });
  }
});
