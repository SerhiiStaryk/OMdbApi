'use strict';

let s = document.querySelector('.form-control');
let btnGet = document.querySelector('.btn-search');
let content = document.querySelector('.content');
let modalBody = document.querySelector('.modal-body')

let search;

/* asynchronously and method fetch */

async function getData(param, query) {
    const response = await fetch(`http://www.omdbapi.com/?${param}=${query}&apikey=60b7262d`);
    if (response.ok) {
        const data = await response.json();
        return data;
    };
};

btnGet.onclick = function (e) {
    e.preventDefault();
    content.innerHTML = '';
    getData('s', s.value).then(data => {
        let search = data.Search
        search.forEach(element => {
            let box = document.createElement('div');
            content.appendChild(box);
            box.setAttribute('class', 'box');
            box.setAttribute('style', 'display:block');
            box.innerHTML = `<img src="${element.Poster}" alt="film-poster" class="poster">
                                    <div class="content__text">
                                        <div class="content__text-title">
                                            <h2 class="title">${element.Title}</h2>
                                        </div>
                                        <p class="type">${element.Type}</p>
                                        <p class= "year">${element.Year}</p>
                                        <button type="button" class="more btn btn-info" name=${element.imdbID} data-toggle="modal" data-target=".bd-modal-lg">more detais</button></img>
                                    </div>`;
        });
        let btnInfo = document.getElementsByClassName('btn-info');
        modalBody.innerHTML = '';
        Array.from(btnInfo).forEach(element => {
            element.onclick = function (e) {
                e.preventDefault();
                getData('i', this.name).then(data => {
                    modalBody.innerHTML = `
                    <div class="modal-poster">
                        <img src="${data.Poster}" alt="poster">
                    </div>
                    <div class="modal-content-discription">
                        <div class="modal-content-header">
                            <h2 class="modal-content-header-title">${data.Title}</h2>
                          </div>
                         <div class="d-flex justify-content-start">
                            <p><span class="modal-rated">${data.Rated} </span>
                            <span class="modal-year">${data.Year} </span>
                            <span class="modal-genre">${data.Genre} </span></p>
                        </div>
                        <p class="modal-plot">${data.Plot}</p>
                        <p><strong>Written by: </strong><span class="modal-writter">${data.Plot}</span></p>
                        <p><strong>Directed by: </strong><span class="modal-director">${data.Director}</span></p>
                        <p><strong>Starring: </strong><span class="modal-actors">${data.Actors}</span></p>
                        <p><strong>BoxOffice: </strong><span class="modal-box-office">${data.BoxOffice}</span></p>
                        <p><strong>Awards: </strong><span class="modal-awards">${data.Awards}</span></p>
                        <p class="modal-rating"><strong>Ratings: </strong></p>
                        <ul class="modal-rating-list">${createRating(data.Ratings)}</ul>
                    </div>`;

                    function createRating(ratings) {
                        let result = [];
                        ratings.forEach(element => {
                            result.push(`<li>${element.Source}: ${element.Value}</li>`);
                        });
                        return result.join('');
                    };
                });
            };
        });
    });
};


/* synchronously */

// function getData(param, query) {
//     const xhr = new XMLHttpRequest();
//     xhr.open('GET', `http://www.omdbapi.com/?${param}=${query}&apikey=60b7262d`, false);
//     xhr.send();
//     const data = JSON.parse(xhr.responseText);
//     return data;
// }

// btnGet.onclick = function (e) {
//     e.preventDefault();
//     content.innerHTML = '';
//     search = getData('s', s.value).Search;

//     search.forEach(element => {
//         let box = document.createElement('div');
//         content.appendChild(box);
//         box.setAttribute('class', 'box');
//         box.setAttribute('style', 'display:block');
//         box.innerHTML = `<img src="${element.Poster}" alt="film-poster" class="poster">
//                             <div class="content__text">
//                                 <div class="content__text-title">
//                                     <h2 class="title">${element.Title}</h2>
//                                 </div>
//                                 <p class="type">${element.Type}</p>
//                                 <p class= "year">${element.Year}</p>
//                                 <button type="button" class="more btn btn-info" name=${element.imdbID} data-toggle="modal" data-target=".bd-modal-lg">more detais</button></img>
//                             </div>`;
//     });

//     let btnInfo = document.getElementsByClassName('btn-info');
//     modalBody.innerHTML = '';
//     Array.from(btnInfo).forEach(element => {
//         element.onclick = function (e) {
//             e.preventDefault();
//             let infoFilm = getData('i', this.name);
//             modalBody.innerHTML = `
//             <div class="modal-poster"><img src="${infoFilm.Poster}" alt="poster"></div>
//             <div class="modal-content-discription">
//                 <div class="modal-content-header"><h2 class="modal-content-header-title">${infoFilm.Title}</h2></div>
//                 <div class="d-flex justify-content-start"><p><span class="modal-rated">${infoFilm.Rated} </span><span class="modal-year">${infoFilm.Year} </span><span class="modal-genre">${infoFilm.Genre} </span></p></div>
//                 <p class="modal-plot">${infoFilm.Plot}</p>
//                 <p><strong>Written by: </strong><span class="modal-writter">${infoFilm.Plot}</span></p>
//                 <p><strong>Directed by: </strong><span class="modal-director">${infoFilm.Director}</span></p>
//                 <p><strong>Starring: </strong><span class="modal-actors">${infoFilm.Actors}</span></p>
//                 <p><strong>BoxOffice: </strong><span class="modal-box-office">${infoFilm.BoxOffice}</span></p>
//                 <p><strong>Awards: </strong><span class="modal-awards">${infoFilm.Awards}</span></p>
//                 <p class="modal-rating"><strong>Ratings: </strong></p>
//                 <ul class="modal-rating-list">${createRating(infoFilm.Ratings)}</ul>
//             </div>`;

//             function createRating(ratings) {
//                 let result = [];
//                 ratings.forEach(element => {
//                     result.push(`<li>${element.Source}: ${element.Value}</li>`);
//                 });
//                 return result.join('');
//             };
//         };
//     });
// };