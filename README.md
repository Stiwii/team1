

# Guide

1. Enter credentials
2. run the migrations
3. run the seeds

## Enter credentials

The .env.example file shows the necessary keys
### Database
Use a connection url 
- dialect-Sequelize://Username_DB:Password_DB@Host_DB:Port_DB/name_DB
### JWT 
A secret word is required to encode the token
### SERVER 
Need to add the domain for swagger use, it should be the full url

## run the migrations
- npx sequelize-cli db:migrate

## run the seeds
- npx sequelize-cli db:seed:all

roles, states, cities, countries, types of publications, tags are added

