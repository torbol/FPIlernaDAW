import { AjaxClass } from "./AjaxClass.js";
import { formatLocalDate } from "./dateFormat.js";
import { API_URLS } from "../apiRoutes.js";

export class PostClass {

    constructor(userApiToken) {
        this._userApiToken = userApiToken;    }

    get userApiToken() {
        return this._userApiToken;
    }

    listAllPosts() {
        // DIV structure in which we will display the post.
        let callback = (jsonApiResponse) => {
            let postsContainer = document.querySelector('#postsContainer');
            // Wipe postContainer.
            postsContainer.innerHTML="";
            
            jsonApiResponse.forEach(post => {
                let postDiv = `
                    <div class="post" id="` + post.post_id + `">
                        <div class="authorPost">
                            <p>@` + post.username + `</p>
                        </div>
                        <div class="deletePost">
                            `
                            + delButton() +
                            `
                        </div>
                        <div class="titlePost">
                            <h4>` + post.title + `</h4>
                        </div>
                        <div class="postContent">
                            <p>` + post.content.replace(/\n/g, "<br>") + `</p>
                        </div>
                        <div class="commentOptions">
                            <div class="commentCounter">
                                <a href="#">`
                                + function () {
                                    // We will return the post comments number.
                                    let commentsNumber = Object.keys(post.comments).length;
                                    if (commentsNumber === 0 || commentsNumber > 1){
                                        return commentsNumber + " " + "comentarios";
                                    } else {
                                        return commentsNumber + " " + "comentario";
                                    }
                                }() +                             
                                `</a>
                            </div>
                            <div class="addNewCommentDiv">
                                <a href="#" class="addNewComment">Añadir comentario</a>
                            </div>
                        </div>
                        <div class ="datePostDiv">
                            <p class="datePost">` + formatLocalDate(post.created_at) + `</p>
                        </div>
                        <div class="commentsContainer">
                        `
                            + function () {
                                // This will return the comment fields in a div format.
                                let comments = post.comments;
                                let commentDiv = "";
                                comments.forEach((comment, index) => {
                                    commentDiv +=
                                    function () {
                                        if(index > 0) {
                                            return "<hr>";
                                        } else {
                                            return "";
                                        }
                                        
                                    }() + `
                                    <div class="comment" id="` + comment.comment_id + `">
                                        <div class="authorComment">
                                            <p>
                                                @` + comment.comment_author +
                                                `
                                            </p>
                                        </div>
                                        <div class="deleteComment">`
                                            + delButton() +
                                        `</div>
                                        <div class="contentComment">
                                            <p>
                                                ` + comment.content.replace(/\n/g, "<br>") +
                                                `
                                            </p>
                                        </div>
                                        <div class="dateComment">
                                            <p>
                                                ` + formatLocalDate(comment.created_at) +
                                                `
                                            </p>
                                        </div>
                                    </div>
                                `
                                });
                                return commentDiv;
                            }() +
                        `
                        </div>
                `
                postsContainer.innerHTML += postDiv;
                

                function delButton() {
                    // We will add a button to delete if the field received from the API is true (that means the user is an admin).
                    if (post.delete === true) {
                        return '<button class="deleteButton" type="button">Eliminar</button>';
                    } else {
                        return ""
                    }
                }

            });
            
            // END DIV Structure

            // Show comments link (acting as button).
            let xcomments = document.querySelectorAll('.commentCounter a');
            xcomments.forEach(showCommentsButton => {
                showCommentsButton.addEventListener('click', () => {
                    let postParentContainer = showCommentsButton.parentElement.parentElement.parentElement;
                    let commentsContainer = postParentContainer.querySelector('.commentsContainer');
                    if (commentsContainer.style.display === "none" || !commentsContainer.style.display) {
                        let checkCommentInputContainer = postParentContainer.querySelector('.commentInputContainer');
                        if (checkCommentInputContainer) {
                            checkCommentInputContainer.style.display = "none";
                        }
                        commentsContainer.style.display = "grid";
                    } else {
                        commentsContainer.style.display = "none";
                    }
                    
                });
            });

            // Add a new comment button.
            let addNewComment = document.querySelectorAll('.addNewComment');
            addNewComment.forEach(addCommentButton => {
                addCommentButton.addEventListener('click', () => {
                    let postParentContainer = addCommentButton.parentElement.parentElement.parentElement;
                    if(!postParentContainer.querySelector('.commentInputContainer')) {
                        postParentContainer.querySelector('.commentsContainer').style.display = "none";
                        let commentInputContainer = document.createElement("div");
                        commentInputContainer.className = "commentInputContainer";
                        postParentContainer.appendChild(commentInputContainer);

                        
                        commentInputContainer.innerHTML = `
                        <div>
                            <label for="commentInput"></label>
                            <textarea name="commentInput" class="commentInput"></textarea>
                        </div>
                        <div>
                            <button type="button" class="publishComment">Publicar</button>
                        </div>
                        `
                        publishCommentButton(commentInputContainer.querySelector('.commentInput'), commentInputContainer.querySelector('.publishComment'), this)

                    } else {
                        postParentContainer.querySelector('.commentsContainer').style.display = "none";
                        postParentContainer.querySelector('.commentInputContainer').style.display = "grid";
                    }
                })
            });

            // Delete Button Handlers.
            let deleteButtons = document.querySelectorAll('.deleteButton');
            deleteButtons.forEach(deleteButton => {
                deleteButton.addEventListener('click', () => {
                    let containerClass = deleteButton.parentElement.parentElement; // It will tell us if it's a post or a comment what we want to delete.

                    if(containerClass.className === "post") {
                        var deleteApiUrl = API_URLS.deletePostApi + containerClass.id;
                    } else if (containerClass.className === "comment") {
                        var deleteApiUrl = API_URLS.deleteCommentApi + containerClass.id;
                    }
                    const ajaxObjectDelete = new AjaxClass(deleteApiUrl, "DELETE", this.userApiToken);
                    ajaxObjectDelete.sendApiRequest();

                    setTimeout(() => {
                        return this.listAllPosts();
                    }, 500) // Refresh all posts with a small delay of 0.5 second.
                })

            });

            // Publish comment button.
            function publishCommentButton(content, button, context) {
                button.addEventListener('click', () => {
                    let sendCommentApiUrl = API_URLS.insertCommentApi + content.parentElement.parentElement.parentElement.id; 
                    // Insert the new comment.
                    let data = JSON.stringify({
                        'content': AjaxClass.sanitizeText(content.value),
                    }); 
                    AjaxClass.sendToTheApi(sendCommentApiUrl, content, data, context.userApiToken);

                    setTimeout(() => {
                        return context.listAllPosts();
                    }, 500)
                })
                
            }

            document.querySelector('#refreshPostButton').disabled = false;
            
            
        }
        const ajaxObject = new AjaxClass(API_URLS.getPostsApi, "GET", this.userApiToken);
        ajaxObject.sendApiRequest(callback);
        
    }

