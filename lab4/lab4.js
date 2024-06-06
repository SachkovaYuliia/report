//Завдання 1.....................................................................................
// Функція для визначення максимального та мінімального значення серед елементів із парними та непарними номерами
function findMinMax(arr) {
    let minEven = Infinity;
    let maxEven = -Infinity;
    let minOdd = Infinity;
    let maxOdd = -Infinity;

    for (let i = 0; i < arr.length; i++) {
        if (i % 2 === 0) {
            if (arr[i] < minEven) {
                minEven = arr[i];
            }
            if (arr[i] > maxEven) {
                maxEven = arr[i];
            }
        } else {
            if (arr[i] < minOdd) {
                minOdd = arr[i];
            }
            if (arr[i] > maxOdd) {
                maxOdd = arr[i];
            }
        }
    }

    return { minEven, maxEven, minOdd, maxOdd };
}

// Функція для сортування масиву у порядку зменшення методом вибору
function selectionSort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        let maxIndex = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] > arr[maxIndex]) {
                maxIndex = j;
            }
        }
        if (maxIndex !== i) {
            let temp = arr[i];
            arr[i] = arr[maxIndex];
            arr[maxIndex] = temp;
        }
    }
}

// Функція для обробки події відправлення форми
function handleSubmit(event) {
    event.preventDefault();
    let length = parseInt(document.getElementById("length").value);
    let arr = [];
    for (let i = 0; i < length; i++) {
        arr.push(parseInt(document.getElementById(`element${i}`).value));
    }

    let result = findMinMax(arr);
    let output = document.getElementById("output");
    output.innerHTML = `Мінімальний непарний елемент: ${result.minEven}<br>`;
    output.innerHTML += `Максимальний непарний елемент: ${result.maxEven}<br>`;
    output.innerHTML += `Мінімальний праний елемент: ${result.minOdd}<br>`;
    output.innerHTML += `Максимальний парний елемент: ${result.maxOdd}<br>`;

    selectionSort(arr);
    output.innerHTML += `<br>Відсортований масив в зворотньому порядку: ${arr.join(", ")}`;
}

// Функція для відображення полів введення відповідно до введеної довжини масиву
function createInputs() {
    let length = parseInt(document.getElementById("length").value);
    let inputsDiv = document.getElementById("inputs");
    inputsDiv.innerHTML = "";
    for (let i = 0; i < length; i++) {
        let input = document.createElement("input");
        input.type = "number";
        input.id = `element${i}`;
        input.name = `element${i}`;
        input.placeholder = `Element ${i + 1}`;
        input.required = true;
        inputsDiv.appendChild(input);
        inputsDiv.appendChild(document.createElement("br"));
    }
}

document.getElementById("length").addEventListener("input", createInputs);

