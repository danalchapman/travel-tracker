export const getTripData = () => {
    return fetch('http://localhost:3001/api/v1/trips')
    .then(response => response.json())

}

