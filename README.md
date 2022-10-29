# Sectors Web App

#### Track your Job opportunities across all sectors, A job Diary to keep you Up-to-date

![sectors](https://user-images.githubusercontent.com/76691178/198845453-9a0328ce-a383-4fd1-90a5-290faa9dedbe.PNG)


<h2 align="center"></h2>    
  
<!-- TABLE OF CONTENTS -->  
<details open="open">  
  <summary>Table of Contents</summary>  
  <ol>  
    <li>  
      <a href="#🦋the-structure-of-Sectors WebApp">The Structure of Sectors</a>  
      <ul>  
        <li><a href="#👷built-with">Built With</a></li>  
      </ul>  
    </li>  
    <li>  
      <a href="#🚖getting-started">Getting Started</a>  
      <ul>
      <li><a href="#♻️Front-end">Front-end</a></li>   
        <li><a href="#🔰Back-end">Back-end</a></li>   
      </ul>  
    </li>  
    <li><a href="#🖲️project-in-action">Project in Action</a></li>  
    <li><a href="#🌏populate-database">Populate Database</a></li>   
    <li><a href="#📑license">License</a></li>  
    <li><a href="#📞contact">Contact</a></li>  
    <li><a href="#🤝acknowledgements">Acknowledgements</a></li>  
  </ol>  
</details>  


<!-- ABOUT THE PROJECT --> 
## The Structure of Fruits-Shop(proshop)

Fruits-shop is a web-app that is structuresd with several features such as: 

- User management on Jobs at various status
- Update User Profile
- Stats page showing charts on Job experience
- Quiz App to Test Aptitude
- Full featured Sector Web App
- Add Jobs depending on the sectors
- Sectors pagination
- Job search feature
- User profile with Update feature
- Logout Functionality
- PayPal / credit card integration
- Database populate 0r seeder on users Jobs on all sectors


### 👷Built With  
* [Express js](https://docs.spring.io/spring-framework/docs/current/reference/html/web-reactive.html)  
* [React Js](https://angular.io/docs)
* [Redux](https://angular.io/docs)

<!-- GETTING STARTED -->  
##  🚖Getting Started 
The frontend was created using npx Create-React-app.

ECMAScript Modules was use in the backend in this project. Be sure to have at least Node v14.6+ or you will need to add the "--experimental-modules" flag.

Also, when importing a file (not a package), be sure to add .js at the end or you will get a "module not found" error

You can also install and setup Babel or Eslint if you would like.

Clone the project and run locally.


### ♻️Front-end
  
* Install or upgrade npm   
```sh  
 npm install 
 ```
* Run  React front-end
```sh  
 npm run dev
 ```
 ```sh
npm run install-dependencies
```
```sh  
 run locally on http://localhost:3000
 ```
 #### Security Packages

- remove log in the error-handler
- [helmet](https://www.npmjs.com/package/helmet)
  Helmet helps you secure your Express apps by setting various HTTP headers.
- [xss-clean](https://www.npmjs.com/package/xss-clean)
  Node.js Connect middleware to sanitize user input coming from POST body, GET queries, and url params.
- [express-mongo-sanitize](https://www.npmjs.com/package/express-mongo-sanitize)
  Sanitizes user-supplied data to prevent MongoDB Operator Injection.
- [express-rate-limit](https://www.npmjs.com/package/express-rate-limit)
  Basic rate-limiting middleware for Express.

```sh
npm install helmet xss-clean express-mongo-sanitize express-rate-limit
```

```js
 Detailed work through of running board wars can be found <a href="#built-with">here</a> 

### 🔰Back-end  
  
For local build of Sectors WebApp, you need   
* Express Js  
Install express to  build app and the project root modules  
```sh  
 npm install 
```
* .Env Variables

Create a .env file in the root and add the following

```
NODE_ENV = development or production before deploymwnt
PORT = 5000
MONGO_URL = you need you mongodb url to access the database
JWT_SECRET = create your own or get it from allkeysgenerator.com
JWT_LIFETIME=anyday
PAYPAL_CLIENT_ID = your paypal client id
``` 

## 🖲️Project in Action 
  
_Refer to the [Documentation](https://example.com) for insights about the project._   
* For API documentation, [click here](https://sectors-api.herokuapp.com/api-docs/). 


## 🌏Populate Database

You can use the following commands to seed or populate the database with some sample users and products as well as destroy all data

```
# Import data
npm run data:import

# Destroy data
npm run data:destroy
```

```
Sample User Logins

oat@gmail.com (user)
oat12

john@gmail.com (user)
123456
```

<!-- LICENSE -->  
## 📑License  
  
Distributed under the MIT License. See `LICENSE` for more information.  
  
  
  
<!-- CONTACT -->  
## 📞Contact  
* [Twitter](https://twitter.com/tolu_abby)  
* [Linkedin](https://www.linkedin.com/in/oluwadare-toluwalase/)
* [Mail](mailto:toluabby12@gmail.com)  
* [Fruits-Shop(proSHop)](https://github.com/Abigail-cloud/Sectors)   
  
  
<!-- ACKNOWLEDGEMENTS -->  
##  🤝Acknowledgements 
* [John Smilga](https://www.youtube.com/c/CodingAddict/playlists)  
* [Meduim](https://medium.com/)  
* [Stack Overflow](https://stackoverflow.com/)


### Live site @ https://thoughtful-buckle-fox.cyclic.app/
