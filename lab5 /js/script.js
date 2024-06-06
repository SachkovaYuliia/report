// Динамічне меню __________________________________
document.addEventListener("DOMContentLoaded", (event)=> {
    let menuItems = [
        { name: "Головна", url: "index.html" },
        { name: "Про нас", url: "aboutUs.html", subMenu: [
            { name: "Історія", url: "history.html" },
            { name: "Команда", url: "team.html" }
        ] },
        { name: "Послуги", url: "services.html" },
        { name: "Контакти", url: "contacts.html" }
    ];

    function createMenu(menuItems, parent) {
        let ul = document.createElement("ul");
        for (let i = 0; i < menuItems.length; i++) {
            let li = document.createElement("li");
            let a = document.createElement("a");
            a.textContent = menuItems[i].name;
            a.href = menuItems[i].url;
            li.appendChild(a);
            if (menuItems[i].subMenu) {
                li.classList.add("has-submenu");
                let subMenu = createMenu(menuItems[i].subMenu, li);
                li.appendChild(subMenu);
            }
            ul.appendChild(li);
        }
        parent.appendChild(ul);
        return ul;
    }

    let mainMenu = document.getElementById("main-menu");
    createMenu(menuItems, mainMenu);

    document.addEventListener('click', function(event) {
        let clickedElement = event.target;
        if (!clickedElement.closest('.has-submenu')) {
            let submenus = document.querySelectorAll('.has-submenu ul');
            submenus.forEach(function(submenu) {
                submenu.classList.remove('active');
            });
        }
    });
});