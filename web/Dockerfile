FROM python:3.10 AS development_env
EXPOSE 8000
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
WORKDIR /code
COPY ./requirements.txt .
RUN pip install -r requirements.txt && rm ./requirements.txt

FROM development_env AS production_img
COPY ./easycompare/* .