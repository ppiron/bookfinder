# Chingu Solo Project - Tier2 - Bookfinder

## Overview

This project was created for the Chingu Voyage pre-work.
It pulls data from the [Google Books API](https://developers.google.com/books) and allow users to search for books.

LIVE LINK: https://chingu-bookfinder.netlify.app

## Features

- It is possible to limit the search to Title or Author or ISBN.
- The results are paginated (20 results per page).

## Running the project

There are two available scripts:

### npm start

Runs the app in development mode.
Open http://localhost:8080 to view it in the browser.
The page will reload when making edits.

In order to simulate Netlify Functions locally:

- Install Netlify cli: `npm install -g netlify-cli`.
- Run `netlify functions:serve` to start the function server.
- Define an environment variable in `.env` called SNOWPACK_PUBLIC_GOOGLE_BOOKS_API_KEY with your Google Books API key.
- In the file `App.svelte` change the url of the Netlify function to `http://localhost:7000/.netlify/functions/getBooks`.

### npm run build

Builds a static copy of the site to the `build/` folder, ready to be deployed.

## Dependencies

The project uses [Svelte](https://svelte.dev/) and [Tailwind CSS](https://tailwindcss.com/) for the frontend.

For the backend, it delegates the call to the Books API to a [Netlify serverless function](https://www.netlify.com/products/functions/). This way my API key is not exposed in the frontend.

For development and build it uses [Snowpack](https://www.snowpack.dev/).

## ToDo

Things I would like to add/improve:

- [ ] Improve the styling and organise my CSS better.
- [ ] Add the ability for users to login and save favourite books.
- [ ] Improve accessibility.
- [ ] Improve usability (e.g. button to jump at the top of the page, buttons to jump to a specific page or to the first/last page).
- [ ] Add the ability to sort/filter results.
- [ ] Add testing.
