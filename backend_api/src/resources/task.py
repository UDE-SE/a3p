import json

from flask_restful import Resource
import redis

from config import redis_host, redis_port


r = redis.Redis(host=redis_host, port=redis_port)


class TaskResource(Resource):
    def get(self, task_id):
        task_object = r.get(task_id)

        if task_object is None:
            return {'msg': 'No task with given task id found.'}, 404
        else:
            return json.loads(task_object)
