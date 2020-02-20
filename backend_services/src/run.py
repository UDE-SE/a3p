import logging

import zerorpc

from config import services_port
from services import ServiceProvider


logging.basicConfig(level=logging.DEBUG)

server = zerorpc.Server(ServiceProvider())
server.bind(f'tcp://0.0.0.0:{services_port}')
server.run()
