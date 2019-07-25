const rl = require('readline-sync')

class CMDApp {
	commands = {}
	minimumArgs = {}
	maximumArgs = {}
	argsCount = {}
	quitCommands = ["q", "quit"]
	help = {}
	prompt = ">> "

	stopping = false

	setCommands(commands) {
		this.commands = commands
	}

	setMinimumArgs(minimumArgs) {
		this.minimumArgs = minimumArgs
	}

	setMaximumArgs(maximumArgs) {
		this.maximumArgs = maximumArgs
	}

	setArgsCount(argsCount) {
		this.argsCount = argsCount
	}

	setQuitCommands(quitCommands) {
		this.quitCommands = quitCommands
	}

	setHelp(help) {
		this.help = help
	}

	setPrompt(prompt) {
		this.prompt = prompt
	}

	start() {
		this.stopping = false
		while(!this.stopping) {
			let command = rl.question(this.prompt).split(' ')
			// Check whitespace
			if(command[0].trim() == "") continue

			if(command[0] in this.commands) {

				// Check minimum args
				if(command[0] in this.minimumArgs && this.minimumArgs[command[0]] >= command.length) console.log(`The command ${command[0]} expects at least ${this.minimumArgs[command[0]]} arguments.`)
				// Check maximum args
				else if(command[0] in this.maximumArgs && this.maximumArgs[command[0]] < command.length-1) console.log(`The command ${command[0]} takes at most ${this.maximumArgs[command[0]]} arguments.`)
				// Check args count
				else if(command[0] in this.argsCount && this.argsCount[command[0]] != command.length-1) console.log(`The command ${command[0]} expects exactly ${this.argsCount[command[0]]} arguments.`)
				// Run command
				else this.commands[command[0]](command.slice(1))
			}
			else if(this.quitCommands.includes(command[0])) {
				this.stopping = true
			}
			else if(command[0] == "help") {
				this.printHelp(command)
			}
			else if(command[0] == "?") {
				console.log(`Possible options:\n\t${Object.keys(this.commands).join('\n\t')}`)
			}
			else {
				console.log("Unrecognised command.")
			}
		}
	}

	stop() {
		this.stopping = true
	}

	printHelp(command) {
		if(command[1] === undefined) {
			for(let [cmd, h] of Object.entries(this.help)) {
				console.log(`${cmd}: ${h}`)
			}
			console.log("help: Display this help message.")
			console.log("q | quit: Exit app.")
		} else {
			if(command[1] in this.commands) {
				console.log(`${command[1]}: ${this.help[command[1]]}`)
			} else {
				console.log("Unrecognised command for help.")
			}
		}
	}

}

module.exports = CMDApp

