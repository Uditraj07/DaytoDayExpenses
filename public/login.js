let form=document.querySelector("#form");
    form.addEventListener('submit',(event)=>{
        event.preventDefault();
        let mail=event.target.mail.value;
        let password=event.target.password.value;
        UserValidation(mail,password).then((result)=>{
            if(result.data.message){
                alert("User Login successfully");
                sessionStorage.setItem('id',result.data.id);
                event.target.mail.value="";
                event.target.password.value="";
                window.location.href = '/Expenses';
            }
            else{
                alert(result.data);
            }
        }).catch((error)=>{
            console.log(error);
        })
    })
    // let signupBtn=document.getElementById("signup-btn");
    // signupBtn.onclick=function(){
    //    return axios.get('http://localhost:4000/User/sign-up')
    // }
    function UserValidation(email,password){
        const url = `http://localhost:4000/User/user-validation?email=${email}&password=${password}`;
        return axios.get(url);
    }