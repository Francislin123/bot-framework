const builder = require('botbuilder');

const connector = new builder.ConsoleConnector().listen();

const bot = new builder.UniversalBot(connector);

bot.dialog('/', [

    (session) => {
        builder.Prompts.text(session, 'Oi tudo bem?');
    },

    (session) => {
        builder.Prompts.text(session, 'Qual seu nome?');
    },

    (session, results) => {
        let msg = results.response;
        session.send(`Oi ${msg}! Em que posso ajudar?`);
    }
]);