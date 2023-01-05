#Services:
Frontend: react
Backend: nestjs
Queue: kafka (or other if you prefer) 
Database: mysql or mongodb (if required)

Task description:
Create a simple input box with number (e.g. 100000) of emails to send and send button in frontend, which calls the backend to trigger the process
The request handler should respond with some sort of job id / email sending id right away
The request handler adds the job in the Kafka queue (or other) 
Which eventually is picked up by workers to send emails. Note it doesn't need to send the actual email, just write a worker and comment out the last send part
Update the user browser with the status of how many emails are sent in near real time
User can close the browser and come back and should be able to see the status of a job
