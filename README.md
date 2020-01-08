# KieZ
A web app to promote neighborhood sharing and connection. 

## Functionality overview:
* Authenticate users (login/signup pages + logout button on settings page)
* CRU* Users
* CRUD Events
* CR*D Comments on Events
* CR*D Posts on NewsFeed
* CR** Reference on other users Profile
* Giving credit to other users
* Joining event
* GET and display lists of neighbors and future events in 3km distance around their place

## Demo
On [our deployment page](https://flavor-it.herokuapp.com/), we used two area in Berlin: `Neukölln` and `Kreuzberg` for demonstration. You may use our demonstration accounts to look around.
```
username: Nicole
password: Neukoelln
```
```
username: Kevin
password: Kreuzberg
```
## Getting Started
### Prerequisites
1. Make sure you have [`node`](https://nodejs.org/), [`MongoDB`](https://www.mongodb.com/) and [`npm`](https://www.npmjs.com/get-npm) installed.

2. For the photo upload function, make sure you have an account on [Cloudindary](https://cloudinary.com/).

3. For the location function, we use [`Geocoding API`](https://developers.google.com/maps/documentation/geocoding/start) from Google to convert addresses into geographic coordinates, you need to enable APIs on [Google Maps Platform](https://cloud.google.com/maps-platform/).

### Installing

#### For Backend

1. Clone the repository and install the dependencies:  
```
cd ./Kiez
npm install
```
2. Add a `.env` file and include the following keys:

```
ENV=development
PORT=5000 <You can use other port, as long as it is not 3000>
SESSION_SECRET=<It is used for Passport session security, You can use any secret word of your choice.>
```
3. Refer to your account details from Cloudinary and include `CLOUD_NAME`, `CLOUD_KEY` and `CLOUD_SECRET` in the `.env` file.

4. Refer to your account details from Google Maps Platform and include `geocodeKey` in the `.env` file.


#### For Frontend
```
cd ./client
npm install
```


## Running 

### For Backend
Building and starting the server for production:
```
npm start
```
if you have nodemon installed, you can also use this command to start and run the server:
```
npm run dev
```

### For Frontend
#### Development mode
Runs the app in the development mode:
```
npm start
```
Open `http://localhost:3000` to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.


#### Production mode
Builds the app for production to the build folder by running:
```
npm run build
```


You may find more information in the [Create React App documentation](https://create-react-app.dev/docs/getting-started/).



## Built with

* Node.js
* Express.js
* MongoDB
* React.js
* axios
* Cloudinary
* Geocoding
* Socket.IO

