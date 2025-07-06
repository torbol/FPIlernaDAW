/* Here we will have all links to the API that will be used by the different JS modules to make requests. */

export const API_URLS = {
    // Used in PostClass.js
    getPostsApi: "api/getPosts",
    deletePostApi: "api/deletePost/",
    deleteCommentApi: "api/deleteComment/",
    insertCommentApi: "api/insertComment/",
    sendPostApi: "api/insertPost",

    // Used in  main.js
    publicMessagesApi: "api/getChatPublicMessages",

    // Used in MessageClass.js
    listAllUsersApi: "api/main/listAllUsers",
    sendMessagesApi: "api/sendMessage",
    personalMessageApi: "api/getUserMessages/",

    // Used in userManager.js
    userManagerApi: "api/userManager/",
}