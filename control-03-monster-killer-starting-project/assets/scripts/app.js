const NORMAL_ATTACK = 10
const MONSTER_ATTACK = 14
const STRONG_ATTACK = 25
const HEALING_VALUE = 20
const BONUS_LIFE = 1
const DEFAULT_MAX_HEALTH = 100

const LOG_EVENT_PLAYER_ATTACK = "PLAYER_ATTACK"
const LOG_EVENT_PLAYER_STRONG_ATTACK = "PLAYER_STRONG_ATTACK"
const LOG_EVENT_MONSTER_ATTACK = "MONSTER_ATTACK"
const LOG_EVENT_PLAYER_HEAL = "PLAYER_HEAL"
const LOG_EVENT_GAME_OVER = "GAME_OVER"

let currentBonusLife = BONUS_LIFE
bonusLifeEl.innerText = currentBonusLife

let maxHealth = DEFAULT_MAX_HEALTH
let battleLog = []

function setMaxHealthValueFromUser() {
	maxHealth = parseInt(prompt("Maximum health for you and the monster.", "100"))
	console.log("🚀 ~ setMaxHealthValueFromUser ~ maxHealth", maxHealth)

	if (!isNaN(maxHealth) && maxHealth > 0) {
		adjustHealthBars(maxHealth)
	} else {
		throw {
			message: "Invalid health value. Default value of 100 used.",
		}
	}
}

try {
	setMaxHealthValueFromUser()
} catch (error) {
	console.log("🚀 ~ error", error)
	console.log(error.message)
	maxHealth = DEFAULT_MAX_HEALTH
	adjustHealthBars(maxHealth)
}

function endRound() {
	const monsterDamage = dealPlayerDamage(MONSTER_ATTACK)
	playerHealthBar.value -= monsterDamage

	writeToLog(
		LOG_EVENT_MONSTER_ATTACK,
		monsterDamage,
		monsterHealthBar.value,
		playerHealthBar.value
	)

	if (monsterHealthBar.value <= 0 && playerHealthBar.value >= 0) {
		alert("You won!")
	} else if (playerHealthBar.value <= 0 && currentBonusLife >= 0) {
		currentBonusLife--
		removeBonusLife()
		setPlayerHealth(playerHealthBar.max)
	} else if (
		playerHealthBar.value <= 0 &&
		currentBonusLife === 0 &&
		monsterHealthBar.value >= 0
	) {
		alert("You lost!")
	} else if (
		playerHealthBar.value <= 0 &&
		currentBonusLife === 0 &&
		monsterHealthBar.value <= 0
	) {
		alert("You have a draw!")
	}

	if (monsterHealthBar.value <= 0 || playerHealthBar.value <= 0) {
		resetGame(maxHealth)
	}
}

function attackHandler(baseDamage) {
	const playerDamage = dealMonsterDamage(baseDamage)
	monsterHealthBar.value -= playerDamage

	writeToLog(LOG_EVENT_PLAYER_ATTACK, playerDamage, monsterHealthBar.value, playerHealthBar.value)

	endRound()
}

function healHandler() {
	healPlayer(HEALING_VALUE)
	endRound()
}

function writeToLog(event, value, monsterHealth, playerHealth) {
	let logEntry
	switch (event) {
		case LOG_EVENT_PLAYER_ATTACK:
			logEntry = {
				event: event,
				value: value,
				monsterHealth: monsterHealth,
				playerHealth: playerHealth,
			}
			break

		default:
			break
	}

	battleLog.push(logEntry)
}

attackBtn.addEventListener("click", () => attackHandler(NORMAL_ATTACK))
strongAttackBtn.addEventListener("click", () => attackHandler(STRONG_ATTACK))
// maxHealthBtn.addEventListener("click", setMaxHealthValueFromUser)
healBtn.addEventListener("click", healHandler)
logBtn.addEventListener("click", () => console.table(battleLog))
