const html = document.querySelector('html')
const focoBotao = document.querySelector('.app__card-button--foco')
const curtoBotao = document.querySelector('.app__card-button--curto')
const longoBotao = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const startPauseBt = document.querySelector ('#start-pause')
const musicaFocoInput = document.querySelector('#alternar-musica')
const musica = new Audio ('/sons/luna-rise-part-one.mp3')
const musicaIniciar = new Audio ('/sons/play.wav')
const musicaPausar = new Audio ('/sons/pause.mp3')
const tempoFinalizado = new Audio ('/sons/beep.mp3')
const tempoNaTela = document.querySelector('#timer')

let tempoDecorridoEmSegundos = 1500
let intervaloId = null;

musica.loop = true;

musicaFocoInput.addEventListener('change', () => {
    if (musica.paused){
        musica.play()
    } else {
        musica.pause()
    }
})

focoBotao.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500 
   alterarContexto('foco')
   focoBotao.classList.add('active')
})

curtoBotao.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300
    alterarContexto('descanso-curto')
    curtoBotao.classList.add('active')
})

longoBotao.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900;
    alterarContexto('descanso-longo')
    longoBotao.classList.add('active')
})

function alterarContexto (contexto) {
    mostrarTempo();
    botoes.forEach(function(contexto){
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `/imagens/${contexto}.png`)
    switch (contexto) {
        case "foco":
            titulo.innerHTML = ` Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`
                break;
            case "descanso-curto":
                titulo.innerHTML= `Que tal dá uma respirada? <strong class="app__title-strong"> Faça uma pausa curta.</strong>`
                break;
            case "descanso-longo":
                titulo.innerHTML= `Hora de volta à superfíce <strong class="app__title-strong"> Faça uma pausa longa.</strong>`
                break;           
}
}

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0){
        tempoFinalizado.play();
        zerar()
        return
    }
    tempoDecorridoEmSegundos -= 1;
    mostrarTempo();
}

startPauseBt.addEventListener('click', iniciar)

function iniciar () {
    musicaIniciar.play();
    if(intervaloId){
        musicaPausar.play();
        zerar()
        return
    }
    intervaloId = setInterval(contagemRegressiva, 1000)
}

function zerar () {
    clearInterval(intervaloId);
    intervaloId = null;
}

function mostrarTempo () {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrarTempo();