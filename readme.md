### Install mssql using docker
https://hub.docker.com/_/microsoft-mssql-server
docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=@passwordSafe111" -e "MSSQL_PID=Express" -e "MSSQL_DB=payment_test_db" -p 1433:1433 --name mssql -d mcr.microsoft.com/mssql/server:2017-latest-ubuntu