##Planning

**Initial Plan**

The build planned were a web application that allows users to collaboratively edit an online playlist. Different playlists/rooms can be created and joined by users. Host client makes a group of songs from the local files available on the playlist, and other users can add/remove these songs to the said playlist. 

Some constraints placed were: one host per playlist, only local files from the host's device can be played, room names must be unique on creation, user names must be unique in each room, there can be one playlist per room.

The group has followed a scrum-like process, and operated on a backlog that can be found [here](https://github.com/csc301-fall-2015/project-team5-L0101/blob/master/doc/phase3/backlog.md). This backlog was updated numerous times as design decisions were made. 

**Re-planning and Adjustments**

The constraints mentioned above were placed during the group development session on 11/19. Initially, multiple playlists per room were envisioned, but then this was reduced to one playlist per room for simplification. This also allowed the elimination of one of the structures, since room/playlist functionality could be merged.

JSON structure was abandoned in favor of mongodb database handling. This required some re-planning on RESTful methods in place, and the necessary changes were made to work with the database rather than JSON files. 

Another adjustment was for the GUI. Rather than different html files, all elements were brought into one file under different divisions, and dynamically turned hidden or visible as necessary. This eliminated code-repetition. 

Private rooms and adding songs from the Youtube API were changed to much lower priority, as they were not that crucial for the MVP. These were a part of the goals that weren't met; There weren't enough development time left. A better planning and priority organization of tasks should help get it right next time. Starting earlier on development would also help.

Overall, the re-planning in this Phase has followed a theme of simplification and cut features.


**Retrospective**

The modified process actually worked better for team members compared to the previous Phases. Members showed more activity, which can be seen on Slack, took on more tasks and were more attentive in documenting their work. Lack of scrum meetings may have played a part in this, as previous meetings were not as efficient as they would be in the professional fields, populated by individuals with no other time conflicts or deadlines.

Work division worked according to plan, members continued to code in the sub-sections they chose in the earlier Phase. The connection between these sections for the final product is still under construction, but there are no reports of unmanageble problems yet.

Communication did not work as well as it was envisioned it would. Slack and written chat is fairly efficient, but cannot entirely replace face-to-face conversations, or even audio. There has been some confusion over the fine points of functions and used modules.

As an improvement, if the group can draw a healthy middle ground between no physical scrum meetings to forced daily scrum meetings, it is highly likely to prove beneficial. More group development sessions would also be valuable, as two members who frequently work in the same space point out.

