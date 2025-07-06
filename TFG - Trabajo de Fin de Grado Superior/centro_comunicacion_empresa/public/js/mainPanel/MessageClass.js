import { AjaxClass } from "./AjaxClass.js";
import { formatLocalDate } from "./dateFormat.js";
import { API_URLS } from "../apiRoutes.js";


export class MessageClass {
    /* This class will handle all interactions related to send and receive messages from the API.
    We need to import this class as a JavaScript module in the main.js
    
    
    Then, we need to create a new object with the userApiToken and jsonData as parameters.

    Example:
        const messageObject = new MessageClass(userApiToken);
        messageObject.generateUsersList();
    */

    constructor(userApiToken) {
        this._userApiToken = userApiToken; // "_" indicates that they are private values (accessible only through getter functions).
    }

    get userApiToken() {
        return this._userApiToken;
    }
    
    generateUsersList(timeInterval = 2000) {
        const ajaxObject = new AjaxClass(API_URLS.listAllUsersApi, "GET", this.userApiToken);
        this.checkNewMessages(ajaxObject); // This will load the userList for the first time we open the webpage.
        // Now we set an interval of 2 seconds between checking new/deleted users or new personal messages alerts.
        setInterval(() => {
            this.checkNewMessages(ajaxObject);
        }, timeInterval);

    }

    sendMessage(username, chat, userApiToken = this.userApiToken) { // The chat var will be 0 (personal) or 1 (public).
        let sendButton = document.querySelectorAll('.sendButton');
        let newMessageInput = document.querySelectorAll('.messageInput');

        if(newMessageInput.length !== 1) { // We will only have the public chat node (personal messages chat not opened yet)
            newMessageInput = newMessageInput[chat];
            sendButton = sendButton[chat];
        } else { // We will have two nodes: 0 for personal messages input and 1 for the public textarea.
            newMessageInput = newMessageInput[0];
            sendButton = sendButton[0];
        }

        // BEGIN handling the Enter key press event for input fields.
        newMessageInput.addEventListener('keypress', (event) => {
            if (event.key === "Enter" && !event.shiftKey) { // The message will be sent when pressing the Enter key. To insert a new line we can simply press Shift key + Enter (and message won't be sent)
                event.preventDefault(); // This will prevent a new line from being added after the message is sent.
                sendMessageToApi();
            }
        })
        // END handling the Enter key press event.

        // BEGIN sendMessage button handler.
        sendButton.addEventListener('click', () => {
            sendMessageToApi();
        })
        // END sendMessage button handler.

        // Send the new message to the API.
        function sendMessageToApi() {
            let data = JSON.stringify({
                'username': username,
                'content': AjaxClass.sanitizeText(newMessageInput.value),
            }); 
            AjaxClass.sendToTheApi(API_URLS.sendMessagesApi, newMessageInput, data, userApiToken);
        }
    }

    autoRefreshMessages(messageDiv, messagesApiUrl, chat, timeInterval = 2000, firstTimeOpenChatFlag = true) { 
        /*
            For this function we will need to pass the next 5 parameters:
            · messageDiv: Element container where we will insert all the messages. Normally a DIV container.
            · messagesApiUrl: URL to get all messages from the API.
            · chat: Chat var will be 0 (personal) or 1 (public).
            · timeInterval: Time to initiate a new fetch request to the API (ms).
            · firstTimeOpenChatFlag: Default True. Flag to autoscroll down to the last message the first time that we get messages from the API.
            
            
        */

        // BEGIN inserting and auto refreshing messages in the chat.
        let callbackFetchMessagesApi = function(jsonDataMessages) {
            let messageIdArrayThatWeJustHave = messageDiv.querySelectorAll('div');
            let messageIdArrayThatWeJustHaveArray = Array.from(messageIdArrayThatWeJustHave).map(element => element.id); // Converts messageIdArrayThatWeJustHave NodeList into an Array.
            let makeScrollDownAutoFlag = false;
            
            jsonDataMessages.forEach(message => {
                if (!messageIdArrayThatWeJustHaveArray.includes(String(message.message_id))) {
                    // Checks if the scrollbar is at its final position. If so, it will automatically scroll to the last element, otherwise, the scroll will remain in its current position.
                    if(messageDiv.lastChild !== null && firstTimeOpenChatFlag === false) {
                        if(messageDiv.scrollTop + messageDiv.clientHeight >= messageDiv.scrollHeight - 1) { // We compare the current scroll position in the client with the div's scrollHeight - 1 to avoid rounding errors.
                            makeScrollDownAutoFlag = true;
                        } 
                    }

                    const messageFormatted = message.content.replace(/\n/g, "<br>");
                    
                    if (chat === 0 && document.querySelector('#receiverUsername').innerHTML === message.username_interacts_with) { // With the second condition after &&, we always check that the current open chat user receives the correct messages. If it weren’t checked, due to the message refresh timing, we could see mixed chat messages.
                        messageDiv.innerHTML += '<div class="' + message.class + '" id="' + message.message_id + '"><p>' + messageFormatted + '</p></div>'; // Insert the last message received from the API into the personal chat.
                    } else if (chat === 1) {
                        messageDiv.innerHTML += '<div class="publicMessageDiv"' + '" id="' + message.message_id + '"><p class="usernameChatPublic">' + '@' + message.username_sender + '</p><div class="bodyMessage"><div class="centeredPublicMessage"><p class="sentMessagePublic">' + messageFormatted + '</p></div></div><p class="dateMessage">' + formatLocalDate(message.created_at) + '</p></div>' // Insert the last message received from the API into the public chat.
                    }
                    
                    // Checks the last scrolling position to make autoscroll.
                    if (makeScrollDownAutoFlag) {
                        messageDiv.scrollTop = messageDiv.scrollHeight;
                    }
                }                    
            });
            if(firstTimeOpenChatFlag) {
                messageDiv.scrollTop = messageDiv.scrollHeight; // With this, we automatically scroll down the first time we open the chat (but not later when new messages arrive while it's open).
                firstTimeOpenChatFlag = false;
            }
        }
        const ajaxObject = new AjaxClass(messagesApiUrl, "GET", this.userApiToken);
        ajaxObject.sendApiRequest(callbackFetchMessagesApi); // This retrieves messages from the API the first time we open a chat, so it arrives quickly (without the setInterval delay of two seconds) to the client side.
        this.flagForMyIntervalRefreshMessagesFunction = setInterval(() => {
            ajaxObject.sendApiRequest(callbackFetchMessagesApi);
        }, timeInterval); // Refresh messages every 2 seconds after the chat window has been opened.
        // END inserting and autorefreshing messages in the chat.
    }


