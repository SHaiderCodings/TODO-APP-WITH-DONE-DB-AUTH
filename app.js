
window.addEventListener('load', async()=>{
    await authCheck()
})

async function authCheck(){
    let data = await localStorage.getItem("userauth")
    let auths = JSON.parse(data)

    // console.log(auths)
    if(auths.user !== "null"){
        document.getElementById("main").innerHTML = "<span> Welcome "+auths.user.email+"</span>"
    }else{
        document.getElementById("main").innerHTML = "<span>"+"Please Login First"+"</span>"
    }
}