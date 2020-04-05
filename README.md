# ShopHub
## Team Members: Thomas Rafael Cruz and William Cedric Reyes
* Cruz, Thomas Rafael
* Reyes, William Cedric C.

## How to run the application
* Once pulled, open the terminal to CCAPDEV Phase 2 folder in order for the terminal to see the app.js file
* Once the terminal is in the right location type in "node app.js" in order to the application to be at localhost:3000

## Entering the application 
* Once the application has loaded please register an account that will be saved to the database, and that account will be used to navigate and use the website becuase you cannot enter the website without an account
* You can logout and Login again with your username, but it is case sensitive

## Navigation
* Once you have an account and are in the home screen where the products are shown, you can use the navigation bar to check your own profile (and edit details), add a product, search for a product, Shopping Cart, and Logout
* When in the profile view you can see you can edit some of the details you entered when you registered into the application, but if you do not want to edit all fields, the ones you did not change will still remain the same
* When adding a product you have to enter all the fields such as the name, price, description, and adding one picture for the product to be properly processed and entered into the database
* When searching this too is case sensitive and you need to search the exact words of the product you want to see and for it to appear as a lone product in the home page (example for Black Hoodie you have to type Black Hoodie in the search view)
* The shopping cart view will show you all the products you have added to your cart to show all the products you wish to checkout, which the button is at the bottom of the screen to bring you to a view to finalize your order
* The logout just ends the session of your account so you can register/login if you please

## Home Page 
* After running the JSON files you will see all the pre-set products we made with each having two buttons attached to them (Viewing the product and Adding to cart buttons)
* The view product view shows the product with a bigger picture and other details such as how many reacts (thumbs up or thumbs down) it has, as well as the comments it has. You can add a comment and even edit it if you notice a typo, but you cannot edit a comment that was not made by your account
* The adding to cart button just adds the product to your shopping cart that you can see in the navigation bar to checkout later on when you are done shopping

## Checkout Page
* Here you can see all the details you entered when you registered as well as your credit card information needed to complete the transaction 
* For the Credit Card number you need to place 12 digits (much like a real credit card)
* For the Expiration Date you need to place a date after April 2020 because we are assuming your card will not expire anytime soon 
* For the CVV you have to place a 3 digit number 
* Once you are done and confirm, the application will bring you back to the home screen and in the database it will show that you have ordered those items