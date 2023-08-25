const buttonStart = document.getElementById("comecarButton");
const stageOne = document.querySelector('.etapa1');
const logo = document.querySelector('.logo');

function start() {
    logo.style.width = '15%';
    buttonStart.style.display = 'none';
    startStage1();
}

buttonStart.addEventListener("click", start);

let time = [
    { id: "time1", label: "Time 1", color: "#000000", name: "", gols: 0 },
    { id: "time2", label: "Time 2", color: "#000000", name: "", gols: 0 },
    { id: "time3", label: "Time 3", color: "#000000", name: "", gols: 0 },
    { id: "time4", label: "Time 4", color: "#000000", name: "", gols: 0 }
]

function emptyContainer() {
    document.getElementById("card").innerHTML = "";
}
function activateButton(valido) {
    const buttonNext = document.getElementById("submitToNext");
    buttonNext.disabled = !valido;
}

function startStage1() {
    let card = document.getElementById("card");
    let cardContent = document.createElement("div");
    cardContent.setAttribute("id", "card-content");
    card.appendChild(cardContent);

    let cardTitle = document.createElement("div");
    cardTitle.setAttribute("id", "card-title");
    cardContent.appendChild(cardTitle);
    let title = document.createElement("h2");
    title.innerText = "Informe os Times";
    cardTitle.appendChild(title);

    let underlineTitle = document.createElement("div");
    underlineTitle.setAttribute("class", "underline-title");
    cardTitle.appendChild(underlineTitle);

    let form = document.createElement("form");
    form.setAttribute("class", "form");

    for (let t = 0; t < 4; t++) {
        let label = document.createElement("label");
        label.setAttribute("for", time[t].id);
        label.innerText = (time[t]).label;
        form.appendChild(label);

        let divInputs = document.createElement("div");
        divInputs.setAttribute("class", "inputs");
        let inputName = document.createElement("input");
        inputName.setAttribute("id", time[t].id);
        inputName.setAttribute("class", "form-content");
        inputName.setAttribute("type", "text");
        inputName.addEventListener("change", () => {
            time[t].name = inputName.value;
        });
        divInputs.appendChild(inputName);

        let inputColor = document.createElement("input");
        inputColor.setAttribute("id", time[t].id + "Color");
        inputColor.setAttribute("type", "color");
        inputColor.addEventListener("change", () => {
            time[t].color = inputColor.value;
        });
        divInputs.appendChild(inputColor);
        form.appendChild(divInputs);

        let formBorder = document.createElement("div");
        formBorder.setAttribute("class", "form-border");
        form.appendChild(formBorder);
    }

    let buttonGo = document.createElement("button");
    buttonGo.setAttribute("id", "submitToNext");
    buttonGo.innerText = "AVANÇAR ->";
    buttonGo.addEventListener("click", (e) => {
        e.preventDefault();
        for(let i = 0; i < time.length; i++) {
            if (time[i].name == "") {
                alert("Por favor, preencha todos os campos corretamente antes de avançar.");
                return;
            }
        }
        emptyContainer();
        startStage2();
    });
    form.appendChild(buttonGo);

    cardContent.appendChild(form);
}

let Semi1Vencedor;
let Semi2Vencedor;

