import { expect } from "chai"
import Traveler from "../src/traveler"

describe.only('Traveler', () => {
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

    // it('should be an instance of traveler', () => {
    //     expect(traveler1).to.be.an.instanceOf(Traveler)
    // }
})