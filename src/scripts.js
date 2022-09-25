/* Imports */
import './css/styles.css'
import Traveler from './traveler'
import Trip from './trip'
import { getDestinationData, getSingleTravelerData, getTripData } from './apiCalls'

/* Query Selectors */
const navGreeting = document.querySelector('#nav-greeting-name')
const pastTrips = document.querySelector('#past-trips')
const pendingTrips = document.querySelector('#pending-trips')
const upcomingTrips = document.querySelector('#upcoming-trips')
const yearlyTotal = document.querySelector('#yearly-total')

/* Event Listeners */


/* Instances */
let destinationData, travelerData, tripData
const travelerID = 3 // need to convert when get to iteration 4 (log in page)

/* apiCalls */
const loadAPIData = () => {
    return Promise.all([getDestinationData(), getSingleTravelerData(travelerID), getTripData()])
    .then(responses => {
        destinationData = responses[0].destinations
        
        travelerData = new Traveler(responses[1])
        
        tripData = responses[2].trips
            .filter(trip => trip.userID === travelerID)
            .map(trip => new Trip(trip))
        tripData.forEach(trip => trip.storeDestination(destinationData))
    })
    .then(() => {
        displayTravelerGreeting()
        displayYearlyTripTotal()
        displayTrips()
    })
}

/* Functions */ // when convert to ES6/arrow functions, function must be declared before invocation
function displayTravelerGreeting() {
    navGreeting.innerHTML = `Hello, ${travelerData.returnFirstName()}!`
}

function handleTrips(card, trips) {
    if (!trips.length) {
        card.innerHTML = 'No trips found!'
    } else {
        card.innerHTML = trips.map(trip => {
            return `
                <section class="info-card">
                    <p class="trip-destination">Destination: ${trip.destination.name}</p>
                    <p class="trip-date">Date: ${trip.date}</p>
                    <p class="trip-duration">Duration: ${trip.duration} days</p>
                </section>
            `
        }).join('')
    }
}

function displayTrips() {
    const sortedTrips = travelerData.sortTrips(tripData, "2020/12/31")
    handleTrips(pastTrips, sortedTrips.past)
    handleTrips(pendingTrips, sortedTrips.pending)
    handleTrips(upcomingTrips, sortedTrips.upcoming)
}

function displayYearlyTripTotal() {
    yearlyTotal.innerHTML = `Total Spent This Year: $${travelerData.returnYearlyTripCost(tripData, 2020)}`
}

/* Event Listener (on Load) */
window.addEventListener('load', loadAPIData)