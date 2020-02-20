import time

from tasks import Task


# ### example tasks ###

# ### delete file and folder if not needed ###

class ExampleTask(Task):
    def do_task(self):
        return 'This is the output of the ExampleTask.'


class LongerTask(Task):
    def do_task(self):
        for i in range(0, 50):
            self.update_progress(2*i, 'working ...')
            time.sleep(0.1)
        return 'This message should be returned after 5 seconds.'


class ErrorTask(Task):
    def do_task(self):
        for i in range(0, 25):
            self.update_progress(2*i, 'wait for it ...')
            time.sleep(0.1)
        raise Exception('This is a drill!')

# ### example tasks ###
