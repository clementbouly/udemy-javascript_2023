const listElement = document.querySelector(".posts")
const postTemplate = document.getElementById("single-post")
const fetchPostButton = document.querySelector("#available-posts button")
const postTitleInput = document.getElementById("title")
const postBodyInput = document.getElementById("content")
const addPostButton = document.querySelector("#new-post button")

const POSTS_DEFAULT_NUMBER = 3

const POST_OBJECT = {
	title: "A new post",
	body: "This is a new post",
	userId: 1,
}

const fetchPosts = async () => {
	const response = await fetch("https://jsonplaceholder.typicode.com/posts")
	// console.log(response);
	const posts = await response.json()
	return posts
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

		// add the post to the list
		listElement.append(postElement)
	})
}

const getPostsToFillList = async () => {
	const posts = await fetchPosts()
	// add only first 5 posts
	addPostsToList(posts.slice(0, POSTS_DEFAULT_NUMBER))
}

const addPost = async (event) => {
	event.preventDefault()
	const newPost = { ...POST_OBJECT }

	newPost.title = postTitleInput.value
	newPost.body = postBodyInput.value
	newPost.userId = Math.floor(Math.random() * 10)

	console.log(newPost)

	const postCreated = await POSTPost(newPost)

	console.log(postCreated)
}

fetchPostButton.onclick = getPostsToFillList
addPostButton.onclick = addPost
