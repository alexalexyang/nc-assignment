# Code assignment

## Intro

Having tested and recruited software engineers myself I know:

- Code assignments for assessing candidates tend to be sparsely written

- It is difficult for candidates to scope code assignments as reviewers have a wide range of expectations

- Candidates also craft a wide variety of responses, which affect reviewers' expectations on a rolling basis

In other words, as a candidate, I have to make some assumptions about the assigned problem and about reviewers' expectations before I can propose a solution that both highlights a subset of my skills and fits into my time constraints.

Moreover, with most clients, many requirements and assumptions are implicit and unsaid. We tend to open discussions with them to figure these out because we need to be as explicit about them as possible in order to properly allocate time and resources.

Hence, just as in a real client engagement I begin by listing as explicitly as possible the assumptions, requirements, and scope of the task.

For this link station assignment, I've identified one explicit requirement from the text (aside from core business logic) and inferred several others based on prior experience.


## Assumptions, requirements, and scope

This section aligns client and team on the basic expectations of the product. A first draft was sent on 8 Nov. This current draft is based on the built product.

- Objective: build an MVP
  - All assumptions, requirements, and scope follow from this objective

- Algorithm
  - Brute force: based on the text ("most power"), it's assumed that we need to measure power for every link station in relation to the given data points.
  - An algorithm is also prepared for a case where optimisation is allowed. It performs very much better.

- Link station locations are persistent
  - I.e., we can save them to a persistent storage for reuse

- Device locations are persistent
  - I.e., we can save them to a persistent storage for reuse

- No need to account for staleness of data

- Key-value store for persistent storage
  - Simple query by composite key of coordinates may be sufficient at this time
    - More complex requirements might need relational or graph DBs or something else, which would be slower than key-value stores for the current case
  - Can be in-memory
    - Which means persistent at least for a while
    - Redis
      - Offers an option to write to disk, which we will not use

- Fermyon serverless app
  - App compiled to Wasm
  - Not as fast as native V8 engine ([more here](https://www.fermyon.com/blog/spin-js-sdk)) but making use of this test to try out new tech
    - I picked Fermyon because I think ML models may be deployed using Wasm stacks in similar fashion in future

- Focus on core business logic
  - I.e.: exactly what is stated in the assignment text

- Scaling is not a concern at this time
  - I.e., we will not think about deploying to serverless functions on cloud providers or deploying multiple instances for High Availability, load balancing, etc

- Maintainability by more than one maintainer in the long term
  - Scoped from assignment text
  - Use GitHub for version control and collaboration
  - Use TypeScript for developer experience
    - ESLint is very helpful to align devs on code format
  
- The team may be cross-functional
  - It may consist of data scientists, electrical engineers, UX designers, and others who are not familiar with our code
  - Use behavior-driven development to align non-dev with devs
    - E.g.: [cucumber](https://github.com/cucumber/cucumber-js) for tests

- Developer experience is important
  - Use TypeScript
      - Great intellisense support in IDEs
      - Not as speedy as Go but less verbose and clearer
      - Type system much smoother than many other languages, e.g. Python
      - Helps to catch subtle errors
      - Easy to onboard new team members
      - Scalable for apps where extreme performance is not critical
  - Dockerized containers for local dev
  - Tests
    - Provide confidence in code across many changes

## How to use

There are several ways to try out the code.

### Local Fermyon app instance

- Set up a Redis account [here](https://redis.io/)

- Set up a Redis DB
  - Free tier available

- Get the connection string

- Export the connection string as an environment variable to `SPIN_VARIABLE_REDIS` in local shell
  - E.g.: `export SPIN_VARIABLE_REDIS=redis://username:password@redis-1234.abc.eu-abc-123.ec2.cloud.redislabs.com:16675`

- Run `npm i`

- Run `npm start`

- Send mock data to `http://127.0.0.1:3000` using your method of choice.
  - E.g.: `curl -X POST http://localhost:3000 -H "Content-Type: application/json" -d @db/mock-data.json`
  - Mock data in `mock-data.json` is provided in db directory so you can run the curl command from root directory
  - This local instance communicates with the remote Redis instance set up above

### Remote Fermyon app instance  

I'd rather not reveal the URL here. Can demo in person.


### Tests

`npm run test` will use `cucumber.js` to run several tests. The `tests/assignment` directory in particular contains tests for the scenarios described in the assignment text.


## Performance tests

Run very simple performance tests with `npm run benchmark`.


## Mock data

`db/create-mocks.ts` is a script to help generate device coordinates and link station data. `npm run create-mocks` runs this script.

Pass a whole number to `createMockStations` to create an array of as many stations as you like.

Use the generated `mock-data.json` file directly in requests.


## Communicating with the remote Redis instance

`db/helper-script.ts` helps when we want to flush the DB, get keys, or set some. Manual tweaking is necessary.

This script does not use Fermyon APIs. It relies on the Redis library and takes the connection string via an environment variable named `REDIS`.

