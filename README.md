# Exercise

NodeJS has a managed packages environment called `npm`. A package is a
functional NodeJS module with versioning, documentation, dependencies (in the
form of other packages), and more.

This repository contains a NodeJS server with a `/package` endpoint. When
passed a package name and version, the endpoint returns the dependencies of that
package.


## Prerequisites

* [Node v12 LTS](https://nodejs.org/download/release/latest-v12.x/)
* [Docker Desktop installed](https://www.docker.com/products/docker-desktop)

## Getting Started

At the project root run:
```docker-compose up --build
```

Then you can try the `/package` endpoint. 
```sh
curl -s http://localhost:4001/package/react/16.13.0 
```



## Missing Things (in order to make it production ready: 

- Returns only naive version (doesn't consider the [Semantic Versioning](https://semver.org/) ) 
- A proper logger
- Metrics (e.g - amount of incoming requests, request time handling etc.. )
- Tests unit tests - with mocking the Redis && e2e tests with a dedicated docker for testing 
- Load tests for being sure about scaling possibilities
- Healthcheck route 
- Adding the most frequently requested packages to cache (their entire tree structure)
- Compress the json before sending the response
- Better error handling
