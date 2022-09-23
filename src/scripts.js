/* Imports */
import './css/styles.css'
import Trip from './trip'
import {getTripData} from './apiCalls'

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'

/* Query Selectors */

/* Instances */
let tripData

/* Functions*/

/* apiCalls */
const loadAPIData = () => {
    return Promise.all([getTripData()])
    .then(responses => {
        tripData = responses[0].trips.map(trip => new Trip(trip))
        console.log(tripData)
    })
}

/* Event Listeners */
window.addEventListener('load', loadAPIData)