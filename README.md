# sōshen Open Source
sōshen boosts developer efficiency and productivity by furnishing them with an extensible foundation for managing and monitoring their applications' blockchain interactions (for now, only Cardano is supported, but more can be easily added).

sōshen consists of the following three components:

- **Dashboard**. A mobile-friendly web application that provides an intuitive user interface for creating and managing projects and tracking their blockchain requests
- **Dashboard API Server**. A server application that handles inbound HTTP requests from the dashboard application and reads and writes data to the databases accordingly
- **Node API Server**. A server application that checks inbound HTTP requests for valid project credentials and updates the stats database, before forwarding them to a Cardano full node API (currently, sōshen is set up for use with Project Icarus)

## Running your very own sōshen

1) Install Docker and Docker Compose

> Docker

We've containerized sōshen's components using Docker so that you won't have to install the project's dependencies one-by-one (Node.js, PostgreSQL, etc.). Follow the instructions at the official Docker website to install Docker: [https://docs.docker.com/install/](https://docs.docker.com/install/).

> Docker Compose

By using Docker Compose, we'll be able to orchestrate the build and run steps for each of our application's containers with a single command. Follow the instructions on the official Docker website to install Docker Compose [https://docs.docker.com/compose/install/](https://docs.docker.com/compose/install/).

---

2) Clone the GitHub code repository to your machine

If you don't already have git, you can follow [https://www.atlassian.com/git/tutorials/install-git](https://www.atlassian.com/git/tutorials/install-git) well-written instructions from Atlassian (make sure to scroll to the section for your OS).

After installing git, run the following command to clone the repo and enter the repo directory:

`git clone [repo] && cd [repo]`

---

3) Run sōshen

`docker-compose up`

It may take a few minutes, but that's it! After all the containers are running, you can visit the dashboard at [http://localhost:8100](http://localhost:8100).
