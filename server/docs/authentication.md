## What is authentication ?
###  identity of a user or a client. It usually involves providing some credentials, such as a username and password, or a token, that prove who you are. Authentication ensures that only authorized parties can access protected resources, such as APIs, databases, or web pages 

## What is authorization ?
###  denying access to specific resources based on the authenticated identity. It usually involves checking some permissions, roles, or scopes, that define what you can do with the resources. Authorization ensures that only authorized actions can be performed on protected resources, such as reading, writing, or deleting data.

### here in this endpoint (local registeration with email and password) iam using Json web token (JWT) for authentication 

## What is JWT ? 
### is usually used to send information that can be trusted and verified using a digital signature

## scenario
### 1 - A user sends a signup/login post request to the server and it sends JWT token as a response. This JWT token will be stored in our database and on the client-side. You may store in local storage or cookies or any other storage mechanisms like Memcache or Redis.

### 2 - We will append the token in the request Authorization header

### 3 - When a user will make a request to another API, the server will check whether the JWT token provided by the client is valid or not, it will return a response

### 4 - Unless and until the user logs out of the application, our server will check whether the provided token is valid, after logging out it will destroy the token from the local storage


### logout
#### clear token from authenticated user(test authenticated middleware)  , clear cookie , redirect user to home page (optional ) or add some logic latter

## In order to spin up the project in the root create env with Two variabiles, with your own values: 
#### MONGO_URL
#### JWT_SECRET
#### JWT_LIFETIME
#### GOOGLE_CLIENT_ID
#### GOOGLE_CLIENT_SECRET
#### SECRET : for passport 
#### EMAIL, APP_PASSWORD :   for nodemiler implementation
#### LOG_FILE_PATH