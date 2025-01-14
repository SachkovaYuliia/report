const accideButtonsBlock = document.getElementById("accide_buttons"); // вибір блоку для вставки бічних кнопок
const destinationHTML = document.getElementById("inserted"); // вибір блоку для вставки основного контенту
const extraCssLink = document.getElementById("extra_css"); // вибір елемента, у який буде додаватись додатковий CSS файл для стилізації вкладених блоків

const fadeIn = [{ opacity: 0}, { opacity: 0.33 },{ opacity: 0.66 }, { opacity: 1}];   
const animateButton = [                                                                  
{ backgroundColor: " #7fdef3" },                                                          
{ backgroundColor: "#83abdf" },                                                          
];                                                                                       
const timing = { duration: 300, iterations: 1 };                                         

const help_button = document.getElementById("help_button");
let site_data = getSiteData(); // отримання основних даних про структуру сайту з файлу project_structure.json
let current_lb = {};           // для поточної лаби створюється об'єкт, який буде зберігати дані з site_data. Щоб кожного разу для пошуку файлу html, не доводилось з'ясовувати, яка відкрита лаба 
let current_lb_btn = null; // зберігає поточну кнопку лаби
let current_accide_btn = null; // зберігає поточну кнопку розділу лаби
async function helpHandler() {
  /* 
  функція "слухач" або обробник події для кнопки допомоги. В цілому, вона схожа на обробники для інших кнопок, 
  але ця кнопка на відміну від інших, ніяк не залежить від кнопок лаб, тому обробляється окремо
  */
  let HTML_file = "./add.html";  // файл, вміст якого буде завантажено до основоного блоку
  let CSS_file = "./add.css";    // додатковий файл стилів саме для блоку допомоги
  accideButtonsBlock.style.display = "none"; // так як для допомоги бічні клавіші не потрібні, але порожній блок під них статично існує, то його слід приховати
  if (current_lb_btn) {                                       // якщо перехід до допомоги відбувся з розділу лаби, то його кнопку треба зробити неактивною
    current_lb_btn.parentElement.classList.remove("active");  // але, якщо такої кнопки не було, то викликати її елемент не вийде
  }                                                           //
  await insertBlock(HTML_file, CSS_file);     // безпосередня вствка HTML коду та підключення CSS файлу
}
help_button.addEventListener("click", helpHandler);
helpHandler();                                      


async function insertBlock(sourceHTML, linkCSS = "") {
  /* 
  отримує вміст розділу, який потрібно вставити, 
  з файлу, та заміщує ним вміст destinationHTML. 
  Якщо файл не вдалось завантажити, натомість розміщуєть відповідний текст 
  */
  let myObject = await fetch(sourceHTML);
  
  if (myObject.status == 200) {
    destinationHTML.innerHTML = await myObject.text();
    destinationHTML.animate(fadeIn, timing);
    extraCssLink.href = linkCSS;
  } else {
    destinationHTML.innerHTML = `<p class="loading">${myObject.statusText}</p> <br><p class="loading">Coming soon....</p>`;
    extraCssLink.href = "";
  }
}
async function getSiteData(source = "./project_structure.json") {
  /* 
  функція, яка отримує дані сайту з файлу project_structure.json 
  в JS це єдиний спосіб отримати дані з файлу. Цей метод асинхронний - він повертає не дані, а promise (обіцянку),
  з якої можна отримати дані, якщо вони уже завантажились. Відповідно весь код, який використовує цю функцію теж має бути асинхронним. 
  */ 
  const response = await fetch(source);
  const { data } = await response.json();
  site_data = data;
}

for (button of document.querySelectorAll("button[id^='lb']")) { // для всіх конопок, id яких починається з "lb" (це всі кнопки лаб) додаються слухачі
  button.addEventListener("click", lbButtonHandler);
}

function setCurrentBtnActive(old_button, new_btn) {
  if (old_button) {
    /*  
    попередня кнопка перестає бути активною, із застосуванням ефектів анімації обирається нова активна кнопка 
    parentElement - батьківський елемент. Початково розмістив кнопки в дівах, які легше стилізувати
    */ 
   old_button.parentElement.animate(animateButton, timing);
   old_button.parentElement.classList.remove("active");
  }
  new_btn.parentElement.classList.add("active");
}

function lbButtonHandler(event) {
  /* 
  обробник натискань верхніх кнопок лаб. event.target.id - це id натиснутої кнопки. 
  */
  current_lb = site_data.labs[event.target.id];
  setCurrentBtnActive(current_lb_btn, event.target);
  current_lb_btn = event.target;
  accideButtonsBlock.innerHTML = "";
  extraCssLink.href = "";
  for (button in current_lb.buttons) {
    createAcideButton(button);
  }
  if (accideButtonsBlock.firstChild) {
    accideButtonsBlock.style.display = "block";
    accideButtonsBlock.firstChild.firstChild.click();
  } else {
    destinationHTML.innerHTML = '<p class="loading">Coming soon...</p>';
    accideButtonsBlock.style.display = "none";
  }
}

function createAcideButton(button_name) {
  /*  
    створення бічної кнопки
    */ 
  let div_button = document.createElement("div");
  let button_data = current_lb.buttons[button_name];
  div_button.classList.add("nav-item");
  let button = `<button id=${button_name} class="button" type="button"> ${button_data.title}</button>`;
  div_button.innerHTML = button;
  let html_file = current_lb.rel_path + button_data.html_file;
  let css_file = current_lb.rel_path + button_data.css_file;
  let files = { html_file, css_file };
  div_button.firstChild.addEventListener(
    "click",
    acideButtonHandler.bind(files)
  );
  accideButtonsBlock.append(div_button);
}

async function acideButtonHandler(event) {
  /*  
    обробник подій бічної кнопки. 
    Саме завдяки acideButtonHandler.bind(files) з попередньої функції можна викликати this.html_file. 
    this завдяки прикріпленню має поля html_file та css_file 
    Тому функція insertBlock отримує шляхи до цих файлів і може вставити у сторінку їх вміст.
    Далі кнопка робиться активною
    PR.prettyPrint() - додає клас сторонньої бібліотеки code-prettify, який автоматично розфарбовує код в стилі IDE 
     */ 
  await insertBlock(this.html_file, this.css_file);
  setCurrentBtnActive(current_accide_btn, event.target);
  current_accide_btn = event.target;
  current_accide_btn.parentElement.classList.add("active");
  PR.prettyPrint();
}