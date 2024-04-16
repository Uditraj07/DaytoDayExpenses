let form=document.querySelector("#form");
form.addEventListener('submit',(event)=>{
    event.preventDefault();
    let name=event.target.name.value;
    let mail=event.target.mail.value;
    let password=event.target.password.value;
    fetchByEmail(mail).then((result)=>{
        if(result.data.length==0){
            let userDetails={
                name:name,
                email:mail,
                password:password
            }
            CreateUser(userDetails).then((result)=>{
                alert("User created successfully");
                event.target.name.value='';
                event.target.mail.value='';
                event.target.password.value='';
                window.location.href='\login'
            }).catch((error)=>{
                console.log(error);
            })
        }
        else{
            alert("Already registered ")
        }
    }).catch((error)=>{
        console.log(error)
    })
    
})
function CreateUser(userDetails){
    return axios.post("http://localhost:4000/User/create-data", userDetails)
}
function fetchByEmail(email){
    return axios.get(`http://localhost:4000/User/get-by-email?email=${email}`);
}