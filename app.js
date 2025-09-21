let amigos = [];
let sorteado = false;

function mostrarMensagem(texto, tipo = "info") {
    const mensagem = document.getElementById("mensagem");
    mensagem.textContent = texto;
    mensagem.className = tipo; // "info", "erro", "sucesso"
    setTimeout(() => {
        mensagem.textContent = "";
    }, 3000);
}

function adicionar() {
    let amigoInput = document.getElementById('nome-amigo');
    let nome = amigoInput.value.trim();

    if (nome === '') {
        mostrarMensagem('Informe o nome do amigo!', 'erro');
        return;
    }

    if (amigos.includes(nome)) {
        mostrarMensagem('Nome já adicionado!', 'erro');
        return;
    }

    amigos.push(nome);
    atualizarLista();
    amigoInput.value = '';
    mostrarMensagem('Amigo adicionado com sucesso!', 'sucesso');
}

function atualizarLista() {
    let lista = document.getElementById('lista-amigos');
    lista.innerHTML = "";

    amigos.forEach((amigo, index) => {
        let li = document.createElement("li");
        li.textContent = amigo;

        let btnRemover = document.createElement("span");
        btnRemover.textContent = "❌";
        btnRemover.classList.add("remover");
        btnRemover.onclick = () => removerAmigo(index);

        li.appendChild(btnRemover);
        lista.appendChild(li);
    });
}

function removerAmigo(index) {
    amigos.splice(index, 1);
    atualizarLista();
    mostrarMensagem('Amigo removido!', 'info');
}

function sortear() {
    if (sorteado) {
        mostrarMensagem('Já foi realizado um sorteio! Reinicie para sortear novamente.', 'erro');
        return;
    }

    if (amigos.length < 4) {
        mostrarMensagem('Adicione pelo menos 4 amigos!', 'erro');
        return;
    }

    embaralhar(amigos);

    let sorteio = document.getElementById('lista-sorteio');
    sorteio.innerHTML = "";

    for (let i = 0; i < amigos.length; i++) {
        let resultado = document.createElement("p");
        if (i === amigos.length - 1) {
            resultado.textContent = `${amigos[i]} → ${amigos[0]}`;
        } else {
            resultado.textContent = `${amigos[i]} → ${amigos[i + 1]}`;
        }
        sorteio.appendChild(resultado);
    }

    sorteado = true;
    mostrarMensagem('Sorteio realizado com sucesso!', 'sucesso');
}

function embaralhar(lista) {
    for (let indice = lista.length; indice; indice--) {
        const indiceAleatorio = Math.floor(Math.random() * indice);
        [lista[indice - 1], lista[indiceAleatorio]] = [lista[indiceAleatorio], lista[indice - 1]];
    }
}

function reiniciar() {
    amigos = [];
    sorteado = false;
    document.getElementById('lista-amigos').innerHTML = '';
    document.getElementById('lista-sorteio').innerHTML = '';
    mostrarMensagem('Tudo foi reiniciado!', 'info');
}
