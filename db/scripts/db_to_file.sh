#!/bin/bash

save_backup_to() {
    local path=$1
    docker exec mongo_database sh -c 'exec mongodump --archive' > $path
}

start_db_container() {
    # Перемещение в корень проекта
    cd $current_script_location
    cd ../..
    
    docker-compose -f ./compose-dev.yml start db
}

current_script_location=$(dirname $(realpath "$BASH_SOURCE"))
backup_save_path="$(realpath $1)"
backup_name=$2
mongo_is_running="$(docker ps | grep mongo)"

if [ -z "$backup_save_path" ]
then
    backup_save_path=$current_script_location
fi

if [ -z "$backup_name" ]
then
    backup_name="mongodb_backup_$(date +"%H_%M_%S_%d_%m_%y").archive"
fi

backup_full_path="$backup_save_path/$backup_name"

if [ -z "$mongo_is_running" ]
then
    start_db_container
    save_backup_to $backup_full_path

    docker-compose -f ./compose-dev.yml stop db
else
    save_backup_to $backup_full_path
fi
