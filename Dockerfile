# This stage is used to build the service project
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["JobsPortal/JobsPortal.csproj", "JobsPortal/"]
COPY ["ApplicationLayer/ApplicationLayer.csproj", "ApplicationLayer/"]
COPY ["DomainLayer/DomainLayer.csproj", "DomainLayer/"]
COPY ["InfrastructureLayer/InfrastructureLayer.csproj", "InfrastructureLayer/"]
RUN dotnet restore "./JobsPortal/JobsPortal.csproj"
COPY . .
WORKDIR "/src/JobsPortal"
RUN dotnet build "./JobsPortal.csproj" -c $BUILD_CONFIGURATION -o /app/build

# This stage is used to publish the service project to be copied to the final stage
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./JobsPortal.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

#Final runtime image (fixed!)
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "JobsPortal.dll"]
