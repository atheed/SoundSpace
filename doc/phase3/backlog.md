Status at completion of Phase 2:

UI/UX:
Application has a working but rudimentary interface, able to navigate between login and playlist view.

Front End:
Able to play music loaded from file, pending issues switching to following songs.
Front End is able to make get Playlist request from back end, and display the given playlist on screen.

Back End:
Node.js and Express server successfully runs and listens, able to load playlists from json object as a placeholder measure. 




Work to be Done in Phase 3 for foreseen MVP:


UI/UX:
Must have a final UI and working interaction design that switches between login, room and playlist views

Front-end:
All buttons/links must be connected to necessary div hide/display functions, and post/get ajax requests:
List div/hide display and navigation tasks here:

List ajax calls here:
Split getPlaylist method which places an AJAX call with url currentPlaylist into two calls:
    One AJAX call that gets the current playing playlist
    Another AJAX call that gets a playlist by title (if more than 1 playlist per room is implemented)

Implement AJAX call to back-end for createPlaylist: create a new playlist in the db for the room
    Must include a playlist name input from UI, along with the user's name
Implement AJAX call to back-end for deletePlaylist: delete the given playlist in the db for the room
    Must include a playlist name (by button id rather than input, and current user's name to check if the user was the playlist's creator)
Implement AJAX call to back-end for createRoom: create a new room in the db that can be logged into by users
    Must include a room name by input from UI, along with a new user name to be used as the username in the room, and a boolean for privacy(with a password if private)
Implement AJAX call to back-end for logintoRoom: request to log into the given room title, with a password if private
    Must include a room name (by clicked room's id rather than input) along with a new username, and a password if the room is private
Implement AJAX call to back-end for deleteRoom: request to delete the room if the room is created by the user
    Must include a room name (by clicked room's id rather than input), along with username to check if the room is indeed created by user
Implement AJAX call to back-end for addSongToPlaylist: request to add a specified song to the specified playlist
    Must include a songname or other song reference, and a playlist name(taken by context once again, such as actively open playlist etc)
Implement AJAX call to back-end for deleteSongFromPlaylist: request to delete a song from a specified playlist
    Must include a songname or other song reference, and a playlist name(taken by context, such as actively open playlist etc)
Implement AJAX call to back-end for currentSong: request to get the currently playing song at the active playlist in the room
    Must include playlist name, there must be handling in case the selected playlist is not actively playing
        This can also be handled by not making this call available in the UI while viewing an unactive playlist
Implement AJAX call to back-end for nextSong: request to get the next song in queue for the active playlist in the room
    Must include a playlist name, might need to have handling for the return of the first song in playlist if the playlist is not actively playing
        Or similar UI availability as above



Back-end:
Must implement mongodb (perhaps with mongoose) database management to handle larger volumes of users/rooms/playlists
(Current implementation is with JSON objects, insufficient)
List all database tasks here:


Must implement handling for front end AJAX calls>
Lit all API tasks here:
Implement handling for create room requests
Implement handling for login to room requests
Implement handling for delete room request
Implement handling for create playList request
Change getCurrentPlaylist handling when mongodb database is integrated
Implement getPlaylistByTitle handling (after design decision One or more playlist per room?)
Implement handling for delete playlist request
Implement handling for add song to playlist request
Implement handling for remove song from playlist request
Review handling for currentSong request after db chane
Review handling for nextSong request after db change
