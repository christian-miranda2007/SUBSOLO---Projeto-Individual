let numeros = '0123456789';
let caracteresEspeciais = '@!#$%&*()/?,.[]{}+=-_';

// Verifica se a senha tem pelo menos um dos caracteres da lista
function temAlgum(senha, lista) {
    let contador = 0;

    while (contador < senha.length) {
        if (lista.includes(senha[contador])) {
            return true;
        }
        contador++;
    }

    return false;
}

// Mostra a regra em verde quando ela foi cumprida
function regra(cumpriu, texto) {
    if (cumpriu) {
        return `<p style="color: #22b122;">${texto}</p>`;
    }
    return `<p>${texto}</p>`;
}

function validarSenha() {
    let senha = senha_input.value;

    if (senha == '') {
        regras.innerHTML = '';
        return;
    }

    regras.innerHTML =
        regra(senha != senha.toLowerCase(), 'Pelo menos uma letra maiúscula (A-Z).') +
        regra(senha != senha.toUpperCase(), 'Pelo menos uma letra minúscula (a-z).') +
        regra(temAlgum(senha, numeros), 'Pelo menos um número (0-9).') +
        regra(temAlgum(senha, caracteresEspeciais), 'Pelo menos um caractere especial.');
}

function verificarSenhas() {
    let senha = senha_input.value;
    let confirmarSenha = confirmacao_senha_input.value;

    if (senha != '' && senha == confirmarSenha) {
        validar.innerHTML = `<p style="color: #22b122">As senhas são iguais!</p>`;
    } else {
        validar.innerHTML = `<p style="color: #e01111">As senhas precisam ser iguais!</p>`;
    }
}

function senhaCumpreRegras(senha) {
    let temMaiuscula = senha != senha.toLowerCase();
    let temMinuscula = senha != senha.toUpperCase();

    return temMaiuscula && temMinuscula && temAlgum(senha, numeros) && temAlgum(senha, caracteresEspeciais);
}

function cadastrar() {
    let nome = ipt_nome.value.trim();
    let email = ipt_email.value.trim();
    let senha = senha_input.value;
    let confirmarSenha = confirmacao_senha_input.value;

    if (nome == '' || email == '' || senha == '' || confirmarSenha == '' ) {
        alert('Preencha todos os campos.');
    } else if (!email.includes('@') || !email.includes('.')) {
        alert('Digite um e-mail válido.');
    } else if (!senhaCumpreRegras(senha)) {
        alert('A senha precisa cumprir todas as regras indicadas.');
    } else if (senha != confirmarSenha) {
        alert('As senhas precisam ser iguais.');
    } else {
        // envia os dados para a API gravar no banco
        fetch('/usuarios/cadastrar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nomeServer: nome,
                emailServer: email,
                senhaServer: senha,

            })
        }).then(function (resposta) {
            if (resposta.ok) {
                alert('Conta criada com sucesso!');
                window.location.href = 'login.html';
            } else {
                resposta.text().then(function (mensagem) {
                    alert(mensagem);
                });
            }
        }).catch(function () {
            alert('Não foi possível conectar ao servidor.');
        });
    }

    return false;
}