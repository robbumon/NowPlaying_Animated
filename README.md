# NowPlaying_Animated
Animates "now playing" data from Foobar2000 to a browser source for OBS streaming
Used specifically for the RhythmandPixels Radio channel on YouTube, can be easily customized. 

Requirements:

OBS (streaming) https://obsproject.com/ <br>
<br>
Foobar2000 (music playback) https://www.foobar2000.org/ <br>
Plugin: httpcontrol https://bitbucket.org/oblikoamorale/foo_httpcontrol/downloads/ <br>
<br>
Nodejs (bypass cors-proxy issue) https://nodejs.org/ <br>
No-Cors-Proxy https://www.npmjs.com/package/no-cors-proxy <br>

Files:<br>
<br>
nowplaying-rnp_v2.html<br>
Divs and CSS used for the OBS browser source<br>
<br>
nowplaying-rnp_v2.js<br>
Queries the Foobar httpcontrol api and runs an update/animation when the song changes<br>
<br>
runproxy.bat<br>
Shortcut batch file to run the no-cors-proxy via node<br>

