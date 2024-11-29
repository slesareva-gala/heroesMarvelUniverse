"use strict";

// получение по AJAX запросу 
export const dbload = (url) => fetch(url)
    .then(response => {
        if (!response.ok) throw new Error(response.statusText)
        return response.json()
    })

// универсальный аниматор
export const animate = ({ draw = () => { }, duration = 1000, timingplane = 'linear', timeframe = 16.7, execute = () => true }) => {

    const timing = {
        linear: (x) => x,

        // Кубические функции Безье (в т.ч. ease, ease-in, ease-out и ease-in-out)
        easeOutCubic: (x) => 1 - Math.pow(1 - x, 3),        // для вертикального скролла (равномерное движение, замедление к концу)
        easeInOutCubic: (x) => x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2, // (начало(1/3) ~ окончание(1/3) замедлено, центр плавный(1/3))
        easeOutQuart: (x) => 1 - Math.pow(1 - x, 5), // подхожа на easeInOutCubic, но начало и окончание продолжительнее, а центр - интенсивнее
        easeOutExpo: (x) => x === 1 ? 1 : 1 - Math.pow(2, -10 * x),  // для выезжающих модальных окон (интенсивное движение, длительное замедление к концу )
        easeInExpo: (x) => x === 0 ? 0 : Math.pow(2, 10 * x - 10), // для перебора цифр, ~ 1/3 задержки, затем рост

    };
    if (!(timingplane in timing)) { timingplane = 'linear'; }


    // максимальное количество анимаций
    const maxCountAnimation = Math.max(Math.round(duration / timeframe), 1);
    // счетчик анимаций, максимальное количество анимаций
    let countAnimation = 0;

    requestAnimationFrame(function animation() {
        // вычисление текущего состояния анимации
        // число от 0 до 1 с учетом указанной линейности, заданной в настроку timing
        let progress = countAnimation === 0 ? 0 :
            countAnimation > maxCountAnimation - 1 ? 1 :
                timing[timingplane](countAnimation / maxCountAnimation);

        if (!execute()) return  // прервать анимацию 

        draw(progress); // отрисовать

        if (countAnimation < maxCountAnimation) {
            countAnimation++;
            requestAnimationFrame(animation);
        }
    });
};

// модальное окно
export const modal = (modal, modalContent, states = 'show', time = undefined) => {

    const shiftContetn = Math.round(modalContent.offsetWidth / 2)

    const actions = {

        show: (time = 1000) => {

            modal.style.transform = 'translateX(0)'

            if (time === 0) {
                modalContent.style.left = `50%`;
                modalContent.style.transform = `translateX(-${shiftContetn}px )`;

            } else {
                animate({
                    timingplane: 'easeOutExpo',
                    draw(progress) {
                        modalContent.style.left = `${100 - progress * 50}%`;
                        modalContent.style.transform = `translateX( ${-shiftContetn * progress}px )`;
                    },
                    duration: time
                });
            }
        },

        hide: (time = 300) => {

            if (time === 0) {
                modalContent.style.left = ``;
                modalContent.style.transform = ``;
                modal.style.transform = '';

            } else {
                animate({
                    draw(progress) {
                        if (progress === 1) {
                            modal.style.opacity = '';
                            modalContent.style.left = ``;
                            modalContent.style.transform = ``;
                            modal.style.transform = ''
                        } else modal.style.opacity = `${1 - progress}`;
                    },
                    duration: time
                });
            }
        }
    }
    if (modal && modalContent) actions[states](time)
}
