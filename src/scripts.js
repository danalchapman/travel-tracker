/* Imports */
import './css/styles.css'
import Destination from './destination'
import Traveler from './traveler'
import Trip from './trip'
import { getDestinationData, getSingleTravelerData, getTripData } from './apiCalls'

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'

/* Query Selectors */
const navGreeting = document.querySelector('#nav-greeting-name')

/* Instances */
let destinationData, travelerData, tripData
const travelerID = 2 // need to convert when get to iteration 4 (log in page)

/* apiCalls */
const loadAPIData = () => {
    return Promise.all([getDestinationData(), getSingleTravelerData(travelerID), getTripData()])
    .then(responses => {
        destinationData = responses[0].destinations.map(destination => new Destination(destination))
        // console.log(destinationData)
        
        travelerData = new Traveler(responses[1])
        // console.log(travelerData)
        
        tripData = responses[2].trips
            .filter(trip => trip.userID === travelerID)
            .map(trip => new Trip(trip))
        tripData.forEach(trip => trip.storeDestinations(destinationData))
        // console.log(tripData)
    })
    .then(() => {
        displayTravelerGreeting()
    })
}

/* Functions */ // when convert to ES6/arrow functions, function must be declared before invocation
// Iteration 1 - Dashboard
function displayTravelerGreeting() {
    navGreeting.innerHTML = `Hello, ${travelerData.returnFirstName()}!`
}

// displayAllTrips

// displayYearlyTripTotal(trips, year)

// Iteration 2 - Interaction

// Iteration 4 - Login

/* Event Listeners */
window.addEventListener('load', loadAPIData)