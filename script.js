let display = document.getElementById("display");
let input = "";
let history = [];

/* INPUT */
function append(val) {
  input += val;
  display.value = input;
}

/* CLEAR */
function clearAll() {
  input = "";
  display.value = "0";
}

/* BACK */
function back() {
  input = input.slice(0, -1);
  display.value = input || "0";
}

/* CALCULATE */
function calculate() {
  try {
    let result = eval(input);
    display.value = result;
    history.unshift(input + " = " + result);
    renderHistory();
    input = result.toString();
  } catch {
    display.value = "Error";
    input = "";
  }
}

/* HISTORY */
function renderHistory() {
  document.getElementById("historyList").innerHTML =
    history.map(h => `<div>${h}</div>`).join("");
}

function toggleHistory() {
  document.getElementById("historyPanel").classList.toggle("hidden");
}

/* SCIENTIFIC */
function toggleScientific() {
  document.getElementById("scientific").classList.toggle("hidden");
}

/* VOICE */
function startVoice() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Voice not supported");
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";

  recognition.start();

  recognition.onresult = function(event) {
    let speech = event.results[0][0].transcript.toLowerCase();

    speech = speech
      .replace(/plus/g, "+")
      .replace(/minus/g, "-")
      .replace(/times/g, "*")
      .replace(/into/g, "*")
      .replace(/divide by/g, "/")
      .replace(/divided by/g, "/");

    input += speech;
    display.value = input;

    try {
      let result = eval(input);
      display.value = result;
      input = result.toString();
    } catch {}
  };
}