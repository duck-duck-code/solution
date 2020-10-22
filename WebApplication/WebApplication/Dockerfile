FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build-env

COPY . ./
WORKDIR ./WebApplication
RUN dotnet restore
RUN dotnet publish -c Release


FROM mcr.microsoft.com/dotnet/core/aspnet:3.1
WORKDIR /App
COPY --from=build-env ./WebApplication/bin/Release/netcoreapp3.1/publish/ .
ENTRYPOINT "dotnet WebApplication.dll --urls=http://*:$PORT"
