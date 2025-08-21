// JLPT
const JLPTAlarmTime = document.getElementById("JLPTAlarmTime")
const JLPTAlarm = document.getElementById("JLPTAlarm")

JLPTAlarm.addEventListener("click", async () => {
  let time = JLPTAlarmTime.value.split('/')

  // year/month/date/hour/minute
  let ms = new Date(
    parseInt(time[0]),
    parseInt(time[1] - 1),
    parseInt(time[2]),
    parseInt(time[3]),
    parseInt(time[4]),
  ).getTime()

  console.log(ms)

  chrome.runtime.sendMessage({
    action: "setJLPTAlarm",
    time: ms
  })
});