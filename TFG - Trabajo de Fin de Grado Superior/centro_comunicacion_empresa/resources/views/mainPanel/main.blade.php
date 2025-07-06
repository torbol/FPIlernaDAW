<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Panel principal</title>
    <link rel="stylesheet" href="{{ asset('css/style.css') }}">
</head>
<body>
    @include('layouts.navBar')
    <div class="personalChatPostsAndUserListDiv">
        <!-- Container div for the user list -->
        <div class="usersList">
            <ul id="usersList">
        
            </ul>
        </div>
        <!-- End user list -->

        <!-- Container div for posts and comments -->
        <div id="postsAndCommentsDivBlock">
            @include('mainPanel.posts')
        </div>
        <!-- End posts and comments -->

        <!-- Container div for personal messages -->
        <div id="personalMessagesDivBlock">
            @include('mainPanel.personalMessages')
        </div>
        <!-- End personal messages -->
        
    </div>
    
    <!-- Container div for public chat -->
    <div id="chatPublicDivBlock">
        @include('mainPanel.chatPublic')

    </div>
    <!-- End public chat -->

    <script type="module" src="{{ asset('js/mainPanel/main.js') }}"></script>
</body>
</html>