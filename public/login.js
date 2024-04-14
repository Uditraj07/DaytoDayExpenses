let form=document.querySelector("#form");
form.addEventListener('submit',(event)=>{
    event.preventDefault();
    let name=event.target.name.value;
    let mail=event.target.mail.value;
    let password=event.target.password.value;
    let userDetails={
        name:name,
        email:mail,
        password:password
    }
    CreateUser(userDetails).then((result)=>{
        event.target.name.value='';
        event.target.mail.value='';
        event.target.password.value='';
    }).catch((error)=>{
        console.log(error);
    })
})
function CreateUser(userDetails){
    return axios.post("http://localhost:4000/User/create-data", userDetails)
}