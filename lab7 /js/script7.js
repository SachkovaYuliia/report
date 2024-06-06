// Напиши скрипт, який:
// 1. Порахує і виведе в консоль кількість категорій
// в ul#categories, тобто елементів li.item.
// 2. Для кожного элемента li.item у
// списку ul#categories, знайде і виведе в консоль
// текст заголовку елемента (тегу h2) і кількість
// елементів в категорії (усіх li, вкладених в
// нього).
// Для виконання цього завдання потрібно використати
// метод forEach() і властивості навігації по DOM.


const categoriesList = document.getElementById('categories');
const categoryItems = categoriesList.querySelectorAll('li.item');

console.log('Кількість категорій:', categoryItems.length);

categoryItems.forEach(item => {
    const categoryTitle = item.querySelector('h2').textContent;
    console.log('Категорія:', categoryTitle);
    const categoryElements = item.querySelectorAll('ul li');
    console.log('Кількість елементів у категорії:', categoryElements.length);
});