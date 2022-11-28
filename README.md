<h2 align="center"> Api de streaming Beep Digital </h2>

<h4 align="center"> Beep Digital - Teste Backend</h4>

<h5 align="center">Criar uma api de streaming conforme as instruções do teste técnico da beep-digital</h5>
<p align="center">
    <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/luisdallacqua/beep-digital.svg">
    <img alt="node version" src="https://img.shields.io/static/v1?label=node&message=v.16.18.1&color=green&">
    <img alt="npm version" src="https://img.shields.io/static/v1?label=npm&message=v.8.19.2&color=blue">
    <img alt="express version" src="https://img.shields.io/static/v1?label=express&message=v.4.18.2&color=black">
    <img alt="GitHub top language" src="https://img.shields.io/static/v1?label=mongoose&message=v.6.7.3&color=blue">
    
</p>

### Features

-   [x] Cadastro de Video - (POST) http://localhost:3333/videos
-   [x] Cadastro de Tag - (POST) http://localhost:3333/tags
-   [x] Listar todos os vídeos - (GET) http://localhost:3333/videos
-   [x] Listar todas as tags - (GET) http://localhost:3333/tags
-   [x] Listar um vídeo - (GET) http://localhost:3333/videos/:videoId
-   [x] Listar os vídeos uma Tag - (GET) http://localhost:3333/tags/:title_tag/videos
-   [x] Atualiza um vídeo (PUT) - http://localhost:3333/videos/:videoId
-   [x] Atualiza uma tag (PUT)- http://localhost:3333/tags/:tagId
-   [x] Deleta um vídeo (DELETE) - http://localhost:3333/videos/:videoId
-   [x] Deleta uma tag (DELETE) - http://localhost:3333/tags/:tagId
-   [x] Cadastro de usuário (POST)- http://localhost:3333/usuers
-   [x] Login de usuário (POST)- http://localhost:3333/usuers/login

<p><strong>Observação:</strong>Optei por fazer uma rota de login separa do cadastro de usuário, para retornar o token de um usuário ao logar e não ao registrar.</p>

<p><strong>Atributos das entidades:</strong></p>

-   Video
    -   \_id: um string única de identificação do vídeo;
    -   description: uma breve descrição do vídeo;
    -   video_url: a url do vídeo;
    -   tag: um array com os ids das tags relacionadas ao vídeo;
-   Tag
    -   \_id: um string única de identificação da tag;
    -   name: o nome da tag
    -   videos: um array com os ids dos vídeos relacionados à tag;
-   Usuário
    -   \_id: um string única de identificação do usuário;
    -   username : Nome do usuário;
    -   password: password do usuário (que será encriptado antes de ser salvo no banco de dados);

 <p><strong>Validações dos campos</strong></p>

-   Video
    -   Os campos description e video_url são obrigatórios;
    -   Os campos description e video_url são únicos, ou seja, não pode haver dois iguais;
    -   O campo description tem que ter um tamanho mínimo de 10 caracteres;
    -   O campo video_url tem que ter um formato de vídeos do youtube (coloquei essa validação apenas para padronização dos vídeos);
    -   E caso haja a inserção de duas tags iguais (por exemplo, inserir duas vezes a tag "comédia") haverá um filtro e só será salvo uma vez, evitando redundância de dados.
-   Tag
    -   O campo name é obrigatório;
    -   E caso haja a inserção de dois videos iguais haverá um filtro e só será salvo uma vez, evitando redundância de dados
-   Usuário
    -   O campo name e password são obrigatórios;
    -   O campo name tem que ter o tamanho mínimo de 3 caracteres;
    -   O campo password tem que ter o tamanho mínimo de 6 caracteres;

<p><strong>Vídeo demonstrando funcionamento da API</strong></p>
<div style="position: relative; padding-bottom: 54.6875%; height: 0;"><iframe src="https://www.loom.com/embed/65f3e456f2654ab69abb8fd0bce88f95" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

#### Como rodar o projeto depois de cloná-lo

Váriavéis de ambiente:

```bash
Crie um arquivo .env na pasta raiz de o projeto com as seguintes variáveis

MONGO_USERNAME=
MONGO_PASSWORD=

SERVER_PORT=
SERVER_TOKEN_EXPIRETIME=
SERVER_TOKEN_ISSUER=
SERVER_TOKEN_SECRET=
```

Neste [artigo](https://www.mongodb.com/developer/how-to/nextjs-with-mongodb/) você consegue saber como conseguir as duas primeiras variáveis de ambiente. E o SERVER_TOKEN_SECRET é apenas a string de
codificação do seu token JWT, podendo gerá-la com o seguinte comando no terminal do linux:

```
openssl rand -base64 32
```

As variáveis SERVER_TOKEN_EXPIRETIME e SERVER_TOKEN_ISSUER são opcionais, mas representam respectivamente: o tempo que o token ficará válido e o nome da instituição do projeto.

Após configurado as variáveis de ambiente, seguir com os passos abaixo:

OBS: Os próximos passos leva em consideração que já possui node e npm instalados no computador local. Caso não possua [instale](https://nodejs.org/en/download/) o node primeiramente.

Após isso, instalar as dependências:

```bash
npm install -g nodemon ts-node

#after

npm install
```

Após isso, rodar o seguinte comando:

```bash
nodemon
```

Pronto, agora a sua API estará rodando no endereço: localhost:3333
