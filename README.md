# horseRace

# horseRace

1) To install the the dependency :- 

    npm install 

2) to run the project :- 

    npm start

3) to run the docker-compose file 

    docker-compose up

4) hit one api which is post api

    http://localhost:8080/api/

    req body :
    {
        email:"shubhsawant07@gmail.com"
        password:"**********"
    }


5) Key points :

    Project structure as per the industry based 
    project made in typescript environment 
    added docker-compose file for mongo (it will create mongo container in docker)
    added Joi validator for validation 
    added logger for this i have used chalk for better presentation (i can use winston and other logger as well)
    setup .env file and fetching the port number from there 
    added controller , model and router 
    commenting in every line 
    tried to use es6 features 
    created api gateway for calling the api 
    implemented worker thread 
    setup mongodb and saving data into in 
    when you run the project database will automatically created in your local mongo environment and collection will create
    
