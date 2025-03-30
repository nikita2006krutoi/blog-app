const posts = [];
let postIdCounter = 1;

const postTitleInputNode = document.querySelector(".js-post-title-input");
const postTextInputNode = document.querySelector(".js-post-text-input");
const newPostBtnNode = document.querySelector(".js-new-post-btn");
const postNode = document.querySelector('.js-posts');
const clearFeedBtnNode = document.querySelector(".clear-feed-btn")



newPostBtnNode.addEventListener('click', function () {
    const postFromUser = getPostFromUser();

    const validationResult = validateUserInput(postFromUser);    
    if (validationResult === "") {
        addPost(postFromUser);
        clearInput();
    }

    getInvalidElement(validationResult);  

    renderPosts();
});

function getPostFromUser() {
    const title = postTitleInputNode.value;
    const text = postTextInputNode.value;    

    return {
        id: postIdCounter++,
        date: getPublicationDate(),
        title,
        text
    };
}

function addPost({ id, date, title, text }) {
    posts.push({
        id,
        date,
        title,
        text
    });
}

function getPosts() {
    return posts;
}

function renderPosts() {
    const posts = getPosts();

    let postsHTML = "";

    posts.forEach(post => {
        postsHTML += `       
        <div id="${post.id}" class="post">
            <p class="post__date">${post.date}</p>
            <p class="post__title">${post.title}</p>
            <p class="post__text">${post.text}</p>
            <button class="delete-post-btn"></button>
        </div>
        ` 

    });

    postNode.innerHTML = postsHTML;

    addDeleteEventListeners(postsHTML);

    isEmptyFeed();
}

function validateUserInput(  {date, title, text }) {
    if (title.length >  100) {
        return "Заголовок больше 100 символов";
    }
    
    if (text.length > 200) {
        return "Пост больше 200 символов";
    }

    if (!title || title.trim() === "" ) {
        return "Заголовок не может быть пустым";
    }

    if (!text || text.trim() === "" ) {
        return "Пост не может быть пустым";
    }

    return "";
}

function getPublicationDate () {
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");

    const hours = String(currentDate.getHours()).padStart(2, "0");
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");

    return `${year}.${month}.${day} ${hours}:${minutes}`;
}

function getInvalidElement (invalidText) {
    const invalidElement = document.querySelector(".invalid-element");
    
    invalidElement.textContent = invalidText;
}

function clearInput() {
    postTextInputNode.value = "";
    postTitleInputNode.value = "";
}

function addDeleteEventListeners() {
    const deletePostButton = document.querySelectorAll(".delete-post-btn");

    deletePostButton.forEach(button => {
        button.addEventListener("click", function () {
            const post = button.closest(".post");
            console.log("Найден пост: ", post);
    posts.splice(posts.indexOf(post.id, 1));
    post.remove();
            deletePost(post);
            
            renderPosts();
        });
    })
}



function deletePost(post) {
    const posts = getPosts();

}

clearFeedBtnNode.addEventListener("click", function () {
    clearFeed();
    renderPosts();
});

function clearFeed() {
    const posts = getPosts();

    postNode.innerHTML = "";
    posts.length = 0;

}

function isEmptyFeed () {
    const posts = getPosts();
    
    if (posts.length === 0) {
        postNode.innerText = "Тут пока пусто...";
    }
}