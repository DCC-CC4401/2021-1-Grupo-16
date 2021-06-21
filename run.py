"""
Bazar.

Runs the app server.
"""

import os
from django.core.management import execute_from_command_line

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Bazar.settings')

execute_from_command_line(['', 'makemigrations', 'stores', 'users'])
execute_from_command_line(['', 'makemigrations'])
execute_from_command_line(['', 'migrate'])
execute_from_command_line(['', 'runserver'])
