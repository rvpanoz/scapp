# scapp

JWT Authentication & Authorization in NodeJs/Express & MongoDB REST APIs

## Introduction

This application is a REST API that will enable to create a user, log in the registered user, log out a user from a single device, and log out a user from multiple devices. Using Node.js/Express and MongoDB with MongoDB Atlas, a cloud database service that hosts MongoDB databases to store our data.

## How JWT it works?

JWT stands for JSON Web Token and is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. This information can be verified and trusted because it is digitally signed.

JWTs can be signed using a secret (with the HMAC algorithm) or a public/private key pair using RSA or ECDSA. [jwt.io/introduction/](https://jwt.io/introduction/)

## Start the server

In order to start the application and run the server which handles the authentication and authorization process you have to clone the repo into a directory and install the application's dependencies using npm or yarn

```
npm install
```

```
yarn
```

After the installation is complete run the server using the following command:

```
npm start
```

If everything goes as expected you will see a message in the terminal that the server is running at port 8000. You can change the server running in src/config.js file.

![alt text](https://github.com/rvpanoz/scapp/raw/master/images/start.png "Server start")

## Routes

There are five available routes:

- POST /users/create
- POST /users/login
- GET /users/profile
- POST /users/logout
- POST /users/logoutall

### Create a user

---

Returns json data about a single user.

- **URL**

  /users/create

- **Method:**

  `POST`

- **Data Params**

  username [String]

  password [String]

- **Success Response:**

  - **Code:** 200 OK<br />
    **Content:**
    ```json
    {
      "user": {
        "_id": "5e249c499899e94e6dfde811",
        "name": "Goo",
        "email": "woodoo@goohoo.com",
        "tokens": [
          {
            "_id": "5e263647a4a67c5c7ff0694b",
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
          }
        ]
      }
    }
    ```

- **Error Response:**

  - **Code:** 400 BAD REQUEST <br />

- **Sample Call:**

  ```javascript
    curl -i -X POST -d "{\"email\": \"woodoo@goohoo.com\", \"password\": \"ohshit\"}" -H "Content-Type: application/json" http://localhost:8000/users/login
  ```
