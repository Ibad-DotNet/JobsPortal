
# .NET Build
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

# Publish
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./JobsPortal.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# Final Image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=publish /app/publish .
EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080
ENTRYPOINT ["dotnet", "JobsPortal.dll"]
