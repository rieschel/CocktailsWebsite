# dynwebb-projekt
Deployed at: https://shakeitup-b7699.web.app/

## Description
Our project is a drink website that can provide users with drink recepies and inspiration. The website allows users to search for drinks by drink name and filter drinks by popular ingredients.
If the user clicks on a drink, it can see the recipe. The website also has a random drink generator which can be used if you don't know what you are looking for. In the navbar, there is an info button with information about how the page can be used and a youtube video showing how to shake a drink.

Users can create accounts on the website, and the website can be used both when logged in and not. If a user is logged in, it can rate drinks and save their favourites. Accounts can also be deleted, and the corresponding ratings and saved drinks will also be deleted in that case.

The drink data is fetched from an API called the Cocktails DB which contains o large number of drink recepies.

## Setup
To install firebase, run ``npm install firebase`` in the terminal.

To run the website locally, run ``npm start`` in the terminal. The website is run at localhost:8080

## Project file structure
Project file structure of the source directory

```
src
├── reactjs - All react presenters
    └── index.js
        └── Index file rendering the entire app
    └── SavedPresenter.js
        └── Presenter rendering the saved drinks page
    └── searchPresenter.js
        └── Presenter rendering the search page
    └── Show.js
        └── Shows and hides react components
    └── loginPresenter.js
        └── Presenter rendering the login page
    └── newAccountPresenter.js
        └── Presenter rendering the new account page
    └── shakeitupPresenter.js
        └── Presenter rendering the random drink generator page
    └── detailsPresenter.js
        └── Presenter rendering the details view for a drink
├── views - All different views
    └── app.js
        └── App view rendering search and saved
    └── filterMenu.js
        └── View containing form with checkboxes for the filter function
    └── savedView.js
        └── View containing all saved drinks
    └── searchResults.js
        └── View containing the search results
    └── searchView.js  
        └── View containing the initial search page
    └── theme.js
        └── Theme provider for the different views
    └── navbarView.js
        └── View containing the navbar
    └── createNewAccount.js
        └── View containing the sign up page
    └── detailsView.js
        └── View containing the details view for a drink
    └── loginView.js
        └── View containing the login page
    └── promiseNoData.js
        └── Error handling for promises
    └── randomDrinkView.js
        └── View containing the the random drink generator in shakeitup
    └── shakeitupView.js
        └── View containing the random drink generator
├── DrinkModel.js
    └── Model with functions to save, remove and rate drinks, and add and remove users
├── DrinkSource.js
    └── Fetches data from the drink API
├── navigation.js
    └── Sets the initial hash to search
├── firebaseModel.js
    └── Updates model from firebase, and firebase from model
├── firebaseConfig.js
    └── Configuration for firebase
├── apiConfig.js
    └── Configuration for the drink API
├── resolvePromise.js
    └── Resolves promises
├── index.html
    └── Basic index page
```
