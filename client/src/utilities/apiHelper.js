//Helper function to make fetch calls to our API

export const apiHelper = (
    path,
    method = "GET", //default
    body = null,
    credentials = null
    ) => {
    const url = "http://localhost:5000/api" + path; //any path that the user provides to the api

    const options = {
        method: method,
        headers: {}
    };

    if (body) { //if body is provided a value, then add a body property to the options object
        options.body = JSON.stringify(body);

        options.headers["Content-Type"] = "application/json; charset=utf-8"; //header's content type
    }
    if (credentials) { //if credentials are provided
        //console.log(credentials)
        const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`); //creates a base 64 ASCII string
        
        options.headers.Authorization = `Basic ${encodedCredentials}`; //Basic Authorization header is required to be in for me 'Basic username:password
    }

    return fetch(url, options); //fetch the data
}