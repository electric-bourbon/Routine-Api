# Routine Api

> API for Routine app

* Currently running on: (no deployment yet)

## Development

### Prerequisites
* [Node js](http://nodejs.org/) and NPM
* [Nodemon](http://nodemon.io/)

If you're new to Nodemon you can install it globally with npm

```sh
$ npm install -g nodemon
```
To get started run `nodemon server.js` to kick off the server. Nodemon will reload the server on every save.

## Routes

Routes in the User Registration section are authenticated
by Username/Password unless otherwise mentioned.

Routes elsewhere in the app are authenticated by passing
an 'X-Access-Token' header along with the request.

### User Registration & Auth

#### Creating a User

**Route:** `POST api/users`

**Params:**

| Parameter |  Type  |
| --------- |  ----  |
|  Password | String |
|  Name     | String |
|  Username | String |
|  Email    | String |

Note that usernames must be unique

Example success (Code 201 - Created):

```json
{
  "message": "User Created!"
}
```
Example Failure (500 - Internal Server Error):

```json
{
  "errorMessage": "A user with that username already exists."
}
```

#### Logging In with an Existing User

**Route:** `POST api/users/login`

**Params:**

| Parameter | Type   |
| --------- | ------ |
| Username  | String |
| Password  | String |

Example Success (Code 200 - OK)

```json
{
  "success": true,
  "message": "Enjoy your token!",
  "token"  : "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoibmF0ZSIsInVzZXJuYW1lIjoibmF0ZSIsImlhdCI6MTQ0NDg1MTcxNSwiZXhwIjoxNDQ0OTM4MTE1fQ.9kOJEZb_f7HZ8RgmqbPwhDXALx2TDR1fH5lzPtlGzcA",
  "id" : "5689545f46d5abacd7462d6e"
}
```

Example Failure (Code 403 - Forbidden)

```json
{
  "errorMessage": "Password was incorrect."
}
```
Or

(Code 404 - Not found)

```json
{
  "message": "Could not find user."
}
```
#####Getting a Single User

**Route:** `GET api/users/:user_id`

####Editing an Existing User

**Route:** `PUT api/users/:user_id`

**Params:**

| Parameter |  Type  |
| --------- |  ----  |
|  Password | String |
|  Name     | String |
|  Username | String |

Example Success (Code 200 -OK):

```json
{
  "message" : "User updated"
}
```

####Deleting an Existing User

**Route:** `DELETE api/users/:user_id`

**Params:** None.

Example Success (Code 200 -OK):

```json
{
  "message" : "Successfully Deleted"
}
```
