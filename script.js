// ==========================================
// PRODUTOS
// ==========================================

const produtos = [

    // =========================
    // MEDICAMENTOS
    // =========================

    {
        id: 1,
        nome: "Dipirona",
        categoria: "medicamentos",
        descricao: "Analgésico e antitérmico.",
        preco: 8.99,
        imagem: "images/dipirona.jpg",
        disponivel: true,
        emPromocao: false,
        precoPromocional: 0
    },

    {
        id: 2,
        nome: "Paracetamol",
        categoria: "medicamentos",
        descricao: "Analgésico e antitérmico.",
        preco: 7.99,
        imagem: "images/paracetamol.jpg",
        disponivel: true,
        emPromocao: false,
        precoPromocional: 0
    },

    {
        id: 3,
        nome: "Ibuprofeno",
        categoria: "medicamentos",
        descricao: "Indicado para dores e febre.",
        preco: 12.99,
        imagem: "images/ibuprofeno.jpg",
        disponivel: true,
        emPromocao: false,
        precoPromocional: 0
    },

    {
        id: 4,
        nome: "Amoxicilina",
        categoria: "medicamentos",
        descricao: "Antibiótico. Consulte um profissional de saúde.",
        preco: 24.99,
        imagem: "images/amoxicilina.jpg",
        disponivel: true,
        emPromocao: false,
        precoPromocional: 0
    },

    // =========================
    // PERFUMARIA
    // =========================

    {
        id: 5,
        nome: "Perfumes",
        categoria: "perfumaria",
        descricao: "Perfumes e fragrâncias para todos os momentos.",
        preco: 59.90,
        imagem: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539",
        disponivel: true,
        emPromocao: false,
        precoPromocional: 0
    },

    {
        id: 6,
        nome: "Higiene pessoal",
        categoria: "perfumaria",
        descricao: "Produtos para higiene e cuidados pessoais.",
        preco: 19.90,
        imagem: "https://images.unsplash.com/photo-1556228720-195a672e8a03",
        disponivel: true,
        emPromocao: false,
        precoPromocional: 0
    },

    {
        id: 7,
        nome: "Produtos de beleza",
        categoria: "perfumaria",
        descricao: "Cuidados para deixar sua rotina ainda melhor.",
        preco: 29.90,
        imagem: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b",
        disponivel: true,
        emPromocao: false,
        precoPromocional: 0
    },

    // =========================
    // COSMÉTICOS
    // =========================

    {
        id: 8,
        nome: "Hidratante Corporal",
        categoria: "cosmeticos",
        descricao: "Hidratante para cuidados com a pele.",
        preco: 19.99,
        imagem: "images/hidratante.jpg",
        disponivel: true,
        emPromocao: false,
        precoPromocional: 0
    }

];


// ==========================================
// WHATSAPP
// ==========================================

const whatsapp = "5562993149878";


// ==========================================
// CARRINHO
// ==========================================

let carrinho =
    JSON.parse(
        localStorage.getItem("carrinhoRedeSaoJose")
    ) || [];


// ==========================================
// OBTER PREÇO ATUAL
// ==========================================

function obterPrecoProduto(produto) {

    if (
        produto.emPromocao === true &&
        Number(produto.precoPromocional) > 0
    ) {

        return Number(produto.precoPromocional);

    }

    return Number(produto.preco);

}


// ==========================================
// CRIAR CARD
// ==========================================

