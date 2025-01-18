
let users=[];
if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify([]));
}


function get_array(array){
    return JSON.parse(localStorage.getItem(array));
}

function push_data(array,data){
    console.log("SIGNUP PAGE : entered push_data");
    const array_ar = get_array(array);
    console.log("SIGNUP PAGE : got the array")
    if(array_ar.some(user => user.fullname === data.fullname)){
        alert("User already exists! Go Sign In!");
        return false;
    } else{
        console.log("SIGNUP PAGE : pushing data exactly here")
        array_ar.push(data);
    }
    console.log("SIGNUP PAGE : pumped the data now storing in local storage")
    localStorage.setItem(array,JSON.stringify(array_ar));
    console.log("SIGNUP PAGE : stored in local storage")
    return array_ar
}

function check_password_npush(fullname,email_id,pass_ent,pass_conf){
    console.log("SIGNUP PAGE :checking passwords")
    if(pass_conf===pass_ent){
        const password = pass_conf;
        console.log("SIGNUP PAGE : password checked, now pushing data");
        const data = {
            "fullname" : fullname,
            "email" : email_id,
            "password" : password,
            "profile_data" : {
                "profile_status" : "NA"
            }
        }
        const updated_users =  push_data('users',data);
        if(updated_users===false){
            return false;
        }
        console.log(updated_users);
        console.log("SIGNUP PAGE : data pushed");
        return true;
    }else {
        alert("Passwords Don't Match");
        return false;
    }
}

document.addEventListener("DOMContentLoaded",()=>{
    console.log("SIGNUP PAGE : DOM Loaded");

    const form = document.querySelector('form');
    form.addEventListener("submit", (e)=>{

        //Remove the default move of refreshing after submitting
        e.preventDefault();
        console.log("SIGNUP PAGE :form submitted");

        //Retrieve data from user input
        const fullname = document.getElementById("fullname").value;
        const email_id = document.getElementById("email").value;
        const pass_ent = document.getElementById("pass_ent").value;
        const pass_conf = document.getElementById("pass_conf").value;
        console.log("SIGNUP PAGE :data retrieved");

        //Call function to check if the passwords are correct and then push the data else warn
        if(check_password_npush(fullname,email_id,pass_ent,pass_conf)){
            window.location.href="welcome.html";
        }
    })
})