let form=document.getElementById("form");
form.addEventListener('submit',(event)=>{
    event.preventDefault();
    let amount=event.target.amout.value;
    let description=event.target.description.value;
    let category=event.target.category.value;
    let expenseDetails={
        amount:amount,
        description:description,
        category:category,
        userId:sessionStorage.getItem('id')
    }
    createExpense(expenseDetails).then((result)=>{
            alert("Expenses addedd successfully");
            event.target.amout.value='';
            event.target.description.value='';
            event.target.category.value='';
            addtoList(result.data);
        })
})
function addtoList(expenseDetails){
        let ul=document.getElementById("all-expenses");
        let li=document.createElement("li");
        li.className="py-9 bg-purple-600 text-black  rounded-lg my-2";
        let form = document.createElement('form');
        form.method = 'put';
        form.className=" flex flex-col lg:flex-row gap-y-2";
        let id_input = document.createElement('input');
        id_input.name = 'id';
        id_input.type = 'text';
        id_input.value = expenseDetails.id;
        id_input.classList.add('hidden');
        form.append(id_input);

        let amount_lable=document.createElement('label');
        amount_lable.setAttribute('for','amount');
        amount_lable.innerText='Amount :';
        amount_lable.className="font-bold text-black flex items-center mx-2 ";
        form.append(amount_lable)
        

        let amount_input = document.createElement('input');
        amount_input.readOnly=true;
        amount_input.name = 'amount';
        amount_input.type = 'text';
        amount_input.value = expenseDetails.amount;
        amount_input.className=" p-3 rounded-lg outline-none w-10/12 lg:w-auto mx-auto";
        form.append(amount_input);

        let description_label=document.createElement('label');
        description_label.setAttribute('for','description');
        description_label.innerText='Description :';
        description_label.className="font-bold text-black flex items-center mx-2 ";
        form.append(description_label)

        let description_input = document.createElement('input');
        description_input.readOnly=true;
        description_input.name = 'purpose';
        description_input.type = 'text';
        description_input.value = expenseDetails.description;
        description_input.className=" p-3 rounded-lg outline-none w-10/12 lg:w-auto mx-auto";
        form.append(description_input);

        let category_label=document.createElement('label');
        category_label.setAttribute('for','category');
        category_label.innerText='category :';
        category_label.className="font-bold text-black flex items-center mx-2 ";
        form.append(category_label)
        

        let category_input = document.createElement('input');
        category_input.readOnly=true;
        category_input.name = 'purpose';
        category_input.type = 'text';
        category_input.value = expenseDetails.category;
        category_input.className=" p-3 rounded-lg outline-none w-10/12 lg:w-auto mx-auto ";
        form.append(category_input);

        let deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.type='button';
        deleteButton.className="p-3 rounded-lg bg-amber-500 font-bold text-black mx-2"
        form.append(deleteButton)

        
        let editButton = document.createElement("button");
        editButton.innerText = "Edit";
        editButton.className="p-3 rounded-lg bg-amber-500 font-bold text-black mx-2"
        editButton.type='button';
        form.append(editButton);

        let cancelButton = document.createElement("button");
        cancelButton.innerText = "Cancel";
        cancelButton.className="p-3 rounded-lg bg-amber-500 font-bold text-black hidden mx-2"
        cancelButton.type='button';
        form.append(cancelButton);

        let saveButton = document.createElement("button");
        saveButton.innerText = "Save";
        saveButton.className="p-3 rounded-lg bg-amber-500 font-bold text-black hidden mx-2"
        saveButton.type='Submit';
        form.append(saveButton);
        li.append(form);
        ul.append(li);


        deleteButton.addEventListener('click',()=>{
            let res=confirm("Are you sure to delete the record");
            if(res){
                deleteRecord(id_input.value).then((res)=>{
                    alert("Delete successfully");
                    deleteButton.parentElement.parentElement.remove()
                    }).catch((error)=>{
                        console.log(error)
                    })
            }  
        })
        editButton.addEventListener('click',()=>{
            amount_input.readOnly=false;
            category_input.readOnly=false;
            description_input.readOnly=false;
            deleteButton.classList.add('hidden');
            editButton.classList.add('hidden');
            cancelButton.classList.remove('hidden');
            saveButton.classList.remove('hidden');
            saveButton.addEventListener('click',(event)=>{
                event.preventDefault()
                let expenseDetails={
                    amount:amount_input.value,
                    description:description_input.value,
                    category:category_input.value
                }
                updateDetails(id_input.value,expenseDetails).then((res)=>{
                    alert("Update successfully");
                    let data=res.data;
                    amount_input.value=expenseDetails.amount;
                    description_input.value=expenseDetails.description;
                    category_input.value=expenseDetails.category
                    amount_input.readOnly=true;
                    category_input.readOnly=true;
                    description_input.readOnly=true;
                    deleteButton.classList.remove('hidden');
                    editButton.classList.remove('hidden');
                    cancelButton.classList.add('hidden');
                    saveButton.classList.add('hidden');
                }).catch((error)=>{
                    console.log(error)
                })
            })
            cancelButton.addEventListener('click',()=>{
                let res=confirm("Are you sure to cancel");
                if(res){
                    window.location.reload();
                }
                
            })
        })            
}
function createExpense(expenseDetails) {
        return axios.post("http://localhost:4000/Expenses/add-expense", expenseDetails)
    }

