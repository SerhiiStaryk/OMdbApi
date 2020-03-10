'use strict';

let s = document.querySelector('#input-field');
let btn = document.querySelector('#btn-search');
let content = document.querySelector('.container');


let search;

function getData() {
    content.innerHTML = '';
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `http://www.omdbapi.com/?s=${s.value}&apikey=60b7262d`, false);
    xhr.send();
    const data = JSON.parse(xhr.responseText);
    search = data.Search;
    console.log(search)
    debugger;
    search.forEach(element => {
        let box = document.createElement('div');
        content.appendChild(box);
        box.setAttribute('class', 'box');
        box.innerHTML = `<img src="${element.Poster}" alt="film-poster">
                         <h2 class="title">${element.Title}</h2>
                         <p class="type">${element.Type}</p>
                         <p class= "year">${element.Year}</p>
                         <button class="more">more detais</button></img>`;
    });
}

btn.onclick = function () {
    getData()
}