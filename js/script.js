document.addEventListener('DOMContentLoaded', () => {
    //! Tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(item => { // Перебором получаеми все картинки, которые надо скрыть
            item.classList.add('hide'); // Добавляем класс скрытия
            item.classList.remove('show', 'fade'); // Убираем показывающий класс и анимацию
        });
        tabs.forEach(tab => { // Перебираем все табы
            tab.classList.remove('tabheader__item_active'); // Удаляем класс активной вкладки
        });
    }

    function showTabContent(i = 0) { // По умолчанию будет показываться первая картинка
        tabsContent[i].classList.add('show', 'fade'); // Добавляем показывающий класс и анимацию
        tabsContent[i].classList.remove('hide'); // Удаляем скрывающий класс

        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();
    console.log('Hello');


    tabsParent.addEventListener('click', (event) => { // За счёт обработчика будем получать информацию по клику
        // и далее уже за счёт перебора получать аргумент i (порядковый номер), котторый будет вставляться в ф-ю показа
        const target = event.target; // чтобы постоянно не прописывать event.target можно занести в переменную

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => { // Перебираются все табы и передаются аргументы элементов и порядкого номера
                if (target == item) { // Если цель совпадает с элементом, то 
                    hideTabContent(); // Скрываются все табы и
                    showTabContent(i); // Показывается только тот, который совпол с пордковым номером
                    console.dir(event);
                }
            });
        }
    });


    //! Timer

    const deadline = '2025-05-25';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60) % 24)),
            minutes = Math.floor((t / (1000 / 60)) % 60),
            seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };

    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minuts = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minuts.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval); //Если таймер будет равен нулю, то остановить его
            }
        }
    }

    setClock('.timer', deadline);


    // Modal 

    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal');

    function openModal() {
        // modal.classList.add('show');
        // modal.classList.remove('hide');
        modal.classList.toggle('show');
        document.body.style.overflow = "hidden";
        clearInterval(modalTimerId);
    }

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });



    function closeModal() {
        // modal.classList.add('hide');
        // modal.classList.remove('show');
        modal.classList.toggle('show');
        document.body.style.overflow = "";
    }


    modal.addEventListener('click', (event) => {
        if (event.target === modal || event.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal();
        }
    });


    const modalTimerId = setTimeout(openModal, 50000); //Модальное окно, которое появляется каждые 3 секунды 

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            // -1 потому что при пролистывании страница может не дойти до конца, а высота клиента будет на 1 меньше, и чтобы избежать ошибок, отняли 1px
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);




    // Card Generator

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.transfer = 27;
            this.changeToUAH(); //Метод для конвертации
            this.parent = document.querySelector(parentSelector); //Получение элемента родителя и добавление его в конструкор, получая из введёных значений
        }

        // ф-я конвертации валюты, после чего в контексте price будет заменяться цена на конвертированную
        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        // ф-я которая генерирует карточку в зависимости от контекста вызова, и вставляет в html документ append
        render() {
            const element = document.createElement('div');
            element.innerHTML = `
                <div class="menu__item">
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
                </div>`;

            this.parent.append(element);
        }
    }

    //? Так можно генерировать карточки с текстом, что достаточно удобно, потому что надо вносить только информацию, а длее они автоматически генерируются и создаются на странице
    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        '"Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        '.menu .container'
    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        14,
        ".menu .container",

    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        9,
        '.menu .container'
    ).render();




    //? Forms (AJAX запросы с использованием локального сервера MAMP)




    // Переменная которая по тегу <form> получает элементы
    const forms = document.querySelectorAll('form');

    // Объект в котором находятся статусы запросов, пригодиться для оповещения пользователя о статусе
    const message = {
        loading: 'img/form/005 spinner.svg',
        success: 'Спсибо! Мы с вами скоро свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => { // Перебор всех тегов <form>
        postData(item); // Исппользование ф-ии для одной из пребранных форм
    });

    // 
    function postData(form) {
        form.addEventListener('submit', (e) => { // Событие которое инициализирует отправку формы, работает только на <form> или <input type="submit">
            e.preventDefault(); //Сбро стандартного поведения браузера

            // Создание элемента на странице, в котором будет написан статус отправки данных на сервер
            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading; // Присваивание уведомлению класса .status
            statusMessage.style.cssText = `
                display: block; 
                margin: 0 auto;
            `; // Сразу после отправки присвоение статуса загрузки
            // form.append(statusMessage); // Добавление в конец полученной формы статуса
            form.insertAdjacentElement('afterend', statusMessage);


            const request = new XMLHttpRequest(); // Моздание HTTP объекта, которые далее должен передать запрос на сервер
            request.open('POST', 'server.php'); // Метод делающий пост запрос серверу 
            request.setRequestHeader('Content-type', 'application/json; charset=utf-8');


            // Для создания объекта и для дальнейшей конвертации его в JSON
            const formData = new FormData(form);
            const object = {};
            formData.forEach(function(value, key) {
                object[key] = value;
            });


            // Конвертация объекта в JSON
            //! PHP не умеет работать с JSON поэтому надо будет конвертировать в подходящий формат, в дальнейшем
            const json = JSON.stringify(object); // Превращение из обычного объекта в JSON
            request.send(json);


            // const formData = new FormData(form); // Создание пар ключ значение, аргументы для этого получаются с формы

            // Из-за спцифичночти FormData данные надо будет первести в JSON

            // request.send(formData);

            request.addEventListener('load', () => {
                if (request.status === 200) {
                    console.log(request.response); // Отображает в консоли переданные данные
                    showThanksModal(message.success); // Вызывается модальное окно с сообщением о благодарности 
                    statusMessage.remove(); // Удаление сообщения о статусе
                    form.reset(); // так производится очистка формы
                } else {
                    showThanksModal(message.failure); // Вызывается модальное окно с сообщением об ошибке
                }
            });
        });
    }

    // Modal with thanks message

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog'); // Поулчаем диалоговое окно, сам блок

        prevModalDialog.classList.add('hide'); // Сразу же скрываем его
        // openModal(); // Ф-я отвеччающая за открытие окна, переключает классы

        const thanksModal = document.createElement('div'); // Создание окна благодарности
        thanksModal.classList.add('modal__dialog'); // Добавление класса, основы для окна 

        // Добавление на страницу модального окна, в котором описывается и состояние отправки формы
        thanksModal.innerHTML = `  
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;


        document.querySelector('.modal').append(thanksModal); // Добавленние окна благодарности
        setTimeout(() => { // Создание асинхронного кода по удалению окна после отправки формы
            thanksModal.remove(); // Удаление окна благодарности
            prevModalDialog.classList.add('show'); // Две следующие операции создают и скрывают модальное оконо с формой
            prevModalDialog.classList.remove('hide');
            closeModal(); // Ф-я закрытия модального окна 
        }, 4000);
    }
});