# To-Do Application (Spring Boot)

This is a simple To-Do application built using Spring Boot. It allows users to manage their daily tasks through basic CRUD operations. The project is designed to demonstrate backend development concepts such as REST APIs, database integration, and application structuring.

---

## Features

* Create new tasks
* View all tasks
* Update existing tasks
* Delete tasks
* Store task date and time

---

## Tech Stack

* Java
* Spring Boot
* Spring Data JPA
* MySQL or H2 Database
* Maven
* Lombok (optional)

---

## Project Structure

```
src/
 ├── main/
 │   ├── java/com/todo/
 │   │   ├── controller/
 │   │   ├── service/
 │   │   ├── repository/
 │   │   └── model/
 │   └── resources/
 │       ├── application.properties
```

---

## Setup Instructions

### Clone the repository

```
git clone https://github.com/your-username/todo-app.git
cd todo-app
```

### Open in Eclipse

* Go to File → Import
* Select Maven → Existing Maven Projects
* Choose the project folder

### Configure Database

#### H2 (for simple setup)

Add the following in `application.properties`:

```
spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.driverClassName=org.h2.Driver
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.h2.console.enabled=true
```

#### MySQL (optional)

```
spring.datasource.url=jdbc:mysql://localhost:3306/todo_db
spring.datasource.username=root
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
```

---

## Running the Application

* Locate the main class (`YourProjectApplication.java`)
* Right-click and run as a Java application

The server will start on:

```
http://localhost:8080
```

---

## API Endpoints

| Method | Endpoint    | Description        |
| ------ | ----------- | ------------------ |
| GET    | /tasks      | Retrieve all tasks |
| POST   | /tasks      | Create a task      |
| PUT    | /tasks/{id} | Update a task      |
| DELETE | /tasks/{id} | Delete a task      |

---

## Future Improvements

* Add user authentication
* Connect with a frontend (React or Flutter)
* Implement task reminders
* Deploy the application

---

## License

This project is open-source and available under the MIT License.
