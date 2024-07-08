# Fetching official base image for python
FROM python:3.9-alpine

# Setting up the work directory
WORKDIR /app

# Preventing python from writing pyc files to docker container
ENV PYTHONDONTWRITEBYTECODE 1
# Flushing out python buffer. Prevents Python from buffering stdout and stderr 
ENV PYTHONUNBUFFERED 1

# Updating the os
RUN apk update
# install system dependencies
RUN apk add postgresql-dev gcc python3-dev musl-dev jpeg-dev zlib-dev libffi-dev

# Upgrading pip version
RUN pip install --upgrade pip

# copying requirement.txt file to working directory
COPY requirements.txt ./

# Installing dependencies
RUN pip install --no-cache-dir -r requirements.txt

# copying all the files to working directory
COPY . .