import zerorpc

from config import backend_services_host, backend_services_port


class Services:
    def __enter__(self):
        c = zerorpc.Client()
        c.connect(f'tcp://{backend_services_host}:{backend_services_port}')
        self.c = c
        return c

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.c.close()
