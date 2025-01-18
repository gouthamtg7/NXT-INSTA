// let content_list = [{
//     "profile_image" : profile_image,
//     "profile_name" : "Tom",
//     "content" : "This is a testing content."
// }];

let profile_image = undefined;
let profile_name = undefined;
let posts = [];
localStorage.setItem('posts',JSON.stringify(posts));



// function display(){
//     let mainbarHTML = ``;
//     const post = JSON.parse(localStorage.getItem('active_account_data'));
//     post.forEach((post,index)=>{
//         mainbarHTML+=`
//         <div class="main-bar-node">
//                         <div class="main-bar-node-profile-line">
//                             <a href="profile.html"><img class="main-bar-node-profile-img" src="${post.profile_img}"></a>
//                             <a href="profile.html"><h3 class="main-bar-node-profile-name">${post.username}</h3></a>
//                         </div>

//                         <div class="main-bar-node-content-bar">
//                             <p class="main-bar-node-content">${post.posted_content}</p>
//                         </div>

//                         <div class="main-bar-node-reaction-bar">
//                             <button class="main-bar-node-like">Like</button>
//                             <button class="main-bar-node-dislike">Dislike</button>
//                         </div>
//         </div>`;
//     });
//     const mainbar = document.querySelector(".main-bar-nodes");
//     mainbar.innerHTML = mainbarHTML;
// }




function get_post_info(){
        let mainbarHTML = ``;
        
        mainbarHTML+=`
            <div class="main-bar-node-1">

                            <!-- The user input for main content part  -->
                            <div class="main-bar-node-content-bar">
                                <label class=main-bar-node-content id="main-bar-node-content-label">Write something...</label>
                                <textarea class="main-bar-node-content" id="main-bar-node-content-textarea"></textarea>
                            </div>

                            <!-- Now the like and dislike part -->
                            <div class="main-bar-node-reaction-bar">
                                <button class="main-bar-node-like" id="like">Post</button>
                            </div>
            </div>`;
        const mainbar = document.querySelector(".main-bar-nodes");
        mainbar.innerHTML = mainbarHTML;

        const content_posted = document.getElementById("main-bar-node-content-textarea").value;
        const account = JSON.parse(localStorage.getItem('active_account_data'));
        const post_id = account.profile_data.post_id;

        const post = JSON.parse(localStorage.getItem('posts'));
        post.push({
            "username" : account.username,
            "profile_img" : account.profile_pic,
            "post-id" : post_id,
            "posted_content" : content_posted
        });

        localStorage.setItem('posts', JSON.stringify(post));        
    }




//When the user enters for the first time, he has to give his profile information to proceed. 
function create_profile(account) {
    let MainSectionContainerHTML = `
    <div class="main-section-container form-container">
        <h2>Let's Create Your Profile</h2>
        <form class="initial-profile-form">
            <input type="text" placeholder="Create a username" id="profile-user" required>
            <label for="profile-img" id="profile-img-label">Add a profile pic:</label>
            <input type="file" id="profile-img" accept="image/*">
            <div id="image-preview"></div>
            <input type="number" placeholder="Age" id="profile-age" required>
            <input type="text" placeholder="Enter your college name" id="profile-college-name" required>
            <input type="submit" id="submit">
        </form>
    </div>`;
    
    const MainSectionContainer = document.querySelector(".main-section-container");
    MainSectionContainer.innerHTML = MainSectionContainerHTML;
    
    const form = document.querySelector('form');
    const imageInput = document.getElementById('profile-img');
    const imagePreview = document.getElementById('image-preview');

    // Add event listener for image selection
    imageInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.style.maxWidth = '200px';
                img.style.maxHeight = '200px';
                imagePreview.innerHTML = '';
                imagePreview.appendChild(img);
            }
            reader.readAsDataURL(file);
        }
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
    
        const activeAccount = JSON.parse(localStorage.getItem('active_account_data'))[0];
        const email = activeAccount.email;
    
        // Get the image data URL
        const imageDataUrl = imagePreview.querySelector('img') ? imagePreview.querySelector('img').src : null;
    
        const newProfileData = {
            profile_status: "Filled",
            username: document.getElementById("profile-user").value,
            profile_pic: imageDataUrl, // Store the image data URL
            age: document.getElementById("profile-age").value,
            college_name: document.getElementById("profile-college-name").value,
            post_id: "POSTID" + Date.now()
        };
    
        activeAccount.profile_data = newProfileData;
        localStorage.setItem('active_account_data', JSON.stringify([activeAccount]));
    
        let users = JSON.parse(localStorage.getItem('users'));
        let userIndex = users.findIndex(user => user.email === email);
    
        if (userIndex !== -1) {
            users[userIndex].profile_data = newProfileData;
            localStorage.setItem('users', JSON.stringify(users));
        }
    
        profile_name = newProfileData.username;
        profile_image = newProfileData.profile_pic;
        
        // You might want to redirect or update UI here
        console.log("Profile created successfully");
        display();
    });
}

        
        //update_profile_html



document.addEventListener("DOMContentLoaded", () => {
            const users_data = JSON.parse(localStorage.getItem('users'));
            const account = JSON.parse(localStorage.getItem('active_account_data'))[0]; // Note the [0] here
            if (account && account.profile_data && account.profile_data.profile_status === "NA") {
                create_profile(account);
            // } else {
            //     display();
            // }
            // display();
        
            document.querySelector(".side-bar-create").addEventListener("click", () => {
                get_post_info();
                display();
            });
        });