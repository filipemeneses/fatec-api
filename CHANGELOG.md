### 1.5.0 (2020-08-10)

##### Chores

*  add package lock dependencies ([964e6991](https://github.com/filipemeneses/fatec-api/commit/964e69918f46166b760a97b8f34597a17be3a28e))

##### Bug Fixes

*  login and getProfile... ([57f20c8b](https://github.com/filipemeneses/fatec-api/commit/57f20c8b3c0cf037a4dd6d57d1742abe4e05fc67))
*  (Lint) ([ecbb04c1](https://github.com/filipemeneses/fatec-api/commit/ecbb04c1a8c8cf212a03652749b1002f8d1426cd))
*  (getProfile) ([f9687231](https://github.com/filipemeneses/fatec-api/commit/f9687231412395b212253f504861ef215e98e5a7))

##### Refactors

*  change string conversion syntax ([1de03bcb](https://github.com/filipemeneses/fatec-api/commit/1de03bcbd86037e0813be0cda7d379ab4f3482ce))
*  (Indend) ([a15842e0](https://github.com/filipemeneses/fatec-api/commit/a15842e0319b0e3a02b34c1313a49526a328b8ab))

### 1.4.0 (2019-08-07)

- Updating selectors from `MPW0039` to `MPW0040`

##### Bug Fixes

*  (Lint) ([ecbb04c1](https://github.com/filipemeneses/fatec-api/commit/ecbb04c1a8c8cf212a03652749b1002f8d1426cd))
*  (getProfile) ([f9687231](https://github.com/filipemeneses/fatec-api/commit/f9687231412395b212253f504861ef215e98e5a7))

##### Refactors

*  (Indend) ([a15842e0](https://github.com/filipemeneses/fatec-api/commit/a15842e0319b0e3a02b34c1313a49526a328b8ab))

#### 1.3.2 (2019-03-02)

- SIGA removed iframe from home, it is no longer needed to access iframe to get user registered emails

#### 1.3.1 (2019-02-18)

- Caching by cookie and route instead only route

### 1.3.0 (2018-10-22)

- Added profile picture scrappig, `account.getPicture()` returns a base64 PNG image if exists, returns an empty string otherwise.
- `Student` class now have `picture` property which contains the base64 PNG image.

### 1.2.0 (2018-08-23)

- Updating scrap of month events in the academic calendar due SIGA modification.

### 1.1.0 (2018-03-16)

- Depreciating getRegisteredEmails due SIGA modification. The table were e-mails were extracted is removed.

## 1.0.0 (2017-12-20)

- Added `History`
- Added `Schedule`
- Added `SchoolGrade`
- `account.login()` will throw error if credentials are wrong or any other SIGA's error
- `account.getSchoolGrade()` returns `SchoolGrade` instance now
- `account.getHistory()` returns `History` instance now
- `account.setSchedules()` changed the return JSON and `startAt`, `endAt` date are relative to the current day
- `account.getPartialGrades()` removed `approved` attribute and added to `discipline` instance
- Added state checks to `Discipline` class and some missing getters/setters
- Changed `account.setclassroomCode` to `account.setClassroomCode`


### 0.9.0 (2017-12-18)

- Adding profile method scrapper

### 0.8.0 (2017-12-18)

- Solving #9 by adding academic calendar method scrapper


#### 0.7.2 (2017-12-17)

- `Account.login()` is no longer mandatory to call other methods

### 0.7.0 (2017-12-16)

- Added `state` to `Discipline`
- Solving #6 by adding school grade method scrapper

### 0.6.0 (2017-12-16)

- Solving #5 by adding complete history method scrapper

### 0.5.0 (2017-12-16)

- Solving #3 by adding schedules method scrapper


### 0.4.0 (2017-12-16)

- Removing multiple requests, now has a queue with 1s delay
- Adding 5 minutes cache to every request
- Adding partial absenses scrapper
- Solving #4 by adding partial enrolled disciplines method scrapper

### 0.3.0 (2017-12-15)

- Solved #2 by adding partial grades scrapper

### 0.2.0 (2017-12-15)

- Solved #1 by adding registered emails scrapper
