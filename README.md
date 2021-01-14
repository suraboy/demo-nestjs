NestJS Do SCG
======

NOTE
----
Assignment SCG, by NestJS framework in implement project.

Application flow pattern:
---------------------
https://github.com/suraboy/nestjs-do-scg

Run the docker for development:
---------------------
First you need to copy `.env.local` to `.env` for setup environment of appplication

You can start the application and run the containers in the background, use following command inside project root:

```bash
docker-compose up -d
```

Installing Dependencies via Composer
------------------------------------
Run the composer installer:

```bash
docker exec -it nestjs-do-scg npm install
```
or
```bash
docker exec -it nestjs-do-scg npm update
```

Running Application
------------------------------------
Open the browser
```bash
http://localhost:6319
```
