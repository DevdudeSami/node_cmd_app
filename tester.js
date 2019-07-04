const CMDApp = require('./CMDApp')

const commands = {
	t: tF,
	c: cF,
	g: gF
}

const help = {
	t: "The t command",
	c: "The c command",
	g: "The g command"
}

function tF(args) {
	console.log("t" + args)
}

function cF(args) {
	console.log("c" + args)
}

function gF(args) {
	console.log("g" + args)
}


const app = new CMDApp()
app.setCommands(commands)
app.setHelp(help)
app.setPrompt("> ")
app.start()
