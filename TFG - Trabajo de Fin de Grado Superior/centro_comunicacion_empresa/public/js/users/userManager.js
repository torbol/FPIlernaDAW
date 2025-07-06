import {AjaxClass} from "../mainPanel/AjaxClass.js";
import { API_URLS } from "../apiRoutes.js";

// Buttons Create, Edit and Delete.
let create = document.querySelectorAll('button')[0];
let edit = document.querySelectorAll('button')[1];
let remove = document.querySelectorAll('button')[2];
// Store in a variable the divs that we will need.
let selectorForm = document.querySelector('#selectorForm');
let mainDiv = document.querySelector('#form');
let divUserSelector = document.querySelector('#divUserSelector');
let userSelector = document.querySelector('#userSelector');
let fieldsetTag, hiddenElementWithIdForPost, deleteButton;
let csrfTokenValue = document.querySelectorAll('meta')[2].content; // We retrieve the csrf token from meta tag in userManager.blade.php to add it to the forms.
let csrfInputElement = '<input type="hidden" name="_token" value="' + csrfTokenValue + '">'; // This is what @csrf generates inside forms.

let errorDiv = document.querySelector('#errorsDiv'); // We need to remove the error elements from the div when the edit or delete button is pressed, to prepare for any new errors that might occur.

// Add event listeners.
create.addEventListener('click', createUser);
edit.addEventListener('click', editUser);
remove.addEventListener('click', removeUser);

const createEditForm = '<form id="createEditForm" action="" method="post">' + csrfInputElement + '<fieldset id="fieldset"><label for="username">Usuario: </label><input type="text" name="username" value="" ><br><label for="password">Contraseña: </label><input type="password" name="password" value="" ><br><label for="name">Nombre: </label><input type="text" name="name" value="" ><br><label for="surname">Apellidos: </label><input type="text" name="surname" value="" ><br><label for="email">Email: </label><input type="text" name="email" value="" ><br><label for="phone">Teléfono: </label><input type="number" name="phone" value="" ><br><label for="role">Rol de usuario: </label><select name="role" id=""><option value="ADMIN">Administrador</option><option value="user">Usuario</option></select><br><input id="sendButton" type="submit" value=""></fieldset></form>';

function createUser() {
    if(deleteButton)
        deleteButton.remove();
    errorDiv.innerHTML = '';
    selectorForm.action = '';
    divUserSelector.hidden = true;
    mainDiv.innerHTML = createEditForm;
    document.querySelector('#createEditForm').action = '/userManager/create'; // Sets the action URL for creating a new user in the form.
    document.querySelector('#sendButton').value = 'Crear usuario';
}

function editUser() {
    if(deleteButton)
        deleteButton.remove();
    mainDiv.innerHTML = '';
    errorDiv.innerHTML = '';
    selectorForm.action = '';
    divUserSelector.hidden = false;
    mainDiv.innerHTML = createEditForm;
    document.querySelector('#createEditForm').action = '/userManager/edit'; // Sets the action URL for editing a new user in the form.
    let sendButtonEdit = document.querySelector('#sendButton');
    sendButtonEdit.value = 'Confirmar cambios';
    fieldsetTag = document.querySelector('#fieldset');
    fieldsetTag.disabled = true; // Disable the form until we confirm that we want to edit the user info.

    // Hidden element to pass the ID to the URL.
    hiddenElementWithIdForPost = fieldsetTag.insertBefore(document.createElement('input'), sendButtonEdit);
    hiddenElementWithIdForPost.type = 'hidden';
    hiddenElementWithIdForPost.name = 'id';
    // End hidden element
    
    let editEnableButton = mainDiv.appendChild(document.createElement('button')); // Insert the Enable editing button.
    editEnableButton.type = 'button';
    editEnableButton.innerText = 'Habilitar edición';
    editEnableButton.addEventListener('click', function() {
        fieldsetTag.disabled = false;
    })
    userSelector.addEventListener('change', onChangeSelectorAJAX);
    getData(userSelector.value, changeUserInfoFields); // This will call the function almost the first time the edit button is clicked.
}

function removeUser() {
    if(deleteButton)
        deleteButton.remove();
    userSelector.removeEventListener('change', onChangeSelectorAJAX); // Removes the eventListenerHandler for userSelector, preventing the AJAX function from executing when userSelector changes in this mode.
    userSelector.disabled = false; // If the API request fails to resolve in edit mode, switching to delete mode will make the userSelector available again.
    mainDiv.innerHTML = '';
    selectorForm.action = '/userManager/delete';
    
    // Creates the confirm button.
    deleteButton = selectorForm.appendChild(document.createElement('input'));
    deleteButton.type = 'submit';
    deleteButton.value = 'Confirmar'
    // This will display a confirmation alert asking if we are sure about deleting the selected user. 
    deleteButton.onclick = function() {
        return confirm("¿Estás seguro de que quieres eliminarlo?");
    }
    errorDiv.innerHTML = '';
    divUserSelector.hidden = false;
}

// On change function for userSelector.
function onChangeSelectorAJAX() {
    getData(userSelector.value, changeUserInfoFields);
    fieldsetTag.disabled = true; 
}

// Interacts with the API to fetch user data using AJAX. Used only for Edit users option.
let userApiToken = AjaxClass.getApiTokenFromCookie(); // Retrieves the API token from cookies.
function getData(id, callback) {
    hiddenElementWithIdForPost.value = userSelector.value; // Sets the ID in a hidden input to pass it when confirming data, it will change with each API request.
    userSelector.disabled = true; // Disables the user selector until all data fetched from the API has been displayed in the form fields.
    const url = API_URLS.userManagerApi + id;
    
    // Creates the AJAX object and passes the URL, method, authentication bearer token, and callback function to execute for getting the username list.
    const ajaxObject = new AjaxClass(url, "GET", userApiToken);
    ajaxObject.sendApiRequest(callback);
}

// Callback function to get JSON (XMLHttpRequest, since it is asynchronous)
function changeUserInfoFields(jsonData) {
    document.getElementsByName('username')[0].value = jsonData.username;
    document.getElementsByName('password')[0].value = '';
    document.getElementsByName('name')[0].value = jsonData.name;
    document.getElementsByName('surname')[0].value = jsonData.surname;
    document.getElementsByName('email')[0].value = jsonData.email;
    document.getElementsByName('phone')[0].value = jsonData.phone;
    if(jsonData.role === 'ADMIN') {
        document.getElementsByName('role')[0][0].selected = true;
        document.getElementsByName('role')[0][1].selected = false;
    } else {
        document.getElementsByName('role')[0][0].selected = false;
        document.getElementsByName('role')[0][1].selected = true;
    }
    userSelector.disabled = false; // Enables the user selector once all data fetched from the API has been displayed in the form fields.
}