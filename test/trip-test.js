import { expect } from 'chai'
import Destination from '../src/destination'
import Trip from '../src/trip'
import { destinationData } from './mock-data/destination-data'
import { tripData } from './mock-data/trip-data'

describe('Trip', () => {
    let trip1

    beforeEach(() => {
        trip1 = new Trip(tripData[0])
    })

    it('should be a function', () => {
        expect(Trip).to.be.a('function')
    })

    it('should be an instance of trip', () => {
        expect(trip1).to.be.an.instanceOf(Trip)
    })

    it('should be able to store a trips id', () => {
        expect(trip1.id).to.equal(1)
    })

    it('should be able to store a trips userID', () => {
        expect(trip1.userID).to.equal(1)
    })

    it('should be able to store a trips destinationID', () => {
        expect(trip1.destinationID).to.equal(1)
    })

    it('should be able to store the amount of travelers', () => {
        expect(trip1.travelers).to.equal(1)
    })

    it('should be able to store a trips start date', () => {
        expect(trip1.date).to.equal('2022/09/16')
    })

    it('should be able to store a trips duration in number of days', () => {
        expect(trip1.duration).to.equal(8)
    })

    it('should be able to store a trips status', () => {
        expect(trip1.status).to.equal('approved')
    })

    it('should be able to store a trips suggested activities', () => {
        expect(trip1.suggestedActivities).to.deep.equal([])
    })

    it('should be able to store the destinations in a new instance', () => {
        expect(trip1.destination).to.deep.equal({})
    })

    it('should be able to store the destination data in the trip instance', () => {
        expect(trip1.destination).to.deep.equal({})
        trip1.storeDestination(destinationData)
        expect(trip1.destination).to.deep.equal(new Destination(destinationData[0]))
    })

    it('should be able to calculate the total cost for a single trip with a travel agent fee of 10%', () => {
        trip1.storeDestination(destinationData)
        const tripCost = trip1.calculateTripCost()
        expect(tripCost).to.equal(1056)
    })
})