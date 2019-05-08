/**
 * Arquivo OlaMundoBot
 */

var builder = require('botbuilder');

// Criando o connector para o Bot
var connector = new builder.ConsoleConnector().listen();
var bot = new builder.UniversalBot(connector);

//  Dialogos
bot.dialog('/', [
    function(session) {
        session.send('Hey Frans');
    }
]);