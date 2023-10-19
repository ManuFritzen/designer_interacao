document.addEventListener("DOMContentLoaded", () => {
    const participantsList = document.getElementById("participants-list");
    const registerButton = document.getElementById("register-button");
    const matchesList = document.getElementById("matches-list");
    const generateMatchesButton = document.getElementById("generate-matches-button");
    const calculatePointsButton = document.getElementById("calculate-points-button");
    const standingsList = document.getElementById("standings-list");
    const participantInput = document.getElementById("participant-input");
    const clearSimulationButton = document.getElementById("clear-simulation-button");

    document.getElementById("modal-close-button").addEventListener("click", () => {
        document.getElementById("modal-container").style.display = "none";
    });

    clearSimulationButton.addEventListener("click", () => {
        localStorage.clear(); 

        participants = [];
        matches = [];
        matchResults = {};
        matchesWithResults = [];

        participantsList.innerHTML = "";
        matchesList.innerHTML = "";
        standingsList.innerHTML = "";

        participantInput.value = "";
        participantInput.disabled = false;
        registerButton.disabled = false;
        
        registerButton.style.display = "inline-block"; 
        participantInput.style.display = "inline-block"; 
        generateMatchesButton.style.display = "inline-block";
        
        localStorage.removeItem("matchesGenerated");
    });

    let participants = [];
    let matches = [];
    let matchResults = {};
    let matchesWithResults = [];

    function saveDataToLocalStorage() {
        localStorage.setItem("participants", JSON.stringify(participants));
        localStorage.setItem("matches", JSON.stringify(matches));
        localStorage.setItem("matchResults", JSON.stringify(matchResults)); 
        localStorage.setItem("standings", JSON.stringify(calculatePoints())); 
    }

    function loadDataFromLocalStorage() {
        const storedParticipants = localStorage.getItem("participants");
        const storedMatches = localStorage.getItem("matches");
        const storedMatchResults = localStorage.getItem("matchResults"); 
        const storedStandings = localStorage.getItem("standings"); 

        if (storedParticipants) {
            participants = JSON.parse(storedParticipants);
            updateParticipantsList();
        }

        if (storedMatches) {
            matches = JSON.parse(storedMatches);
            updateMatchesList();
        }
        if (storedMatchResults) {
            matchResults = JSON.parse(storedMatchResults); 
        }

        if (storedStandings) {
            const standings = JSON.parse(storedStandings); 
            updateStandingsList(standings); 
        }

        const matchesGenerated = localStorage.getItem("matchesGenerated");
        if (matchesGenerated === "true") {
            hideAndDisableParticipantModification();
        }
    }

    loadDataFromLocalStorage();

    registerButton.addEventListener("click", () => {
        const participantName = participantInput.value.trim();
        if (participantName && participants.length < 20) {
            participants.push(participantName);
            updateParticipantsList();
            participantInput.value = "";
    
            if (participants.length >= 20) {
                participantInput.disabled = true;
                registerButton.disabled = true;
            }
            saveDataToLocalStorage();
        }
    });

    function updateParticipantsList() {
        participantsList.innerHTML = "";
        participants.forEach((participant, index) => {
            const li = document.createElement("li");
            li.textContent = participant;
    
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "- excluir";
            deleteButton.addEventListener("click", () => {
                removeParticipant(index);
            });
    
            li.appendChild(deleteButton);
            participantsList.appendChild(li);
        });
    }
    
    function removeParticipant(index) {
        participants.splice(index, 1);
        updateParticipantsList();
        
        participantInput.disabled = false;
        registerButton.disabled = false;

        saveDataToLocalStorage();
    }

     generateMatchesButton.addEventListener("click", () => {
        if (participants.length < 3) {
            document.getElementById("modal-message").innerHTML = "Informe pelo menos 3 participantes!";
            document.getElementById("modal-container").style.display = "flex";
            return;
        }        
        generateMatches();
        updateMatchesList();
        hideAndDisableParticipantModification(); 

        localStorage.setItem("matchesGenerated", "true");

        saveDataToLocalStorage();
    });

    function generateMatches() {
        matches = [];
        for (let i = 0; i < participants.length; i++) {
            for (let j = i + 1; j < participants.length; j++) {
                const match = { player1: participants[i], player2: participants[j], result: "" };
                matches.push(match);
            }
        }
    }

    function updateMatchesList() {
        matchesList.innerHTML = ""; 
        matches.forEach((match, index) => {
            const li = document.createElement("li");
            li.textContent = `${match.player1} vs ${match.player2}`;
    
            const resultInput1 = document.createElement("input");
            resultInput1.type = "number";
            resultInput1.min = "0";
            resultInput1.placeholder = `Resultado ${match.player1}`;
    
            const resultInput2 = document.createElement("input");
            resultInput2.type = "number";
            resultInput2.min = "0";
            resultInput2.placeholder = `Resultado ${match.player2}`;
    
            if (match.result && match.result.split("-")[0] && match.result.split("-")[1]) {
                const scores = match.result.split("-");
                resultInput1.value = scores[0];
                resultInput2.value = scores[1];
                resultInput1.disabled = true;
                resultInput2.disabled = true;
            }   
            resultInput1.addEventListener("input", (e) => {
                match.result = `${e.target.value}-${match.result.split("-")[1] || ""}`;
                saveDataToLocalStorage(); 
            });
    
            resultInput2.addEventListener("input", (e) => {
                match.result = `${match.result.split("-")[0] || ""}-${e.target.value}`;
                saveDataToLocalStorage(); 
            });
    
            li.appendChild(resultInput1);
            li.appendChild(resultInput2);
            matchesList.appendChild(li);
        });
    }
    
    
    calculatePointsButton.addEventListener("click", () => {

        let partialResultFound = false;
        let resultCompleted = false;

        for (let match of matches) {
            const scores = (match.result || "").split("-");
            const score1 = scores[0];
            const score2 = scores[1];
    
            if ((score1 && !score2) || (!score1 && score2)) {
                partialResultFound = true;
                break;
            }
        }
    
        if (partialResultFound) {
            document.getElementById("modal-message").textContent = "Por favor, preencha os resultados para ambas as equipes em todas as partidas.";
            document.getElementById("modal-container").style.display = "flex";
            return;
        }    

        calculatePoints();
        const sortedPlayers = updateStandingsList();        
        updateMatchesList(); 
        saveDataToLocalStorage();

        for (let match of matches) {
            const scores = (match.result || "").split("-");
            const score1 = scores[0];
            const score2 = scores[1];
    
            if (!score1 && !score2) {
                resultCompleted = false;                
            } else {
                resultCompleted = true;
            }
        }

        if (sortedPlayers.length == participants.length && resultCompleted) {
            let message = "";
            
            if(sortedPlayers[0].points==sortedPlayers[1].points&&sortedPlayers[0].points==sortedPlayers[2].points){
                message = `
                🏆 Resultados Finais: <br>
                Houve um empate!!<br>
                🥇 ${sortedPlayers[0].name} - ${sortedPlayers[0].points} pontos<br>
                🥇 ${sortedPlayers[1].name} - ${sortedPlayers[1].points} pontos<br>
                🥇 ${sortedPlayers[2].name} - ${sortedPlayers[2].points} pontos`;
            }else if(sortedPlayers[0].points==sortedPlayers[1].points&&sortedPlayers[0].points!=sortedPlayers[2].points){
                message = `
                🏆 Resultados Finais: <br>
                Houve um empate!!<br>
                🥇 ${sortedPlayers[0].name} - ${sortedPlayers[0].points} pontos<br>
                🥇 ${sortedPlayers[1].name} - ${sortedPlayers[1].points} pontos<br>
                🥈 ${sortedPlayers[2].name} - ${sortedPlayers[2].points} pontos`;
            }else if(sortedPlayers[0].points!=sortedPlayers[1].points&&sortedPlayers[1].points==sortedPlayers[2].points){
                message = `
                🏆 Resultados Finais: <br>
                Houve um empate!!<br>
                🥇 ${sortedPlayers[0].name} - ${sortedPlayers[0].points} pontos<br>
                🥈 ${sortedPlayers[1].name} - ${sortedPlayers[1].points} pontos<br>
                🥈 ${sortedPlayers[2].name} - ${sortedPlayers[2].points} pontos`;
            } else {
                message = 
            `
                🏆 Resultados Finais: <br>
                🥇 1º Lugar: ${sortedPlayers[0].name} - ${sortedPlayers[0].points} pontos<br>
                🥈 2º Lugar: ${sortedPlayers[1].name} - ${sortedPlayers[1].points} pontos<br>
                🥉 3º Lugar: ${sortedPlayers[2].name} - ${sortedPlayers[2].points} pontos`;
            }               

            document.getElementById("modal-message").innerHTML = message; 
            document.getElementById("modal-container").style.display = "flex";    
        }
    });

    function calculatePoints() {
        const points = {}; 
        matches.forEach((match) => {
            const [score1, score2] = match.result.split("-").map(Number); 
            const player1 = match.player1;
            const player2 = match.player2;
            if (isNaN(score1) || isNaN(score2)) {
                return; 
            }
            
            matchesWithResults.push(match);
            
            if (score1 > score2) {
                points[player1] = (points[player1] || 0) + 3;
                points[player2] = (points[player2] || 0) + 0;
            } else if (score1 < score2) {
                points[player1] = (points[player1] || 0) + 0;
                points[player2] = (points[player2] || 0) + 3;
            } else {
                points[player1] = (points[player1] || 0) + 1;
                points[player2] = (points[player2] || 0) + 1;
            }
        });        
        return points;
    } 
        
    function updateStandingsList() {
        standingsList.innerHTML = "";
        const points = calculatePoints();
        const sortedPlayers = Object.keys(points).sort((a, b) => points[b] - points[a]);
        sortedPlayers.forEach((player) => {
            const li = document.createElement("li");
            li.textContent = `${player}: ${points[player]} pontos `;
            standingsList.appendChild(li);
        });
        return sortedPlayers.map(player => ({ name: player, points: points[player] }));
    }

    function hideAndDisableParticipantModification() {
        registerButton.style.display = "none";
        participantInput.style.display = "none";
        generateMatchesButton.style.display = "none";
        const deleteButtons = participantsList.querySelectorAll("button");
        deleteButtons.forEach((button) => {
            button.style.display = "none";
        });
        participantInput.disabled = true;
        registerButton.disabled = true;
    }    
});
