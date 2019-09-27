// const useFetch = (url, selector) => {
//     fetch(url)
//         .then(response => response.json) //end
//         /*
//         process through the response
//         1. log the data
//         2. iterate through the data
//         */
//         .then(data => {
//             console.log
//         }) //end
// }

fetch('https://pokeapi.co/api/v2/pokemon/681')
    .then(res => res.json())
    .then(data => {
        const {
            ...img
        } = data.sprites;
        console.log(img.front_shiny)
        var pic = `<img scr=${img.front_shiny} alt>`;
        document.getElementById('poke').innerHTML = pic;
    });