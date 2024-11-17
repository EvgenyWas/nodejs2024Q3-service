# Home Library Service

This project provides a RESTful service for managing a Home Library where users can create, read, update, and delete data about artists, albums, and tracks. Users can also add these items to their personal Favorites list.

## Prerequisites

- **Git**: [Download & Install Git](https://git-scm.com/downloads).
- **Node.js**: [Download & Install Node.js](https://nodejs.org/en/download/) along with npm.

## Downloading

To clone the repository:

```
git clone https://github.com/EvgenyWas/nodejs2024Q3-service.git
```

## Configuration

The server listens on port 4000 by default. You have to specify environmental variables in `.env` fille according to `.env.example`.

After starting the application, view the OpenAPI documentation by opening [http://localhost:4000/doc/](http://localhost:4000/doc/) in your browser.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Installing NPM modules

Navigate to the project directory and install dependencies:

```
npm install
```

## Running the Application

Start the service on the default port (4000) using:

```
npm run start
```

Or to start the service in dev mode with watching source files changes:

```
npm run start:dev
```

## Running the Application in Docker

Start the service in Docker container using:

```
docker compose up -d
```

## API Endpoints

The Home Library Service offers several endpoints to manage Users, Artists, Albums, Tracks, and Favorites.

### User Endpoints (/user)

- `GET /user`: Retrieve all users.
- `GET /user/:id`: Retrieve a user by ID.
- `POST /user`: Create a new user.
- `PUT /user/:id`: Update user’s password.
- `DELETE /user/:id`: Delete a user.

### Artist Endpoints (/artist)

- `GET /artist`: Retrieve all artists.
- `GET /artist/:id`: Retrieve an artist by ID.
- `POST /artist`: Create a new artist.
- `PUT /artist/:id`: Update artist details.
- `DELETE /artist/:id`: Delete an artist.

### Track Endpoints (/track)

- `GET /track`: Retrieve all tracks.
- `GET /track/:id`: Retrieve a track by ID.
- `POST /track`: Create a new track.
- `PUT /track/:id`: Update track details.
- `DELETE /track/:id`: Delete a track.

### Album Endpoints (/album)

- `GET /album`: Retrieve all albums.
- `GET /album/:id`: Retrieve an album by ID.
- `POST /album`: Create a new album.
- `PUT /album/:id`: Update album details.
- `DELETE /album/:id`: Delete an album.

### Favorites Endpoints (/favs)

- `GET /favs`: Retrieve all favorite artists, albums, and tracks.
- `POST /favs/artist/:id`: Add an artist to favorites.
- `DELETE /favs/artist/:id`: Remove an artist from favorites.
- `POST /favs/album/:id`: Add an album to favorites.
- `DELETE /favs/album/:id`: Remove an album from favorites.
- `POST /favs/track/:id`: Add a track to favorites.
- `DELETE /favs/track/:id`: Remove a track from favorites.

### Important Notes

- Non-existing entities cannot be added to Favorites.
- When an artist, album, or track is deleted, it is automatically removed from Favorites, and related references in other entities are set to `null`.

### Validation

All incoming requests are validated, ensuring the correct data structure for each endpoint.

## Data Format

All requests and responses use `application/json` format.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Audit vulnerabilities

Check package dependencies for security vulnerabilities. More information [here](https://docs.npmjs.com/auditing-package-dependencies-for-security-vulnerabilities)

```
npm run audit
```

## Debugging

To debug the application in VSCode, press <kbd>F5</kbd>.

For more information, visit: [VSCode Debugging](https://code.visualstudio.com/docs/editor/debugging).
