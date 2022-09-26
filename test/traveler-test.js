import { expect } from 'chai'
import Traveler from '../src/traveler'
import Trip from '../src/trip'
import { tripData } from './mock-data/trip-data'
import { destinationData } from './mock-data/destination-data'

describe('Traveler', () => {
    let traveler1, trips

    beforeEach(() => {
        traveler1 = new Traveler({
            id: 1,
            name: 'Ham Leadbeater',
            travelerType: 'relaxer'
        })

        trips = tripData.map(trip => new Trip(trip))
        trips.forEach(trip => trip.storeDestination(destinationData))
    })

    it('should be a function', () => {
        expect(Traveler).to.be.a('function')
    })

    it('should be an instance of traveler', () => {
        expect(traveler1).to.be.an.instanceOf(Traveler)
    })

    it('should be able to store a travelers is', () => {
        expect(traveler1.id).to.equal(1)
    })

    it('should be able to store a travelers full name', () => {
        expect(traveler1.name).to.equal('Ham Leadbeater')
    })

    it('should be able to store a travelers type', () => {
        expect(traveler1.travelerType).to.equal('relaxer')
    })

    it('should be able to return the travelers first name', () => {
        const firstName = traveler1.returnFirstName()
        expect(firstName).to.equal('Ham')
    })

    it('should be able to return the yearly trips cost for a traveler with a travel agent fee of 10%', () => {
        const yearlyTripsCost = traveler1.returnYearlyTripCost(trips, 2022)
        expect(yearlyTripsCost).to.equal('7326.00')
    })

    it('should be able to return sorted trips for a traveler', () => {
        const sortedTrips = traveler1.sortTrips(trips, '2022/06/06')
        console.log(sortedTrips.upcoming)
        expect(sortedTrips.past).to.deep.equal([
            {
              id: 3,
              userID: 1,
              destinationID: 3,
              travelers: 4,
              date: '2021/05/22',
              duration: 17,
              status: 'approved',
              suggestedActivities: [],
              destination: {
                id: 3,
                name: 'Sydney, Austrailia',
                lodgingCost: 130,
                flightCost: 950,
                image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
                alt: 'opera house and city buildings on the water with boats'
              }
            }
          ])
        expect(sortedTrips.pending).to.deep.equal([])
        // expect(sortedTrips.upcoming).to.deep.equal([])
    })
})