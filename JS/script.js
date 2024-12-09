const postList = document.querySelector(".posts-list");


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
                    <div class="likes-date">
                        <div class="likes"> ${post.likesCount > 0 ? `<span class="likes-count">${post.likesCount} likes</span>` : ''}</div>
                        <div class="date">${post.time}</div>
                    </div>
                    <p>${post.desc}</p>
                </div>
                <ul class="actions">
                    <li><i class="fa-regular fa-heart" onclick="likePost(${post.id})"></i></li>
                    <li><i class="fa-regular fa-comment"></i></li>
                    <li><i class="fa-regular fa-paper-plane"></i></li>
                    <li><i class="fa-regular fa-bookmark"></i></li>
                </ul>
            </div>
    `
    postList.insertAdjacentHTML('beforeend', postHTML);
}

function renderAllPosts() {
    postList.innerHTML = '';
    DATA.forEach(post => {
        renderPost(post);
    });
}
function likePost(id) {
    DATA.forEach(post => {
        if(post.id == id) {
            post.likesCount++;
        }
    });
    renderAllPosts();
}
renderAllPosts();

function addNewPost() {
    const addWindow = document.querySelector(".add-post")
}

