# dynwebb-projekt

## Description

## What we have done

## What we plan to do

## Project file structure

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
├── views - All different views
    └── app.js
        └── App view rendering search and saved
    └── checkboxesGroup.js
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
├── DrinkModel.js
    └── Model with functions to save, remove and rate drinks
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
├── index.html
    └── Basic index page
```
