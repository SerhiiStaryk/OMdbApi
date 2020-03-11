'use strict';

let s = document.querySelector('.form-control');
let btnGet = document.querySelector('.btn-search');
let content = document.querySelector('.content');


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
                        <button class="more btn btn-info">more detais</button></img>
                        </div>`;
    }
    let btnInfo = document.querySelector('.btn-info');
    btnInfo.onclick = function () {
       console.log();
       
    }
}


function getInfo() {

}

btnGet.onclick = function (e) {
    e.preventDefault();
    getData()
}