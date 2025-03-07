const batteryLevel = document.querySelector(".status-bar__battery-level");

function updateBatteryLevel(level) {
  batteryLevel.style.width = `${level}%`;
  // Дополнительно можно менять цвет в зависимости от уровня (зеленый, желтый, красный)
}

// Пример вызова функции (например, раз в минуту):
setInterval(() => {
  const randomLevel = Math.floor(Math.random() * 101); // Случайное значение от 0 до 100
  updateBatteryLevel(randomLevel);
}, 60000); // Обновляем раз в минуту
