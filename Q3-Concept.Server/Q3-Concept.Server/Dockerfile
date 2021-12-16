
FROM mcr.microsoft.com/dotnet/aspnet:5.0-buster-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:5.0-buster-slim AS restore


WORKDIR /src
COPY ["Q3-Concept.Server.sln", "Q3-Concept.Server/"]
RUN dotnet restore "Q3-Concept.Server/Q3-Concept.Server.sln"
COPY . .
WORKDIR /src

FROM restore AS build
RUN dotnet build "./Q3-Concept.Server.sln" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "./Q3-Concept.Server.sln" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Q3-Concept.Server.dll"]