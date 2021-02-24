import json

from flask import request
from flask_restful import Resource
from webargs import fields
from webargs.flaskparser import parser

from db_interface import example
from resources.user import admin_required, user_required
from services import Services


# ### example implementation ###

# ### delete file if not needed ###


class PublicResource(Resource):
    def get(self):
        return 'This is a message for all people.'


class NormalResource(Resource):
    @user_required
    def get(self):
        return 'This is a message only for users.'


class SecretResource(Resource):
    @admin_required
    def get(self):
        return 'This is a message only for admins.'


class MessageResource(Resource):
    _user_args = {
        'param': fields.Str(required=True, validate=lambda x: x in ['short', 'long', 'error'])
    }

    def get(self):
        args = parser.parse(self._user_args, request, location='query')
        param = args['param']

        if param == 'short':
            with Services() as services:
                task_id = services.example_service()
                return {'task_id': task_id}
        elif param == 'long':
            with Services() as services:
                task_id = services.longer_task_service()
                return {'task_id': task_id}
        elif param == 'error':
            with Services() as services:
                task_id = services.task_with_error_service()
                return {'task_id': task_id}
        else:
            # should never occur
            return 'wtf', 422


class TemperatureResource(Resource):
    _user_args = {
        'start': fields.Str(missing=None),
        'end': fields.Str(missing=None)
    }

    def get(self):
        args = parser.parse(self._user_args, request, location='query')
        start = args['start']
        end = args['end']
        return json.loads(example.get_temperatures(start, end).to_json())

# ### example implementation ###
