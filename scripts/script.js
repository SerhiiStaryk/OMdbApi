'use strict';

let s = document.querySelector('.form-control');
let btnGet = document.querySelector('.btn-search');
let content = document.querySelector('.content');
let modalBody = document.querySelector('.modal-body')

let search;

function getData(param, query) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `http://www.omdbapi.com/?${param}=${query}&apikey=60b7262d`, false);
    xhr.send();
    const data = JSON.parse(xhr.responseText);
    return data;
}

btnGet.onclick = function (e) {
    e.preventDefault();
    content.innerHTML = '';
    search = getData('s', s.value).Search;
    for (let i = 0; i < search.length - 2; i++) {
        let box = document.createElement('div');
        content.appendChild(box);
        box.setAttribute('class', 'box');
        box.setAttribute('style', 'display:block');
        box.innerHTML = `<img src="${search[i].Poster}" alt="film-poster" class="poster">
                            <div class="content__text">
                                <div class="content__text-title">
                                    <h2 class="title">${search[i].Title}</h2>
                                </div>
                                <p class="type">${search[i].Type}</p>
                                <p class= "year">${search[i].Year}</p>
                                <button type="button" class="more btn btn-info" name=${search[i].imdbID} data-toggle="modal" data-target=".bd-modal-lg">more detais</button></img>
                            </div>`
    }

    let btnInfo = document.getElementsByClassName('btn-info');
    modalBody.innerHTML = '';
    for (let i = 0; i < btnInfo.length; i++) {
        btnInfo[i].onclick = function (e) {
            e.preventDefault();
            let infoFilm = getData('i', this.name);
            modalBody.innerHTML = `
            <div class="modal-poster"><img src="${infoFilm.Poster}" alt="poster"></div>
            <div class="modal-content-discription">
                <div class="modal-content-header"><h2 class="modal-content-header-title">${infoFilm.Title}</h2></div>
                <div class="d-flex justify-content-start"><p><span class="modal-rated">${infoFilm.Rated} </span><span class="modal-year">${infoFilm.Year} </span><span class="modal-genre">${infoFilm.Genre} </span></p></div>
                <p class="modal-plot">${infoFilm.Plot}</p>
                <p><strong>Written by: </strong><span class="modal-writter">${infoFilm.Plot}</span></p>
                <p><strong>Directed by: </strong><span class="modal-director">${infoFilm.Director}</span></p>
                <p><strong>Starring: </strong><span class="modal-actors">${infoFilm.Actors}</span></p>
                <p><strong>BoxOffice: </strong><span class="modal-box-office">${infoFilm.BoxOffice}</span></p>
                <p><strong>Awards: </strong><span class="modal-awards">${infoFilm.Awards}</span></p>
                <p class="modal-rating"><strong>Ratings: </strong></p>
                <ul class="modal-rating-list">${createRating(infoFilm.Ratings)}</ul>
            </div>`

            function createRating(ratings) {
                let result = [];
                ratings.forEach(element => {
                    result.push(`<li>${element.Source}: ${element.Value}</li>`);
                });
                return result.join('');
            }
        }
    }
}