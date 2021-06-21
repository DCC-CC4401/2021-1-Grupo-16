# 2021-1-Grupo-16

Bazar project.

## Running the app

First, create a PostgreSQL user `postgres` with password `grupo16`, and an empty
database named `bazardb`.

For running the app, execute the following commands in a terminal shell:

```bash
python3 manage.py makemigrations stores users
python3 manage.py migrate
python3 manage.py runserver
```

Or run the simplified command:

```bash
python3 run.py
```

Then, head for http://127.0.0.1:8000/home/ for testing the app.