function startStage2() {
    let card = document.getElementById("card");
    let cardContent = document.createElement("div");
    cardContent.setAttribute("id", "card-content");
    card.appendChild(cardContent);

    let cardTitle = document.createElement("div");
    cardTitle.setAttribute("id", "card-title");
    cardContent.appendChild(cardTitle);
    let title = document.createElement("h2");
    title.innerText = "JOGO 1 - SEMIFINAL";
    cardTitle.appendChild(title);
    let subTitle = document.createElement("p");
    subTitle.innerText = "Informe a quantidade de gols";
    cardTitle.appendChild(subTitle);

    let form = document.createElement("form");
    form.setAttribute("class", "form");
    cardContent.appendChild(form);

    let jogo1Semi = document.createElement("div");
    jogo1Semi.setAttribute("class", "jogo1Semi");
    form.appendChild(jogo1Semi);

    let divTime1 = document.createElement("div");
    divTime1.setAttribute("class", "divTime1");
    jogo1Semi.appendChild(divTime1);

    let labelTime1 = document.createElement("label");
    labelTime1.setAttribute("for", "time1Semi");
    labelTime1.innerText = time[0].name;
    divTime1.appendChild(labelTime1);
    let inputGolsTime1 = document.createElement("input");
    inputGolsTime1.setAttribute("id", "time1Semi");
    inputGolsTime1.setAttribute("type", "number");
    inputGolsTime1.setAttribute("min", "0");
    inputGolsTime1.setAttribute("placeholder", "0");
    inputGolsTime1.addEventListener("change", () => {
        time[0].gols = inputGolsTime1.value;
    });
    divTime1.appendChild(inputGolsTime1);

    let x = document.createElement("p");
    x.innerText = 'X';
    jogo1Semi.appendChild(x);

    let divTime2 = document.createElement("div");
    divTime2.setAttribute("class", "divTime2");
    jogo1Semi.appendChild(divTime2);

    let labelTime2 = document.createElement("label");
    labelTime2.setAttribute("for", "time2Semi");
    labelTime2.innerText = time[1].name;
    divTime2.appendChild(labelTime2);
    let inputGolsTime2 = document.createElement("input");
    inputGolsTime2.setAttribute("id", "time2Semi");
    inputGolsTime2.setAttribute("type", "number");
    inputGolsTime2.setAttribute("min", "0");
    inputGolsTime2.setAttribute("placeholder", "0");
    inputGolsTime2.addEventListener("change", () => {
        time[1].gols = inputGolsTime2.value;
    });
    divTime2.appendChild(inputGolsTime2);

    let buttonGo = document.createElement("button");
    buttonGo.setAttribute("id", "submitToNext");
    buttonGo.innerText = "AVANÇAR ->";
    buttonGo.addEventListener("click", (e) => {
        e.preventDefault();     

        if (time[0].gols == time[1].gols) {
            let buttonDisplay = document.getElementById("submitToNext");
            buttonDisplay.style.display = "none";

            let penaltJogo1 = document.createElement("div");
            penaltJogo1.setAttribute("class", "penaltJogo1");
            form.appendChild(penaltJogo1);

            let penatTitle = document.createElement("h2");
            penatTitle.innerText = "DEU PÊNALTI!!";
            penaltJogo1.appendChild(penatTitle);

            let penaltSubtitle = document.createElement("p");
            penaltSubtitle.innerText = "Informe quem venceu nos penalts";
            penaltJogo1.appendChild(penaltSubtitle);

            let vencedor = document.createElement("select");
            vencedor.setAttribute("id", "quemvenceu");
            penaltJogo1.appendChild(vencedor);

            let optionPlaceholder = document.createElement("option");
            optionPlaceholder.setAttribute("value", "");
            optionPlaceholder.innerText = "Selecione uma opção"; 
            vencedor.appendChild(optionPlaceholder);

            let option1 = document.createElement("option");
            option1.setAttribute("value", time[0].name);
            option1.innerText = time[0].name;
            vencedor.appendChild(option1);

            let option2 = document.createElement("option");
            option2.setAttribute("value", time[1].name);
            option2.innerText = time[1].name;
            vencedor.appendChild(option2);

            vencedor.addEventListener("change", () => {
                Semi1Vencedor = vencedor.value;
            });

            let buttonGoIf = document.createElement("button");
            buttonGoIf.setAttribute("id", "submitToNext");
            buttonGoIf.innerText = "AVANÇAR ->";
            buttonGoIf.addEventListener("click", (e) => {
                let selectedOption = vencedor.value;
                e.preventDefault();
                if (selectedOption === "") {
                    alert("Por favor, selecione uma opção antes de avançar.");
                    return;
                }                
                emptyContainer();
                startStage3();
            });
            form.appendChild(buttonGoIf)
        } else if (time[0].gols > time[1].gols) {
            Semi1Vencedor = time[0].name;
            emptyContainer();
            startStage3();
        } else {
            Semi1Vencedor = time[1].name;
            emptyContainer();
            startStage3();
        }
    });
    form.appendChild(buttonGo);
}

