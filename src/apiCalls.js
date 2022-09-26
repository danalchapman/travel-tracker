/* GET Requests */
export const getDestinationData = () => {
    return fetch('http://localhost:3001/api/v1/destinations')
    .then(response => response.json())
}

export const getSingleTravelerData = (id) => {
    return fetch(`http://localhost:3001/api/v1/travelers/${id}`)
    .then(response => response.json())
}

export const getTripData = () => { 
    return fetch('http://localhost:3001/api/v1/trips')
    .then(response => response.json())
}

/* POST Requests */
export const postNewTrip = (data) => {
    return fetch('http://localhost:3001/api/v1/trips', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
}