function criarCard(produto) {

    const card =
        document.createElement("div");

    card.classList.add("produto");


    // ==========================================
    // PREÇO
    // ==========================================

    const precoAtual =
        obterPrecoProduto(produto);

    let preco = "";


    if (precoAtual > 0) {

        if (
            produto.emPromocao === true &&
            Number(produto.precoPromocional) > 0
        ) {

            preco = `

                <div class="preco-promocao">

                    <span class="preco-antigo">
                        R$ ${Number(produto.preco)
                            .toFixed(2)
                            .replace(".", ",")}
                    </span>

                    <strong>
                        R$ ${precoAtual
                            .toFixed(2)
                            .replace(".", ",")}
                    </strong>

                </div>

            `;

        } else {

            preco = `

                <strong>
                    R$ ${precoAtual
                        .toFixed(2)
                        .replace(".", ",")}
                </strong>

            `;

        }

    }


    // ==========================================
    // BOTÃO
    // ==========================================

    let botao = "";


    const pagina =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();


    // ==========================================
    // PÁGINAS DE CATÁLOGO
    // ==========================================

    if (
        pagina === "medicamentos.html" ||
        pagina === "perfumaria.html" ||
        pagina === "cosmeticos.html"
    ) {

        if (produto.disponivel) {

            botao = `

                <button
                    class="botao-adicionar"
                    onclick="adicionarCarrinho(${produto.id})"
                >

                    🛒 Adicionar ao carrinho

                </button>

            `;

        } else {

            botao = `

                <button
                    class="botao-indisponivel"
                    disabled
                >

                    Indisponível

                </button>

            `;

        }

    }


    // ==========================================
    // CARD
    // ==========================================

    card.innerHTML = `

        <img
            src="${produto.imagem}"
            alt="${produto.nome}"
        >

        <h3>
            ${produto.nome}
        </h3>

        <p>
            ${produto.descricao}
        </p>

        ${preco}

        ${botao}

    `;


    return card;

}


// ==========================================
// MOSTRAR PRODUTOS
// ==========================================

function mostrarProdutos(categoria) {

    let container;


    if (categoria === "medicamentos") {

        container =
            document.getElementById("lista-produtos");

    }


    if (categoria === "perfumaria") {

        container =
            document.querySelector(
                "#perfumaria .lista-produtos"
            );

    }


    if (categoria === "cosmeticos") {

        container =
            document.getElementById("lista-cosmeticos");

    }


    if (
        !container &&
        document.getElementById("lista-produtos")
    ) {

        container =
            document.getElementById("lista-produtos");

    }


    if (!container) {
        return;
    }


    container.innerHTML = "";


    // ==========================================
    // PRODUTOS DO CATÁLOGO
    // ==========================================

    const produtosFiltrados =
        produtos.filter(produto =>

            produto.categoria === categoria &&
            produto.disponivel &&
            produto.emPromocao !== true

        );


    produtosFiltrados.forEach(produto => {

        container.appendChild(
            criarCard(produto)
        );

    });

}


// ==========================================
// FILTRAR PRODUTOS
// ==========================================

function filtrarProdutos(categoria) {

    mostrarProdutos(categoria);


    const secao =
        document.getElementById(categoria);


    if (secao) {

        secao.scrollIntoView({
            behavior: "smooth"
        });

    }

}


// ==========================================
// PESQUISA
// ==========================================

function pesquisarProdutos() {

    const campo =
        document.getElementById("campo-pesquisa");


    if (!campo) {
        return;
    }


    const texto =
        campo.value
            .toLowerCase()
            .trim();


    const pagina =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();


    // ==========================================
    // PÁGINA INICIAL
    // ==========================================

    if (
        pagina === "" ||
        pagina === "index.html"
    ) {

        const medicamentos =
            document.getElementById(
                "lista-produtos"
            );


        const perfumaria =
            document.querySelector(
                "#perfumaria .lista-produtos"
            );


        const cosmeticos =
            document.getElementById(
                "lista-cosmeticos"
            );


        if (
            !medicamentos ||
            !perfumaria ||
            !cosmeticos
        ) {

            return;

        }


        const resultados =
            produtos.filter(produto =>

                produto.disponivel &&
                produto.emPromocao !== true &&
                (
                    produto.nome
                        .toLowerCase()
                        .includes(texto)

                    ||

                    produto.descricao
                        .toLowerCase()
                        .includes(texto)
                )

            );


        medicamentos.innerHTML = "";

        perfumaria.innerHTML = "";

        cosmeticos.innerHTML = "";


        resultados.forEach(produto => {

            const card =
                criarCard(produto);


            if (
                produto.categoria ===
                "medicamentos"
            ) {

                medicamentos.appendChild(card);

            }


            if (
                produto.categoria ===
                "perfumaria"
            ) {

                perfumaria.appendChild(card);

            }


            if (
                produto.categoria ===
                "cosmeticos"
            ) {

                cosmeticos.appendChild(card);

            }

        });


        return;

    }


    // ==========================================
    // PÁGINA INDIVIDUAL
    // ==========================================

    const container =
        document.getElementById(
            "lista-produtos"
        );


    const categoria =
        descobrirCategoria();


    if (!categoria || !container) {
        return;
    }


    const resultados =
        produtos.filter(produto =>

            produto.categoria === categoria &&
            produto.disponivel &&
            produto.emPromocao !== true &&
            (
                produto.nome
                    .toLowerCase()
                    .includes(texto)

                ||

                produto.descricao
                    .toLowerCase()
                    .includes(texto)
            )

        );


    container.innerHTML = "";


    if (resultados.length === 0) {

        container.innerHTML = `

            <div class="nenhum-produto">

                <h3>
                    🔎 Nenhum produto encontrado
                </h3>

                <p>
                    Tente pesquisar por outro nome.
                </p>

            </div>

        `;

        return;

    }


    resultados.forEach(produto => {

        container.appendChild(
            criarCard(produto)
        );

    });

}


