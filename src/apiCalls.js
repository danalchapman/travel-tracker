/* GET Requests */
export const getDestinationData = () => {
    return fetch('http://localhost:3001/api/v1/destinations')
    .then(response => response.json())
    .then(data => data)
    .catch(error => console.log(error))
}

export const getSingleTravelerData = (id) => {
    return fetch(`http://localhost:3001/api/v1/travelers/${id}`)
    .then(response => {
        if (!response.ok) {
            return {status: response.status}
        } else {
            return response.json()
        }
    })
    .catch(err => console.error(err))
}

export const getTripData = () => { 
    return fetch('http://localhost:3001/api/v1/trips')
    .then(response => response.json())
    .then(data => data)
    .catch(error => console.log(error))
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
    .then(data => data)
    .catch(error => console.log(error))
}