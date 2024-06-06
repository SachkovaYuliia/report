// Напиши скрипт створення й очищення колекції
// елементів з наступним функціоналом.
// Є input, у який користувач вводить бажану кількість
// елементів. Після натискання на кнопку Create має
// рендеритися (додаватися в DOM) колекція з
// відповідною кількістю елементів і очищатися значення
// в інпуті. При повторному натисканні на
// кнопку Create поверх старої колекції має рендеритись
// нова. Після натискання на кнопку Destroy колекція
// елементів має очищатися.
// &lt;div id=&quot;controls&quot;&gt;
// &lt;input type=&quot;number&quot; min=&quot;1&quot; max=&quot;100&quot;
// step=&quot;1&quot; /&gt;
// &lt;button type=&quot;button&quot; data-
// create&gt;Create&lt;/button&gt;
// &lt;button type=&quot;button&quot; data-
// destroy&gt;Destroy&lt;/button&gt;
// &lt;/div&gt;
// &lt;div id=&quot;boxes&quot;&gt;&lt;/div&gt;
// Після натискання користувачем на
// кнопку Create треба провалідувати значення в input,
// воно має бути в межах від 1 до 100 включно. Тільки
// якщо воно задоволяє умову, мають додаватися
// нові &lt;div&gt; елементи в DOM.
// Для рендеру елементів на сторінці створи
// функцію createBoxes(amount), яка приймає один
// параметр — число, що зберігає кількість елементів для
// рендеру. Функція має створювати
// стільки &lt;div&gt; елементів, скільки вказано
// в параметрі amount і додавати їх у DOM дочірніми
// елементами для div#boxes.
// 1. Розміри першого &lt;div&gt; елемента мають бути
// 30px на 30px.
// 2. Кожен наступний елемент повинен бути ширшим і вищим від попереднього на 10px.
// 3. Усі елементи повинні мати випадковий колір
// фону. Використовуй готову
// функцію getRandomHexColor() для отримання
// випадкового кольору.
// function getRandomHexColor() {
// return `#${Math.floor(Math.random() *
// 16777215)
// .toString(16)
// .padStart(6, 0)}`;
// }

// Для очищення колекції після натискання на
// кнопку Destroy створи функцію destroyBoxes(), яка
// очищає вміст div#boxes, у такий спосіб видаляючи всі
// створені елементи.

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}

function createBoxes(amount) {
    const boxesContainer = document.getElementById('boxes');
    boxesContainer.innerHTML = ''; 
    let boxSize = 30;

    for (let i = 0; i < amount; i++) {
        const box = document.createElement('div');
        box.style.width = `${boxSize}px`;
        box.style.height = `${boxSize}px`;
        box.style.backgroundColor = getRandomHexColor();
        boxesContainer.appendChild(box);
        boxSize += 10; 
    }
}

function destroyBoxes() {
    const boxesContainer = document.getElementById('boxes');
    boxesContainer.innerHTML = ''; 
}

document.querySelector('[data-create]').addEventListener('click', () => {
    const input = document.querySelector('#controls input');
    const amount = parseInt(input.value);

    if (amount >= 1 && amount <= 100) {
        createBoxes(amount);
        input.value = ''; 
    } else {
        alert('Please enter a number between 1 and 100.');
    }
});

document.querySelector('[data-destroy]').addEventListener('click', destroyBoxes);
