**See also: [Backend Repository](https://github.com/dostuffthatmatters/I14Worlds2021Backend)**

# Website for the I14 World-Championship 2021

### Technology Stack

* **Frontend: [React (JS)](https://reactjs.org/)**
* **Backend: [Flask (Python)](https://flask.palletsprojects.com/en/1.1.x/)**

<br/>

* **Using the [Heroku](https://www.heroku.com/) Pipline**
* **Hosted on [AWS](https://aws.amazon.com/de/)**

<br/>

* **File Storage with [Google Cloud Storage](https://cloud.google.com/products/storage)**
* **SQL Database by [Heroku Postgres](https://www.heroku.com/postgres)**

<br/>

* **Design Guideline by [Google Material](https://material.io/)**
* **React Design Components by [Material UI](https://material-ui.com/)**

<br/>

### Ideas for Improvement of the Technology Stack

1. Using **Typscript instead of Javascript** in react (better development experience, but still less support for ReactTS over ReactJS)

2. Switching **from Heroku Postgres to a more independent SQL Storage** solution (more independent from the heroku pipeline). Maybe Google Cloud SQL (I don't really need the flexibility of NoSQL in this project right now)

3. Maybe hosting the **whole app on the Google Cloud** instead of using the Heroku pipline. More control, but also more effort.

4. Definitely using **React Redux** - especially for the admin pages - to manage state transitions

5. Finding a solution to *display pdf's** rather than with "react-pdf" (and "pdf.js"). Currently only these two make up 59% of my bundle size ...


