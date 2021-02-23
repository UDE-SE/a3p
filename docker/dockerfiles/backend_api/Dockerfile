FROM tiangolo/uwsgi-nginx:python3.7
ARG PRODUCTION

ENV UWSGI_INI /opt/a3p/uwsgi.ini
ENV UWSGI_CHEAPER=""
ENV UWSGI_PROCESSES 1

WORKDIR /opt/a3p
COPY ./docker/dockerfiles/backend_api/uwsgi.ini .

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

WORKDIR /opt/a3p/dblib
COPY backend_db_access .
RUN python setup.py install

WORKDIR /opt/a3p/api
COPY backend_api .

WORKDIR /opt/a3p/api/src
ENV A3P_PRODUCTION $PRODUCTION
EXPOSE 80