// ==========================================
// DESCOBRIR CATEGORIA
// ==========================================

function descobrirCategoria() {

    const pagina =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();


    if (pagina === "medicamentos.html") {
        return "medicamentos";
    }


    if (pagina === "perfumaria.html") {
        return "perfumaria";
    }


    if (pagina === "cosmeticos.html") {
        return "cosmeticos";
    }


    return null;

}


// ==========================================
// ADICIONAR AO CARRINHO
// ==========================================

function adicionarCarrinho(id) {

    const produto =
        produtos.find(item =>
            item.id === id
        );


    if (
        !produto ||
        !produto.disponivel
    ) {

        return;

    }


    const itemExistente =
        carrinho.find(item =>
            item.id === id
        );


    if (itemExistente) {

        itemExistente.quantidade++;

    } else {

        carrinho.push({

            id: produto.id,

            quantidade: 1

        });

    }


    salvarCarrinho();

    atualizarCarrinho();

    abrirCarrinho();

}


// ==========================================
// ADICIONAR OFERTA AO CARRINHO
// ==========================================

function adicionarOfertaCarrinho(id) {

    const produto =
        produtos.find(item =>
            item.id === id
        );


    if (
        !produto ||
        !produto.disponivel ||
        produto.emPromocao !== true ||
        Number(produto.precoPromocional) <= 0
    ) {

        return;

    }


    const itemExistente =
        carrinho.find(item =>
            item.id === id
        );


    if (itemExistente) {

        itemExistente.quantidade++;

    } else {

        carrinho.push({

            id: produto.id,

            quantidade: 1

        });

    }


    salvarCarrinho();

    atualizarCarrinho();

    abrirCarrinho();

}


// ==========================================
// CARROSSEL DE OFERTAS
// ==========================================

