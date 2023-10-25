#### How to Push from github to azure repo

### For first time

#make sure azure account is setup with microsoft authenticator

#download latest git if you havent done already
#download azure cli

# add devops extention
az extension add --name azure-devops

#go to to base github repo
set-location "my github repo"

#set the organization and project as defaults in configuration.
az devops configure --defaults organization="https://dev.azure.com/RevAI/ project=revolutionai.io"

#go to you base github folder and pull DevOps "Main" branch
git pull "https://RevAI@dev.azure.com/RevAI/revolutionai.io/_git/revolutionai.io"



### Main Push Proccess

#set DevOps Org Repo Location
cd  <local  Org Repo Location>
#initialize github
git init 
#add all new files
git add .   
#commit and comment
git commit -m "initial commit"  
# push changes
git push "https://RevAI@dev.azure.com/RevAI/revolutionai.io/_git/revolutionai.io"

# push will pop a browser window to authenticate using azure & 2fa
# example powershell file will be created in root folder named azure_push_example.ps1


# RevolutionAI

### MongoDB - Express - React - Redux - NodeJS

## Getting started

### 1. Install npm modules
```bash
cd server
npm install
cd client
npm install
cd admin
npm install
```

### 2. Edit .env files

Edit all three .env files to meet your requirements

### 3. Start development servers

To start `server`, `client` run:

```bash
cd server
# Run the mongodb server
mongod --dbpath YOUR_DB_PATH
# Run server
npm start
# Run client
cd client
npm start
```






#Azure Repo hn3yh2bhj3ggdqqlxu2qeiov4hvmqh3qlbszcjk7z6u6jeygwza





