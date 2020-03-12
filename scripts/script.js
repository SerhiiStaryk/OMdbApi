'use strict';

let s = document.querySelector('.form-control');
let btnGet = document.querySelector('.btn-search');
let content = document.querySelector('.content');

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
                            <button class="more btn btn-info" name=${search[i].imdbID}>more detais</button></img>
                            </div>`
    }

    let btnInfo = document.getElementsByClassName('btn-info');
    for (let i = 0; i < btnInfo.length; i++) {
        btnInfo[i].onclick = function (e) {
            e.preventDefault();
            console.log(getData('i', this.name));
            
        }
    }
}