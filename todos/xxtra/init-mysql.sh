#!/bin/bash -x

# QUERY="create table `todos` ()"
# develop -e "${QUERY}"
DB=${1:-develop}
SQL=${2:-init-query.sql}

mysql -h 127.0.0.1 -u dev -pdev $DB < $SQL