function mostrarOfertas() {

    const carrossel =
        document.getElementById(
            "carrossel-ofertas"
        );


    if (!carrossel) {
        return;
    }


    const indicadores =
        document.getElementById(
            "indicadores-ofertas"
        );


    // ==========================================
    // LIMPAR CARROSSEL
    // ==========================================

    carrossel.innerHTML = "";


    if (indicadores) {

        indicadores.innerHTML = "";

    }


    // ==========================================
    // BUSCAR PROMOÇÕES
    // ==========================================

    const ofertas =
        produtos.filter(produto =>

            produto.disponivel &&
            produto.emPromocao === true &&
            Number(produto.precoPromocional) > 0

        );


    // ==========================================
    // NENHUMA OFERTA
    // ==========================================

    if (ofertas.length === 0) {

        carrossel.innerHTML = `

            <div class="nenhuma-oferta">

                <div class="imagem-oferta">

                    🛍️

                </div>

                <div class="conteudo-oferta">

                    <h3>
                        Nenhuma oferta no momento
                    </h3>

                    <p>
                        Em breve teremos novas
                        promoções especiais para você.
                    </p>

                </div>

            </div>

        `;


        const setaAnterior =
            document.getElementById(
                "oferta-anterior"
            );


        const setaProxima =
            document.getElementById(
                "proxima-oferta"
            );


        if (setaAnterior) {

            setaAnterior.disabled = true;

        }


        if (setaProxima) {

            setaProxima.disabled = true;

        }


        return;

    }


    // ==========================================
    // ATIVAR SETAS
    // ==========================================

    const setaAnterior =
        document.getElementById(
            "oferta-anterior"
        );


    const setaProxima =
        document.getElementById(
            "proxima-oferta"
        );


    if (setaAnterior) {

        setaAnterior.disabled =
            ofertas.length <= 1;

    }


    if (setaProxima) {

        setaProxima.disabled =
            ofertas.length <= 1;

    }


    // ==========================================
    // CRIAR CARDS
    // ==========================================

    ofertas.forEach((produto, indice) => {

        const card =
            document.createElement("div");


        card.classList.add(
            "card-oferta"
        );


        const precoNormal =
            Number(produto.preco)
                .toFixed(2)
                .replace(".", ",");


        const precoPromocional =
            Number(produto.precoPromocional)
                .toFixed(2)
                .replace(".", ",");


        let categoria =
            produto.categoria;


        if (
            categoria ===
            "medicamentos"
        ) {

            categoria =
                "MEDICAMENTOS";

        }


        if (
            categoria ===
            "perfumaria"
        ) {

            categoria =
                "PERFUMARIA";

        }


        if (
            categoria ===
            "cosmeticos"
        ) {

            categoria =
                "COSMÉTICOS";

        }


        card.innerHTML = `

            <div class="imagem-oferta">

                <img
                    src="${produto.imagem}"
                    alt="${produto.nome}"
                    loading="lazy"
                >

            </div>


            <div class="conteudo-oferta">

                <span class="categoria-oferta">

                    ${categoria}

                </span>


                <h3>

                    ${produto.nome}

                </h3>


                <p>

                    ${produto.descricao}

                </p>


                <div class="precos-oferta">

                    <span class="preco-antigo">

                        R$ ${precoNormal}

                    </span>


                    <strong>

                        R$ ${precoPromocional}

                    </strong>

                </div>


                <span class="selo-oferta">

                    🔥 Oferta especial

                </span>


                <button
                    class="botao-oferta"
                    type="button"
                    onclick="adicionarOfertaCarrinho(${produto.id})"
                >

                    🛒 Aproveitar oferta

                </button>

            </div>

        `;


        carrossel.appendChild(card);


        // ==========================================
        // INDICADORES
        // ==========================================

        if (indicadores) {

            const indicador =
                document.createElement("button");


            indicador.classList.add(
                "indicador"
            );


            indicador.type = "button";


            indicador.setAttribute(
                "aria-label",
                `Ir para a oferta ${indice + 1}`
            );


            if (indice === 0) {

                indicador.classList.add(
                    "ativo"
                );

            }


            indicador.addEventListener(
                "click",
                function() {

                    card.scrollIntoView({

                        behavior: "smooth",

                        block: "nearest",

                        inline: "center"

                    });

                }
            );


            indicadores.appendChild(
                indicador
            );

        }

    });


    // ==========================================
    // ATUALIZAR INDICADOR AO ROLAR
    // ==========================================

    carrossel.onscroll =
        function() {

            atualizarIndicadorOferta();

        };


    // ==========================================
    // SETA ESQUERDA
    // ==========================================

    if (setaAnterior) {

        setaAnterior.onclick =
            function() {

                moverCarrosselOferta(-1);

            };

    }


    // ==========================================
    // SETA DIREITA
    // ==========================================

    if (setaProxima) {

        setaProxima.onclick =
            function() {

                moverCarrosselOferta(1);

            };

    }


    // ==========================================
    // ATUALIZAR INDICADOR INICIAL
    // ==========================================

    atualizarIndicadorOferta();

}


// ==========================================
// MOVER CARROSSEL
// ==========================================

function moverCarrosselOferta(direcao) {

    const carrossel =
        document.getElementById(
            "carrossel-ofertas"
        );


    if (!carrossel) {
        return;
    }


    const card =
        carrossel.querySelector(
            ".card-oferta"
        );


    if (!card) {
        return;
    }


    const estilo =
        window.getComputedStyle(
            carrossel
        );


    const gap =
        parseInt(
            estilo.columnGap ||
            estilo.gap ||
            "20",
            10
        );


    const distancia =
        card.offsetWidth + gap;


    carrossel.scrollBy({

        left:
            distancia * direcao,

        behavior:
            "smooth"

    });

}


// ==========================================
// ATUALIZAR INDICADOR
// ==========================================