function startStage3() {
    let card = document.getElementById("card");
    let cardContent = document.createElement("div");
    cardContent.setAttribute("id", "card-content");
    card.appendChild(cardContent);

    let cardTitle = document.createElement("div");
    cardTitle.setAttribute("id", "card-title");
    cardContent.appendChild(cardTitle);
    let title = document.createElement("h2");
    title.innerText = "JOGO 2 - SEMIFINAL";
    cardTitle.appendChild(title);
    let subTitle = document.createElement("p");
    subTitle.innerText = "Informe a quantidade de gols";
    cardTitle.appendChild(subTitle);

    let form = document.createElement("form");
    form.setAttribute("class", "form");
    cardContent.appendChild(form);

    let jogo2Semi = document.createElement("div");
    jogo2Semi.setAttribute("class", "jogo2Semi");
    form.appendChild(jogo2Semi);

    let divTime3 = document.createElement("div");
    divTime3.setAttribute("class", "divTime3");
    jogo2Semi.appendChild(divTime3);

    let labelTime3 = document.createElement("label");
    labelTime3.setAttribute("for", "time3Semi");
    labelTime3.innerText = time[2].name;
    divTime3.appendChild(labelTime3);
    let inputGolsTime3 = document.createElement("input");
    inputGolsTime3.setAttribute("id", "time3Semi");
    inputGolsTime3.setAttribute("type", "number");
    inputGolsTime3.setAttribute("min", "0");
    inputGolsTime3.setAttribute("placeholder", "0");
    inputGolsTime3.addEventListener("change", () => {
        time[2].gols = inputGolsTime3.value;
    });
    divTime3.appendChild(inputGolsTime3);

    let x = document.createElement("p");
    x.innerText = 'X';
    jogo2Semi.appendChild(x);

    let divTime4 = document.createElement("div");
    divTime4.setAttribute("class", "divTime4");
    jogo2Semi.appendChild(divTime4);

    let labelTime4 = document.createElement("label");
    labelTime4.setAttribute("for", "time4Semi");
    labelTime4.innerText = time[3].name;
    divTime4.appendChild(labelTime4);
    let inputGolsTime4 = document.createElement("input");
    inputGolsTime4.setAttribute("id", "time4Semi");
    inputGolsTime4.setAttribute("type", "number");
    inputGolsTime4.setAttribute("min", "0");
    inputGolsTime4.setAttribute("placeholder", "0");
    inputGolsTime4.addEventListener("change", () => {
        time[3].gols = inputGolsTime4.value;
    });
    divTime4.appendChild(inputGolsTime4);

    let buttonGo = document.createElement("button");
    buttonGo.setAttribute("id", "submitToNext");
    buttonGo.innerText = "AVANÇAR ->";
    buttonGo.addEventListener("click", (e) => {
        e.preventDefault();
        
        if (time[2].gols == time[3].gols) {
            let buttonDisplay = document.getElementById("submitToNext");
            buttonDisplay.style.display = "none";
            
            let penaltJogo2 = document.createElement("div");
            penaltJogo2.setAttribute("class", "penaltJogo2");
            form.appendChild(penaltJogo2);
            
            let penatTitle = document.createElement("h2");
            penatTitle.innerText = "DEU PÊNALTI!!";
            penaltJogo2.appendChild(penatTitle);

            let penaltSubtitle = document.createElement("p");
            penaltSubtitle.innerText = "Informe quem venceu nos penalts";
            penaltJogo2.appendChild(penaltSubtitle);
            
            let vencedor = document.createElement("select");
            vencedor.setAttribute("id", "quemvenceu");
            penaltJogo2.appendChild(vencedor);
            
            let optionPlaceholder = document.createElement("option");
            optionPlaceholder.setAttribute("value", "");
            optionPlaceholder.innerText = "Selecione uma opção"; 
            vencedor.appendChild(optionPlaceholder);
            
            let option1 = document.createElement("option");
            option1.setAttribute("value", time[2].name);
            option1.innerText = time[2].name;
            vencedor.appendChild(option1);
            
            let option2 = document.createElement("option");
            option2.setAttribute("value", time[3].name);
            option2.innerText = time[3].name;
            vencedor.appendChild(option2);
            
            vencedor.addEventListener("change", () => {
                Semi2Vencedor = vencedor.value;
            });
            
            let buttonGoIf = document.createElement("button");
            buttonGoIf.setAttribute("id", "submitToNext");
            buttonGoIf.innerText = "AVANÇAR ->";
            buttonGoIf.addEventListener("click", (e) => {
                e.preventDefault();
                let selectedOption = vencedor.value;
                if (selectedOption === "") {
                    alert("Por favor, selecione uma opção antes de avançar.");
                    return;
                }               
                emptyContainer();
                startStage4();
            });
            form.appendChild(buttonGoIf)
            
            
        } else if (time[2].gols > time[3].gols) {
            Semi2Vencedor = time[2].name;
            emptyContainer();
            startStage4();
        } else {
            Semi2Vencedor = time[3].name;
            emptyContainer();
            startStage4();
        }
    });
    form.appendChild(buttonGo);
}

