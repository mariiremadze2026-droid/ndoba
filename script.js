window.onload = function() {
    particlesJS("particles-js", { "particles": { "number": { "value": 60 }, "color": { "value": "#00ff88" }, "move": { "speed": 1 } } });

    let players = [];
    let currentPlayerIndex = 0;
    
    const rolesData = {
        "მოღალატე": "შენი მიზანია ყველას მოატყუო. ეცადე ქულები მოიპარო!",
        "ერთგული": "ეძებე ნამდვილი მეგობარი და ერთად დააგროვეთ ქულები.",
        "შპიონი": "დააკვირდი ვინ იტყუება და დღისით ყველას გააგებინე.",
        "მანიპულატორი": "აურიე სიტუაცია, აიძულე სხვები ერთმანეთს უღალატონ."
    };

    const missions = [
        "ამ რაუნდში ყველას დააჯერე, რომ `ერთგული` ხარ.",
        "შეეცადე ორ მეგობარს შორის ეჭვი ჩამოაგდო.",
        "ამ რაუნდში მხოლოდ ჩურჩულით ილაპარაკე.",
        "თქვი, რომ ნდობას აჭერ, მაგრამ მოიქეცი ისე, როგორც გინდა.",
        "შეეცადე გაიგო, რას აპირებს შენი მეწყვილე."
    ];

    window.playSound = function(id) { document.getElementById(id).play().catch(()=>{}); };

    window.showScreen = function(id) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById(id).classList.add('active');
    };

    window.createRoom = function() { playSound('clickSound'); showScreen('lobby-screen'); };

    window.addNewPlayer = function() {
        const input = document.getElementById('new-player-name');
        if (!input.value) return;
        
        const roleNames = Object.keys(rolesData);
        players.push({
            name: input.value,
            points: 10,
            role: roleNames[Math.floor(Math.random() * roleNames.length)],
            mission: missions[Math.floor(Math.random() * missions.length)],
            choice: null
        });
        
        input.value = "";
        document.getElementById('player-list').innerHTML = players.map(p => `<span class="player-tag">👤 ${p.name}</span>`).join("");
        if (players.length >= 2) document.getElementById('start-game-btn').style.display = "block";
        playSound('clickSound');
    };

    window.startOfflineGame = function() {
        currentPlayerIndex = 0;
        document.body.className = "night-mode";
        document.getElementById('phase-text').innerText = "ღამის ფაზა 🌙";
        showPassScreen();
        showScreen('game-screen');
    };

    function showPassScreen() {
        document.getElementById('pass-device-screen').style.display = "block";
        document.getElementById('role-reveal-screen').style.display = "none";
        document.getElementById('next-player-instruction').innerHTML = `გადაეცი: <span>${players[currentPlayerIndex].name}</span>`;
    }

    window.showSecretRole = function() {
        playSound('clickSound');
        document.getElementById('pass-device-screen').style.display = "none";
        document.getElementById('role-reveal-screen').style.display = "block";
        const p = players[currentPlayerIndex];
        document.getElementById('current-player-role').innerText = p.role;
        document.getElementById('role-desc').innerText = rolesData[p.role];
        document.getElementById('current-mission').innerText = p.mission;
        document.getElementById('my-points').innerText = p.points;
    };

    window.makeDecision = function(type) {
        players[currentPlayerIndex].choice = type;
        if(type === 'trust') playSound('trustSound'); else playSound('betraySound');
        
        currentPlayerIndex++;
        if (currentPlayerIndex < players.length) showPassScreen(); else finishRound();
    };

    function finishRound() {
        document.body.className = "day-mode";
        document.getElementById('phase-text').innerText = "დღის ფაზა ☀️";
        
        let results = "☀️ გათენდა! შედეგები:\n\n";
        for (let i = 0; i < players.length; i += 2) {
            if (i + 1 < players.length) {
                let p1 = players[i], p2 = players[i+1];
                if (p1.choice === 'trust' && p2.choice === 'trust') { p1.points += 3; p2.points += 3; results += `🤝 ${p1.name} & ${p2.name}: ორივე ენდო (+3)\n`; }
                else if (p1.choice === 'betray' && p2.choice === 'trust') { p1.points += 5; p2.points -= 2; results += `😈 ${p1.name}-მა უღალატა ${p2.name}-ს! (+5/-2)\n`; }
                else if (p1.choice === 'trust' && p2.choice === 'betray') { p1.points -= 2; p2.points += 5; results += `😈 ${p2.name}-მა უღალატა ${p1.name}-ს! (+5/-2)\n`; }
                else { p1.points -= 1; p2.points -= 1; results += `⚔️ ${p1.name} & ${p2.name}: ორივემ უღალატა (-1)\n`; }
            }
        }
        setTimeout(() => { 
            alert(results); 
            if(confirm("გსურთ შემდეგი რაუნდი?")) startOfflineGame(); else location.reload();
        }, 500);
    }
};
