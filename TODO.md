# Tasks for everyone
 
 #### Attila:
 - Refresh memories about front-end systems
 - Help Kuni to understand the structure and workflow of angular frontends

#### Kuni:
 - Update documentation and README
 - Prepare to work on the frontend site

#### Gábor:
 - Get to know the structure of backend, prepare to make unit tests

#### Fagyi:
 - Make unit test sample
 - Collect tasks for upgrading current  s oftware
 - Try to make more sensible commit messages
 - Remember deadlines
 - Keep shit together

# Missing/faulty implementations:
 - [ ] Project members/contributors can be added, but could not be deleted from a project.
 - [ ] The "open/closed project" feature is not yet implemented.
 - [ ] The user's personal data section is imperfect/faulty:
    - [ ] "noname" skills can be added (backend error).
    - [ ] password could not be changed.
    - [x] same skills can be added multiple times (frontend error).
 - [ ] Required skills can not be added to the project.
   (Frontend interface is done, but not working. May be only a frontend bug.)
 - [ ] Tasks in "in progress" state can be deleted.
   (Both backend and frontend error. Tasks marked as "done" might be affected on the backend as well.)
 - [ ] On the project members page, even the user's own projects are listed as "participating".
 - [x] New 'empty' project is added even if the dialog is cancelled (frontend bug).
 - [ ] Project cannot be deleted.

# Technical information

Overall testing resource :
https://www.baeldung.com/spring-boot-testing

Unit tests:
source: https://www.mkyong.com/maven/how-to-run-unit-test-with-maven/

### Run all the unit test classes.

```shell
$ mvn test
```

- In the directory structure there should be a brand different bracket for the tests.
- One test file ragarding the tests for specific methods is sufficient. 

### How to run Maven from command line

[Download](https://maven.apache.org/download.cgi) Maven, extract it somewhere and add Maven's ```bin``` folder to the PATH.

To build the project:

```shell
$ java -jar target/alkfejl18-0.0.1-SNAPSHOT.jar
```

To run the server:

```shell
$ mvn spring-boot:run
```