function atualizarIndicadorOferta() {

    const carrossel =
        document.getElementById(
            "carrossel-ofertas"
        );


    if (!carrossel) {
        return;
    }


    const indicadores =
        document.querySelectorAll(
            "#indicadores-ofertas .indicador"
        );


    const cards =
        carrossel.querySelectorAll(
            ".card-oferta"
        );


    if (
        cards.length === 0 ||
        indicadores.length === 0
    ) {

        return;

    }


    const centro =
        carrossel.scrollLeft +
        (carrossel.clientWidth / 2);


    let indiceMaisProximo = 0;

    let menorDistancia =
        Infinity;


    cards.forEach(
        (card, indice) => {

            const centroCard =
                card.offsetLeft +
                (card.offsetWidth / 2);


            const distancia =
                Math.abs(
                    centroCard - centro
                );


            if (
                distancia <
                menorDistancia
            ) {

                menorDistancia =
                    distancia;

                indiceMaisProximo =
                    indice;

            }

        }
    );


    indicadores.forEach(
        (indicador, indice) => {

            indicador.classList.toggle(

                "ativo",

                indice ===
                indiceMaisProximo

            );

        }
    );

}


// ==========================================
// SALVAR CARRINHO
// ==========================================

function salvarCarrinho() {

    localStorage.setItem(

        "carrinhoRedeSaoJose",

        JSON.stringify(carrinho)

    );

}


// ==========================================
// SALVAR PRODUTOS
// ==========================================

function salvarProdutos() {

    localStorage.setItem(

        "produtosRedeSaoJose",

        JSON.stringify(produtos)

    );

}


// ==========================================
// CARREGAR PRODUTOS SALVOS
// ==========================================

function carregarProdutos() {

    const produtosSalvos =
        localStorage.getItem(
            "produtosRedeSaoJose"
        );


    if (!produtosSalvos) {
        return;
    }


    try {

        const produtosSalvosConvertidos =
            JSON.parse(produtosSalvos);


        if (
            !Array.isArray(
                produtosSalvosConvertidos
            )
        ) {

            return;

        }


        produtos.splice(

            0,

            produtos.length,

            ...produtosSalvosConvertidos

        );


        // ==========================================
        // GARANTIR NOVOS CAMPOS
        // ==========================================

        produtos.forEach(produto => {

            if (
                typeof produto.disponivel !==
                "boolean"
            ) {

                produto.disponivel =
                    true;

            }


            if (
                typeof produto.emPromocao !==
                "boolean"
            ) {

                produto.emPromocao =
                    false;

            }


            if (
                typeof produto.precoPromocional !==
                "number"
            ) {

                produto.precoPromocional =
                    Number(
                        produto.precoPromocional
                    ) || 0;

            }

        });

    } catch (erro) {

        console.error(
            "Erro ao carregar produtos salvos:",
            erro
        );

    }

}


// ==========================================
// ATUALIZAR CARRINHO
// ==========================================

function atualizarCarrinho() {

    const container =
        document.getElementById(
            "itens-carrinho"
        );


    const totalElemento =
        document.getElementById(
            "total-carrinho"
        );


    const quantidadeElemento =
        document.getElementById(
            "quantidade-carrinho"
        );


    if (!container) {

        return;

    }


    container.innerHTML = "";


    let total = 0;

    let quantidadeTotal = 0;


    carrinho.forEach(item => {

        const produto =
            produtos.find(produto =>
                produto.id === item.id
            );


        if (!produto) {
            return;
        }


        const precoAtual =
            obterPrecoProduto(produto);


        const subtotal =
            precoAtual *
            item.quantidade;


        total += subtotal;


        quantidadeTotal +=
            item.quantidade;


        const div =
            document.createElement("div");


        div.classList.add(
            "item-carrinho"
        );


        let precoExibicao = "";


        if (
            produto.emPromocao === true &&
            Number(produto.precoPromocional) > 0
        ) {

            precoExibicao = `

                <span class="preco-antigo">

                    R$ ${Number(produto.preco)
                        .toFixed(2)
                        .replace(".", ",")}

                </span>

                <p>

                    R$ ${precoAtual
                        .toFixed(2)
                        .replace(".", ",")}

                </p>

                <small>

                    🔥 Oferta

                </small>

            `;

        } else {

            precoExibicao = `

                <p>

                    R$ ${precoAtual
                        .toFixed(2)
                        .replace(".", ",")}

                </p>

            `;

        }


        div.innerHTML = `

            <div>

                <h3>

                    ${produto.nome}

                </h3>

                ${precoExibicao}

            </div>


            <div class="controle-quantidade">

                <button
                    onclick="alterarQuantidade(${produto.id}, -1)"
                >

                    −

                </button>


                <span>

                    ${item.quantidade}

                </span>


                <button
                    onclick="alterarQuantidade(${produto.id}, 1)"
                >

                    +

                </button>

            </div>


            <button
                class="botao-remover"
                onclick="removerCarrinho(${produto.id})"
            >

                🗑️

            </button>

        `;


        container.appendChild(div);

    });


    if (totalElemento) {

        totalElemento.textContent =

            `R$ ${total
                .toFixed(2)
                .replace(".", ",")}`;

    }


    if (quantidadeElemento) {

        quantidadeElemento.textContent =
            quantidadeTotal;

    }

}


