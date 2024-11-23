# Stage 1: Use the official Python image to build the backend
FROM python:3.11-alpine as base

# Set working directory inside the container
WORKDIR /usr/src/app

# Install system dependencies (e.g., build tools, MySQL client libraries)
RUN apk update && apk add --no-cache \
    build-base \
    libmysqlclient-dev \
    && rm -rf /var/cache/apk/*

# Copy the requirements file to install Python dependencies
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy all the source code to the container
COPY . .

# Expose the port that Flask app will run on
EXPOSE 5000

# Set environment variables for Flask app
ENV FLASK_APP=app.py
ENV FLASK_ENV=production
ENV MYSQL_HOST=db
ENV MYSQL_USER=root
ENV MYSQL_PASSWORD=rootpassword
ENV MYSQL_DATABASE=flask_db

# Command to run the Flask app (when the container starts)
CMD ["flask", "run", "--host=0.0.0.0", "--port=5000"]