const restify = require('restify');
const builder = require('botbuilder');

const server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, () => {
    console.log('%s Aplicação sendo executada na porta %s', server.name, server.url);
});

const connector = new builder.ChatConnector({
    appId: '',
    appPassword: ''
});

server.post('/api/messages', connector.listen());

const bot = new builder.UniversalBot(connector);

bot.dialog('/', [
    session => {
        builder.Prompts.text(session, 'Hi, how are you? Whats your name?');
    },

    (session, results) => {
        session.userData.nome = results.response;
        session.send(`Hi, ${session.userData.nome}`);

        session.beginDialog('/perguntaIdioma');
    }
]);

bot.dialog('/perguntaIdioma', [
    session => {
        builder.Prompts.text(session, 'What language do you speak?');
    },

    (session, results) => {
        session.dialogData.idioma = results.response;
        session.endDialog(`You speak  ${session.dialogData.idioma}? `);
    }
]);