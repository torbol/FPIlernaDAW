export class AjaxClass {
    /* This class will handle all interactions with the API.
    We need to import this class as a JavaScript module in every file where we want to use AJAX.
    Then, we need to create a new object with url and method as parameters, and call the getData(callback) function.

    Example if we dont use any kind of authentification in the API:
        const ajaxObject = new AjaxClass(url, "GET");
        ajaxObject.getData(callback);
    Example if we use a bearer token auth in the API (note we can get the API token with the static function in this class getApiTokenFromCookie()):
        const ajaxObject = new AjaxClass(url, "GET", userApiToken);
        ajaxObject.getData(callback);
    Example if we use a bearer token auth in the API (note we can get the API token with the static function in this class getApiTokenFromCookie()) and send a json to the server:
        const ajaxObject = new AjaxClass(url, "POST", userApiToken, messageToSendToTheApi);
        ajaxObject.getData(callback);
    */

    constructor(url, method, userApiToken, dataPostToApi) { 
        this._url = url;
        this._method = method;
        this._userApiToken = userApiToken;
        this._dataPostToApi = dataPostToApi;
    }

    get url(){
        return this._url;
    }
    get method(){
        return this._method;
    }
    get userApiToken(){
        return this._userApiToken;
    }
    get dataPostToApi(){
        return this._dataPostToApi;
    }

    // Interacts with the API to fetch data using AJAX.
    async sendApiRequest(callback) {
        
        let xhr = new XMLHttpRequest();
        xhr.open(this.method, this.url, true);
        xhr.setRequestHeader("Content-Type", "application/json"); // We will send JSON object to the server.
        // Checks the auth bearer token if it has been passed to the constructor.
        if(this.userApiToken !== undefined) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + this.userApiToken);
        }

        xhr.onreadystatechange = function() {
            if(this.readyState == 4 && this.status == 200) {
                const json = JSON.parse(this.responseText);
                if(callback) {
                    callback(json);
                }
            }
        }
        
        xhr.send((!this.dataPostToApi) ?  null : this.dataPostToApi);
    }

    // This class function will try to get the API authentication token from the site cookie.
    static getApiTokenFromCookie() {
        let cookieArray = document.cookie.split('; '); // Reads all website cookies and stores them as an array of strings.
        let apiToken;
        cookieArray.forEach(element => {
            if(element.includes('LaravelSessionUserApiToken')) {
                element = element.replace('LaravelSessionUserApiToken=', ''); 
                apiToken = element; // At this point, we have obtained the API token and saved it in the apiToken variable.
            }
        });
        return apiToken;
    }

    // We will need a function to send data to the API using JSON (form field inputs or textareas). Remember to sanitize text before inserting it (use the sanitizeText() function provided in this class).
    static sendToTheApi(sendMessagesApiUrl, inputTextElement, data, userApiToken) {
        
        // Send it to the server.
        let apiResponseCallback = function (jsonApiResponse) {
            console.log(jsonApiResponse); // Status response of the sent message/post.
        }
        const ajaxObject = new AjaxClass(sendMessagesApiUrl, "POST", userApiToken, data);
        ajaxObject.sendApiRequest(apiResponseCallback);
        inputTextElement.value = '';
    }

    // 
    static sanitizeText(inputTextValue) {
        // Sanitize the content before saving it into the database.
        const sanitizedText = inputTextValue
        .replace(/&/g, "&amp")
        .replace(/</g, "&lt")
        .replace(/>/g, "&gt")
        .replace(/'/g, "&#39")
        .replace(/"/g, "&quot");

        return sanitizedText;
    }
}