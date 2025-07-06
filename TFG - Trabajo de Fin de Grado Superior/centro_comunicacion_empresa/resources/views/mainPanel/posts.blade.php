<div id="postOptionsMenu">
    @if ( Auth::user()->role === 'ADMIN')
        <button type="button" id="createPostButton">Crear nuevo comunicado</button>
        <dialog id="modalFormNewPost">
            <!-- This will interact with the API -->
             <div id="modalElementsContainer">
                <div id="modalText">
                    <h3>Nuevo comunicado</h3>
                </div>
                <div id="modalTitle">
                    <label for="ftitle"></label>
                    <input type="text" name="ftitle" id="ftitle" placeholder="Título...">
                </div>
                <div id="modalContent">
                    <label for="fcontent"></label>
                    <textarea name="fcontent" id="fcontent" placeholder="Contenido..."></textarea>
                </div>
                <div id="modalButtons">
                    <input type="submit" value="Enviar" id="sendPostButton">
                    <button id="closeDialogButton">Cancelar</button>
                </div>
             </div>
                
            
            
            
        </dialog>
    @endif
    <button type="button" id="refreshPostButton" disabled>↻</button>
</div>
<div id="postsContainer">
    <!-- Here is where every post div will be -->
</div>
