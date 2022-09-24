export const getDestinationData = () => {
    return fetch('http://localhost:3001/api/v1/destinations')
    .then(response => response.json())
}

export const getTravelerData = () => {
    return fetch('http://localhost:3001/api/v1/travelers')
    .then(response => response.json())
}

// export const getSingleTravelerData = (id) => {
//     return fetch(`http://localhost:3001/api/v1/travelers/${id}`)
//     .then(response => response.json())
// }

export const getTripData = () => { // export each fetch
    return fetch('http://localhost:3001/api/v1/trips')
    .then(response => response.json())
}