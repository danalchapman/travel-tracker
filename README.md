# Dusk & Dawn Destinations

[Link to GH-Pages!](https://danalchapman.github.io/travel-tracker/)

Hey hi hello! This is **Dusk & Dawn Destinations**, the final solo project for students in the Turing School of Sortware & Design for their second inning.

The overall idea for this Travel Tracker application is for *travelers* (the User) to be able to log in with their correct *username* and *password* that then takes them to their Dashboard, so that they can view their past, pending, and upcoming trips based on a given year (shown by the date below) along with the total amonut that they spent for that year.

Travelers may also create a new trip, see the total due for that trip (includes a 10% travel agent fee) before submitting for approval or denial by a travel agent (another User).

This project is a culmination of the knowledge we've learned in the first two innings of Turing's Front-End program. We practice creating classes (and their test files), class-to-class interaction, using newly cemented prototype methods to perform data and DOM manipulation, utilizing Network Requests (GET and POST), and adding in Error Handling when needed, and so much more.

[Link to the Travel Tracker Project Spec](https://frontend.turing.edu/projects/travel-tracker.html)

![gif of logging into a site successfully and then unsuccessfully](https://media.giphy.com/media/zQ6VELHMgaloU9ErCd/giphy.gif)

![gif of a user tabbing to make a new trip](https://media.giphy.com/media/USZ2xfGzwAvb7gF0wC/giphy.gif)

## Set-up

1. Clone down this repo to your local machine
2. Clone down the back-end repo [linked here](https://github.com/turingschool-examples/travel-tracker-api)
3. `cd` into the back-end repo and run `npm start` (it must stay running in order for the API calls to function)
4. cd into this repo and run `npm start`
5. Visit `localhost:8080` linked in the CLI to view the app

## Technologies Used

1. HTML
2. CSS
3. JavaScript
4. Testing: Mocha/Chai

## Code Architecture

The *dist* folder contains:

1. the Webpack file `bundle.js`
2. `index.html`

The *src* folder contains:

1. *css* folder for styling
2. *images* folder which holds image-based assets
3. the three class files (destination, traveler, trip)
4. `scripts.js` which holds all of the DOM manipulation
5. `apiCalls.js` which hold the `fetch` Network Requests

The *test* folder contains:
1. *mock-data* folder for the class-tests
2. the three test-files for the corresponding classes

## Future Features

1. Give functionality to the `log out` button on the Dashboard (currently hidden) so that a User returns to the login page
2. Creating a `travel agent` class to create a new User who can see pending trips, how much income they've made in that year, and traveler Users on current trips for that given day
3. A countdown for traveler Users to their next upcoming trips

## Celebrations & Challenges

#### Celebrations

Getting practice with the POST Network Request and Error Handling (and having them function!) was a true win for this project, as well as having a fully accessible Dashboard - from text font, contrast, tabbability, semantic HTML, and getting a 100% on Google Chrome's Lighthouse auditing tool.

#### Challenges

There were SO many moving parts to this project, I often found myself stuck when I would have too many functions in my mind at once, and it took a lot of time to re-parse through `scripts.js` to make sure the functions were working as intended. I also managed to break the entire project at one point, only for someone else to point out that when I had changed a semantic tag, I'd given it a typo. Ooops.

Truly, the most challenging aspect of this project was the POST Request and getting that set up correctly, I spent a lot of time and got guidance from a mentor in order to be nudged in the right direction.

### Credits

- [Link to Unsplash Background Image](https://unsplash.com/photos/rY1AGgYkBLM)