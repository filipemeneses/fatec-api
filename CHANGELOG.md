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
