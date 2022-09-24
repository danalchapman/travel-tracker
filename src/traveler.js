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
}

export default Traveler // export default as its the only thing in the file