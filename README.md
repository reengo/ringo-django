# SETUP DEV ENVIRONMENT

1. create a virtual environment

```
    python -m venv env
```

2. activate the environment

```
    source env/bin/activate
```

3. go to root directory

```
    cd ~/path/to/root-directory
    cd backend
```

3. install all dependencies: refer to backend/requirements.txt (make sure you are in venv)

```
   pip install -r requirements.txt 
```

4. run migrations

```
    python manage.py migrate
```

5. run server

```
python manage.py runserver
```

6. open a new tab to run front end then configure react front end

```
    cd ../frontend
    cp .env.example .env
```

7. open .env file and add credentials and install front end dependecies

```
    yarn
```

8. run react

```
    yarn dev
```

# RUN ON DOCKER COMPOSE FOR DEVELOPMENT (HOT RELOAD FOR REACT AND DJANGO)

1. navigate to root directory

```
    cd ~/path/to/root-directory
```

2. build images

```
    cd backend 
    docker build -t ringo-django .
    cd ../frontend
    docker build -t ring-react .
```

3. run docker compose

```
    cd ~/path/to/root-directory
    docker compose up --build
```

4. view site on localhost:3000



# DOCKER COMPOSE PROD

1. navigate to root directory

```
    cd ~/path/to/root-directory
```

2. copy .env file and modify credentials for prod

```
    cp .env.example .env
```

3. build and run server

```
    docker compose -f compose.prod.yml up --build -d
```


# DROP SERVERS AND VOLUMES WHEN NEEDED

1. down servers and remote volumes

```

```