  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyD1qhX9vqrRX6h0jK_mvfg6XOAVZLieRNA",
    authDomain: "form-cf10c.firebaseapp.com",
    databaseURL: "https://form-cf10c.firebaseio.com",
    projectId: "form-cf10c",
    storageBucket: "form-cf10c.appspot.com",
    messagingSenderId: "98195973306"
  };
  firebase.initializeApp(config);

  //SIGN UP FUNCTION
function signup(){
  document.getElementById("loaders").style.display = "block" 
  let usermail = document.getElementById("email").value;
  let userpass = document.getElementById("pwd").value;
  firebase.auth().createUserWithEmailAndPassword(usermail,userpass)
.then((success) => {
    document.getElementById("loaders").style.display = "none" 
    swal({
        title: "You may proceed",
        text: "Account Created",
        icon: "success",
        button: "OK",
    });
    window.location = 'signin.html'
                })
        .catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            swal({
                title: "Connection Error",
                text: errorMessage,
                icon: "warning",
                button: "OK",
            });
            // ...
        });



}
//LOGIN CODE
function login(){
document.getElementById("loaders").style.display = "block" 
let loginemail=document.getElementById('email').value;
let loginpwd=document.getElementById('pwd').value;
document.getElementById("loaders").style.display = "none"
firebase.auth().signInWithEmailAndPassword(loginemail, loginpwd)
.then((success)=>{
  document.getElementById("loaders").style.display = "block"
  localStorage.setItem("userauth", JSON.stringify(success))
  window.location = 'home.html'
})
.catch(function (error) {
      document.getElementById("loaders").style.display = "none"
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  swal({
      title: "Authentication Error",
      text: errorMessage,
      icon: "warning",
      button: "OK",
  });
  // ...
});

}
//logout

function logout(){

firebase.auth().signOut()
.then(function () {
    localStorage.setItem("userauth", JSON.stringify({ user: 'null' }))
    // Sign-out successful.
    window.location = "signin.html"
}).catch(function (error) {
    // An error happened.
    var errorMessage = error.message;
    swal({
        title: "Internet Error",
        text: errorMessage,
        icon: "warning",
        button: "OK",
    });
});
}

window.addEventListener('load', async () => {
    await authCheck()
    getAllTask()
})

async function authCheck() {
    let get = await localStorage.getItem("userAuth");
    let data = JSON.parse(get)
    console.log(data)
    if (data.user !== "null") {
        document.getElementById("signin").style.display = 'none'
        document.getElementById("logout").style.display = 'block'
        document.getElementById("auth").innerHTML = "Welcome <span>" + data.user.email + "</span>"
    } else {
        document.getElementById("signin").style.display = 'block'
        document.getElementById("logout").style.display = 'none'
        document.getElementById("auth").innerHTML = "You dont have Permision to see News"
    }
}
let ul = document.getElementById('mytask')
var arrays = [];
function getAllTask() {
    arrays = []
    // let userUid = firebase.auth().currentUser.uid
    let get = localStorage.getItem("userauth");
    let data = JSON.parse(get)
    // console.log(data.user.uid)
    firebase.database().ref("mytask/" + data.user.uid)
        .once("value", (data) => {
            let userTask = data.val()
            // console.log(userTask)
            for (let key in userTask) {
                //    console.log(key,"key----")
                //    console.log(userTask[key])
                userTask[key].keyId = key
                arrays.push(userTask[key])
                // delete userTask[key].keyId
                // ul.innerHTML +=  `<li key="${key}" class="list-group-item">${userTask[key].task} <button onClick="deleteTask(this)">Delete</button></li>`
            }
            console.log(arrays)
            ul.innerHTML = arrays.map((v) => `<li key="${v.keyId}" class="list-group-item">${v.task} </li>`)
        })
}


function mytask(){
        let task = document.getElementById("userinput").value;
        let userUid = firebase.auth().currentUser.uid
        if (userUid !== null) {
            let time = firebase.database.ServerValue.TIMESTAMP
            let taskObj = {
                task,
                time
            }
            console.log(taskObj, "taskObj")
            firebase.database().ref("mytask/" + userUid)
                .push(taskObj)
                .then((success) => {
                    getAllTask()
                    console.log(success, "data saved")
                })
                .catch((error) => {
                    console.log(error.message)
                })
        } else 
        {
    
        }
    }







