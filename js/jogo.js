/*Primeiro objetivo encontrar a altura e largura da página, 
porque a forma que os mosquitos iram aparecer serão randomicas 
e assim saberemos a proporção exata para nenhum mosquito 
aparecer fora tala*/
//Encapsulando em uma função para haver a atualização to tamanha da página conforme vamos atualizando

var altura = 0
var largura = 0
var vida = 1
var tempo = 15

//Dando dinâmica ao tempo de aparição dos mosquitos assim formando os niveis
var criaMosquitoTempo = 1500

var nivel = window.location.search
//Usando replace estamos fazendo a substituição de todos os caractere com ? para vazio
nivel = nivel.replace('?', '')

if(nivel === 'normal') {    
    //1500
    criaMosquitoTempo = 1500
} else if(nivel === 'dificil') {    
    //1000
    criaMosquitoTempo = 1000
} else if(nivel === 'chucknorris'){
    //750
    criaMosquitoTempo = 750
}


function ajustaTamanhoPalcoJogo() {
    altura = window.innerHeight
    largura = window.innerWidth
    console.log(largura, altura)
}

ajustaTamanhoPalcoJogo()

//Criando nosso cronometro
var cronometro = setInterval(function() {

    tempo -= 1

    if(tempo < 0) {
        clearInterval(cronometro)
        clearInterval(criaMosquito)
        window.location.href = 'vitoria.html'
    } else {
        document.getElementById('cronometro').innerHTML = tempo
    }        
}, 1000)
//Aqui solução é fazer com que o mosquito fique em uma posição ramdomica.

function posicaoRandomica() {

    //Remover o mosquito anterior (caso exista)
    if(document.getElementById('mosquito')) {
        document.getElementById('mosquito').remove()
        
        //Interagindo os pontos de vida
        //console.log('Elemento selecionado foi: v' + vida)
        if(vida > 3) {

            window.location.href = 'fim_de_jogo.html'

        } else {

        document.getElementById('v' + vida).src='imagens/coracao_vazio.png'
        
        }

        vida++
    }

    var posicaoX = Math.floor(Math.random() * largura) - 90
    var posicaoY = Math.floor(Math.random() * altura) - 90

    posicaoX = posicaoX < 0 ? 0 : posicaoX
    posicaoY = posicaoY < 0 ? 0 : posicaoY

    console.log(posicaoX, posicaoY)
    //Criando o elemento HTML utilizando o DOM
    //Com appenChild estamos criando um filho para o body
    //EStamos criando o elemento de forma programática.
    var mosquito = document.createElement('img')
    mosquito.src = 'imagens/mosca.png'
    mosquito.className = tamanhoAleatorio() + ' ' + ladoAleatorio()
    mosquito.style.left = posicaoX + 'px'
    mosquito.style.top = posicaoY + 'px'
    mosquito.style.position = 'absolute'
    mosquito.id = 'mosquito'
    mosquito.onclick = function() {
        //removendo o elemento html
        //Como a função está relacionada ao elemento html usamos os this
        this.remove()
    }


    document.body.appendChild(mosquito)  

    console.log(tamanhoAleatorio())
}

//Para deixar o jogo um pouco mais dinâmico iremos criar essa função para tamanhos aleatórios de mosquitos.

function tamanhoAleatorio() {
    var classe = Math.floor(Math.random() * 3)
    
    switch(classe) {
        case 0:
            return 'mosquito1'
        case 1:
            return 'mosquito2'
        case 2:
            return 'mosquito3'
    }
}

//Orientação da imagem: Se o mosquito está olhando para esquerda ou para direita

function ladoAleatorio() {
    var classe = Math.floor(Math.random() * 2)
    
    switch(classe) {
        case 0:
            return 'ladoA'
        case 1:
            return 'ladoB'
    }
}