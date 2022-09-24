class Trip {
    constructor(tripData) {
        this.id = tripData.id;
        this.userID = tripData.userID;
        this.destinationID = tripData.destinationID;
        this.travelers = tripData.travelers;
        this.date = tripData.date;
        this.duration = tripData.duration;
        this.status = tripData.status;
        this.suggestedActivities = tripData.suggestedActivities
    }

    returnAllTrips() {
        // need:
        // userID
        // return all trips for a userID
    }

    returnYearlyTripCost() {
        // need:
        // userID
        // destinationID
        // from destinationID need:
            // destination.estimatedLodgingCostPerDay * this.duration
            // destination.estimatedFlightCostPerPerson * this.travelers (assuming round-trip)
            // (^^^ totals * .1) total + 10% (travel agents fee)
            // ex. 
                // ((total = 250) * .1) = fee (25)
                // total + fee = 275 (250 + 25) 
            // return total + fee
        // return sum of all status.approved trips in a "year" for userID/traveler
    }
}

export default Trip 