Hey There!
This is the frontend part of a full stack e-commerce application. The backend part can be found here - 
https://github.com/Nischalj10/ecommerce-backend

This project has already been deployed on Heroku. To view the finished application, kindly visit the following link-
https://nischal-ecommerce-frontend.herokuapp.com/ 
(It takes a minute to load though <3 )

Since it would not be right to share the admin profile of the application publicly, I have made this demonstration 
video about the platform, kindly see it here once you have explored the application -
https://drive.google.com/file/d/1_2XekH6N0NmhyO3rCeLxGK4V-3-1938l/view?usp=sharing

Still, one can always drop a mail on my website and I'd be happy to share the admin credentials or make them admin.
Here's my website - https://nischaljain.live/

If you wish to run the app on your localhost, kindly follow the below steps : 

1. Clone the repository
2. Make a .env file in the root directory and add the following code

REACT_APP_REGISTER_REDIRECT_URL="http://localhost:3000/register/complete"                                                 
REACT_APP_FORGOTPASSWORD_REDIRECT_URL="http://localhost:3000/login"                                                                
REACT_APP_API = "http://localhost:8000/api"                                                                                             
REACT_APP_STRIPE_KEY=pk_test_51ISNEvECvaWr7wKLZIk6g6wYZ9Jt1FKtOyLXoqCuCLCG1sNYZQwX3G9V3x5uY1WcvNAr0dAw0Xa11ptJ79LhRnEh00h9Zt24Hh                  

3. Migrate to the root folder and run -> npm start in console.

The front-end app should build. You also need to follow the steps in the README.md file of the following repository
to run the backend as well - 
https://github.com/Nischalj10/ecommerce-backend


