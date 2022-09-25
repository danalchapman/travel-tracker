/* Imports */
import './css/styles.css'
import Traveler from './traveler'
import Trip from './trip'
import { getDestinationData, getSingleTravelerData, getTripData, postNewTrip } from './apiCalls'

/* Query Selectors */
const navGreeting = document.querySelector('#nav-greeting-name')
const pastTrips = document.querySelector('#past-trips')
const pendingTrips = document.querySelector('#pending-trips')
const upcomingTrips = document.querySelector('#upcoming-trips')
const yearlyTotal = document.querySelector('#yearly-total')
const newTripDate = document.querySelector('#trip-date-input')
const newTripTravelers = document.querySelector('#trip-travelers-input')
const newTripDuration = document.querySelector('#trip-duration-input')
const newTripDestination = document.querySelector('#trip-destination-input')
const submitNewTripButton = document.querySelector('#new-trip-submit')
const newTripTotal = document.querySelector('#new-trip-total')

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
        generateDestinationDropdown()
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
                    <p class="trip-travelers">Travelers: ${trip.travelers} Adults</p>
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

function generateDestinationDropdown() {
    newTripDestination.innerHTML += destinationData.map(destination => {
        return `<option value="${destination.id}">${destination.destination}</option>`
    }).join('')
}

function onSubmit(e) {
    e.preventDefault()
    const tripDate = newTripDate.value.replaceAll('-', '/')
    const tripTravelers = parseInt(newTripTravelers.value)
    const tripDuration = parseInt(newTripDuration.value)
    const tripDestination = parseInt(newTripDestination.value)
    const newTripInfo = {
        id: Date.now(),
        userID: travelerID,
        destinationID: tripDestination,
        travelers: tripTravelers,
        date: tripDate,
        duration: tripDuration,
        status: "pending",
        suggestedActivities: []
    }
    return Promise.all([postNewTrip(newTripInfo)])
        .then(response => {
            const newTrip = new Trip(response[0].newTrip)
            newTrip.storeDestination(destinationData)
            tripData.push(newTrip)
            displayTrips()
            newTripDate.value = ''
            newTripTravelers.value = ''
            newTripDuration.value = ''
            newTripDestination.value = 'selectDestination'
            newTripTotal.innerText = '0.00'
        })
}

function renderNewTripPrice() {
    const tripTravelers = parseInt(newTripTravelers.value)
    const tripDuration = parseInt(newTripDuration.value)
    const tripDestination = parseInt(newTripDestination.value)
    const newDestination = destinationData.find(destination => {
        return destination.id === tripDestination
    })
    if (tripTravelers && tripDuration && newDestination) {
        const lodging = newDestination.estimatedLodgingCostPerDay * parseInt(newTripDuration.value)
        const flight = newDestination.estimatedFlightCostPerPerson * parseInt(newTripTravelers.value)
        newTripTotal.innerText = ((lodging + flight) * 1.1).toFixed(2)
    } else {
        newTripTotal.innerText = '0.00'
    }
}

/* Event Listeners */
window.addEventListener('load', loadAPIData)
submitNewTripButton.addEventListener('click', onSubmit)
newTripDestination.addEventListener('change', renderNewTripPrice)
newTripDuration.addEventListener('input', renderNewTripPrice)
newTripTravelers.addEventListener('input', renderNewTripPrice)