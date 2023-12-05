//Helper function to make fetch calls to our API

export const apiHelper = (
    path,
    method = "GET", //default
    body = null,
    credentials = null
    ) => {
    const url = "http://localhost:5000/api" + path;
    

    const options = {
        method: method,
        headers: {}
    };

    if (body) {
        options.body = JSON.stringify(body);

        options.headers["Content-Type"] = "application/json; charset=utf-8";
    }
    if (credentials) {
        console.log(credentials)
        const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`); //creates a base 64 ASCII string
        
        options.headers.Authorization = `Basic ${encodedCredentials}`;
    }

    return fetch(url, options);
}