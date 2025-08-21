chrome.runtime.onMessage.addListener(async function (message, sender, sendResponse) {
  if(message.action == 'setJLPTAlarm')
    {   
      let whenToRing = message.time
      // Create
      chrome.alarms.create('JLPTAlarm', {
        when: whenToRing,
      }); 
  }
})

chrome.alarms.onAlarm.addListener(function(alarm) {
  if (alarm.name === 'JLPTAlarm') 
  {
    chrome.tabs.create({
      url: 'https://jlptonline.or.id'
    });
  }
});
