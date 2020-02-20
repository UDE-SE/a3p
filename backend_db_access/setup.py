from setuptools import setup

setup(name='a3p_database',
      version='1.0',
      description='database access for A3P',
      author='SE',
      author_email='se@uni-due.de',
      packages=['db_interface'],
      install_requires=['influxdb', 'pandas', 'pymongo', 'requests'])
