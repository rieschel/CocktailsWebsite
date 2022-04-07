# dynwebb-projekt

## Description
Our project is a drink website that can provide users with drink recepies and inspiration. The website allows users to search for drinks and filter drinks by ingredients. The drink data is fetched from an API called the Cocktails DB which contains o large number of drink recepies. The user can also rate drinks and save their favourites.

## What we have done
So far in the project we have set up the basic stucture of the drink website with webpack, model-view-presenter and persistance with firebase. We have implemented a Drinkmodel which contains functions to save, delete and rate drinks. We also have implemented some styling using the Materials UI Framework. So far, the website has two main views. 

One view is the search page where the user can search for drinks and filter them by ingedients. The search page renders drinks from the API with images and drink names. In the search view, the user can save and rate drinks.

The other view is the saved drink pages, where the user can see their saved drinks, remove drinks from the saved page and rate drinks. The ratings are updated between the search and saved drink pages.

We have also implemented a navbar, where the user can switch between different views. The initial view is the search view.

Right now, we are however still working on the navbar and the filter search. This is therefore currently not compeletely working in the deployed app. 

## What we plan to do
Further on in the project we plan to implement a details view, where the user can see the recipe for each drink. The details view should be displayed when a user clicks on a drink in the search och saved view.

We also plan to implement profiles for different users. For this function, we will implement a login page and the saved drinks will be connected to a specific user.

If we have time, we also plan to implement a function which lets users add their own drinks. The user will then be able to add a drink with a corresponding image and recipe. 

In the upcoming part of the project, we are also going to work a lot on the design. So far, we have focused mainly on the functionality of the website, but in the later part of the project we are going to focus more on the design. We aim to create a nice-looking website with great usability.

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
