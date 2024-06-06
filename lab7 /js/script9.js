// Напиши скрипт, який змінює колір фону елемента &lt;body&gt; через інлайн-стиль по кліку на button.change-color і задає це значення кольору текстовим вмістом для span.color.
// <div class=&quot;widget&quot;&gt;&lt;p&gt;Background color: &lt;span class=&quot;color&quot;&gt;-&lt;/span&gt;&lt;/p&gt;
// &lt;button type=&quot;button&quot; class=&quot;change-color&quot;&gt;Change color&lt;/button&gt;
// &lt;/div&gt; Для генерування випадкового кольору використовуй функцію getRandomHexColor().
//                 function getRandomHexColor() {
//                 return `#${Math.floor(Math.random() *
//                 16777215)
//                 .toString(16)
//                 .padStart(6, 0)}`;
//                 }
// Зверни увагу, що функція getRandomHexColor() повертає колір у hex-форматі, в той час як колір фону на &lt;body&gt; буде у
// форматі rgb. Це нормально й не потребує якихось правок. 

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}

document.querySelector('.change-color').addEventListener('click', function() {
    const newColor = getRandomHexColor();
    document.body.style.backgroundColor = newColor;
    document.querySelector('.color').textContent = newColor;
});
