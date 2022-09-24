/* Imports */
import './css/styles.css'
import Destination from './destination'
import { getDestinationData } from './apiCalls'
import Traveler from './traveler'
import { getTravelerData } from './apiCalls'
import Trip from './trip'
import { getTripData } from './apiCalls'

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'

/* Query Selectors */

/* Instances */
let destinationData, travelerData, tripData

/* Functions*/

/* apiCalls */
const loadAPIData = () => {
    return Promise.all([getDestinationData(), getTravelerData(), getTripData()])
    .then(responses => {
        destinationData = responses[0].destinations.map(destination => new Destination(destination))
        console.log(destinationData)

        travelerData = responses[0].travelers.map(traveler => new Traveler(traveler))
        console.log(travelerData)
        
        tripData = responses[0].trips.map(trip => new Trip(trip))
        console.log(tripData)
    })
}

/* Event Listeners */
window.addEventListener('load', loadAPIData)