function fetchCountries(searchQuery) {
    const url = `https://restcountries.eu/rest/v2/name/${searchQuery}`;

    return fetch(url)
        .then(resolve => { return resolve.json() })
  //{}
        .catch(error => {
            console.log('Error occurred:', error)
        });
}

export default { fetchCountries };