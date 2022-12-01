# Project 1 report

Write the project report here. Do not include your personal
details (e.g. name or student number).

For running the project 
sudo docker-compose up --build                                                                                                                                                                                       
There are three projects running.
1. Deno-oak app running on http://localhost:7777/
2. Node-Express app running on http://localhost:8000/
3. Python-FastAPI app running on http://localhost:5000/

For testing the project
1. Run the program with sudo docker-compose up --build
2. Open second terminal and go to tests folder
2. use the commands below
docker run --add-host=host.docker.internal:host-gateway -i loadimpact/k6 run - <oakGet.js; 
docker run --add-host=host.docker.internal:host-gateway -i loadimpact/k6 run - <oakPost.js;
docker run --add-host=host.docker.internal:host-gateway -i loadimpact/k6 run - <oakRandom.js;
docker run --add-host=host.docker.internal:host-gateway -i loadimpact/k6 run - <oakRedirect.js; 
docker run --add-host=host.docker.internal:host-gateway -i loadimpact/k6 run - <expressGet.js;
docker run --add-host=host.docker.internal:host-gateway -i loadimpact/k6 run - <expressPost.js;
docker run --add-host=host.docker.internal:host-gateway -i loadimpact/k6 run - <expressRandom.js; 
docker run --add-host=host.docker.internal:host-gateway -i loadimpact/k6 run - <expressRedirect.js;
docker run --add-host=host.docker.internal:host-gateway -i loadimpact/k6 run - <fastapiGet.js;
docker run --add-host=host.docker.internal:host-gateway -i loadimpact/k6 run - <fastapiPost.js; 
docker run --add-host=host.docker.internal:host-gateway -i loadimpact/k6 run - <fastapiRandom.js;
docker run --add-host=host.docker.internal:host-gateway -i loadimpact/k6 run - <fastapiRedirect.js;

Test results:
Test were made with 10 seconds of request with 10 concurrent users.
Oak Get:
2703.454276 requests per sec 
http_req_duration: avg=3.6ms  min=1.78ms med=3.47ms p(95)=4.93ms p(99)=6.41ms     

Oak Post:
643.804359 requests per sec  
http_req_duration: avg=3.6ms  min=1.78ms med=3.47ms p(95)=4.93ms p(99)=6.41ms     

Oak Random: 
46.852987 requests per sec  
http_req_duration: avg=206.33ms min=21.18ms  med=205.52ms p(95)=487.51ms p(99)=520.41ms  

Oak Redirect:
72.822129 requests per sec
http_req_duration: avg=134.75ms min=2.54ms   med=22.86ms  p(95)=480.93ms p(99)=510.57ms   


Express Get:
1458.35433 requests per sec
http_req_duration: avg=6.75ms  min=2.16ms med=6.52ms p(95)=12.24ms  p(99)=17.6ms  

Express Post: 
623.409348 requests per sec
http_req_duration: avg=15.87ms min=11.79ms med=14.82ms p(95)=21.24ms  p(99)=30.34ms 

Express Random:
69.964704 requests per sec
http_req_duration: avg=140.55ms min=17.47ms  med=24.82ms  p(95)=468.31ms p(99)=508.83ms  

Express Redirect:
72.654178 requests per sec
http_req_duration: avg=133.29ms min=2.64ms   med=23ms     p(95)=469.21ms p(99)=507.72ms   


FastAPI Get:
762.57813 requests per sec
http_req_duration: avg=12.93ms min=2.2ms  med=6.35ms  p(95)=56.7ms  p(99)=65.15ms   

FastAPI Post:
290.979064 requests per sec
http_req_duration: avg=34.04ms min=5.42ms med=21.86ms p(95)=72.39ms p(99)=81.9ms      

FastAPI Random:
41.173496 requests per sec
http_req_duration: avg=234.54ms min=21.06ms med=263.17ms p(95)=497.85ms p(99)=567.02ms   

FastAPI Redirect:
41.173496 requests per sec
http_req_duration: avg=308.77ms min=0s       med=179.35ms p(95)=687.67ms p(99)=815.57ms  

Test results
It seems like Oak was overall the fastest with express as the second fastest.

Brief suggestions for improving the performance of the applications:
To improve the sites performance I would increase database pool size to increase the amount of current users.
Also the use of load balancer could be beneficial when scaling the application further.
Also I would further investigate what are the best practises when querying data from databases for all the technologies used.
As the /random endpoint was the slowest, there could be improvement for getting a random address where to redirect.
Also as the size of database data affects the performance, There should be possibility to delete unrelevant rows from the database.
Database design could also be improved with indexing to make queries faster. 