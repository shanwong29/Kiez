# KieZ

A single-page app to promote neighborhood sharing and connection.

![Kiez Demo](/kiez_demo.gif)

## Functionality overview:

- Authenticating users (login/ signup/ logout)
- CRU\* Users
- CRUD Events
- CR\*D Comments on Events
- CR\*D Posts on NewsFeed
- CR\*\* References on other user profiles
- Joining event
- Instant messaging
- Giving credit to other users
- Uploading and previewing uploaded image
- GETing and displaying lists of neighbors and future events in a 3km radius around their location
- Responsive on phone, tablet, and desktop

## Demo

On [our deployment page](https://kiez.herokuapp.com/), we use two areas in Berlin: `Neukölln` and `Kreuzberg` for demonstration. You may use our demonstration accounts to look around.

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

2. For the photo upload function, make sure you have an account on [`Cloudindary`](https://cloudinary.com/).

3. For the location function, we use [`Geocoding API`](https://developers.google.com/maps/documentation/geocoding/start) from Google to convert addresses into geographic coordinates, you need to enable APIs on [Google Maps Platform](https://cloud.google.com/maps-platform/).

### Installing

#### For Backend

1. Clone the repository and install the dependencies:

```
git clone https://github.com/shanwong29/Kiez.git
cd ./Kiez
npm install
```

2. Add a `.env` file and include the following keys:

```
PORT=5005
SESSION_SECRET=<It is used for Passport session security, You can use any secret word of your choice.>
```

3. Refer to your account details from Cloudinary and include `cloudName`, `cloudKey` and `cloudSecret` in the `.env` file.

4. Refer to your account details from Google Maps Platform and include the Geocoding API key as `geocodeKey` in the `.env` file.

#### For Frontend

```
cd ./client
npm install
```

## Running

### For Backend

In `Kiez/`, build and start the server with the following command:

```
npm start
```

if you have nodemon installed, you can also use this command to start and run the server:

```
npm run dev
```

### For Frontend

#### Development mode

When the server is on, go to `client/`, run the app in development mode by the following command:

```
npm start
```

You may view it in the browser on http://localhost:3000.

The page will reload if you make edits. You will also see any lint errors in the console.

#### Production mode

In `client/`, build the app for production by running:

```
npm run build
```

## Built with

- React.js
- Node.js
- Express.js
- MongoDB
- axios
- Cloudinary
- Geocoding
- Socket.IO
