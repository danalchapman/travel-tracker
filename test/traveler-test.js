import { expect } from "chai"
import Traveler from "../src/traveler"

describe('Traveler', () => {
    let traveler1

    beforeEach(() => {
        traveler1 = new Traveler({
            id: 1,
            name: "Ham Leadbeater",
            travelerType: "relaxer"
        })
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
        expect(traveler1.name).to.equal("Ham Leadbeater")
    })

    it('should be able to store a travelers type', () => {
        expect(traveler1.travelerType).to.equal("relaxer")
    })

    it('should be able to return the travelers first name', () => {
        const firstName = traveler1.returnFirstName()
        expect(firstName).to.equal("Ham")
    })
})