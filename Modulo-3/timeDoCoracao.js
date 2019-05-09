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
        builder.Prompts.text(session, 'Whats your name?');
    },

    (session, results) => {
        let name = results.response;
        session.send(`Hi ${name}`)

        session.beginDialog('/perguntaTimeDoCoracao');
    }
]);

bot.dialog('/perguntaTimeDoCoracao', [
    session => {
        builder.Prompts.text(session, 'What is your heart team?');
    },

    (session, results) => {
        let timeDoCoracao = results.response;
        session.endDialog(`Let's cheer on the Brazilian Championship for the team ${timeDoCoracao} in 2019!`);

        session.beginDialog('/perguntarLugarPreferido');
    }
]);

bot.dialog('/perguntarLugarPreferido', [
    session => {
        builder.Prompts.text(session, 'What is your favorite place?')
    },

    (session, results) => {
        let place = results.response;
        session.endDialog(`We love the ${place}! It is simply a very beautiful city!`);
    }
]);