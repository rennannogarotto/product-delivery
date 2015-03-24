====================================================================================
Motivações
====================================================================================
Havia um requisito em relação a performace e complexidade das malhas, portanto,
acredito que o sistema deveria ter mecanismos de filas para pré processamento
das rotas mais curtas entre os pontos e somente realizar o cálculo do custo em real
time.

Pensei em duas arquiteturas:
1) Spring WS (REST), Spring Security, Spring Oauth, Spring Data, ActiveMQ, MongoDB.
Acredito que seja uma solução mais robusta para introduzir dentro da plataforma de
ecommerce. Confio da eficiência do banco NoSQL e no Active MQ para controlar as
inserções de novas rotas resultando em reprocessamento dos caminhos mais curtos.
Obs.: Eu levaria mais tempo para fazer essa estrutura.

2) NodeJS, MongoDB, (Sem filas).
Como isso parece ser uma POC e eu entregaria a aplicação para você achei interessante
utilzar o Node Server para não haver a necessidade de realizar um delivery. Pensei
em utilizar o FireBase como base de dados em cloud para que não houvesse a necessidade
de instalar o Mongo, mas achei que poderia atrapalhar a performace.
Obs.: Com o pouco tempo que eu tinha, resolvi utilizar essa arquitetura mais simples.

====================================================================================
Comentários
====================================================================================
Mesmo utilizando uma estrutura mais simples, alguns itens deveriam ser desenvolvidos
e não foram por falta de tempo:
1) Persistência de logs em algo como ElasticSearch.
2) Arquivos de profile para que existisse um config.js por ambiente de delivery.
3) Middlaware para autenticação e autorização através de token.
4) Ordenação no resultado do GET ALL
5) Paginação no resultado do GET ALL
6) Versionamento das APIs REST.
7) Extensa documentação das funções.
8) Aumetar a cobertura dos testes unitário para algo em torno de 80%.
9) Criar teste de integração.
10) Criar testes de carga utilizando as Threads do JMeter ou LoadUI.
11) Criar uma wiki do projeto com as instruções de instalação e explicação detalhada
dos serviços.
12) Criar um pacote de instalação com o Jenkins/Hudson.

====================================================================================
Como iniciar a aplicação
====================================================================================
1) Instalar o Mongo: https://www.mongodb.org/downloads. É um "next, next, finish".
2) Iniciar o mongo com o comando mongod.
	- Talvez seja necessário criar manualmente o diretório C:\data\db.
	- Talvez seja necessário adicionar o diretório de instalação do Mongo no path do SO.
3) Realizar o "git clone" do repositório: https://github.com/rennannogarotto/product-delivery.git
4) Instalar as dependências do projeto com o comando "npm install" executado no diretório
raiz da aplicação.
5) Executar o comando "node server" no diretório raiz da aplicação.
6) Instalar um plugin para REST no Chrome. Ex.: Postman
7) Definir o Content-Type para "application/json" no Postman.

====================================================================================
Exemplos dos serviços.
====================================================================================
Para executar os testes basta executar o comando "jasmine-node \test" no diretório
raiz da aplicação.

====================================================================================
Exemplos dos serviços.
====================================================================================
GET http://localhost:8080/api/routes
POST http://localhost:8080/api/routes
{
  "name":"A2222",
  "origin":"A",
   "destination":"V",
   "distance":"10"
}

PUT http://localhost:8080/api/routes/550f709ca2010f340a000003
{
  "name":"A2222",
  "origin":"A",
   "destination":"V",
   "distance":"10"
}
DELETE http://localhost:8080/api/routes/550f709ca2010f340a000003

GET LOWER COST http://localhost:8080/api/deliveryLowerCost?origin=A&destination=Z&autonomy=10&pricePerLiter=2.50
====================================================================================