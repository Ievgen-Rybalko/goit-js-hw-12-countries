function fetchCountries(name) {
    const url = `https://restcountries.eu/rest/v2/name/${name}`;

    return fetch(url)
        .then(responce => {
            if (responce.status === 200) { return responce.json(); }
            throw new Error('Error: data not delivered');
        });
   
}

export default { fetchCountries };