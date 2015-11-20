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
