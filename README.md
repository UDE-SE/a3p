# Adaptive Analysis Application Platform (A3P)

Fancy web application for doing things and stuff.



## Development

### Requirements

* docker (docker-engine >= 18.06.0)
* docker-compose >= 1.22.0
* node.js >= 12
* python >= 3.7

### How to Set Up a Development Environment

0. Fulfill requirements

1. Clone repository

2. Create virtual environment with python (e.g. in `/venv`)

3. **Activate virtual environment**

   > Each time you execute python you should have the virtual environment activated. Those steps will be marked with (**venv**).

4. (**venv**) Run `pip install -r requirements.txt`

5. (**venv**) Run `python setup.py install` in `/backend_db_access` 

6. Run `npm install` in `/frontend`

7. Add the following lines to hosts

   ```
   127.0.0.1 mongo
   127.0.0.1 redis
   127.0.0.1 influx
   127.0.0.1 services
   ```

### How to Start a Development Build

1. Run `docker-compose up -d` in `/infrastructure`

   > This will start mongodb (`localhost:27017`), influxdb (`localhost:8086`) and redis (`localhost:6379`).

2. (**venv**) Run `python run.py` in `/backend_services/src`

   > This will start the services backend, which is reachable at `localhost:4242`.

3. (**venv**) Run `python run.py` in `/backend_api/src`

   > This will start the backend, which is reachable at `localhost:5000`.

4. Set the following environment variable

   ```
   REACT_APP_API_URL=http://localhost:5000
   ```

5. Run `npm run start` in `/frontend`

   > This will start the frontend, which is reachable at `localhost:3000`.

### How to Start a Local Docker Build

1. Clone repository

2. Run `docker-compose up -d` in `/docker/a3p`

   > This will build all the necessary docker images the first time it's executed.
   >
   > The backend and frontend will be reachable at `localhost`. You can find the ports in the `.env ` file: `DEV_API_PORT` for the backend and `DEV_FRONTEND_PORT` for the frontend.



## Production

### Requirements

* docker (docker-engine >= 18.06.0)
* docker-compose >= 1.22.0
* server running linux
* traefik >= 2.0

This guide assumes you use traefik as the edge router on your server. For other edge routers follow their respective instructions.

### How to Deploy

0. Fulfill requirements

1. Clone repository

2. Traefik needs to be connected to the various docker containers.

   * If traefik is already connected to a docker network (say `tnet`):

     Change the value of `HOST_GATEWAY_NETWORK` in `/docker/a3p/.env` to `tnet`

   * If traefik isn't connected to any docker network:
     1. Run `docker network create gateway`
     2. Connect traefik to the created network `gateway` (e.g. via the `docker-compose.yml` file of traefik)

3. Change the value of `HOST_URL` to the domain your server should be reachable at

4. Adjust the values of `HOST_API_PORT` and `HOST_FRONTEND_PORT` if you plan to run multiple instances on the server.

5. Execute `docker-compose.sh up -d` in `/docker/a3p`

### Tips

If you want to execute other commands with `docker-compose`, use the shell script `docker-compose.sh` in production, e.g.

```
docker-compose.sh build
```

