const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

// Disable/Enable Button
function toggleButton() {
  button.disabled = !button.disabled;
}

// Passing Joke to VoiceRSS API
function tellMe(joke) {
  console.log("tell me:", joke);
  VoiceRSS.speech({
    key: "9eda57148d5a4028a2cd18254c7749c8",
    src: joke,
    hl: "en-us",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

// Get Jokes From Joke API
async function getJokes() {
  let joke = "";
  const apiUrl =
    "https://sv443.net/jokeapi/v2/joke/Programming,Miscellaneous,Pun";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    // Text-to-Speech
    tellMe(joke);
    // Disable Button
    toggleButton();
  } catch (error) {
    console.log("Oops", error);
  }
}

// Event Listeners
button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton);
