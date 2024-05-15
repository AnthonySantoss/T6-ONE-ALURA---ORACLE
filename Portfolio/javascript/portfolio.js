const nomeInput = document.getElementById('nome');
const emailInput = document.getElementById('email');
const assuntoInput = document.getElementById('assunto');
const mensagemInput = document.getElementById('mensagem');
const enviarButton = document.getElementById('botaoEnviar');
const mensagemEnviadaDiv = document.getElementById('mensagemEnviada');

nomeInput.addEventListener('input', validarFormulario);
emailInput.addEventListener('input', validarFormulario);
assuntoInput.addEventListener('input', validarFormulario);
mensagemInput.addEventListener('input', validarFormulario);

enviarButton.addEventListener('click', enviarMensagem);

function validarFormulario() {
    const nome = nomeInput.value.trim();
    const email = emailInput.value.trim();
    const assunto = assuntoInput.value.trim();
    const mensagem = mensagemInput.value.trim();

    const nomeValido = nome !== '' && nome.length <= 50;
    const emailValido = validarEmail(email);
    const assuntoValido = assunto !== '' && assunto.length <= 50;
    const mensagemValida = mensagem !== '' && mensagem.length <= 300;

    mostrarErro(nomeInput, !nomeValido, 'O campo nome não pode ser vazio ou ter mais de 50 caracteres.');
    mostrarErro(emailInput, !emailValido, 'Por favor, insira um endereço de e-mail válido.');
    mostrarErro(assuntoInput, !assuntoValido, 'O campo assunto não pode ser vazio ou ter mais de 50 caracteres.');
    mostrarErro(mensagemInput, !mensagemValida, 'O campo da mensagem não pode ficar em branco ou ter mais de 300 caracteres.');

    if (nomeValido) {
        aplicarEstilo(nomeInput, true);
    } else {
        aplicarEstilo(nomeInput, false);
    }

    if (emailValido) {
        aplicarEstilo(emailInput, true);
    } else {
        aplicarEstilo(emailInput, false);
    }

    if (assuntoValido) {
        aplicarEstilo(assuntoInput, true);
    } else {
        aplicarEstilo(assuntoInput, false);
    }

    if (mensagemValida) {
        aplicarEstilo(mensagemInput, true);
    } else {
        aplicarEstilo(mensagemInput, false);
    }

    if (nomeValido && emailValido && assuntoValido && mensagemValida) {
        enviarButton.disabled = false;
    } else {
        enviarButton.disabled = true;
    }
}

function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function mostrarErro(input, condicao, mensagem) {
    const erroSpan = input.nextElementSibling;
    if (condicao) {
        erroSpan.textContent = mensagem;
        erroSpan.style.color = 'red'; // Define a cor do texto da mensagem como vermelho
    } else {
        erroSpan.textContent = '';
    }
}

function aplicarEstilo(input, valido) {
    if (valido) {
        input.classList.remove('erro');
        input.classList.add('valido');
    } else {
        input.classList.remove('valido');
        input.classList.add('erro');
    }
}

function enviarMensagem() {
    // Simulando o envio da mensagem
    setTimeout(() => {
        mensagemEnviadaDiv.style.display = 'block';
        setTimeout(() => {
            mensagemEnviadaDiv.style.display = 'none';
        }, 3000); // Esconde a mensagem de sucesso após 3 segundos
    }, 500); // Mostra a mensagem de sucesso após 0.5 segundos (simulação)
}