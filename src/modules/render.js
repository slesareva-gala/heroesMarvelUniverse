const render = (dbHeroes) => {

    const characters = document.querySelector('.slider-wrapper')
    const menu = document.querySelector('.nav-movie-wrapper')

    // формирование карточки героя
    const cardHero = (hero) => {
        let name = hero.name
        let realName = ('realName' in hero && hero.realName !== name) ? hero.realName : ''

        let htmlHero = `
              <div class="heroes swiper-slide">
                <h3 class="name" >${name}</h3>                        
                  <span class="real-name">${realName}</span>
                  <div class="info">
                     <img src="${'photo' in hero ? hero.photo : ''}" alt="no photo" class="image" />                  
                     <div class="more">`
        for (let key in hero) {
            if (!'name,realName,photo,movies'.includes(key)) {
                let txt = key === 'birthDay' ? 'birthday' :
                    key === 'deathDay' ? 'death day' : key;
                htmlHero += `
                      <div class="heroes-description">
                        <span class="property">${txt}</span>
                        <span class="value">${hero[key]}</span>
                      </div>`;
            }
        }
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

    const moviesList = {};
    let films = []

    let htmlCharacters = ``;
    let htmlMenu = menuLine('hero active', 'ALL')

    dbHeroes.forEach(hero => {
        // формируем карточку героя
        htmlCharacters += cardHero(hero);
        // формируем меню героев
        htmlMenu += menuLine('hero', hero.name)
    });

    // формируем меню фильмов
    for (let name in moviesList) { films.push(name); }
    films.sort().forEach((name, i) => htmlMenu += menuLine(`film hide${i ? '' : ' active'}`, name))

    if (!films.length) throw new Error('не получен список фильмов')
    document.querySelector('.navbar-toggler-icon svg').style.display = 'block'

    // записываем в верстку карточки героя   
    characters.innerHTML = htmlCharacters
    // записываем перечень меню  
    menu.innerHTML = htmlMenu

}
export default render