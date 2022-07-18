document.addEventListener('DOMContentLoaded', () => {
    //! Tabs
    const tabs = document.querySelectorAll('.tabheader__item'), 
    tabsContent = document.querySelectorAll('.tabcontent'), 
    tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent () {
        tabsContent.forEach(item => {       // Перебором получаеми все картинки, которые надо скрыть
            item.classList.add('hide');     // Добавляем класс скрытия
            item.classList.remove('show', 'fade');  // Убираем показывающий класс и анимацию
        });
        tabs.forEach(tab => {           // Перебираем все табы
            tab.classList.remove('tabheader__item_active'); // Удаляем класс активной вкладки
        });
    }

    function showTabContent (i = 0){    // По умолчанию будет показываться первая картинка
        tabsContent[i].classList.add('show', 'fade');   // Добавляем показывающий класс и анимацию
        tabsContent[i].classList.remove('hide');        // Удаляем скрывающий класс

        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();
    console.log('Hello');
    
    
    tabsParent.addEventListener('click', (event) => {   // За счёт обработчика будем получать информацию по клику
        // и далее уже за счёт перебора получать аргумент i (порядковый номер), котторый будет вставляться в ф-ю показа
        const target = event.target;    // чтобы постоянно не прописывать event.target можно занести в переменную
        
        if (target && target.classList.contains('tabheader__item')){
            tabs.forEach((item, i) => {     // Перебираются все табы и передаются аргументы элементов и порядкого номера
                if (target == item){        // Если цель совпадает с элементом, то 
                    hideTabContent();       // Скрываются все табы и
                    showTabContent(i);      // Показывается только тот, который совпол с пордковым номером
                    console.dir(event);
                }
            });
        }
    });


    //! Timer

    const deadline = '2022-05-17';

    function getTimeRemaining(endtime){
        const t = Date.parse(endtime) - Date.parse(new Date()), 
            days = Math.floor(t /  (1000 * 60 * 60 * 24)), 
            hours = Math.floor((t / (1000 * 60 * 60) % 24)),
            minutes = Math.floor((t / (1000 / 60)) % 60),
            seconds = Math.floor((t / 1000) % 60);

        return{
            'total': t, 
            'days': days, 
            'hours': hours, 
            'minutes': minutes, 
            'seconds': seconds
        };

    }

    function getZero(num){
        if (num >= 0 && num < 10){
            return `0${num}`;
        }else{
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

        function updateClock(){ 
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minuts.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);
            
            if (t.total <= 0) {
                clearInterval(timeInterval);    //Если таймер будет равен нулю, то остановить его
            }
        }
    }

    setClock('.timer', deadline);


    // Modal 

    const modalTrigger = document.querySelectorAll('[data-modal]'), 
    modal = document.querySelector('.modal'), 
    modalCloseBtn = document.querySelector('[data-close]');

    function openModal(){
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

    modalCloseBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (event) => {
        if (event.target === modal){
           closeModal();
        }
    });

    document,addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')){
            closeModal();
        }
    });


    const modalTimerId = setTimeout(openModal, 3000);

    function showModalByScroll(){
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight-1){
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);
});

