// У звітному HTML-документі створити html-розміту,
// яка складається з наступних елементів: текст, кнопка,
// два інпута (поля введення ). Після натискання кнопки SWAP ME здійснюється
// обмін вмістом між двома інпутами.
// Ви можете натиснути на неї кілька разів або вручну змінити вміст інпутів.
// У звітному HTML-документі відобразити скрін програмного коду.    

function swapInputs() {
    let input1Value = document.getElementById('input1').value;
    let input2Value = document.getElementById('input2').value;

    document.getElementById('input1').value = input2Value;
    document.getElementById('input2').value = input1Value;
}