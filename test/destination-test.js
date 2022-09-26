import { expect } from 'chai'
import Destination from '../src/destination'

describe('Destination', () => {
    let destination1

    beforeEach(() => {
        destination1 = new Destination({
            id: 1,
            destination: 'Lima, Peru',
            estimatedLodgingCostPerDay: 70,
            estimatedFlightCostPerPerson: 400,
            image: 'https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80',
            alt: 'overview of city buildings with a clear sky'
        })
    })

    it('should be a function', () => {
        expect(Destination).to.be.a('function')
    })

    it('should be an instance of destination', () => {
        expect(destination1).to.be.an.instanceOf(Destination)
    })

    it('should be able to store a destinations id', () => {
        expect(destination1.id).to.equal(1)
    })

    it('should be able to store a destination name', () => {
        expect(destination1.name).to.equal('Lima, Peru')
    })

    it('should be able to store a destinations estimated lodging cost per day for all travelers', () => {
        expect(destination1.lodgingCost).to.equal(70)
    })

    it('should be able to store a destinations estimated flight cost per traveler', () => {
        expect(destination1.flightCost).to.equal(400)
    })

    it('should be able to store an image of the destination', () => {
        expect(destination1.image).to.equal('https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80')
    })

    it('should be able to store the alt text for the image of the destination', () => {
        expect(destination1.alt).to.equal('overview of city buildings with a clear sky')
    })
})