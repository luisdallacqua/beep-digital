# Beep Digital - Teste Backend

### O que irá ser feito neste projeto?

Criar uma plataforma de streaming conforme as instruções do teste técnico

###### ROTAS:

📌 Usuários

-   POST http://localhost:3333/users - Cria um novo usuário
-   POST http://localhost:3333/users/login - Faz login de um novo usuário e retorna o JWT Token

##### Todas as rotas abaixo precisam que o usuário esteja autenticado.

🎥 Vídeos

-   GET http://localhost:3333/videos - Lista todos os vídeos

-   GET http://localhost:3333/videos/:id - Lista um único vídeo

-   POST http://localhost:3333/videos - Cria um vídeo

-   PUT http://localhost:3333/videos/:id - Atualiza um vídeo

-   DELETE http://localhost:3333/videos/:id - Deleta um vídeo

📝 Tags

-   GET http://localhost:3333/tags - Lista todas as tags

-   GET http://localhost:3333/tags/:title_tag/videos - Lista vídeos daquela tag

-   POST http://localhost:3333/tags - Cria tag

-   PUT http://localhost:3333/tags/:id - Atualiza uma tag

-   DELETE http://localhost:3333/tags/:id - Deleta uma tag

## Como rodar o projeto depois de cloná-lo

Váriavéis de ambiente:

```bash
Crie um arquivo .env com as seguintes variáveis

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

Primeiro, instalar as dependências. OBS: Os próximos passos leva em consideração que já possui node e npm instalados no computador local. Caso não possua [instale](https://nodejs.org/en/download/) o
node primeiramente.

```bash
npm install -g nodemon ts-node

#after

npm install
# or
yarn
```

Após isso, rodar o seguinte comando:

```bash
nodemon
```

Pronto, agora a sua API estará rodando no endereço: localhost:3333
