var restfy = require('restify');
var builder = require('botbuilder');

var server = restfy.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s Aplicaçao esta executando na porta %s', server.name, server.url);
});

var connector = new builder.ChatConnector({
    appId: '',
    appPassword: ''
});

server.post("/api/messages", connector.listen());

var bot = new builder.UniversalBot(connector, function (session) {
    session.send("Voce disse: %s", session.message.text);
});