// ==========================================
// ALTERAR QUANTIDADE
// ==========================================

function alterarQuantidade(id, valor) {

    const item =
        carrinho.find(item =>
            item.id === id
        );


    if (!item) {
        return;
    }


    item.quantidade += valor;


    if (item.quantidade <= 0) {

        carrinho =
            carrinho.filter(item =>
                item.id !== id
            );

    }


    salvarCarrinho();

    atualizarCarrinho();

}


// ==========================================
// REMOVER DO CARRINHO
// ==========================================

function removerCarrinho(id) {

    carrinho =
        carrinho.filter(item =>
            item.id !== id
        );


    salvarCarrinho();

    atualizarCarrinho();

}


// ==========================================
// ABRIR CARRINHO
// ==========================================

function abrirCarrinho() {

    const elemento =
        document.getElementById(
            "carrinho"
        );


    if (elemento) {

        elemento.classList.add(
            "aberto"
        );

    }


    atualizarCarrinho();

}


// ==========================================
// FECHAR CARRINHO
// ==========================================

function fecharCarrinho() {

    const elemento =
        document.getElementById(
            "carrinho"
        );


    if (elemento) {

        elemento.classList.remove(
            "aberto"
        );

    }

}


// ==========================================
// CONTROLE DO ENDEREÇO
// ==========================================

function controlarEndereco() {

    const tipoEntrega =
        document.getElementById(
            "tipo-entrega"
        );


    const campoEndereco =
        document.getElementById(
            "endereco-cliente"
        );


    if (
        !tipoEntrega ||
        !campoEndereco
    ) {

        return;

    }


    if (
        tipoEntrega.value === "Entrega"
    ) {

        campoEndereco.style.display =
            "block";

    } else {

        campoEndereco.style.display =
            "none";

        campoEndereco.value = "";

    }

}


// ==========================================
// FINALIZAR PEDIDO
// ==========================================

