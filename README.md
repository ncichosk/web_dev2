# Setup

### Packages to install
```
npm install ____
```
- nodemon
- express
- mongoose
- bcryptjs
- jsonwebtoken
- joi
- body-parser
- dotenv

### Instructions
1. Run the the following command in the terminal:

    ```npm start```

2. Make requests via postman as seen in screenshots to 'http://localhost:3000/api'

# API Documentation

### /api/user/register

This enpoint receives a post request containing an email, username, and password. It checks or appropriate formatting in each category and if correct will register a new user. It then hashes the password and stores the user in the database.

### /api/user/login

This enpoint receives a post request containing an email and password. It unhashes the password and compares the username and password to existing ones in the database. It responds with an auth-token if it receives a valid login.

### /api/post (get request)

This displays all of the posts in the database. No authentification is required.

### /api/post/post_id (get request)

This displays a particular post given by the post id in the url. Returns error if there is no corresponding post, returns post otherwise.

### /api/post (post request)

Makes a post. Authentificaiton token is required.

### /api/post/postId/like

Adds a like to a post. Authentificaiton required.

### /api/post/postId (patch)

Updates a post. auth-token required and must be the same user that made the original post. This is verified by checking against a createdBy feature in the post.

### /api/post/postId (delete)

Deletes a post. auth-token required and must be the same user that made the original post. This is verified by checking against a createdBy feature in the post.

# Testing
Please see the 'testing' folder for examples of functionality. Each CRUD feature has screenshots demonstrating functionality in a subfolder.