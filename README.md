# Performance_Tracker

## Project Design
This project is a performance tracker that will keep track of the type of tasks a user completed.
The tracker will then be able to report back metrics on the data input.
Examples of reports will be a line chart of the difficulty of tasks you complete, how much you have learned, etc.
This data can be viewed over time, in to show the user progress over time.

### Backend
The backend will contain a PostreSQL instance (run on a docker image) containing the following features
- date_completed (Date sql object)
- activity_description (Text Description of the activity completed)
- hours_spent (Float, representing the amount of time spent on the task)
- difficulty (Number on a scale of 1-10 representing the difficulty of the task)
- learning_score (Number on a scale of 1-10 representing how much was learned upon completing the task)

The backend will be fit with an API Server for handling all requests made from the frontend
- Get all entries in the table: GET
- Add a new entry to the table: POST
- Delete an entry by entry ID: DELETE

### Frontend
The frontend interface will be created using Next.js featuring a page to input tasks, 
and a page to view metrics based on the data gathered.


### Current tasks
- Testing
- Make it to Set Goal only changes when the button is pushed
- Improve UX
- Add Field For Wellness