# NowPlaying_Animated
Animates "now playing" data from Foobar2000 to a browser source for OBS streaming
Used specifically for the RhythmandPixels Radio channel on YouTube, can be easily customized. 

Requirements:

OBS (streaming) https://obsproject.com/
Foobar2000 (music playback) https://www.foobar2000.org/
  - Plugin: httpcontrol https://bitbucket.org/oblikoamorale/foo_httpcontrol/downloads/
Nodejs (bypass cors-proxy issue) https://nodejs.org/
  No-Cors-Proxy https://www.npmjs.com/package/no-cors-proxy

Files:

nowplaying-rnp_v2.html
  - Divs and CSS used for the OBS browser source
nowplaying-rnp_v2.js
  - Queries the Foobar httpcontrol api and runs an update/animation when the song changes
runproxy.bat
  - Shortcut batch file to run the no-cors-proxy via node

