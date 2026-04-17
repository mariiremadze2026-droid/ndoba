const words = ["ხინკალი", "ბეტმენი", "პინგვინი", "სელფი", "ტიკტოკი", "შაურმა", "გიტარა", "ზვიგენი", "კოსმოსი", "აიფონი", "პროგრამისტი", "მწვადი", "ფეხბურთი", "დინოზავრი", "სპაიდერმენი", "ბებიაჩემი"];
const punishments = ["15 აზიდვა", "იმღერე ხმამაღლა", "დალიე წყალი ერთი ამოსუნთქვით", "20 ჩაჯდომა", "დადე სთორი", "ილაპარაკე აქცენტით", "პლანკა 45 წამი"];

let players = [], pairs = [], currentPairIndex = 0, score = 0, timeLeft = 40, timerId;

function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
}

function addPlayer() {
    const input = document.getElementById('player-name-input');
    const name = input.value.trim();
    if (name) {
        players.push(name);
        input.value = "";
        document.getElementById('player-list-display').innerHTML = players.map(p => `<span class="player-tag">${p}</span>`).join("");
        if (players.length >= 2) document.getElementById('pair-btn').style.display = "block";
    }
}

function generatePairs() {
    let shuffled = [...players].sort(() => Math.random() - 0.5);
    pairs = [];
    for (let i = 0; i < shuffled.length; i += 2) {
        if (shuffled[i + 1]) pairs.push([shuffled[i], shuffled[i+1]]);
        else pairs.push([shuffled[i], shuffled[0]]);
    }
    currentPairIndex = 0;
    showNextPair();
}

function showNextPair() {
    if (currentPairIndex < pairs.length) {
        document.getElementById('current-pair-display').innerText = `${pairs[currentPairIndex][0]} & ${pairs[currentPairIndex][1]}`;
        showScreen('pairs-screen');
    } else {
        alert("ყველამ ითამაშა!");
        location.reload();
    }
}

function startRound() {
    score = 0; timeLeft = 40;
    document.getElementById('timer').innerText = timeLeft;
    showScreen('play-screen');
    nextWord(null);
    if (timerId) clearInterval(timerId);
    timerId = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').innerText = timeLeft;
        if (timeLeft <= 0) { clearInterval(timerId); endRound(); }
    }, 1000);
}

function nextWord(isCorrect) {
    if (isCorrect) { score++; document.getElementById('correct-sound').play().catch(()=>{}); }
    else if (isCorrect === false) document.getElementById('tick-sound').play().catch(()=>{});
    document.getElementById('word-display').innerText = words[Math.floor(Math.random() * words.length)];
}

function endRound() {
    document.getElementById('round-results').innerText = `ქულა: ${score}`;
    document.getElementById('punishment-text').innerText = punishments[Math.floor(Math.random() * punishments.length)];
    showScreen('result-screen');
    currentPairIndex++;
}

window.addEventListener('load', () => {
    if (typeof particlesJS !== 'undefined') {
        particlesJS("particles-js", { "particles": { "number": { "value": 40 }, "color": { "value": "#00ff88" }, "move": { "enable": true, "speed": 1 } } });
    }
});
