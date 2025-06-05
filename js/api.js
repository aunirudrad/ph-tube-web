function loadCategories() {
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
        .then((res) => res.json())
        .then((data) => {
            displayCategories(data.categories);
        })
}


function displayCategories(categories) {

    console.log(categories);

    const dynamicCategories = document.getElementById("categories");

    for (const element of categories) {

        const eachCategory = document.createElement("div");

        eachCategory.innerHTML = `
            <button class="rounded-lg py-2 px-5 font-medium bg-btn-primary hover:text-white hover:bg-btn-secondary hover:font-semibold hover:text-[1.125rem]">${element.category}</button>
        `;

        dynamicCategories.appendChild(eachCategory);
    }

}

loadCategories();