    checkNewMessages(ajaxObject) {
        let receiverUsername = document.querySelector('#receiverUsername'); // Sets the receiver's username in the receiverUsername div.
        let personalMessages = document.querySelector('#personalMessages'); // Div where all personal messages appear.
        let textMessagesBox = document.querySelectorAll('.textMessagesBox')[0]; // personalMessages.blade view, here will go the inputs to send a message

        /* With this, we insert the user list into the main webpage. */
        // Inserts these users in the mainPanel.usersList.
        let usersList = document.querySelector('#usersList');

        // Creates an AJAX object and passes the URL, method, authentication bearer token, and callback function to retrieve the username list.
        /*
            We check for new messages for each user. If any exist, we update the value in the 
            userList section and highlight the user in red.
        */
        ajaxObject.sendApiRequest((usersArray) => {
            let usersArrayOld = Array.from(document.querySelectorAll('.userLink')).map(r => r.innerHTML); // We check the users that we actually have in our web list.
            let usersArrayParsed = Array.from(usersArray).map(r => r.username);
            let newMessagesArray = Array.from(usersArray).map(r => r.new_messages); // We retrieve the number of unread messages.
            
            
            // Callback function
            usersArray.forEach((userObject, index) => {
                
                let element = userObject.username;

                if (!usersArrayOld.includes(element)) {
                    // We need something like '<li><a class="userLink" href="#">' + element + '</a></li>', so first let's create the li element.
                    let listElement = document.createElement('li');
                    listElement.id = element;
                    let userLinkElement = document.createElement('a');
                    userLinkElement.classList.add('userLink');
                    userLinkElement.href = '#';
                    
                    userLinkElement.innerHTML = element;
                    listElement.appendChild(userLinkElement); // Here, we just got <li><a class="userLink" href="#">' + element + '</a></li>'.
                    // New message counter element (div).
                    let counterNewMessages = document.createElement('span');
                    if (usersArray[index].new_messages !== 0) {
                        counterNewMessages.innerHTML = usersArray[index].new_messages;
                    }
                    listElement.appendChild(counterNewMessages);
                    // End new message counter (div).
                    usersList.appendChild(listElement); // Add a user to the usersList div.
                    
                    // Sets the event handler for each user.
                    userLinkElement.addEventListener('click', () => { // By using an arrow function instead function () {}, we keep the context scope of "this".
                        /* When a user from the user list is selected, it will display 
                        all the received and sent messages between the authenticated user 
                        and the selected user. */
                        clearInterval(this.flagForMyIntervalRefreshMessagesFunction); // This will wipe the variable (clear it if an interval has been assigned before).
                        personalMessages.innerHTML = ''; // We need to clear the personalMessages div every time we select a new user.
                        receiverUsername.innerHTML = userLinkElement.innerHTML
                        textMessagesBox.innerHTML = '<label for="message"></label><input type="text" name="message" class="messageInput" id="message" placeholder="Escribe tu mensaje..."><input class="sendButton" type="submit" value="Enviar">' // Inputs for sending a message in the textMessagesBox div.
                        
                        const messagesApiUrl = API_URLS.personalMessageApi + element;
                        
                        // Auto refresh personal messages function.
                        this.autoRefreshMessages(personalMessages, messagesApiUrl, 0);
    
                        // Handlers for sending personal messages.
                        this.sendMessage(element, 0); // chat=0 because it's for personal chats.
                    })
                }      
            });

            // If a user is deleted from the database while there are logged in users, they will see the deleted user disappear from their contact list.
            usersArrayOld.forEach(element => {
                if (!usersArrayParsed.includes(element)) {
                    document.querySelector('#' + element).remove();
                }
            })

            // Updates the unread message indicator in the user list.
            let spansIndicators = document.querySelectorAll('#usersList li span');
            spansIndicators.forEach( (span, index) => {
                if (span.innerHTML !== newMessagesArray[index] && newMessagesArray[index] !== 0 && receiverUsername.innerHTML !== usersArray[index].username) {
                    span.innerHTML = newMessagesArray[index]
                } else if (newMessagesArray[index] === 0) {
                    span.innerHTML = '';
                }
            });
        });
    }
}