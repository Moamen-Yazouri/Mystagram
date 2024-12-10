const postList = document.querySelector(".posts-list");
const addWindow = document.querySelector(".add-post");
let POSTS = [];
let newPosts = [];
if(localStorage.getItem("posts")) {
    
    let addedPosts = JSON.parse(localStorage.getItem("posts"));

    DATA.forEach(post => {
        POSTS.unshift(post);
    })

    addedPosts.forEach(post => {
        POSTS.unshift(post);
        newPosts.unshift(post);
    })

}
else {
    DATA.forEach(post => {
        POSTS.unshift(post);
    })
}

const defaultPost = {
    id: 0,

    
    img: '',
    desc: '',
    likesCount: 0,
    time: new Date().toDateString()
}

function renderPost(post = defaultPost) {
    const postHTML =  `
    <div class="post">
                <div class="header">
                    <div class="info">
                    <profile-img><img src="${post.author.avatar}" alt=""></profile-img> 
                    <div class="title">
                        <span class="name">${post.author.displayName}</span>
                        <span class="subtitle">${post.author.subtitle}</span>
                    </div>
                    </div>
                    <button><i class="fa-solid fa-ellipsis-vertical"></i></button>
                </div>
                <div class="content">
                    <img src="${post.img}" alt="">
                    <ul class="actions">
                        <li><i class="fa-regular fa-heart" onclick="likePost(${post.id})"></i></li>
                        <li><i class="fa-regular fa-comment"></i></li>
                        <li><i class="fa-regular fa-paper-plane"></i></li>
                        <li><i class="fa-regular fa-bookmark"></i></li>
                    </ul>
                    <p>${post.desc}</p>
                    <div class="likes-date">
                        <div class="likes"> ${post.likesCount > 0 ? `<span class="likes-count">${post.likesCount} likes</span>` : ''}</div>
                        <div class="date">${post.time}</div>
                    </div>
                </div>
            </div>
    `
    postList.insertAdjacentHTML('beforeend', postHTML);
}

function renderAllPosts() {
    postList.innerHTML = '';
    POSTS.forEach(post => {
        renderPost(post);
    });
}
function likePost(id) {
    POSTS.forEach(post => {
        if(post.id == id) {
            post.likesCount++;
        }
    });
    renderAllPosts();
}

function showWindow() {
    addWindow.classList.add("shown");
}

function closeAddWindow() {
    addWindow.classList.toggle("shown");
}

window.addEventListener("click", (e) => {
    e.stopPropagation();
    if (
        addWindow.classList.contains("shown") &&
        !e.target.closest("form") &&
        e.target.id !== "add-post"
    ) {
        closeAddWindow();
    }
});

function addNewPost() {
    const postDesc = document.querySelector("#desc-input");
    const postImage = document.querySelector("#post-img");
    let newPost = {...defaultPost};
    newPost.id  = newPosts.length == 0 ? POSTS.length + 1: POSTS.length + newPosts.length;
    newPost.desc = postDesc.value;
    newPost.img = postImage.value;
    newPost.author = {};
    newPost.author.displayName = "Moamen Al-Yazouri";
    newPost.author.subtitle = "Front End Developer";
    newPost.author.avatar = './imgs/avatar.jpg';

    POSTS.unshift(newPost);
    newPosts.unshift(newPost);
    localStorage.setItem("posts", JSON.stringify(newPosts));
    renderAllPosts();
    closeAddWindow();
}

renderAllPosts();