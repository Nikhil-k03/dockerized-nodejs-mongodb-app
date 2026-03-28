# dockerized-nodejs-mongodb-app
Full-stack Node.js application containerized with Docker, orchestrated using Docker Compose, and deployed via AWS ECR. Demonstrates end-to-end DevOps workflow including image building, container networking, and cloud deployment.

## 📌 Project Overview

This project demonstrates a complete end-to-end workflow of developing, containerizing, and deploying a full-stack web application using Docker and cloud technologies.

The application is built using Node.js and MongoDB, containerized using Docker, orchestrated with Docker Compose, and deployed through a private Docker registry using AWS ECR.

This project simulates a real-world development and deployment pipeline, covering everything from local development to container-based deployment.

---

## 🧱 Tech Stack

* Node.js (Backend)
* Express.js
* MongoDB (Database)
* Mongo Express (DB UI)
* Docker
* Docker Compose
* AWS ECR (Elastic Container Registry)

---

## 🏗️ Architecture Overview

<img width="1362" height="767" alt="Screenshot 2026-03-26 200910" src="https://github.com/user-attachments/assets/abae4d63-b6a2-49ff-85f6-a19af9bf39f0" />

🔍 Workflow Explanation

This diagram illustrates the end-to-end workflow of building, containerizing, and deploying a modern application using Docker and CI/CD practices.

-> The application is developed locally using JavaScript and MongoDB.
-> Code is pushed to a version control system (Git), triggering a CI pipeline (e.g., Jenkins).
-> The CI pipeline builds the application and creates a Docker image.
-> The Docker image is pushed to a container registry (such as Docker Hub or AWS ECR).
-> A development server pulls the required images (application + database) from the registry.
-> The application is then deployed and runs in a containerized environment.

This workflow represents a typical industry-standard DevOps pipeline, enabling consistent builds, easy deployment, and scalable infrastructure
---

## ⚙️ Project Setup & Execution (Workflow)

This section describes the step-by-step process followed to build, containerize, and deploy the application using Docker and AWS services.

---

## 🔹 1. Database Setup (MongoDB)

* Pulled the MongoDB image from Docker Hub
* Created and ran a MongoDB container with authentication enabled
* Exposed the database port for local access

<img width="1365" height="766" alt="Screenshot 2026-03-27 165627" src="https://github.com/user-attachments/assets/0c1f3009-28de-41bd-9b7a-d445fe2ace19" />


---

## 🔹 2. Database UI Setup (Mongo Express)

* Pulled Mongo Express image from Docker Hub
* Connected it to the MongoDB container
* Configured authentication using environment variables
* Accessed Mongo Express through browser for database visualization

<img width="1357" height="340" alt="Screenshot 2026-03-27 170243" src="https://github.com/user-attachments/assets/3e11185e-aa03-44a6-b03f-3172538959ae" />

<img width="1350" height="762" alt="Screenshot 2026-03-27 170541" src="https://github.com/user-attachments/assets/963ac809-3111-4ce0-99c3-1006bffe136a" />

---

## 🔹 3. Backend Application Setup

* Built a Node.js application using Express
* Implemented APIs for:

  * Fetching user profile (`/get-profile`)
  * Updating user profile (`/update-profile`)
* Connected application to MongoDB
* Verified functionality by running the app locally

<img width="597" height="680" alt="Screenshot 2026-03-27 191957" src="https://github.com/user-attachments/assets/4578718c-ec62-42fd-b31b-b50007e7b7b1" />

<img width="1188" height="681" alt="Screenshot 2026-03-27 172118" src="https://github.com/user-attachments/assets/d6c570ac-9e7d-44d8-867f-6f60e175edc7" />

<img width="1308" height="732" alt="Screenshot 2026-03-27 171909" src="https://github.com/user-attachments/assets/4a572beb-192a-4a6b-8afe-bae7589463e8" />

---

## 🔹 4. Containerizing the Application

* Created a Dockerfile for the Node.js application
* Used a Node base image to build a custom Docker image
* Installed dependencies and configured the application startup
* Built the Docker image successfully

---

## 🔹 5. Running Application in Docker