function deleteRecord(id){
        return axios.delete(`http://localhost:4000/Expenses/delete/${id}`,{headers:{'authorization':sessionStorage.getItem("id")}})
}

function updateDetails(id,expenseDetails){
        return axios.put(`http://localhost:4000/Expenses/update/${id}`,expenseDetails)
    }

function getAllExpenses(){
    let id=sessionStorage.getItem("id");
     axios.get(`http://localhost:4000/Expenses/get-all-expenses?id=${id}`).then((result)=>{
        let expenses=result.data;
        expenses.forEach((expenseDetails)=>{
            addtoList(expenseDetails);
        })
     })
}
async function checkPremium(){
    let id=sessionStorage.getItem("id");
    let response=await axios.get(`http://localhost:4000/User/check-premium`,{headers:{"authorization":id}})
    if(response.data.isPremium){
        let razBtn=document.querySelector("#razor-pay-button");
        razBtn.classList.add('hidden');
        razBtn.nextElementSibling.classList.remove('hidden');
        let leaderboardButton=document.querySelector("#leaderboard-button");
        leaderboardButton.classList.remove("hidden")
    }
}
checkPremium();
getAllExpenses();

let razBtn=document.querySelector("#razor-pay-button");
razBtn.addEventListener('click',async (e)=>{
    e.preventDefault();
    const userId=sessionStorage.getItem("id");
    let response=await axios.get("http://localhost:4000/Purchase/purchase-membership",{headers:{"authorization":userId}})
    
    var option={
        "key":response.data.key_id,
        "order_id":response.data.order.id,
        "handler":async function(response){
            console.log(response)
            let res=await axios.post("http://localhost:4000/Purchase/update-purchase",{
                orderId:option.order_id,
                paymentId:response.razorpay_payment_id,
            },{headers:{"authorization":userId,"status":"success"}})

            alert(res.data)
            razBtn.classList.add("hidden");
            let premium=razBtn.nextElementSibling;
            premium.classList.remove('hidden');
            document.getElementById("leaderboard-button").classList.remove('hidden');
        }
    }
    const rzp1=new Razorpay(option);
     rzp1.open();
     rzp1.on('payment.failed', async (response) => {
        alert("Payment failed. Please try again.");
    
        // Send a request to your backend to update the payment status
        try {
            console.log(response)
            const userId = sessionStorage.getItem("id");
            const orderId = option.order_id;
            const paymentId = response.error.metadata.payment_id;
            console.log(paymentId)
    
            await axios.post("http://localhost:4000/Purchase/update-purchase", {
                orderId,
                paymentId
            },{headers:{"authorization":userId,"status":"failed"}});
            console.log("Payment failure details sent to the server.");
        } 
        catch (error) {
            console.error("Error sending payment failure details to the server:", error);
        }
    });
    
})
let leaderboardButton=document.getElementById("leaderboard-button");
let leaderboardList=document.getElementById("leaderboard").querySelector("ul");
leaderboardButton.addEventListener('click',async (event)=>{
    try{
        event.preventDefault();

    let result= await axios.get('http://localhost:4000/Expenses/getallexpenses');
    result.data.forEach((data)=>{
        document.getElementById("leaderboard").classList.remove('hidden')
        let li=document.createElement('li');
        li.className.add="font-bold  text-xl"
        li.innerHTML=`Name: ${data.name} |  totalExpense: ${data.totalExpense}`;
        leaderboardList.append(li);
        leaderboardButton.classList.add('hidden')
    })
    }
    catch(error){
        console.log(error);
    }
})