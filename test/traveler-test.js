const chai = require('chai')
const expect = chai.expect

const Traveler = require('../src/traveler')

describe.only('Traveler', function() {

    it('should be a function', function() {
        const traveler = new Traveler()
        expect(Traveler).to.be.a('function')
    })


})