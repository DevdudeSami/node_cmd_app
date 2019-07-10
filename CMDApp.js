const rl = require('readline-sync')

class CMDApp {
	commands = {}
	minimumArgs = {}
	quitCommands = ["q", "quit"]
	help = {}
	prompt = ">> "

	setCommands(commands) {
		this.commands = commands
	}

	setMinimumArgs(minimumArgs) {
		this.minimumArgs = minimumArgs
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
		while(true) {
			let command = rl.question(this.prompt).split(' ')
			if(command[0] in this.commands) {
				if(command[0] in this.minimumArgs && this.minimumArgs[command[0]] >= command.length) {
					console.log(`The command ${command[0]} expects at least ${this.minimumArgs[command[0]]} arguments.`)
				}
				else this.commands[command[0]](command.slice(1))
			}
			else if(this.quitCommands.includes(command[0])) {
				break
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

