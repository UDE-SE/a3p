FROM python:3.7-slim
WORKDIR /opt/a3p
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

WORKDIR /opt/a3p/dblib
COPY backend_db_access .
RUN python setup.py install

WORKDIR /opt/a3p/services
COPY backend_services .

WORKDIR /opt/a3p/services/src
CMD python3 run.py
EXPOSE 4242
