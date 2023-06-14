# REST MUSIC API

- In this project i building an rest api using Node.js, Express, Docker and Postgres.

## To run the front end of this project 

1. Clone the repository

```
https://github.com/MatiasGonzalez1/sirius-training-back
```

2. Enter the back end project directory:

```
cd sirius-training-back
```

3. Install the dependencies:
```
npm install
```
4. create a .env file in the root directory with the next info:

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5434/music?schema=public"
PORT=3000
```

5. Run Docker Aplication.

6. Create and up the container:

```
docker compose up
```
 7. Run the project:

```
npm run dev
```