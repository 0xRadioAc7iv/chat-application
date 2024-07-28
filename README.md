## Another F\*\*king Chat App

### Setup Locally

**Backend**

1. Change current directory to server
   `cd server`

2. Install Dependencies
   `npm i`

3. Create a .env file

4. Copy all env variables from [.env.example](./server/.env.example) to .env file

   - MONGODB_URL: URL for MONGODB Server (Start a Local one or set one up online on [cloud.mongodb.com](https://cloud.mongodb.com))
   - FRONTEND_ORIGIN_URL: http://localhost:5173
   - SESSION_SECRET: Use whatever string you like locally BUT make sure to use a complex and long string while deploying the server

5. Start the Server
   `npm run dev`

**Frontend**

1. Change directory to client
   `cd client`

2. Install Dependencies
   `npm i`

3. Change the Constant 'SERVER_URL' in [constants.ts](./client/src/constants.ts) to http://localhost:3000

4. Start Client
   `npm run dev`
