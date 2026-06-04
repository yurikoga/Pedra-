document.addEventListener('DOMContentLoaded', () => {
    // Seleção de elementos HTML
    const userHandDisplay = document.querySelector('#userHand i');
    const cpuHandDisplay = document.querySelector('#cpuHand i');
    const statusText = document.getElementById('statusText');
    const optionButtons = document.querySelectorAll('.option-btn');
    const userHandDiv = document.getElementById('userHand');
    const cpuHandDiv = document.getElementById('cpuHand');

    // Mapeamento de escolhas para ícones do Font Awesome
    const iconMap = {
        rock: 'fas fa-hand-fist',
        paper: 'fas fa-hand',
        scissors: 'fas fa-hand-scissors'
    };

    // Função principal do jogo
    function play(userChoice) {
        // 1. Fase de Preparação
        statusText.textContent = "Wait..."; // Como em image_18.png
        // Resetar para as mãos de pedra
        userHandDisplay.className = iconMap.rock;
        cpuHandDisplay.className = iconMap.rock;

        // Iniciar animação de balançar
        userHandDiv.classList.add('shaking');
        cpuHandDiv.classList.add('shaking');

        // Desativar botões durante a animação
        optionButtons.forEach(btn => btn.style.pointerEvents = 'none');

        // 2. Fase de Resultado (após 1.5 segundos)
        setTimeout(() => {
            // Parar animação
            userHandDiv.classList.remove('shaking');
            cpuHandDiv.classList.remove('shaking');

            // Gerar escolha aleatória da CPU
            const choices = ['rock', 'paper', 'scissors'];
            const cpuChoice = choices[Math.floor(Math.random() * choices.length)];

            // Atualizar ícones grandes com as escolhas finais
            userHandDisplay.className = iconMap[userChoice];
            cpuHandDisplay.className = iconMap[cpuChoice];

            // Determinar vencedor
            let result;
            if (userChoice === cpuChoice) {
                result = "Match Draw!!";
            } else if (
                (userChoice === 'rock' && cpuChoice === 'scissors') ||
                (userChoice === 'paper' && cpuChoice === 'rock') ||
                (userChoice === 'scissors' && cpuChoice === 'paper')
            ) {
                result = "User Won!!"; // Como em image_20.png/image_21.png
            } else {
                result = "Cpu Won!!"; // Como em image_19.png
            }

            // Exibir resultado
            statusText.textContent = result;

            // Reativar botões
            optionButtons.forEach(btn => btn.style.pointerEvents = 'auto');

        }, 1500); // 1.5 segundos de animação
    }

    // Configurar ouvintes de clique nos botões de opção
    optionButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Destacar botão selecionado
            optionButtons.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');

            // Iniciar o jogo com a escolha feita
            const choice = button.getAttribute('data-choice');
            play(choice);
        });
    });
});
