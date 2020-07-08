'use strict';
const apiKey = '4sSwUQBu4TQGaFhZaLgc89TGyM43uCtzh8g0OorH';
const searchUrl = 'https://developer.nps.gov/api/v1/parks'

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}

function displayResults(responseJson) {
    console.log(responseJson);
    $('#results-list').empty();
    for (let i = 0; i < responseJson.data.length; i++) {
        $('#resultslist').append(
            `<li><h3>${responseJson.data[i].fullName}</h3>
         <p>${responseJson.data[i].description}</p>
         <a src='${responseJson.data[i].url}'></li> `
        )
    };
    $('.results').removeClass('hidden');
};

function getParks(query, maxResults = 50) {
    const params = {
        key: apiKey,
        q: query,
        part: data,
        maxResults,
    };
    const queryString = formatQueryParams(params)
    const url = searchUrl + '?' + queryString;

    console.log(url);

    fetch(url)
        .then(response => {
            if (resposnse.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        .catch(err => {
            $('.error-message').text(`something went wrong ${err.message}`);
        });
}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const searchTerm = $('#js-parkArea').val();
        const maxResults = $('#js-maxResults').val();
        getParks(searchTerm, maxResults);
    });
}
$(watchForm);