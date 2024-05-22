** First of all install the git repository. Then use npm install to install necessary packages. If not all dependencies are installed you need to install these
```
 "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "joi": "^17.13.1",
    "mongoose": "^8.4.0"
```
** For installing eslint and prettier use the following command
```
npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev

```
```
npm install --save-dev prettier

```
```
npm install --save-dev eslint-config-prettier

```



** You may need to install all the devDependencies.Your dependencies need to look like this.
```
"@eslint/js": "^9.3.0",
    "@types/cors": "^2.8.17",
    "@types/express": "^4.17.21",
    "@types/node": "^20.12.12",
    "@typescript-eslint/eslint-plugin": "^7.10.0",
    "@typescript-eslint/parser": "^7.10.0",
    "eslint": "^8.57.0",
    "eslint-config-prettier": "^9.1.0",
    "globals": "^15.3.0",
    "prettier": "^3.2.5",
    "typescript": "^5.4.5",
    "typescript-eslint": "^7.10.0"
```
** You have to create a .env file and attach the port and your mongodb uri to connect with database
** To compile you may use the command
```
npm run build
```
** To start server you need to use
```
npm run start:dev
```
** You may use these command using npm run 'youe desired command' to get your desired functionality
```
 "start:prod": "node ./dist/server.js",
    "start:dev": " ts-node-dev --respawn --transpile-only src/server.ts",
    "build": "tsc",
    "lint": "eslint src --ignore-path .eslintignore --ext .ts",
    "fix": "npx eslint src --fix",
    "prettier": "prettier --ignore-path .gitignore --write \"./src/**/*.+(js|ts|json)\"",
    "prettier:fix": "npx prettier --write src",
    "test": "echo \"Error: no test specified\" && exit 1"
```

