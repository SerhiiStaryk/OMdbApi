'use strict';

let search;

function getData() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://www.omdbapi.com/?s=batman&apikey=60b7262d', false);
    xhr.send();
    const data = JSON.parse(xhr.responseText);
    search = data.Search;
    console.log(search)
    search.forEach(element => {
        let title = element.Title;
        let year = element.Year;
        let type = element.Type;
        let imgSrc = element.Poster;
    });
}

getData()