* Ran the Node.js application inside a Docker container
* Exposed application port to access it in browser
* Verified successful communication with MongoDB

<img width="1346" height="685" alt="Screenshot 2026-03-27 192011" src="https://github.com/user-attachments/assets/eaf976f7-6cf4-4a06-b5fa-9baf363c2858" />


---

## 🔹 6. Multi-Container Setup using Docker Compose

* Created a `docker-compose.yml` file
* Defined services for:

  * MongoDB
  * Mongo Express
  * Node.js application
* Used service names for container communication (instead of localhost)
* Started all services together using Docker Compose
* Verified that all containers were running and connected

<img width="1365" height="714" alt="Screenshot 2026-03-27 210557" src="https://github.com/user-attachments/assets/3b08914b-52e6-471e-9deb-858c78fca58f" />

<img width="1364" height="615" alt="Screenshot 2026-03-27 210735" src="https://github.com/user-attachments/assets/537d3705-bf98-495f-80fa-f928a73752af" />

<img width="1365" height="510" alt="Screenshot 2026-03-27 211654" src="https://github.com/user-attachments/assets/a851fcc2-e443-4149-9bfd-0b46d1a7118e" />

<img width="1145" height="665" alt="Screenshot 2026-03-27 231710" src="https://github.com/user-attachments/assets/bf62975e-baf1-48df-888f-fec765ac6432" />


---

## 🔹 7. Pushing Docker Image to AWS ECR

* Created a private repository in AWS Elastic Container Registry (ECR)
* Logged into AWS ECR using CLI
* Tagged the local Docker image with repository details
* Pushed the Docker image to the private registry

<img width="1301" height="611" alt="Screenshot 2026-03-28 002313" src="https://github.com/user-attachments/assets/80ef4d4c-c371-489b-a72a-cf497aa09105" />

<img width="1360" height="728" alt="Screenshot 2026-03-28 002346" src="https://github.com/user-attachments/assets/32bc6d5b-f999-47f5-84fb-a755aafaddd4" />

---

## 🔹 8. Deployment using ECR Image

* Pulled the Docker image from AWS ECR
* Ran the application container using the pulled image
* Verified that the application runs correctly using the remote image

---

## ✅ Final Outcome

* Fully functional full-stack application running in Docker containers
* MongoDB used as the backend database
* Mongo Express used for database management
* Multi-container setup managed using Docker Compose
* Application image stored and retrieved from AWS ECR


## 🧩 Problems Faced & Solutions

### 🔸 MongoDB Connection Issue

* **Problem:** Application stuck loading data
* **Cause:** Incorrect connection string (used `localhost`)
* **Solution:** Replaced with container service name (`mongo`)

---

### 🔸 Docker Build Failure (package.json not found)

* **Problem:** Docker build failed during `npm install`
* **Cause:** Wrong build context and folder structure
* **Solution:** Moved Dockerfile inside correct directory

---

### 🔸 Mongo Express Connection Error

* **Problem:** "Waiting for MongoDB" issue
* **Cause:** Incorrect container name / network mismatch
* **Solution:** Ensured both containers run in same network

---

### 🔸 Authentication Error in MongoDB

* **Problem:** Unauthorized access while updating data
* **Cause:** Missing authentication parameters
* **Solution:** Added credentials and `authSource=admin` in connection string

---

### 🔸 White Screen UI Issue

* **Problem:** UI not rendering
* **Cause:** Backend API not responding
* **Solution:** Fixed MongoDB connection and ensured API response

---

## 🧠 Key Learnings

* Docker containerization and image building
* Writing optimized Dockerfiles
* Multi-container management using Docker Compose
* Container networking using service names
* Debugging real-world issues in containerized environments
* Using AWS ECR for storing Docker images
* Understanding deployment workflows used in industry

---

## 🚀 Future Improvements

* Implement CI/CD pipeline (GitHub Actions / Jenkins)
* Deploy application on AWS EC2
* Add Docker volumes for persistent data storage
* Use Kubernetes for orchestration
* Improve security using environment variables and secrets

---

## 👨‍💻 Author

Nikhil Kumar

---

## ⭐ Acknowledgment

This project was built as part of hands-on learning and practical implementation of Docker and DevOps concepts.
