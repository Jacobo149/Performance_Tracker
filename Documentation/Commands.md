
## Startup
Run npm ci
This will allow packages to be created without mutating the package-lock and package files.
This is by deleting node_modules and re-building based on the package-lock and package files (you only work with the dependencies you need).

docker run --name my-postgres -e POSTGRES_USER=myuser -e POSTGRES_PASSWORD=mypassword -e POSTGRES_DB=mydb -p 5432:5432 -d postgres

docker start my-postgres

node performance_table.js

## Running the server
need installed:
- express
- cors
- body-parser

- node api_server.js


## Testing DB API with Postman
GET:
- http://localhost:3000/performance/

DELETE:
- http://localhost:3000/performance/{id}

POST:
- http://localhost:3000/performance/2

Request body:
{
  "date_completed": "2024-12-05",
  "task_description": "Finish API",
  "hours_spent": 4.5,
  "difficulty": 3,
  "learning_score": 5
}

