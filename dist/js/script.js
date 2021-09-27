/* Задания:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */



 /* Задания:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */



'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const movieDB = { 
        movies: [
            "Логан777",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };
    
    
    
const adv = document.querySelectorAll('.promo__adv img'),
          ganre = document.querySelector('.promo__genre'),
          bg = document.querySelector('.promo__bg'),
          filmList = document.querySelector('.promo__interactive-list'),
          addForm = document.querySelector('.add'),
          addInput = addForm.querySelector('.adding__input'),
          checkbox = addForm.querySelector('[type="checkbox"]'),
          filmAddTitle = document.querySelector('.promo__interactive span');

addForm.addEventListener('submit', (event) => {
    event.preventDefault();//ajax, dont reload

    let newFilm = addInput.value;
    const favorite = checkbox.checked;

    if(newFilm) {

        if(newFilm.length > 20) {
            newFilm = `${newFilm.substring(0, 22)}...`  ; 
            movieDB.movies.push(newFilm);
            sortArray(movieDB.movies);
            createMovieList(movieDB.movies, filmList); 
            addForm.reset(); 
        } else {
            movieDB.movies.push(newFilm);
            sortArray(movieDB.movies);
            createMovieList(movieDB.movies, filmList); 
            addForm.reset();
            }
            if (favorite) {
                console.log('Favorite')
            }
        
    } else {
        filmAddTitle.innerHTML = `НАЗВАНИЕ НЕ МОЖЕТ БЫТЬ ПУСТОЙ СТРОКОЙ <br> ВВЕДИТЕ НАЗВАНИЕ ` //functionality for null
    }

})
    
const makeChanges = () => {
    ganre.innerText ='ДРАМА';
    
    bg.style.backgroundImage = 'url("../img/bg.jpg")';
}   
   
const delAdv = (array) => {array.forEach((item) => item.remove())};

const sortArray = (array) => {
    array.sort();
}

    
function createMovieList(films, parent) {
        parent.innerHTML = '';

        films.forEach((film, item) => {
                    parent.innerHTML += `
                    <li class="promo__interactive-item">${item + 1}. ${film}
                    <div class="delete"></div>
                    </li>` ;
});

        document.querySelectorAll('.delete').forEach((btn, item) => {
                btn.addEventListener('click', () => {
                    btn.parentElement.remove();
                    movieDB.movies.splice(item, 1);
                    createMovieList(films, parent); 
                    sortArray(films);

                })
            })
}







delAdv(adv);  //deliting spam adv
makeChanges();  
createMovieList(movieDB.movies, filmList); 



});


