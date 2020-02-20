from example.ExampleTask import ErrorTask, ExampleTask, LongerTask


class ServiceProvider:
    # ### example tasks exposed as services ###
    # ### remove if not needed ###
    def example_service(self):
        task = ExampleTask()
        task.start()
        return task.id

    def longer_task_service(self):
        task = LongerTask()
        task.start()
        return task.id

    def task_with_error_service(self):
        task = ErrorTask()
        task.start()
        return task.id

    # ### example tasks ###

    # expose your tasks here
