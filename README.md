# Adaptive Analysis Application Platform (A3P)

Fancy web application for doing things and stuff.

## Requirements

* docker, docker-compose
* linux shell
* node.js, npm
* python3

## How to make a fresh dev build

0. Fulfill requirements

1. Clone repository

2. `cd` into the project folder

3. Create virtual environment with python (e.g. in `/venv`)

4. Add the following lines to hosts

    ```
    127.0.0.1 mongo
    127.0.0.1 redis
    127.0.0.1 influx
    127.0.0.1 services
    ```

5. Run `. start_containers.sh` in `/infrastructure`

6. **Activate virtual environment**

7. Run `pip install -r requirements.txt` in the project folder

8. Run `python setup.py install` in `/backend_db_access`

9. Run `python run.py` in `/backend_services/src`

10. Run `python run.py` in `/backend_api/src`

11. Run `npm install -g create-react-app`

12. Run `npm install` in `/frontend`

13. Run `npm run start` in `/frontend`

## How to make a docker build

1. `cd` into the project folder
2. Run `. build_images.sh`
3. Run `docker-compose up`
