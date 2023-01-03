const task1 = document.querySelector("#task-1")

task1.style.backgroundColor = "black"

const taskSecondWay = document.getElementById("task-1")
taskSecondWay.style.color = "white"

const title = document.querySelector("title")

title.textContent = "Assignment - Solved!"

const titleSecondWay = document.head.querySelector("title")

titleSecondWay.textContent = "Assignment - Solved again !"

const h1 = document.querySelector("h1")

h1.textContent = "Assignment - Solved!"

const btn = document.querySelector(".btn")

const changeColor = () => {
	document.documentElement.style.setProperty('--color1', '#fa923f');
    document.documentElement.style.setProperty('--color2', '#521751');
}

btn.addEventListener("click", changeColor)
