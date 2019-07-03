const rl = require('readline-sync')

class CMDApp {
	commands = {}
	quitCommands = ["q", "quit"]
	help = {}

	setCommands(commands) {
		this.commands = commands
	}

	setQuitCommands(quitCommands) {
		this.quitCommands = quitCommands
	}

	setHelp(help) {
		this.help = help
	}

	start() {
		while(true) {
			let command = rl.question(">> ").split(' ')
			if(command[0] in this.commands) {
				this.commands[command[0]](command.slice(1))
			}
			else if(this.quitCommands.includes(command[0])) {
				break
			}
			else if(command[0] == "help") {
				this.printHelp(command)
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

