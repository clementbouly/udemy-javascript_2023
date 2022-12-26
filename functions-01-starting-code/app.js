const startGameBtn = document.getElementById("start-game-btn")

const ROCK = {
	value: "1",
	label: {
		FR: "Pierre",
		EN: "Rock",
	},
}

const PAPER = {
	value: "2",
	label: {
		FR: "Feuille",
		EN: "Paper",
	},
}

const SCISSORS = {
	value: "3",
	label: {
		FR: "Ciseaux",
		EN: "Scissors",
	},
}

const PIT = {
	value: "4",
	label: {
		FR: "Puits",
		EN: "Pit",
	},
}

const DEFAULT_VALUE = ROCK

const CHEATER_CHOICE_MESSAGE = {
	FR: "Le puits est un choix de tricheur, vous choisissez aléatoirement pour la peine",
	EN: "The pit is a cheating choice, you choose randomly for the penalty",
}

const CHOICES = [ROCK, PAPER, SCISSORS, PIT]

const ENGLISH = {
	label: "English",
	value: "EN",
}
const FRENCH = {
	label: "French",
	value: "FR",
}

const languages = [ENGLISH, FRENCH]

let languageSelected = ENGLISH

const setLanguage = () => {
	let languageQuestion = "Select your langage : "
	languages.map((language) => {
		languageQuestion += `${language.label} : ${language.value}, `
	})
	const selection = prompt(languageQuestion, "")?.toUpperCase()

	switch (selection) {
		case ENGLISH.value:
			languageSelected = ENGLISH
			break
		case FRENCH.value:
			languageSelected = FRENCH
			break
		default:
			alert("Invalid Choice, English selected by default")
			break
	}

	console.log("Language Selected : ", languageSelected.label)
}

const getPlayerChoice = () => {
	let selectionQuestion = `Select between : `

	CHOICES.map((choice) => {
		selectionQuestion += `${getChoiceLabel(choice)} : ${choice.value}, `
	})

	const selection = prompt(selectionQuestion, "")?.toUpperCase()

	switch (selection) {
		case ROCK.value:
			return ROCK
		case PAPER.value:
			return PAPER
		case SCISSORS.value:
			return SCISSORS
		case PIT.value:
			alert(CHEATER_CHOICE_MESSAGE[languageSelected.value])
			return simulateComputerChoice()
		default:
			alert("Invalid Choice we will choose for you")
			return simulateComputerChoice()
	}
}

const simulateComputerChoice = () => {
	const choicesWitoutPit = CHOICES.filter((choice) => choice.value !== PIT.value)
	return choicesWitoutPit[Math.floor(Math.random() * choicesWitoutPit.length)]
}

const getChoiceLabel = (choice = DEFAULT_VALUE) => {
	if (choice) {
		return choice?.label[languageSelected.value]
	} else {
		console.log("Invalid input")
		throw new Error("Invalid input")
	}
}

const displayWinner = (playerChoice = DEFAULT_VALUE, computerChoice) => {
	const battleResult = `${getChoiceLabel(playerChoice)} vs ${getChoiceLabel(computerChoice)}`

	if (playerChoice.value === computerChoice.value) {
		alert("It's a draw : " + battleResult)
	} else if (
		(playerChoice === ROCK.value && computerChoice === SCISSORS.value) ||
		(playerChoice === PAPER.value && computerChoice === ROCK.value) ||
		(playerChoice === SCISSORS.value && computerChoice === PAPER.value)
	) {
		alert("Player Wins : " + battleResult)
	} else {
		alert("Computer Wins : " + battleResult)
	}
}

const launchGame = () => {
	try {
		//setLanguage()
		console.log("Game Started")

		const playerChoice = getPlayerChoice()
		console.log("🚀 ~ launchGame ~ playerChoice", playerChoice)
		const computerChoice = simulateComputerChoice()

		console.log("Player Choice : ", getChoiceLabel(playerChoice))
		console.log("Computer Choice : ", getChoiceLabel(computerChoice))

		displayWinner(playerChoice, computerChoice)

		console.log("Game Ended")
	} catch (err) {
		console.log(err)
		alert("An error occured, please try again")
	}
}

startGameBtn.addEventListener("click", launchGame)
