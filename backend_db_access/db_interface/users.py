from db_interface import mongodb


def find_user_by_username(username):
    return mongodb.user.find_one({'username': username})


def find_all_users():
    return list(mongodb.user.find(projection={'authentication': False}))
