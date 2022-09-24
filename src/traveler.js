class Traveler {
    constructor(travelerData) {
        this.id = travelerData.id;
        this.name = travelerData.name;
        this.travelerType = travelerData.travelerType
    }

    returnFirstName() {
        const firstName = this.name.split(' ')
        return firstName[0]
    }

    returnYearlyTripCost(trips, year) {
        return trips.reduce((acc, trip) => {
            if (trip.status === "approved" && trip.date.includes(year)) {
                const lodging = trip.destination.lodgingCost * trip.duration
                const flight = trip.destination.flightCost * trip.travelers
                acc += ((lodging + flight) * 1.1)
            }

            return acc
        }, 0).toFixed(2)
    }
}

export default Traveler 