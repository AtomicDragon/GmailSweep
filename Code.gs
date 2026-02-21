/** 
 * This script is created to act like the sweep function similar to Outlook, but for Gmail
 * It is useful if you want to keep the last couple of email sent from a certain address, and delete the rest. 
 * Used for emails that send daily/weekly updates, or similar spam 
 * 
 * 
 * Inspired by Ben Bjurstorms Purge Email Script
 * https://gist.github.com/benbjurstrom/00cdfdb24e39c59c124e812d5effa39a
 */




// Maximum number of message threads to process per run. 
var PAGE_SIZE = 150;

var DELETE_AFTER_DAYS = 3;


/**
 * Add the emails that you want to sweep in the array in quotes: "email@mail.com" separated by ,
 */
var emails = [
  
];


/**
 * Create a trigger that executes the purge function every day.
 * Execute this function to install the script.
 */
function setPurgeTrigger() {
  ScriptApp
    .newTrigger('purge')
    .timeBased()
    .everyDays(1)
    .create()
}

/**
 * Deletes all of the project's triggers
 * Execute this function to unintstall the script.
 */
function removeAllTriggers() {
  var triggers = ScriptApp.getProjectTriggers()
  for (var i = 0; i < triggers.length; i++) {
    ScriptApp.deleteTrigger(triggers[i])
  }
}

/**
 * Create a trigger that executes the purgeMore function two minutes from now
 */
function setPurgeMoreTrigger(){
  ScriptApp.newTrigger('purgeMore')
  .timeBased()
  .at(new Date((new Date()).getTime() + 1000 * 60 * 2))
  .create()
}

/**
 * Wrapper for the purge function
 */
function purgeMore() {
  purge()
}

/**
 * Deletes all triggers that call the purgeMore function.
 */
function removePurgeMoreTriggers(){
  var triggers = ScriptApp.getProjectTriggers()
  for (var i = 0; i < triggers.length; i++) {
    var trigger = triggers[i]
    if(trigger.getHandlerFunction() === 'purgeMore'){
      ScriptApp.deleteTrigger(trigger)
    }
  }
}

function purge() {
  removePurgeMoreTriggers()
  for (var j=0; j < emails.length; j++)
  {
    var search = emails[j];
    var threads = GmailApp.search(search, 0, PAGE_SIZE)
    
    if (threads.length === PAGE_SIZE) {
      console.log('PAGE_SIZE exceeded. Setting a trigger to call the purgeMore function in 2 minutes.')
      setPurgeMoreTrigger()
    }
    
    console.log('Processing ' + threads.length + ' threads for '+emails[j]+'...')
    
    var cutoff = new Date()
    cutoff.setDate(cutoff.getDate() - DELETE_AFTER_DAYS)
    
    // For each thread matching our search
    for (var i = 0; i < threads.length; i++) {
      var thread = threads[i]
      
      // Only delete if the newest message in the thread is older then DELETE_AFTER_DAYS
      if (thread.getLastMessageDate() < cutoff) {
        thread.moveToTrash();
      }
    }
  }
  
}