const filter = (elMenu) => {
    const app = document.querySelector('.app')

    const filterTitle = (title, more = '') => {
        const dict = {
            'ALL': 'All Heroes',
            'hero': 'Hero card: ',
            'film': 'Heroes movie: '
        }
        app.hmuFilter.title.innerHTML = `${dict[title]}`
            + (more ? `<span class="more">${more}</span>` : ``)
    }

    if (!elMenu) {
        app.hmuFilter = {
            toggler: 'hero',
            hero: document.querySelector('.nav-movie-slide.hero.active'),
            film: document.querySelector('.nav-movie-slide.film.active'),
            navbar: [...document.querySelectorAll('.nav-movie-slide')],
            heroes: [...document.querySelectorAll('.heroes')],
            title: document.querySelector('.title')
        }
        filterTitle('ALL')
        return
    }

    const toggler = elMenu.classList.contains('film') ? 'film' : 'hero'
    if (toggler === app.hmuFilter.toggler && elMenu === app.hmuFilter[toggler]) return

    const filterAll = () => {
        app.hmuFilter.heroes.forEach(card => {
            card.classList.remove('hide', 'only-one')
        })
        filterTitle('ALL')
    }

    const filterHero = (name) => {
        app.hmuFilter.heroes.forEach(card => {
            const action = card.querySelector('.name').textContent === name ? 'remove' : 'add'
            const act_one = action === 'add' ? 'remove' : 'add'

            card.classList[action]('hide')
            card.classList[act_one]('only-one')
        })
        filterTitle('hero', name)
    }

    const filterFilm = (name) => {
        app.hmuFilter.heroes.forEach(card => {
            const action = [...card.querySelectorAll('.movie')].some(el => el.textContent.slice(2) === name) ? 'remove' : 'add'
            card.classList[action]('hide')
            card.classList[action]('only-one')
        })
        filterTitle('film', name)
    }

    if (toggler === app.hmuFilter.toggler) {
        app.hmuFilter[toggler].classList.remove('active')
        elMenu.classList.add('active')
        app.hmuFilter[toggler] = elMenu

    } else {
        app.hmuFilter.navbar.forEach(menuLine =>
            menuLine.classList.contains(toggler) ?
                menuLine.classList.remove('hide')
                : menuLine.classList.add('hide')
        )
        app.hmuFilter.toggler = toggler
    }

    if (toggler === 'film') filterFilm(app.hmuFilter.film.textContent)
    else if (app.hmuFilter.hero.textContent === 'ALL') filterAll()
    else filterHero(app.hmuFilter.hero.textContent)

    app.sliders.screen()
    app.sliders.nav()

}
export default filter