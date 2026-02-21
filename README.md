# GmailSweep
A simple script to act as a sweep function for Gmail. 
Edited from Ben Bjurstorm's script, it will look through specific emails you have listed and delete any longer than the time period that you set, rather than your entire inbox. 
Good for cleaning out emails that post daily or weekly newsletters. 

# Quick Start
1) Backup your emails using Google Takeout.
2) Load this script into a new Google Apps Script project.
3) Execute the setPurgeTrigger() function to set a trigger that will call the purge() function every day.
A detailed blog post with more information can be found at https://benbjurstrom.com/purge-email

# Acknowledgements
Thanks to [this gist](https://gist.github.com/benbjurstrom/00cdfdb24e39c59c124e812d5effa39a) by Ben Bjurstorm for getting me started in the right direction.
