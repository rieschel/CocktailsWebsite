# dynwebb-projekt

## Description
Our project is a drink website that can provide users with drink recepies and inspiration. The website allows users to search for drinks by drink name and filter drinks by popular ingredients.
If the user clicks on a drink, it can see the recipe. The website also has a random drink generator which can be used if you don't know what you are looking for. In the navbar, there is an info button with information about how the page can be used and a youtube video showing how to shake a drink.

Users can create accounts on the website, and the website can be used both when logged in and not. If a user is logged in, it can rate drinks and save their favourites. Accounts can also be deleted, and the corresponding ratings and saved drinks will also be deleted in that case.

The drink data is fetched from an API called the Cocktails DB which contains o large number of drink recepies.

## Setup
To install firebase, run ``npm install firebase`` in the terminal.

To run the website locally, run ``npm start`` in the terminal.

## User evaluation
When conducting user testing, some issues with the design and functionality of the website were discovered and acted upon. The issues and how the project group dealt with them will be presented here.

### Information about the page
Some users experienced that the page was a bit confusing and that there was not enough information about how the page could be used. Therefore, an information button was implemented. When the button is clicked, a window containing information about the page is presented to the user.

### Filter and search
There was some confusion about how the filter by ingredients and search by name functionalities were connected. To make this clearer, the two functions was seperated with drop down windows, were only one window could be seen at the time. Consequently, it became clear that the user can not use both of these functionalities at the same time.

### Filter persistance
User testing showed that the filter was cleared if the filter window was closed, but the results from the filtering was still shown. Therefore, filter persistance was implemented. This means that the same checkboxes are checked even if the filter menu is closed and opened again. To clear the filter, the user can click reset filter.

### Drink inspiration
One of the main aspects of the website is to provide users with inspiration. However, the user testing showed that if the user doesn't know what type of drink they are looking for, it becomes difficult to get inspiration from the page. To fix this, a random drink generator was added so that the user can find new drinks even if they have no idea what they are looking for.

### Delete accounts
User testing showed that the website lacked the functionality to delete accounts. A website that has users should always give the users the possibility to delete their accounts. Therefore, this was implemented.

### Rate drinks
Before the user evaluation, users could rate drinks with a slider and the rating was shown with a number between 1 and 10. Users found this a bit confusing and not very aesthetically pleasing. To make the ratings simpler, the slider and rating display was replaced by five stars which showed the rating. The user can also click on a star to give a rating.

### Save drinks
Earlier in the project, users could save drinks by clicking on a button that said "Save drink". User testing showed that this was unecessary text, and that it would be better to use a symbol. Another issue that came up is that users could not see which drinks they had saved in the search view. Therefor, this button was replaced by a little heart in the corner of the picture of the drink, which was filled is the drink was saved and a conture if the drink was not saved. To save a drink, the user can click on the heart.

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
