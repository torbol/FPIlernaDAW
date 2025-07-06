import { AjaxClass } from "./AjaxClass.js";
import { MessageClass } from "./MessageClass.js";
import { PostClass } from "./PostClass.js";
import { API_URLS } from "../apiRoutes.js";



// Get the bearer token from the cookie required to interact with the API.
let userApiToken = AjaxClass.getApiTokenFromCookie();
let autorefresMessages = 2000; // Time between fetching new messages in milliseconds (default 2 seconds if not specified).


// Generate userList and set the handlers to get and send messages.
const messageObject = new MessageClass(userApiToken);
messageObject.generateUsersList(autorefresMessages); // Here is where we generate the usersList retrieved from the API (list stored in jsonData variable) and prepares to receive or send a new message to any user.


// Public Chat
const messagePublicObject = new MessageClass(userApiToken); // A new object is needed to prevent disruptions in the public chat when using the private one.
let publicMessages = document.querySelector('#publicMessages');
messagePublicObject.autoRefreshMessages(publicMessages, API_URLS.publicMessagesApi, 1, autorefresMessages);
messagePublicObject.sendMessage(null, 1); // null receiver user (public) and chat = 1 because it's for public chat.


// Posts
const postObject = new PostClass(userApiToken);
postObject.listAllPosts();
setTimeout(() => {
    // Assigns event handlers to all buttons for posts and comments.
    postObject.buttonsMenuBehavior();
}, 2000)

