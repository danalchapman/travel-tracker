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
const pastTripDestination = document.querySelector('#trip-destination-past')
const pastTripDate = document.querySelector('#trip-date-past')
const pastTripDuration = document.querySelector('#trip-duration-past')
const pastTripStatus = document.querySelector('#trip-status-past')
const pendingTripDestination = document.querySelector('#trip-destination-pending')
const pendingTripDate = document.querySelector('#trip-date-pending')
const pendingTripDuration = document.querySelector('#trip-duration-pending')
const pendingTripStatus = document.querySelector('#trip-status-pending')
const upcomingTripDestination = document.querySelector('#trip-destination-approved')
const upcomingTripDate = document.querySelector('#trip-date-approved')
const upcomingTripDuration = document.querySelector('#trip-duration-approved')
const upcomingTripStatus = document.querySelector('#trip-status-approved')
const yearlyTotal = document.querySelector('#yearly-total')

/* Instances */
let destinationData, travelerData, tripData
const travelerID = 2 // need to convert when get to iteration 4 (log in page)

/* apiCalls */
const loadAPIData = () => {
    return Promise.all([getDestinationData(), getSingleTravelerData(travelerID), getTripData()])
    .then(responses => {
        destinationData = responses[0].destinations
        console.log(destinationData)
        
        travelerData = new Traveler(responses[1])
        // console.log(travelerData)
        
        tripData = responses[2].trips
            .filter(trip => trip.userID === travelerID)
            .map(trip => new Trip(trip))
        tripData.forEach(trip => trip.storeDestinations(destinationData))
        console.log("Promise:", tripData)
    })
    .then(() => {
        displayTravelerGreeting()
        displayYearlyTripTotal()
    })
}

/* Functions */ // when convert to ES6/arrow functions, function must be declared before invocation
// Iteration 1 - Dashboard
function displayTravelerGreeting() {
    navGreeting.innerHTML = `Hello, ${travelerData.returnFirstName()}!`
}

function displayAllTrips() {
    
}

function displayYearlyTripTotal() {
    yearlyTotal.innerHTML = `Total Spent This Year: $${travelerData.returnYearlyTripCost(tripData, 2020)}`
    console.log(tripData)
}

// Iteration 2 - Interaction

// Iteration 4 - Login

/* Event Listeners */
window.addEventListener('load', loadAPIData)