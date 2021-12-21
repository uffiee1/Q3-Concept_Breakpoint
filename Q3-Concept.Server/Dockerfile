
FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

ENV ASPNETCORE_ENVIRONMENT=Development

FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR "/src"
COPY ["Q3-Concept.Server/Q3-Concept.Server/Q3-Concept.Server.csproj", "Q3-Concept.Server/Q3-Concept.Server/"]
COPY ["Q3-Concept.Server/Logic/Logic.csproj", "Q3-Concept.Server/Logic/"]
COPY ["Q3-Concept.Server/DataModel/Model.csproj", "Q3-Concept.Server/DataModel/"]
COPY ["Q3-Concept.Server/DAL/DAL.csproj", "Q3-Concept.Server/DAL/"]

RUN dotnet restore "Q3-Concept.Server/Q3-Concept.Server/Q3-Concept.Server.csproj"
COPY . .
WORKDIR "/src/Q3-Concept.Server/Q3-Concept.Server/"
RUN dotnet build "Q3-Concept.Server.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Q3-Concept.Server.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Q3-Concept.Server.dll"]