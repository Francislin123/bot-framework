var restify = require('restify');
var builder = require('botbuilder');

const server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, () => {
    console.log('%s Aplicação sendo executada na porta %s', server.name, server.url);
});

const connector = new builder.ChatConnector({
    appId: '',
    appPassword: ''
});

const bot = new builder.UniversalBot(connector, [

    (session) => {
        builder.Prompts.text(session, 'Hi! How are you?');
    },

    (session) => {
        builder.Prompts.text(session, 'Whats your name?');
    },

    (session, results) => {
        let msg = results.response;
        session.send(`Hi ${msg}! How can I help?`);
    }
]);

server.post('/api/messages', connector.listen());