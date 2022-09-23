export const getTripData = () => { // export each fetch
    return fetch('http://localhost:3001/api/v1/trips')
    .then(response => response.json())

}

