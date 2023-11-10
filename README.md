Steps to start:
1) change name of env.example to .env, one in root of folder and one in each service
2) Open ternimal and run command: **yarn** ,  to install node_modules
3) After installing node_modules, run command  **docker-compose up --build**, and wait for docker to start all required services
4) Now run command **npx prisma migrate dev** to run all migrations

Now you are ready to hit all end points 

# How kafka is implemented in project

there is a route in product controller create-order, on hitting this route kafka event is triggered and is consumed in order controller to create a new order, you can also generate a new order by hitting order route.