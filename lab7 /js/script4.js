// У звітному HTML-документі створити html-розміту,
//                 яка складається з наступних елементів: текст, блок
//                 (div), дві кнопки. Кнопка Зменшити робить квадрат менше на 15
//                 пікселів.
//                 Повторний натиск на кнопці Зменшити робить
//                 квадрат ще менше на 15 пікселів.
//                 Збільшити – робить квадрат більше на 15 пікселів.
//                 Повторний натиск на кнопці Зменшити   робить
//                 квадрат ще більше на 15 пікселів.
//                 У звітному HTML-документі відобразити скрін
//                 програмного коду  
                
let size = 200; 

function decreaseSize() {
    size -= 15; 
    document.getElementById('square').style.width = size + 'px';
    document.getElementById('square').style.height = size + 'px';
}

function increaseSize() {
    size += 15; 
    document.getElementById('square').style.width = size + 'px';
    document.getElementById('square').style.height = size + 'px';
}