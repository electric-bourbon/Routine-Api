# Routine Api

> API for Routine app

* Currently running on: https://stark-peak-45925.herokuapp.com/

## Development

### Prerequisites
* [Node js](http://nodejs.org/) and NPM

#### Tasks
* To get started run `npm start` to kick off the server. Nodemon will reload the server on every save.
* Run `gulp lint` to lint the code or to keep it running the whole time run `gulp watch` in a separate terminal window
* Before submitting a pull request run `npm run build` to ensure it will build correctly. Then run `npm run serve` to ensure it will run correctly.

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

#### Creating a Routine

**Route:** `POST api/routines`

**Params:**

| Parameter         |  Type         |
| ---------         |  ----         |
|  name             | String        |
|  style            | String        |
|  desiredFrequency | Number        |
|  startDate        | unixTimestamp |

If `4-day` is listed as a style the desiredFrequency will default to 4.

Example Success (Code 200 -OK):

```json
{
  "message": "routine created!",
  "routine": {
    "__v": 0,
    "userId": "56d7baa3db2a93c7fbde4283",
    "modifiedDate": 1457040918187,
    "createdDate": 1457040918186,
    "startDate": 1457040839535,
    "desiredFrequency": 4,
    "style": "4-day",
    "name": "workout",
    "_id": "56d8ae16f85b1ca5134ee207"
  }
}
```
#### Getting Routines

**Route:** `GET api/routines`

Gets routines for the given userId

**Route:** `GET api/routines/:routine_Id`

Gets single routine


#### Updating and Deleting Routines

**Route:** `api/routines/:routine_Id/`

PUT updates given routine, if value is passed up it will be updated

DELETE deletes given routine


#### Creating a Sub Routine

**Route:** `POST api/routines/:routine_Id/subRoutines`

**Params:** Same as creating a routine

If `4-day` is listed as a style the desiredFrequency will default to 4.

Example Success (Code 200 -OK):

```json
{
  "message": "subRoutine created!",
  "subRoutine": {
    "__v": 0,
    "userId": "56d7baa3db2a93c7fbde4283",
    "modifiedDate": 1457041695726,
    "createdDate": 1457041695725,
    "routineId": "56d8ae88043411cb13bfc7b4",
    "desiredFrequency": 4,
    "style": "4-day",
    "name": "bench press",
    "_id": "56d8b11fbb2d6424146418d7"
  }
}
```

#### Getting SubRoutines

**Route:** `GET api/routines/:routine_Id/subRoutines`

Gets subRoutines for the given routine id

**Route:** `GET api/routines/:routine_Id/subRoutines/:subRoutine_Id`

Gets single subRoutine


#### Updating and Deleting subRoutines

**Route:** `api/routines/:routine_Id/subRoutines/:subRoutine_Id`

PUT updates given subRoutine, if value is passed up it will be updated

DELETE deletes given subRoutine


#### Creating a Day for a Routine

**Route:** `POST api/routines/:routine_Id/days`

**Params:**

| Parameter |  Type         |
| --------- |  ----         |
|  value    | Number        |
|  date     | unixTimestamp |

```json
{
  "message": "day created!",
  "day": {
    "__v": 0,
    "userId": "56d7baa3db2a93c7fbde4283",
    "routineId": "56d8ae88043411cb13bfc7b4",
    "value": 2,
    "date": 1457040839535,
    "_id": "56d8b46f4e5df96914bbe9eb"
  }
}
```

#### Creating a Day for a SubRoutine

**Route:** `POST api/routines/:routine_Id/subRoutines/:subRoutine_Id/days`

**Params:**

| Parameter |  Type         |
| --------- |  ----         |
|  value    | Number        |
|  date     | unixTimestamp |

```json
{
  "message": "day created!",
  "day": {
    "__v": 0,
    "userId": "56d7baa3db2a93c7fbde4283",
    "subRoutineId": "56d8b10abb2d6424146418d6",
    "routineId": "56d8ae88043411cb13bfc7b4",
    "value": 2,
    "date": 1457040839535,
    "_id": "56d8b44f4e5df96914bbe9ea"
  }
}
```

#### Getting Days

**Route:** `GET api/routines/:routine_Id/days`  

Gets days for the given routine id

**Route:** `GET api/routines/:routine_Id/subRoutines/:subRoutine_Id/days`

Gets days for subroutine

**Route:** `GET api/days/:day_id`

Gets day


#### Updating and Deleting Days
**Route:** `api/days/:day_id`

PUT updates given day, if value is passed up it will be updated

DELETE deletes given day

#### Endpoints to make

`api/routines/:routine_Id/sevenDayMovingAverage`

`api/routines/:routine_Id/monthlyAverage`

`api/routines/:routine_Id/yearAverage`

(same at subRoutine level)