let vencedorTorneio;


function startStage4() {
    time[0].gols=0;
    time[1].gols=0;

    let card = document.getElementById("card");
    let cardContent = document.createElement("div");
    cardContent.setAttribute("id", "card-content");
    card.appendChild(cardContent);
    
    let cardTitle = document.createElement("div");
    cardTitle.setAttribute("id", "card-title");
    cardContent.appendChild(cardTitle);
    let title = document.createElement("h2");
    title.innerText = "JOGO DA FINAL";
    cardTitle.appendChild(title);
    let subTitle = document.createElement("p");
    subTitle.innerText = "Informe a quantidade de gols";
    cardTitle.appendChild(subTitle);

    let form = document.createElement("form");
    form.setAttribute("class", "form");
    cardContent.appendChild(form);

    let jogoFinal = document.createElement("div");
    jogoFinal.setAttribute("class", "jogoFinal");
    form.appendChild(jogoFinal);

    let divTime1Final = document.createElement("div");
    divTime1Final.setAttribute("class", "divTime1Final");
    jogoFinal.appendChild(divTime1Final);

    let labelTime1Final = document.createElement("label");
    labelTime1Final.setAttribute("for", "time1Final");
    labelTime1Final.innerText = Semi1Vencedor;
    divTime1Final.appendChild(labelTime1Final);
    let inputGolsTime1Final = document.createElement("input");
    inputGolsTime1Final.setAttribute("id", "time1Final");
    inputGolsTime1Final.setAttribute("type", "number");
    inputGolsTime1Final.setAttribute("min", "0");
    inputGolsTime1Final.setAttribute("placeholder", "0");
    inputGolsTime1Final.addEventListener("change", () => {
        time[0].gols = inputGolsTime1Final.value;
    });
    divTime1Final.appendChild(inputGolsTime1Final);

    let x = document.createElement("p");
    x.innerText = 'X';
    jogoFinal.appendChild(x);

    let divTime2Final = document.createElement("div");
    divTime2Final.setAttribute("class", "divTime2Final");
    jogoFinal.appendChild(divTime2Final);

    let labelTime2Final = document.createElement("label");
    labelTime2Final.setAttribute("for", "time2Final");
    labelTime2Final.innerText = Semi2Vencedor;
    divTime2Final.appendChild(labelTime2Final);
    let inputGolsTime2Final = document.createElement("input");
    inputGolsTime2Final.setAttribute("id", "time2Semi");
    inputGolsTime2Final.setAttribute("type", "number");
    inputGolsTime2Final.setAttribute("min", "0");
    inputGolsTime2Final.setAttribute("placeholder", "0");
    inputGolsTime2Final.addEventListener("change", () => {
        time[1].gols = inputGolsTime2Final.value;
    });
    divTime2Final.appendChild(inputGolsTime2Final);

    let buttonGo = document.createElement("button");
    buttonGo.setAttribute("id", "submitToNext");
    buttonGo.innerText = "AVANÇAR ->";
    buttonGo.addEventListener("click", (e) => {        
        e.preventDefault();

        if (time[0].gols == time[1].gols) {
            let buttonDisplay = document.getElementById("submitToNext");
            buttonDisplay.style.display = "none";

            let penaltJogo1 = document.createElement("div");
            penaltJogo1.setAttribute("class", "penaltJogo1");
            form.appendChild(penaltJogo1);

            let penatTitle = document.createElement("h2");
            penatTitle.innerText = "DEU PÊNALTI!!";
            penaltJogo1.appendChild(penatTitle);

            let penaltSubtitle = document.createElement("p");
            penaltSubtitle.innerText = "Informe quem venceu nos penalts";
            penaltJogo1.appendChild(penaltSubtitle);

            let vencedor = document.createElement("select");
            vencedor.setAttribute("id", "quemvenceu");
            penaltJogo1.appendChild(vencedor);

            let optionPlaceholder = document.createElement("option");
            optionPlaceholder.setAttribute("value", "");
            optionPlaceholder.innerText = "Selecione uma opção"; 
            vencedor.appendChild(optionPlaceholder);


            let option1 = document.createElement("option");
            option1.setAttribute("value", Semi1Vencedor);
            option1.innerText = Semi1Vencedor;
            vencedor.appendChild(option1);

            let option2 = document.createElement("option");
            option2.setAttribute("value", Semi2Vencedor);
            option2.innerText = Semi2Vencedor;
            vencedor.appendChild(option2);

            vencedor.addEventListener("change", () => {
                vencedorTorneio = vencedor.value;
            });

            let buttonGoIf = document.createElement("button");
            buttonGoIf.setAttribute("id", "submitToNext");
            buttonGoIf.innerText = "AVANÇAR ->";
            buttonGoIf.addEventListener("click", (e) => {
                e.preventDefault();

                let selectedOption = vencedor.value;
                if (selectedOption === "") {
                    alert("Por favor, selecione uma opção antes de avançar.");
                    return;
                }

                emptyContainer();
                startStage5();
            });
            form.appendChild(buttonGoIf)


        } else if (time[0].gols > time[1].gols) {
            vencedorTorneio = Semi1Vencedor;
            emptyContainer();
            startStage5();
        } else {
            vencedorTorneio = Semi2Vencedor;
            emptyContainer();
            startStage5();
        }
    });
    form.appendChild(buttonGo);
}

function startStage5(){
    let vencedorColor;

    for (let i = 0; i < time.length; i++){
        if(time[i].name == vencedorTorneio){
            vencedorColor = time[i].color;
        }
    }

    let card = document.getElementById("card");
    card.style.borderColor = vencedorColor;
    let cardContent = document.createElement("div");
    cardContent.setAttribute("id", "card-content");
    card.appendChild(cardContent);

    let cardTitle = document.createElement("div");
    cardTitle.setAttribute("id", "card-title");
    cardContent.appendChild(cardTitle);
    let title = document.createElement("h2");
    title.innerText = "TIME VENCEDOR!";
    title.style.color = vencedorColor;
    cardTitle.appendChild(title);
    let subTitle = document.createElement("p");
    subTitle.setAttribute("class", "timeVencedor");
    subTitle.innerText = vencedorTorneio;
    subTitle.style.color = vencedorColor;
    cardTitle.appendChild(subTitle);
}