    buttonsMenuBehavior() {
        // Refresh the posts button.
        let refreshPostButton = document.querySelector('#refreshPostButton');
        refreshPostButton.addEventListener('click', () => {
            refreshPostButton.disabled = true;
            return this.listAllPosts();
        })
        

        // Create the new post button.
        let createNewPostButton = document.querySelector('#createPostButton');
        let modalDialog = document.querySelector('#modalFormNewPost');
        let ftitle = document.querySelector('#ftitle');
        let fcontent = document.querySelector('#fcontent');
        let sendPostButton = document.querySelector('#sendPostButton');
        let closeDialog = document.querySelector('#closeDialogButton');
        if(createNewPostButton !== null) {
            createNewPostButton.addEventListener('click', () => {
                // This will display a modal dialog in the web browser for the user to complete the nwe post form.
                modalDialog.showModal();
            })

            closeDialog.addEventListener('click', () => {
                ftitle.value="";
                fcontent.value="";
                modalDialog.close(); // It will close the modal dialog.
            })
            sendPostButton.addEventListener('click', () => {
                    // Insert the new post
                    let data = JSON.stringify({
                        'title': AjaxClass.sanitizeText(ftitle.value),
                        'content': AjaxClass.sanitizeText(fcontent.value),
                    }); 
                    AjaxClass.sendToTheApi(API_URLS.sendPostApi, fcontent, data, this.userApiToken);
                    ftitle.value='';
                    modalDialog.close();

                    setTimeout(() => {
                        return this.listAllPosts();
                    }, 500)
                    
            })
        }
    }

}

