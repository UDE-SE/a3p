from functools import wraps

from flask import request
from flask_jwt_extended import create_access_token, get_jwt_claims, get_jwt_identity, verify_jwt_in_request
from flask_restful import Resource

from db_interface.user_model import is_password_correct, Roles
from db_interface.users import find_user_by_username


def get_identity():
    return get_jwt_identity()


def admin_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        verify_jwt_in_request()
        claims = get_jwt_claims()
        if Roles.ADMIN not in claims['roles']:
            return {'msg': 'Missing authorization as admin.'}, 403
        else:
            return fn(*args, **kwargs)
    return wrapper


def user_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        verify_jwt_in_request()
        claims = get_jwt_claims()
        if Roles.USER not in claims['roles']:
            return {'msg': 'Missing authorization as user.'}, 403
        else:
            return fn(*args, **kwargs)
    return wrapper


class AuthResource(Resource):
    def post(self):
        body = request.get_json()

        if 'username' not in body or 'password' not in body:
            return {'msg': 'Username or password are missing.'}, 422
        username = body['username']
        password = body['password']

        user_found = find_user_by_username(username)
        if user_found is None:
            return {'msg': 'Bad username or password.'}, 401
        else:
            user = user_found

        salt = user['authentication']['password_salt']
        hash_value = user['authentication']['password_hash']
        if is_password_correct(password, salt, hash_value):
            claims = {'roles': user['roles']}
            return {
                'token': create_access_token(username, user_claims=claims),
                'user': {
                    'firstname': user['firstname'],
                    'lastname': user['lastname'],
                    'roles': user['roles']
                }
            }
        else:
            return {'msg': 'Bad username or password.'}, 401
