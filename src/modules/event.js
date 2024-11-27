import filter from "./filter";

const event = (maxMediaMenu) => {
    const app = document.querySelector('.app')

    const els = {
        '.heroes-button': (t) => {
            const itsInfo = t.classList.contains('its-info') ? '' : '1'

            t.classList.toggle('its-info')
            t.parentNode.querySelector('.more').style.opacity = itsInfo
        },
        '.navbar-toggler-icon svg': () => {
            app.classList.toggle('menu-open')
        },
        '.filter-toggler': (t) => {
            t.classList.toggle('film')
            filter(t)
            if (window.screen.width < maxMediaMenu + 1) app.classList.remove('menu-open')
        },
        '.nav-movie-slide': (t) => {
            filter(t)
            if (window.screen.width < maxMediaMenu + 1) app.classList.remove('menu-open')
        }
    }

    document.querySelector('.app').addEventListener('click', (e) => {
        for (let key in els) {
            if (e.target.closest(key)) {
                els[key](e.target)
                break
            }
        }
    })
}
export default event