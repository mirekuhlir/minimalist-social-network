## Minimalist Social Network

Minimalist social network application built with Node.js, Express, MongoDB and React.

### Live example

http://minimalist-social-network-test.herokuapp.com/

### How to start

```bash
# Install packages for server
npm install

# Install packages for client
npm run client-install

# Run the client and server
npm run dev

```

Project has separated databases for the development and for the production. Check out config/keys.js.

You have to create a .env file. I am keeping .env file out of git repository using .gitignore file for security reason.

Project uses [dotenv](https://www.npmjs.com/package/dotenv). Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env.

### Example of .env file.

```
SECRET_KEY_PROD=yourKey
MONGO_URI_CONNECT_PROD=mongodb://<dbuser>:<dbpassword>@ds123456.mlab.com:23456/minimalistic-social-network_production
SECRET_KEY_DEV=yourKey
MONGO_URI_CONNECT_DEV=mongodb://<dbuser>:<dbpassword>@ds123456.mlab.com:23456/minimalistic-social-network_development

```

SecretOrKey is a string for verifying the token's signature.

Project uses MongoDB as a service from [mlab.com](https://www.mlab.com).

### License

This project is licensed under the MIT License
