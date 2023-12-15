# 20232BSET03P2

Inteli - Engenharia de Software | Avaliação 2023-2B P2
Matheus Macedo Santos

# Vulnerabilidades encontradas e soluções implementadas

1. Fortalecimento Contra Injeção SQL

- Vulnerabilidade: A aplicação original estava suscetível a ataques de injeção SQL, principalmente devido à concatenação direta de valores de entrada nas consultas SQL.
- Solução: Refatorei as rotas POST para /felines e /canines utilizando consultas SQL parametrizadas. Isso previne a execução de código SQL mal-intencionado, pois os dados de entrada são agora tratados como parâmetros, e não como parte da consulta SQL.

- Vulnerabilidade Adicional: Faltava uma validação eficaz dos parâmetros de entrada, especialmente na rota POST para /vote/:type/:id.

- Solução: Implementei validações rigorosas dos parâmetros de entrada nesta rota para garantir que apenas valores seguros e esperados sejam aceitos e processados, reduzindo ainda mais o risco de injeção SQL.

2. Otimização da Lógica de Votação

- Vulnerabilidade: A lógica de votação anterior não verificava a existência do registro do animal antes de computar um voto.
- Solução: Modifiquei o processo de votação para incluir uma verificação prévia usando uma consulta SELECT. Isso assegura que o voto só seja registrado se o animal correspondente realmente existir no banco de dados.

3. Melhoria no Tratamento de Erros

- Vulnerabilidade: O tratamento de erros original era genérico e poderia potencialmente expor detalhes internos da implementação.
- Solução: Aprimorei o tratamento de erros em todas as rotas para fornecer respostas mais claras e seguras. As mensagens de erro agora são específicas e não revelam informações sensíveis sobre a estrutura interna ou a lógica da aplicação.

4. Completude dos Métodos Implementados

- Vulnerabilidade: Antes, a rota GET para /dogs estava incompleta, comprometendo a funcionalidade plena da aplicação.
- Solução: Completei a implementação desta rota, garantindo que todas as rotas e métodos previstos no design original estejam agora funcionais e testados. Isso assegura que a aplicação atende a todas as suas funcionalidades propostas.
