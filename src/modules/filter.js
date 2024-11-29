export const resetSifter = () => {
    const sifter = document.querySelectorAll('.sifter .property .value')

    sifter.forEach(el => el.selectedIndex = 0)
}
export const setSifter = () => {
    const sifter = document.querySelectorAll('.sifter .property .value')
    const filter = document.querySelector('.app').hmuFilter.filter

    sifter.forEach(el => filter[el.id] = el.value)
}

const filter = (elMenu) => {
    const app = document.querySelector('.app')

    const filterTitle = (title, more = '') => {
        const dict = {
            'ALL': 'All Heroes',
            'hero': 'Hero card: ',
            'film': 'Heroes movie: '
        }
        let textFilters = ''
        for (let key in app.hmuFilter.filter) {
            const value = app.hmuFilter.filter[key]
            textFilters += value ? `, ${key}=${value}` : ''
        }

        app.hmuFilter.title.innerHTML = `${dict[title]}`
            + (more ? `<span class="more">${more}</span>` : ``)
            + (textFilters ? `<span class="text-filter"> (filters: ${textFilters.slice(2)})</span>` : ``)
    }

    if (!elMenu) {
        app.hmuFilter = {
            toggler: 'hero',
            hero: document.querySelector('.nav-movie-slide.hero.active'),
            film: document.querySelector('.nav-movie-slide.film.active'),
            navbarAll: [...document.querySelectorAll('.nav-movie-slide')],
            heroesAll: [...document.querySelectorAll('.heroes')],
            title: document.querySelector('.title'),
            filter: {
                citizenship: '',
                gender: '',
                species: '',
                status: ''
            }
        }
        app.hmuFilter.navbar = [...app.hmuFilter.navbarAll]
        app.hmuFilter.heroes = [...app.hmuFilter.heroesAll]

        filterTitle('ALL')
        return
    }

    const setFilter = elMenu.classList.contains('sifter-apply')
    let toggler = setFilter ? app.hmuFilter.toggler : elMenu.classList.contains('film') ? 'film' : 'hero'
    const elNot = document.querySelector('.screen .not-dbload')
    if (setFilter) elNot.innerHTML = ''
    if (toggler === app.hmuFilter.toggler && elMenu === app.hmuFilter[toggler]) return

    const selectMenuLine = (t, el) => {
        if (app.hmuFilter[t]) app.hmuFilter[t].classList.remove('active')
        if (el) el.classList.add('active')
        app.hmuFilter[t] = el
    }

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

    if (setFilter) {

        // проверка карточи на соответствие фильтру
        const isApply = (card) => {
            const apply = app.hmuFilter.filter
            const description = [...card.querySelectorAll('.heroes-description')]
                .filter(el => el.children.length === 2)
                .reduce((o, el) => { o[el.children[0].textContent] = el.children[1].textContent; return o }, {})

            let is = true
            for (let key in apply) {
                if (apply[key] && !((key in description) && apply[key] === description[key])) {
                    is = false
                    break
                }
            }
            return is
        }

        // сепоратор карточек
        const sifterCard = () => {
            app.hmuFilter.heroesAll.forEach(card => {
                card.classList.remove('hide', 'only-one', 'filter')

                if (isApply(card)) {
                    app.hmuFilter.heroes.push(card)
                    listHero[card.querySelector('.name').textContent] = true;
                    [...card.querySelectorAll('.movie')].forEach(el => listFilm[el.textContent.slice(2)] = true)
                } else {
                    card.classList.add('hide', 'filter')
                }
            })
        }

        // сепоратор меню
        const sifterMenu = () => {
            app.hmuFilter.navbarAll.forEach(menuLine => {
                const typeLine = menuLine.classList.contains('film') ? 'film' : menuLine.textContent === 'ALL' ? 'ALL' : 'hero'

                let newLine = false
                menuLine.classList.remove('hide', 'filter')
                if (typeLine === 'film') {
                    newLine = menuLine.textContent in listFilm
                    if (newLine && (!newFilm || menuLine === app.hmuFilter.film)) newFilm = menuLine

                } else {
                    newLine = typeLine === 'ALL' || menuLine.textContent in listHero
                    if (newLine && (!newHero || menuLine === app.hmuFilter.hero)) newHero = menuLine
                }
                if (newLine) {
                    if (typeLine !== toggler && !(typeLine === 'ALL' && toggler === 'hero')) menuLine.classList.add('hide')
                    app.hmuFilter.navbar.push(menuLine)
                } else menuLine.classList.add('hide', 'filter')

            })
        }

        app.hmuFilter.heroes.length = 0
        app.hmuFilter.navbar.length = 0
        let newHero, newFilm, listHero = {}, listFilm = {}
        sifterCard()
        sifterMenu()
        selectMenuLine('hero', newHero)
        selectMenuLine('film', newFilm)
        if (!newFilm) {
            elNot.innerHTML = '<h2>Data is not found</h2><h4>No heroes matching the specified conditions were found</h4>';
            toggler = 'hero'
        }

    } else {

        if (toggler === app.hmuFilter.toggler) {
            selectMenuLine(toggler, elMenu)
        } else {
            app.hmuFilter.navbar.forEach(menuLine =>
                menuLine.classList.contains(toggler) ?
                    menuLine.classList.remove('hide')
                    : menuLine.classList.add('hide')
            )
            app.hmuFilter.toggler = toggler
        }
    }

    if (toggler === 'film') {
        if (app.hmuFilter.film) filterFilm(app.hmuFilter.film.textContent)
    } else if (app.hmuFilter.hero) {
        if (app.hmuFilter.hero.textContent === 'ALL') filterAll()
        else filterHero(app.hmuFilter.hero.textContent)
    }

    app.sliders.screen()
    app.sliders.nav()

}
export default filter