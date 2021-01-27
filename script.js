const button = document.querySelector('#button');
const audioElement = document.querySelector('audio');

// passing joke to Voice api
function tellMe(joke) {
    VoiceRSS.speech({
        key: '39a38d4506194c82aacbc718f43f6183',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// taking joke from joke api
async function getJokes() {
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
    let joke = '';
    try {
        const data = await fetch(apiUrl).then(response => response.json());
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`
        } else {
            joke = data.joke;
        }
        tellMe(joke);
        toggleButton();
    } catch (e) {
        console.log(e);
    }
}

// button disable/enable
function toggleButton(){
    button.disabled = !button.disabled;
}

// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);
