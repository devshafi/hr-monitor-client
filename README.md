
In the project directory, at first run:

### `npm install`  to install all the packages and then
- Make sure backend server is running
- Provide the backend server URL in `api_client.js` file. The location of the file is ***src>client>api_client.js*** 

```js
//change based on your backend server url.
const client = axios.create({
    baseURL: "http://localhost:4000"
});
```

In the project directory, run:

### `npm start` to start the project.

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## CSV Employee File Format
- The headers of required fields of the employee CSV file must be as follows:
  - First name
  - Last name
  - Email address 


