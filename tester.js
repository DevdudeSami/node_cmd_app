const CMDApp = require('./CMDApp')

const app = new CMDApp()

const commands = {
	t: tF,
	c: cF,
	g: gF,
	y: yF,
	p: pF,
	testStop
}

const minArgs = {
	t: 3,
	c: 2,
}

const maxArgs = {
	g: 4
}

const argsCount = {
	y: 3,
	p: 2
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
function pF(args) {
	console.log("p" + args)
}
function yF(args) {
	console.log("y" + args)
}

function testStop(args) {
	console.log("stopping")
	app.stop()

	console.log("starting")
	app.start()
}


app.setCommands(commands)
app.setMinimumArgs(minArgs)
app.setMaximumArgs(maxArgs)
app.setArgsCount(argsCount)
app.setHelp(help)
app.setPrompt("> ")
app.start()
