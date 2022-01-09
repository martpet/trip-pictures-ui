# Trip Pictures frontend

## How to run

- Create a [Mapbox account](https://www.mapbox.com) and get an access token.
- Copy `.env.development.local.example` to `.env.development.local`.
- Add the Mapbox access token to `.env.development.local`.
- `npm install`
- `npm start`

### (optional) Run the backend locally

- Set `VITE_STRAPI_API_URL` to `http://localhost:1337` in `.env.development.local`.
- Follow the instructions at [trip-pictures-strapi](https://github.com/martpet/trip-pictures-strapi).
