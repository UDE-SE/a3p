from abc import abstractmethod
import json
import logging
from threading import Thread
import traceback
import uuid

import redis

from config import redis_host, redis_port


r = redis.Redis(host=redis_host, port=redis_port)


class Task(Thread):
    def __init__(self, task_id=None):
        super().__init__()
        self.id = str(uuid.uuid4()) if task_id is None else task_id

    @abstractmethod
    def do_task(self):
        pass

    def after_finish(self, error=False):
        pass

    def update_progress(self, progress_value, description=''):
        r.set(
            self.id,
            json.dumps({'status': progress_value, 'description': description}),
            ex=60
        )

    def run(self):
        self.update_progress(0)
        try:
            result = self.do_task()
            self.after_finish()
            if result is None:
                result = {}
            r.set(
                self.id,
                json.dumps({'status': 100, 'response': result, 'description': 'finished'}),
                ex=60*10
            )
        except Exception as ex:
            logging.exception(ex)
            traceback.print_exc()

            try:
                self.after_finish(error=True)
            except Exception as e:
                logging.exception(e)

            r.set(
                self.id,
                json.dumps({'status': 100, 'response': 'An error has occurred on the server.', 'description': 'error'}),
                ex=60*10
            )
