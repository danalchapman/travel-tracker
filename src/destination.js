class Destination {
    constructor(destinationData) {
        this.id = destinationData.id;
        this.lodgingCost = destinationData.estimatedLodgingCostPerDay;
        this.flightCost = destinationData.estimatedFlightCostPerPerson;
        this.image = destinationData.image;
        this.alt = destinationData.alt
    }
}

export default Destination