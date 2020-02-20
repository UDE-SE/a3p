import logging
import time

from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_restful import Api
from requests.exceptions import ConnectionError

from config import api_port, flask_config
from db_interface import init as init_db
from resources.example import PublicResource, NormalResource, SecretResource, MessageResource, TemperatureResource
from resources.task import TaskResource
from resources.user import AuthResource


logging.basicConfig(level=logging.DEBUG)

app = Flask(__name__)

for key in flask_config:
    app.config[key] = flask_config[key]

cors = CORS(app, resources={'/api/*': {'origins': '*'}})
api = Api(app, prefix='/api/1')
jwt = JWTManager(app)


api.add_resource(TaskResource, '/service/task/<string:task_id>')


# ### example resources ###

# ### delete if not needed ###

api.add_resource(PublicResource, '/pub')
api.add_resource(NormalResource, '/norm')
api.add_resource(SecretResource, '/secret')
api.add_resource(MessageResource, '/msg')
api.add_resource(TemperatureResource, '/temperature')

# ### example resources ###


# add API resources here

api.add_resource(AuthResource, '/auth')


for _ in range(0, 18):
    try:
        init_db()
        break
    except ConnectionError:
        logging.warning('Initializing database failed. Retry ...')
        time.sleep(10)


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=api_port)
