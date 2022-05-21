# EasyCompare

EasyCompare - веб приложение, в котором можно осуществлять поиск товаров при помощи фасетов. Фасеты создаются пользователем.

Запуск:
 1. Установите MongoDB:
`https://docs.mongodb.com/manual/installation/`
2. Склонируйте репозиторий:
`git clone https://github.com/Wayodeni/ec.git`
3. Перейдите в директорию web в корне проекта:
`cd ec/web`
4. Создайте виртуальное окружение:  
Windows:  
`python -m venv venv`  
Linux:  
`python3 -m venv venv`  
5. Активируйте виртуальное окружение:  
Windows:  
`venv/Scripts/activate.bat`  
Linux:  
`source venv/bin/activate`  
6. Установите необходимые зависимости:  
`pip install -r requirements.txt`
7. После окончания установки запустите тестовый сервер:  
Windows:  
`python easycompare/manage.py runserver 0.0.0.0:8000`  
Linux:  
`python3 easycompare/manage.py runserver 0.0.0.0:8000`  
8. Перейдите на один из следующих адресов:  
`http://localhost:8000/`  
`http://localhost:8000/ec-admin/`  
`http://localhost:8000/user-admin/`   
