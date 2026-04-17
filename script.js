window.onload = function() {
    particlesJS("particles-js", { "particles": { "number": { "value": 40 }, "color": { "value": "#00ff88" }, "move": { "speed": 1 } } });
};

const words = [
    "სპაიდერმენი", "კრიპტოვალუტა", "ხინკლის კუჭი", "ინფლუენსერი", 
    "მთვარეული", "მუხლუხო", "სამაგიდო თამაში", "ელექტრო სკუტერი",
    "მწვადის შამფური", "კონდიციონერი", "პარლამენტი", "ბებიაჩემი",
    "პოპკორნი", "დინოზავრი", "ტიკტოკ ცეკვა", "ბიტკოინი", "წყალბურთი"
];

const punishments = [
    "გააკეთე 15 აზიდვა (отжимание) ყველას წინაშე!",
    "დალიე 1 ჭიქა წყალი, რომელშიც ცოტა მარილია გარეული.",
    "მიეცი უფლება მოწინააღმდეგეს, შენს ტელეფონზე ნებისმიერი 'სთორი' დადოს.",
    "შემდეგი რაუნდი იჯექი იატაკზე, როგორც პატარა ბავშვი.",
    "დაურეკე ნებისმიერ მეგობარს და უთხარი, რომ შენ ხარ 'დინოზავრი'.",
    "იმღერე ნებისმიერი სიმღერა ისე, თითქოს ოპერაში ხარ.",
    "გააკეთე 20 ჩაჯდომა ძალიან სწრაფად.",
    "ნება მიეცი პარტნიორს, მაკიაჟით სახეზე რამე დაგიხატოს.",
    "გააკეთე პლანკა (Plank) 45 წამის განმავლობაში."
];

let score = 0;
let timeLeft = 60;
let timerId;

function startGame() {
    score = 0;
    timeLeft = 60;
    document.getElementById('start-screen').classList.remove('active');
    document.getElementById('play-screen').classList.add('active');
    nextWord(null);
    startTimer();
}

function startTimer() {
    timerId = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').innerText = timeLeft;
        if(timeLeft <= 0) {
            clearInterval(timerId);
            endGame();
        }
    }, 1000);
}

function nextWord(isCorrect) {
    if(isCorrect === true) {
        score++;
        document.getElementById('correct-sound').play();
    }
    
    let randomWord = words[Math.floor(Math.random() * words.length)];
    document.getElementById('word-display').innerText = randomWord;
}

function endGame() {
    document.getElementById('play-screen').classList.remove('active');
    document.getElementById('result-screen').classList.add('active');
    document.getElementById('final-points').innerText = score;

    const randomPunishment = punishments[Math.floor(Math.random() * punishments.length)];
    document.getElementById('punishment-text').innerText = randomPunishment;
}
