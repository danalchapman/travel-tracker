/* Imports */
import './css/styles.css'
import Traveler from './traveler'
import Trip from './trip'
import { getDestinationData, getSingleTravelerData, getTripData, postNewTrip } from './apiCalls'

/* Query Selectors */
const loginUsername = document.querySelector('#user-name')
const loginPassword = document.querySelector('#user-password')
const submitLoginButton = document.querySelector('#user-submit')
const navGreeting = document.querySelector('#nav-greeting-name')
const pastTrips = document.querySelector('#past-trips')
const pendingTrips = document.querySelector('#pending-trips')
const upcomingTrips = document.querySelector('#upcoming-trips')
const yearlyTotal = document.querySelector('#yearly-total')
const newTripDate = document.querySelector('#trip-date-input')
const newTripTravelers = document.querySelector('#trip-travelers-input')
const newTripDuration = document.querySelector('#trip-duration-input')
const newTripDestination = document.querySelector('#trip-destination-input')
const newTripTotal = document.querySelector('#new-trip-total')
const submitNewTripButton = document.querySelector('#new-trip-submit')
const loginPage = document.querySelector('#login')
const mainPageNav = document.querySelector('#nav-main')
const mainPageMain = document.querySelector('#main')
const loginPageError = document.querySelector('#user-error')

/* Instances */
let destinationData, travelerData, tripData
let travelerID 

/* apiCalls */
const loadAPIData = () => {
    return Promise.all([getDestinationData(), getSingleTravelerData(travelerID), getTripData()])
    .then(responses => {
        destinationData = responses[0].destinations

        if (responses[1].status === 404) {
            loginPageError.innerHTML = 'Your username or password does not match our systems records, please check your information is correct.'
        } else {
            travelerData = new Traveler(responses[1])
            loginPageError.innerHTML = ''
        }
        
        tripData = responses[2].trips
            .filter(trip => trip.userID === travelerID)
            .map(trip => new Trip(trip))
        tripData.forEach(trip => trip.storeDestination(destinationData))
    })
    .then(() => {
        displayTravelerGreeting()
        displayTrips()
        displayYearlyTripTotal()
        generateDestinationDropdown()
        hideLoginShowMain()
    })
}

/* Functions */ 
function onLogin(e) {
    e.preventDefault()
    if (loginUsername.value.includes('traveler') && loginPassword.value === 'travel') {
        travelerID = parseInt(loginUsername.value.split('traveler')[1])
        loadAPIData()
    } 
}

function checkSubmitLoginEligibility() {
    if (loginUsername.value && loginPassword.value) {
        submitLoginButton.disabled = false
        submitLoginButton.classList.remove('disable-login-button')
    } else {
        submitLoginButton.disabled = true
        submitLoginButton.classList.add('disable-login-button')
    }
}

function hideLoginShowMain() {
    loginPage.classList.add('hidden')
    mainPageNav.classList.remove('hidden')
    mainPageMain.classList.remove('hidden')
}

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
                    <p class="trip-travelers">Travelers: ${trip.travelers} Adult(s)</p>
                    <p class="trip-duration">Duration: ${trip.duration} Day(s)</p>
                </section>
            `
        }).join('')
    }
}

function displayTrips() {
    const sortedTrips = travelerData.sortTrips(tripData, '2020/12/31')
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

function createNewTrip() {
    const tripDate = newTripDate.value.replaceAll('-', '/')
    const tripTravelers = parseInt(newTripTravelers.value)
    const tripDuration = parseInt(newTripDuration.value)
    const tripDestination = parseInt(newTripDestination.value)
    return {
        id: Date.now(),
        userID: travelerID,
        destinationID: tripDestination,
        travelers: tripTravelers,
        date: tripDate,
        duration: tripDuration,
        status: 'pending',
        suggestedActivities: []
    }
}

function onSubmit(e) {
    e.preventDefault()
    const newTripInfo = createNewTrip()
    return Promise.all([postNewTrip(newTripInfo)])
    .then(response => {
        const newTrip = new Trip(response[0].newTrip)
        newTrip.storeDestination(destinationData)
        tripData.push(newTrip)
        displayTrips()
        newTripDate.value = ''
        newTripTravelers.value = ''
        newTripDuration.value = ''
        newTripDestination.value = '0'
        newTripTotal.innerText = '0.00'
        checkSubmitEligibility()
    })
}

function renderNewTripPrice() {
    const newTrip = new Trip(createNewTrip())
    newTrip.storeDestination(destinationData)
    if (newTrip.travelers && newTrip.duration && newTrip.destinationID) {
        newTripTotal.innerText = newTrip.calculateTripCost().toFixed(2)
    } else {
        newTripTotal.innerText = '0.00'
    }

    checkSubmitEligibility()
}

function checkSubmitEligibility() {
    if (newTripDate.value && newTripTravelers.value && newTripDuration.value && parseInt(newTripDestination.value)) {
        submitNewTripButton.disabled = false
        submitNewTripButton.classList.remove('disable-button')
    } else {
        submitNewTripButton.disabled = true
        submitNewTripButton.classList.add('disable-button')
    }
}

/* Event Listeners */
loginUsername.addEventListener('input', checkSubmitLoginEligibility)
loginPassword.addEventListener('input', checkSubmitLoginEligibility)
submitLoginButton.addEventListener('click', onLogin)
newTripDestination.addEventListener('change', renderNewTripPrice)
newTripDuration.addEventListener('input', renderNewTripPrice)
newTripTravelers.addEventListener('input', renderNewTripPrice)
submitNewTripButton.addEventListener('click', onSubmit)