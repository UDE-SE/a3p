import hashlib
import uuid


class Authentication:
    def __init__(self, password):
        self.version = 1
        self.type = 'password'
        self.password_salt = uuid.uuid4().hex
        self.password_salt.encode('utf-8')
        salted_password = (password + self.password_salt).encode('utf-8')
        self.password_hash = hashlib.sha3_512(salted_password).hexdigest()


def is_password_correct(password, salt, hash_value):
    salted_password = (password + salt).encode('utf-8')
    hashed_password = hashlib.sha3_512(salted_password).hexdigest()
    return hashed_password == hash_value


class Roles:
    USER = 'user'
    ADMIN = 'admin'


class User:
    def __init__(self, username, firstname, lastname, email, roles, authentication):
        self.username = username
        self.firstname = firstname
        self.lastname = lastname
        self.email = email
        self.roles = roles
        self.authentication = authentication
