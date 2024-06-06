// У звітному HTML-документі створити html-розміту,
// яка складається з наступних елементів: текст,
// маркирований список. Натиснувши кнопку Подвоїти, збільшити значення
// у кожному елементі списку у 2 рази. Повторний натиск
// на кнопці Подвоїти, також збільшить значення у
// кожному елементі списку у 2 рази
// У звітному HTML-документі відобразити скрін
// програмного коду


function doubleValues() {
    const listItems = document.querySelectorAll('#myList li');
    listItems.forEach(item => {
        const currentValue = parseInt(item.textContent);
        item.textContent = currentValue * 2;
    });
}

