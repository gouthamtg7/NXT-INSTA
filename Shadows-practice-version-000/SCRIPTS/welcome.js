function get_array(array){
    return JSON.parse(localStorage.getItem(array)) || [];  
}

function push_data(array,data){
    const array_ar = get_array(array);
    array_ar.push(data);
    localStorage.setItem(array,JSON.stringify(array_ar));
    return array_ar
}

function is_user_correct(email,password){
    console.log("WELCOME PAGE : entered the function to check for matching data");
    

    //Get data from local storage
    const user_data = get_array('users');
    console.log("WELCOME PAGE : LocalStorage users data retrieved : ",user_data);
    if(user_data.some(user => user.email === email)){
        console.log("WELCOME PAGE : email exists");
        const index = user_data.findIndex(user => user.email === email);
        if (user_data[index].password === password){
            console.log("WELCOME PAGE : password matches");
            let active_account_data = [{
                "index" : index,
                "fullname" : user_data[index].fullname,
                "email" : user_data[index].email,
                "profile_data" : user_data[index].profile_data
            }];
            localStorage.setItem('active_account_data',JSON.stringify(active_account_data));
            console.log("WELCOME PAGE : active account data created and stored in localstorage: ",active_account_data);
            window.location.href="home.html";
        } else {
            alert("Password Incorrect")
        }
    }else {
        alert("User does not exist. Kindly Sign Up to proceed.")
    }
}

document.addEventListener("DOMContentLoaded",()=>{
    console.log("WELCOME PAGE : DOM loaded")
    const form = document.querySelector('form');
    form.addEventListener('submit',(e)=>{
        e.preventDefault();
        console.log("WELCOME PAGE : form submitted");

        //Retrieve data 
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        console.log("WELCOME PAGE : Data Retrieved");
        
        
        //Check if the data matches with the users DB
        is_user_correct(email,password);
    })
})


