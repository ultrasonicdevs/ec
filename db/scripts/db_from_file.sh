#!/bin/bash

load_backup_from() {
    local path=$1
    local backup_name="$(basename $path)"
    docker cp $backup_full_path mongo_database:/data/backup.archive
    docker exec mongo_database sh -c 'exec mongorestore --archive=/data/backup.archive'
    docker exec mongo_database sh -c 'exec rm /data/tmp_backup'
}

start_db_container() {
    # Перемещение в корень проекта
    cd $current_script_location
    cd ..
    cd ..
    echo "$(pwd)"
    docker-compose -f ./compose-dev.yml start db
}

current_script_location=$(dirname $(realpath "$BASH_SOURCE"))
echo $current_script_location
backup_full_path="$(realpath $1)"
mongo_is_running="$(docker ps | grep mongo)"

if [ -z "$mongo_is_running" ]
then
    start_db_container
    load_backup_from $backup_full_path
    docker-compose -f ./compose-dev.yml stop db
else
    load_backup_from $backup_full_path
fi
