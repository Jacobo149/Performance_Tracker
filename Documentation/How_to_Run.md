
- Run npm ci
This will allow packages to be created without mutating the package-lock and package files.
This is by deleting node_modules and re-building based on the package-lock and package files (you only work with the dependencies you need).

docker run --name my-postgres -e POSTGRES_USER=myuser -e POSTGRES_PASSWORD=mypassword -e POSTGRES_DB=mydb -p 5432:5432 -d postgres

docker start my-postgres

node performance_table.js