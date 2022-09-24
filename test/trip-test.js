import { expect } from "chai"
import Trip from "../src/trip"

describe('Trip', () => {
    let trip1

    beforeEach(() => {
        trip1 = new Trip({
            id: 1,
            userID: 44,
            destinationID: 49,
            travelers: 1,
            date: "2022/09/16",
            duration: 8,
            status: "approved",
            suggestedActivities: [] 
        })
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
        expect(trip1.userID).to.equal(44)
    })

    it('should be able to store a trips destinationID', () => {
        expect(trip1.destinationID).to.equal(49)
    })

    it('should be able to store the amount of travelers', () => {
        expect(trip1.travelers).to.equal(1)
    })

    it('should be able to store a trips start date', () => {
        expect(trip1.date).to.equal("2022/09/16")
    })

    it('should be able to store a trips duration in number of days', () => {
        expect(trip1.duration).to.equal(8)
    })

    it('should be able to store a trips status', () => {
        expect(trip1.status).to.equal("approved")
    })

    it('should be able to store a trips suggested activities', () => {
        expect(trip1.suggestedActivities).to.deep.equal([])
    })

    it.skip('should be able to return all of a travelers trip data', () => {

    })

    it.skip('should be able to return the yearly trips cost for a traveler', () => {
        
    })
})