function finalizarPedido() {

    if (carrinho.length === 0) {

        alert(
            "Seu carrinho esta vazio."
        );

        return;

    }


    const nome =
        document
            .getElementById(
                "nome-cliente"
            )
            ?.value
            .trim();


    const telefone =
        document
            .getElementById(
                "telefone-cliente"
            )
            ?.value
            .trim();


    const endereco =
        document
            .getElementById(
                "endereco-cliente"
            )
            ?.value
            .trim();


    const tipoEntrega =
        document
            .getElementById(
                "tipo-entrega"
            )
            ?.value;


    const pagamento =
        document
            .getElementById(
                "forma-pagamento"
            )
            ?.value;


    const observacao =
        document
            .getElementById(
                "observacao-pedido"
            )
            ?.value
            .trim();


    // ==========================================
    // VALIDAÇÕES
    // ==========================================

    if (!nome) {

        alert(
            "Informe seu nome."
        );

        return;

    }


    if (!telefone) {

        alert(
            "Informe seu telefone."
        );

        return;

    }


    if (!tipoEntrega) {

        alert(
            "Escolha entre entrega ou retirada."
        );

        return;

    }


    if (
        tipoEntrega === "Entrega" &&
        !endereco
    ) {

        alert(
            "Informe o endereco para entrega."
        );

        return;

    }


    if (!pagamento) {

        alert(
            "Escolha a forma de pagamento."
        );

        return;

    }


    // ==========================================
    // MENSAGEM WHATSAPP
    // ==========================================

    let mensagem =
        "Ola! Gostaria de fazer um pedido pela Rede Sao Jose.\n\n";


    mensagem +=
        "*DADOS DO CLIENTE*\n";


    mensagem +=
        "*Nome:* " +
        nome +
        "\n";


    mensagem +=
        "*Telefone:* " +
        telefone +
        "\n\n";


    mensagem +=
        "*PRODUTOS*\n";


    let total = 0;


    carrinho.forEach(item => {

        const produto =
            produtos.find(produto =>
                produto.id === item.id
            );


        if (!produto) {
            return;
        }


        const precoAtual =
            obterPrecoProduto(produto);


        const subtotal =
            precoAtual *
            item.quantidade;


        total += subtotal;


        let textoPromocao = "";


        if (
            produto.emPromocao === true &&
            Number(produto.precoPromocional) > 0
        ) {

            textoPromocao =
                " 🔥 PROMOÇÃO";

        }


        mensagem +=

            "- " +
            item.quantidade +
            "x " +
            produto.nome +
            " - R$ " +
            subtotal
                .toFixed(2)
                .replace(".", ",") +
            textoPromocao +
            "\n";

    });


    mensagem +=

        "\n*TOTAL: R$ " +
        total
            .toFixed(2)
            .replace(".", ",") +
        "*\n\n";


    // ==========================================
    // ENTREGA
    // ==========================================

    mensagem +=
        "*ENTREGA / RETIRADA*\n";


    mensagem +=
        "*Tipo:* " +
        tipoEntrega +
        "\n";


    if (
        tipoEntrega === "Entrega"
    ) {

        mensagem +=
            "*Endereco:* " +
            endereco +
            "\n";

    }


    mensagem += "\n";


    // ==========================================
    // PAGAMENTO
    // ==========================================

    mensagem +=
        "*FORMA DE PAGAMENTO*\n";


    mensagem +=
        "*Pagamento:* " +
        pagamento +
        "\n\n";


    // ==========================================
    // OBSERVAÇÃO
    // ==========================================

    if (observacao) {

        mensagem +=
            "*OBSERVACAO*\n";


        mensagem +=
            observacao +
            "\n\n";

    }


    mensagem +=
        "Obrigado!";


    // ==========================================
    // WHATSAPP
    // ==========================================

    const mensagemCodificada =
        encodeURIComponent(
            mensagem
        );


    const url =
        "https://wa.me/" +
        whatsapp +
        "?text=" +
        mensagemCodificada;


    window.open(
        url,
        "_blank"
    );

}


// ==========================================
// MOSTRAR / ESCONDER ENDEREÇO
// ==========================================

function mostrarEndereco() {

    const tipoEntrega =
        document.getElementById(
            "tipo-entrega"
        );


    const campoEndereco =
        document.getElementById(
            "campo-endereco"
        );


    const endereco =
        document.getElementById(
            "endereco-cliente"
        );


    if (
        !tipoEntrega ||
        !campoEndereco
    ) {

        return;

    }


    if (
        tipoEntrega.value === "Entrega"
    ) {

        campoEndereco.style.display =
            "block";

    } else {

        campoEndereco.style.display =
            "none";


        if (endereco) {

            endereco.value = "";

        }

    }

}


// ==========================================
// INICIALIZAÇÃO
// ==========================================

carregarProdutos();


// ==========================================
// CARREGAR CARROSSEL DE OFERTAS
// ==========================================

mostrarOfertas();


const categoriaAtual =
    descobrirCategoria();


if (categoriaAtual) {

    mostrarProdutos(
        categoriaAtual
    );

} else {

    // Página inicial

    mostrarProdutos(
        "medicamentos"
    );


    mostrarProdutos(
        "perfumaria"
    );


    mostrarProdutos(
        "cosmeticos"
    );

}


atualizarCarrinho();


// ==========================================
// BOTÃO FECHAR CARRINHO
// ==========================================

const botaoFecharCarrinho =
    document.getElementById(
        "fechar-carrinho"
    );


if (botaoFecharCarrinho) {

    botaoFecharCarrinho.addEventListener(
        "click",
        fecharCarrinho
    );

}


// ==========================================
// BOTÃO ABRIR CARRINHO
// ==========================================

const botaoCarrinho =
    document.getElementById(
        "botao-carrinho"
    );


if (botaoCarrinho) {

    botaoCarrinho.addEventListener(
        "click",
        abrirCarrinho
    );

}