# Questionnaire API

A backend development project of a questionnaire system that has a number (currently 2) of tests/quiz and user can select among one of those.    
This was developed using Node.js, Express, MongoDB etc.  

You can call the API's with the following endpoints:-  

1. Signup :- https://powerful-red-dhole.cyclic.app/api/auth/signup  
  Checks whether the email id exists or not if it doesn't exist the user is registered and an authentication token is sent as the response.  
  
2. Signin :- https://powerful-red-dhole.cyclic.app/api/auth/signin  
  When the user signs in with the correct credentials it sends an auth token as response. Error if their are wrong credentials.  
  
3. User data :- https://powerful-red-dhole.cyclic.app/api/auth/getuser  
  To get the user data requires a signed authentication to be sent as an request in the header so that no one can access other user's data. Returns user details as response.  
  
4. Update :- https://powerful-red-dhole.cyclic.app/api/users/updatephone/<unique user id>  
  Let's you update the phone number of the user an authentication token needed to be sent in the header so that no user updates or deletes other user's phone. The unique id is   taken from the authentication token with the help of our middleware fetchdetails.  
  
5. Calling :- https://powerful-red-dhole.cyclic.app/api/auth/welcome  
   Doesn't do much just sends a welcome response that you have successfully hit the API.  
  
6. Get tests :- https://powerful-red-dhole.cyclic.app/api/test/tests  
   Get all the available test names with their test id from the database.  
  
7. Submit test :- https://powerful-red-dhole.cyclic.app/api/test/submit-test/<unique id of user>  
    An authentication token is sent in the request header for the verification that the registered user is submitting the test. On submission the user id, test id and the
    score obtained by the user is displayed. Otherwise a message is shown if the user has already taken the test.
  
  
