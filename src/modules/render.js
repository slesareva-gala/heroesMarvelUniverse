const render = (dbHeroes) => {

    const characters = document.querySelector('.slider-wrapper')
    const menu = document.querySelector('.nav-movie-wrapper')
    const sifter = [...document.querySelectorAll('.sifter .property .value')]

    // формирование карточки героя
    const cardHero = (hero) => {
        const name = hero.name
        const realName = ('realName' in hero && hero.realName !== name) ? hero.realName : ''
        const indexMore = Object.keys(hero)
            .filter(prop => !'name,realName,photo,movies'.includes(prop))
            .map(prop => [prop, prop === 'birthDay' ? 'birthday' : prop === 'deathDay' ? 'death day' : prop])
            .sort((a, b) => a[1] > b[1] ? 1 : -1)

        let htmlHero = `
              <div class="heroes swiper-slide">
                <h3 class="name" >${name}</h3>                        
                  <span class="real-name">${realName}</span>
                  <div class="info">
                     <img src="${'photo' in hero ? hero.photo : ''}" alt="no photo" class="image" />                  
                     <div class="more">`
        indexMore.forEach(props =>
            htmlHero += `
                        <div class="heroes-description">
                          <span class="property">${props[1]}</span>
                          <span class="value">${hero[props[0]].trim().toLowerCase()}</span>
                        </div>`)
        if ('movies' in hero) {
            htmlHero += `
                  <span class="heroes-movies">movies with this hero</span>
                  <div class="heroes-description">
                    <div class="movies">`;
            hero.movies.sort().forEach((name) => {
                htmlHero += `
                      <span class="movie">-&nbsp;${name}</span>`;
                moviesList[name] = name;
            });
            htmlHero += `
                    </div>
                  </div> `;
        }
        htmlHero += `
                     </div>
                  </div>
                  <div class="heroes-button"></div> `;
        return htmlHero + `</div>`;
    };

    const menuLine = (type, content) => `<span class="nav-movie-slide swiper-slide ${type}">${content}</span>`
    const propertyLine = (value) => `<option value='${value}'${!value ? ' selected' : ''}>${value ? value : 'not selected'}</option>`
    const propertyHTML = (oValues) => Object.keys(oValues).sort().reduce((html, v) => html += propertyLine(v), propertyLine(''))

    let moviesList = {};

    let htmlCharacters = ``;
    let htmlMenu = menuLine('hero active', 'ALL')
    const htmlsSifter = {
        citizenship: {},
        gender: {},
        species: {},
        status: {}
    }

    dbHeroes.forEach(hero => {
        // формируем карточку героя
        htmlCharacters += cardHero(hero);
        // формируем меню героев
        htmlMenu += menuLine('hero', hero.name)
        // собираем информацию для фильтров
        for (let name in hero) { if (name in htmlsSifter) htmlsSifter[name][hero[name].trim().toLowerCase()] = true }
    });

    // формируем меню фильмов
    moviesList = Object.keys(moviesList).sort()
    moviesList.forEach((name, i) => htmlMenu += menuLine(`film hide${i ? '' : ' active'}`, name))

    // формируем свойства фильтров
    for (let prop in htmlsSifter) { htmlsSifter[prop] = propertyHTML(htmlsSifter[prop]) }

    if (!moviesList.length) throw new Error('not data')
    document.querySelector('.navbar-toggler-icon svg').style.display = 'block'
    document.querySelector('.sifter-toggler-icon svg').style.display = 'block'

    // записываем в верстку карточки героя   
    characters.innerHTML = htmlCharacters
    // записываем перечень меню  
    menu.innerHTML = htmlMenu
    // записываем свойства фильтров
    for (let prop in htmlsSifter) {
        sifter.find(node => node.id === prop).innerHTML = htmlsSifter[prop]
    }

}
export default render