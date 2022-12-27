const sayHello = (name) => {
	console.log("Hi " + name)
}

const sayHello1 = (sentence = "Hellooo", name = "NoName") => {
	console.log(sentence + " " + name)
}

const sayHello2 = () => {
	console.log("Hi there!")
}

const getHelloMessage = (name) => {
	return "Hi " + name
}

const checkInput = (cb, ...string) =>{
  let hasEmptyText = false
  for(const text of string){
    if(!text){
      hasEmptyText = true;
      break;
    }
  }
  if(!hasEmptyText){
    cb();
  }
}

checkInput(()=>{
  console.log('Non empty string')
},'aadda','DAda','AFF')

sayHello("John")
sayHello1("hii", "Bob")

