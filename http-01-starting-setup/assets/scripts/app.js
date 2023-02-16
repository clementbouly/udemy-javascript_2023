const listElement = document.querySelector(".posts")
const postTemplate = document.getElementById("single-post")
const fetchPostButton = document.querySelector("#available-posts button")
const postTitleInput = document.getElementById("title")
const postBodyInput = document.getElementById("content")
const addPostButton = document.querySelector("#new-post button")
const formElement = document.querySelector("#new-post form")

const POSTS_DEFAULT_NUMBER = 3

const POST_OBJECT = {
	title: "A new post",
	body: "This is a new post",
	userId: 1,
	id: 0,
}

const fetchPosts = async () => {
	try {
		const posts = await sendRequest("GET", "https://jsonplaceholder.typicode.com/posts")
		console.log("POSTS", posts)
		return posts
	} catch (error) {
		console.log("ERROR", error)
	}
}

const POSTPost = async (post) => {
	const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
		method: "POST",
		body: JSON.stringify(post),
		headers: {
			"Content-Type": "application/json",
		},
	})
	const data = await response.json()
	return data
}

const sendRequest = async (method, url, data = "") => {
	const params = {
		method: method,
		headers: {
			"Content-Type": "application/json",
		},
	}
	if (method === "POST") {
		params.body = JSON.stringify(data)
	}

	const response = await fetch(url, params)
	console.log("RESPONSE", response)
	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`)
	}
	const responseData = await response.json()
	return responseData
}

const getPostsWithXMLHttpRequest = () => {
	const xhr = new XMLHttpRequest()
	xhr.open("GET", "https://jsonplaceholder.typicode.com/posts")
	xhr.responseType = "json"
	xhr.onload = () => {
		const response = xhr.response
		addPostsToList(response.slice(0, POSTS_DEFAULT_NUMBER))
	}
	xhr.send()
}

const addPostsToList = (posts) => {
	posts.forEach((post) => {
		// create a new post element
		const postElement = postTemplate.content.cloneNode(true)
		postElement.querySelector("h2").textContent = post.title.toUpperCase()
		postElement.querySelector("p").textContent = post.body

		// add id to the post
		postElement.querySelector("li").id = post.id

		// add event listener to delete button
		postElement.querySelector("button").onclick = delelePost

		// add the post to the list
		listElement.append(postElement)
	})
}

const delelePost = async (event) => {
	const postElement = event.target.closest("li")
	const postId = postElement.id
	try {
		await sendRequest("DELETE", `https://jsonplaceholder.typicode.com/posts/${postId}`)
		postElement.remove()
		console.log("Post deleted")
	} catch (error) {
		console.log("Post not deleted")
		console.log("ERROR", error)
	}
}

const getPostsToFillList = async () => {
	const posts = await fetchPosts()

	if (!posts) {
		return
	}

	// clear the list
	listElement.innerHTML = ""

	// add only first 5 posts
	addPostsToList(posts.slice(0, POSTS_DEFAULT_NUMBER))
}

const addPost = async (event) => {
	event.preventDefault()
	const newPost = { ...POST_OBJECT }

	newPost.title = postTitleInput.value
	newPost.body = postBodyInput.value
	newPost.userId = Math.floor(Math.random() * 10)
	newPost.id = Math.random()

	const postCreated = await POSTPost(newPost)

	console.log({ postCreated })
}

fetchPostButton.onclick = getPostsToFillList
// addPostButton.onclick = addPost
formElement.onsubmit = async (e) => {
	e.preventDefault()
	const fd = new FormData(formElement)

	let response = await fetch("https://jsonplaceholder.typicode.com/posts", {
		method: "POST",
		body: fd,
	})

	let result = await response.json()

	console.log(result)
}
