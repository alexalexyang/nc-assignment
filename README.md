# Code assignment scope

## Intro

Having tested and recruited software engineers myself I know:

- Code assignments for assessing candidates tend to be sparsely written

- It is difficult for candidates to scope code assignments as reviewers have a wide range of expectations

- Candidates also craft a wide variety of responses, which affect reviewers' expectations on a rolling basis

In other words, as a candidate, I have to make some assumptions about the assigned problem and about reviewers' expectations before I can propose a solution that both highlights a subset of my skills and fits into my time constraints.

Moreover, with most clients, many requirements and assumptions are implicit and unsaid. We tend to open discussions with them to figure these out because we need to be as explicit about them as possible in order to properly allocate time and resources.

Hence, just as in a real client engagement I begin by listing as explicitly as possible the assumptions, requirements, and scope of the task.

For this link station assignment, I've identified one explicit requirement from the text (aside from core business logic) and inferred several others based on prior experience.


## Initial assumptions, requirements, and scope

This section aligns client and team on the basic expectations of the product. This is only a first draft and may change as discussions progress.

- Objective: build an MVP
  - All assumptions, requirements, and scope follow from this objective

- Algorithm
  - Possibly: version of KNN
  - Text says it __can__ be solved in 2D space but it seems more realistic to solve in 3D space. Was the text a red herring? Sneaky.

- Link station locations are persistent
  - I.e., we can save them to a persistent storage for reuse
  - More persistent than device locations

- Device locations are persistent
  - I.e., we can save them to a persistent storage for reuse but may have to account for staleness

- No need to account for staleness of data

- Key-value store for persistent storage
  - Simple query by composite key of coordinates may be sufficient at this time
    - More complex requirements might need relational or graph DBs or something else, which would be slower than key-value stores for the current case
  - Can be in-memory
    - Which means persistent at least for a while
    - Probably will use Redis, which does offer options to write to disk
  - (I might not implement persistent storage. Depends on time constraint.)

- Simple REST API that accepts JSON for input data is good enough
  - Express.js back end
  - No front end

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

## Conclusion

While I've kept the job profile in mind, I've scoped this task based on what I feel is most optimal for it. I've made decisions such as not using Python or the hyperscalers, which would fit the job profile better.

Feel free to tell me what to drop, what to focus on, what to change, or anything else.

If there are no comments, I will take it as assent and proceed to refine and build out the solution.