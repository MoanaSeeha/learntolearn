7.3258
ETH
kill -9 $(lsof -ti:9000)
30702
## repo

https://bitbucket.org/ameshkin/learn-to-earn/src/master/


## start

```

# quiz + site with webpack

npm run start


# push to heroku
git push heroku master

# find large files
find . -type f -exec ls -l {} + | sort -rk 5,5 | head -50



  
  

```


## MONGO DB
Atlas DB Cluster is free, so we havve to use version 4.4 mongodb

```shell

brew install mongodb-community@4.4.10


#start
brew services start mongodb-community@4.4.10

brew services stop mongodb-community@5.0

brew services start mongodb-community@5.0


```


Mongo db example
```

{
    "user" : "ameshkin",
    "address" : "0xE14a9C71C71d3Fa96f47037FB52775D6e1CD407d",
    "unclaimed_learn_amount" : 50
}

```



To start mongodb/brew/mongodb-community now and restart at login:
brew services start mongodb/brew/mongodb-community

Or, if you don't want/need a background service you can just run:
mongod --config /opt/homebrew/etc/mongod.conf


#### MONGODB ISSUES

Network error while attempting to run command 'getlasterror' on host


Check your versions. That may help.

I was having the same problem. In my case, the server was version 3.2.0-rc2, while mongo shell version was 3.2.1.

Upgrading the server to 3.2.1 fixed the problem.

// Supported on Free and Shared Tiers (M0, M2, M5)




### COMMON FUNCTIONS COMPONENTS




## MODALS
There are 4 types of modals

##### GENERIC_MODAL
src/components/Modal/GenericModalBootstrap.js

Pop up alert box with buttons

used in login page
/login

buy tests page
/tests




##### SIDE MODAL
For menu, claims, etc

##### NETWORK MODAL
src/components/Modal/ModalTestnet.js

Used by SubscribeProvider on network switches


##### QUIZ_MODAL
Dissapearing full screen for quizzes only


## NETWORK

#### SUBSCRIBE TO PROVIDER
src/components/Wallet/SubscribeProvider.js


#### Chec Network NOT USING
src/components/Moralis/CheckNetwork.js


##### Moralis Login

##### Secure Page

##### Subscribe Provider



### TESTS PAGE LOGIN FLOW

1. landing on page with wrong network
   1. switch network metmask opens, no modals
      1. Cancel
         1. Alert Box shows up with switch network button
      2. Switching to Polygon Mumbai
         1. Alert Box Goes away

2. Switch to Wrong Chain
   1. RED NETWORK MODAL SHOWS UP      



ISSUES

1. SWITCH TO ETHEREUM

### general todo list
LEARN

1. clear out unclaimed in learn_claims after a claim

2. when user logs in, take snapshot of data nd put into memory
   1. https://javascript.plainenglish.io/secure-react-express-apps-jsonwebtoken-cookie-session-auth0-and-passport-tutorial-e58d6dce6c91

3. claim time limit. only allow claims one every 2 weeks
4. decrease bundle size
https://webpack.js.org/guides/code-splitting/

5. Add timer, 10 minutes for 10 question exam
6. user gets to see a question 3 times total
7. If not a lot of questions left, user cannot take a test!


4. Calculation of points and learn tokens
5. If user takes three attempts to answer a question then they will receive 0 points.

7. 5% fee on claims
8. Help page
    1. https://support.axieinfinity.com/hc/en-us/categories/4404216056731-Axie-Infinity
9. Terms page
    1. https://axieinfinity.com/terms/

"browser": {
"fs": false,
"path": false,
"os": false
}

https://discord.gg/Nmj6QrdXbj



ISSUE

handle click buttons stopped working
src/components/Quiz/Answer.js

receipt
1. claim keeps going, running backend script over and over
