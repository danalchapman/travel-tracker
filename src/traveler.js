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
                acc += trip.calculateTripCost()
            }

            return acc
        }, 0).toFixed(2)
    }

    sortTrips(trips, date) {
        return trips.reduce((acc, trip) => {
            const todaysDate = Date.parse(new Date(date))
            const tripDate = Date.parse(new Date(trip.date))
            if (trip.status === "pending") {
                acc.pending.push(trip)
            } else if (tripDate < todaysDate) {
                acc.past.push(trip)
            } else {
                acc.upcoming.push(trip)
            }

            return acc
        }, {
            past: [],
            pending: [],
            upcoming: []
        })
    }
}

export default Traveler 