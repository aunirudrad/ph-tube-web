function removeClassButton() {
    const activeClassButton = document.getElementsByClassName("active");
    for (const btn of activeClassButton) {
        btn.classList.remove("active");
    }
}

function loadCategories() {
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
        .then((res) => res.json())
        .then((data) => {
            displayCategories(data.categories);
        })
}


function displayCategories(categories) {

    // console.log(categories);

    const dynamicCategories = document.getElementById("categories");

    for (const element of categories) {

        const eachCategory = document.createElement("div");

        eachCategory.innerHTML = `
            <button id="btn-${element.category_id}" onclick="loadCategoryVideos(${element.category_id})" class="btn btn-soft rounded-lg py-2 px-5 font-medium hover:text-white hover:bg-btn-secondary hover:font-semibold hover:text-[1.125rem]">${element.category}</button>
        `;

        dynamicCategories.appendChild(eachCategory);
    }

}

const loadCategoryVideos = (id) => {

    const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;

    // console.log(url);

    fetch(url)
        .then(res => res.json())
        .then(data => {

            removeClassButton();
            const clickedButton = document.getElementById(`btn-${id}`);

            clickedButton.classList.add("active");
            console.log(clickedButton);
            displayVideos(data.category);
        });

}

const loadVideos = () => {
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
        .then(res => res.json())
        .then(data => {
            removeClassButton();

            document.getElementById("btn-all").classList.add("active");
            displayVideos(data.videos)});
}

const displayVideos = (videos) => {
    // console.log(videos);
    const videoContainer = document.getElementById("videos");

    videoContainer.innerHTML = "";

    if (videos.length == 0) {
        videoContainer.innerHTML = `
        <div class="col-span-full flex flex-col justify-center items-center py-40">
            <img class="w-[150px] pb-10" src="assets/Icon.png" alt="">
            <h2 class="text-4xl font-bold text-text-secondary">Oops!! Sorry, There is no content here</h2>
        </div>
        `;
    }

    videos.forEach(video => {
        // console.log(video);

        const singleVideo = document.createElement("div");
        singleVideo.innerHTML = `
        <div class="card bg-base-100">
            <figure class="rounded-lg h-[200px] relative">
                <img class="w-full h-[200px] object-cover" src="${video.thumbnail}" alt="Shoes" />
                <span class="absolute text-white text-[0.625rem] bottom-2 right-2 bg-black py-1 px-2 rounded">3hrs 56 min ago</span>
            </figure>
            <div class="flex gap-4 pt-5">
                <div class="">
                    <img class="rounded-full w-10 h-10" src="${video.authors[0].profile_picture}" alt="">
                </div>
                <div>
                    <h2 class="font-bold text-text-secondary">${video.title}</h2>
                    <p class="text-sm py-2 text-text-ternary flex gap-3 items-center">${video.authors[0].profile_name} <img class="w-5" src="https://img.icons8.com/?size=64&id=eZo3c88c63il&format=png"></p>
                    <p class="text-sm text-text-ternary">${video.others.views} Views</p>
                </div>

            </div>
        </div>
        `;

        videoContainer.appendChild(singleVideo);

    });

};


loadCategories();
// loadVideos();