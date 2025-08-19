1. Decisão da arquitetura utilizada? 
  - Client: MVVM (Model-View-ViewModel) com Vue 3 e Vuetify. Separação entre views (telas), components (componentes reutilizáveis) e router (gerenciamento de navegação entre telas/pages).
  - Server: Arquitetura MVC com servidor HTTP com Fastify. Separação em routes (lógica das rotas e redirecionamentos), controller (lógica de informações da API) e model (acesso a dados via PrismaClient).
  - Justificativa: MVVM com roteamento centralizado em rotas, permite uma navegação clara e manutenção mais fácil das telas, MVC no backend mantém a separação de contexto estruturada, garantindo código organizado e escalável.
2. Lista de bibliotecas de terceiros utilizadas ?
  - Client: fastify/cors, @mdi/font, axios, vue, vue-router, vue-toast-notification, vuetify
  - Server: @fastify/cors, @prisma/client, fastify, zod
3. O que você melhoraria se tivesse mais tempo
  - Acredito que faria melhoria em questão de layout, deixaria o mais responsivo possível e pensaria no mobile-first
  - Outro critério que gostaria de ter feito é orquestramento e conteinerização com o Docker
  - Gostaria de ter feito gerenciamentos de estados globais com o pinia e utilizar de loading nos hook de ciclo de vida do Vue
  - Teria implementado autenticação e autorização e consequentemente tela de login
4. Quais requisitos obrigatórios que não foram entregues
  - Acredito que cumpri com todos os obrigatórios

Sobre o projeto, estruturei o front-end com o nome de client e o back-end com o nome de server, dentro do src de ambos estão todas as camadas/contexto que se comunicam:

client/src: 
  - assets(Imagens, svg e afins)
  - components(Header,Footer, SideBar, Modal)
  - router(Criação das rotas e seus telas de visualização)
  - views(Telas de cada contexto)

server/src:
  - controllers(regra de negócio, lógica)
  - primsa(ORM para banco de dados, migration, connexion)
  - routes(prefixos e direcionamentos das routas através do servidor)
  - server(servidor HTTP executando)

**OBS** Para que a API e o banco funcione, coloquei um .env.example para quando for testar, criar o .env com os valores dentro do .example no mesmo diretório
