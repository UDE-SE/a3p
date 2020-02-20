from datetime import datetime
import io
import logging
from zipfile import ZipFile

import gridfs
from influxdb import DataFrameClient, InfluxDBClient
import pandas as pd
import requests
from pymongo import MongoClient

from .user_model import Authentication, Roles, User


logging.basicConfig(level=logging.DEBUG)

mongo_host = 'mongo'
mongo_port = 27017
influx_host = 'influx'
influx_port = 8086

mongo_client = MongoClient(f'mongodb://{mongo_host}:{mongo_port}/')
mongodb = mongo_client.database
fs = gridfs.GridFS(mongodb)

influx_df_client = DataFrameClient(influx_host, influx_port, 'root', 'root', 'database')
influx_client = InfluxDBClient(influx_host, influx_port, 'root', 'root', 'database')


def init():
    init_influx()
    init_mongo()


def init_influx():
    # ### example implementation ###
    # ### remove if not needed ###
    if 'database' not in influx_df_client.get_list_database():
        influx_df_client.create_database('database')

    if {'name': 'essen_temperatures'} not in influx_df_client.get_list_measurements():
        # 10 minute values
        url = ('https://opendata.dwd.de/climate_environment/CDC/observations_germany/climate/'
               '10_minutes/air_temperature/historical/10minutenwerte_tu_01303_20100101_20191231_hist.zip')
        zip_file = requests.get(url).content
        archive = ZipFile(io.BytesIO(zip_file), mode='r')
        with archive.open('produkt_zehn_min_tu_20100101_20191231_01303.txt') as text_file:
            df = pd.read_csv(text_file, sep=';', usecols=[1, 4], parse_dates=[0],
                             date_parser=lambda x: datetime.strptime(x, '%Y%m%d%H%M'))

        df.columns = ['time', 'temperature']
        df = df.set_index('time')
        influx_df_client.write_points(df, 'essen_temperatures', batch_size=100_000)
    # ### example implementation ###


def init_mongo():
    if mongodb.user.count() == 0:
        mongodb.user.create_index('username', unique=True)
        admin_user = User(username='admin', firstname='Admin', lastname='Admin',
                          email='admin@example.com', roles=[Roles.USER, Roles.ADMIN],
                          authentication=vars(Authentication(password='admin')))
        normal_user = User(username='user', firstname='User', lastname='User',
                           email='user@example.com', roles=[Roles.USER],
                           authentication=vars(Authentication(password='user')))
        logging.info('Default users created.')
        mongodb.user.insert_one(vars(admin_user))
        mongodb.user.insert_one(vars(normal_user))
    create_mongo_indices()


def create_mongo_indices():
    # iterate through resources to create indices
    pass
