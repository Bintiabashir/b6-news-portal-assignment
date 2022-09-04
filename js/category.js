const loadNewsName = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayNewsName(data.data.news_category);
    }
    catch (error) {
        console.log(error);
    }
}


const displayNewsName = newsNames => {
    const newsCategoriesName = document.getElementById('news-categories-name');
    newsNames.forEach(name => {
        const nameBtn = document.createElement('button');
        nameBtn.setAttribute('onclick', `loadCategoriesNews('${name.category_id}','${name.category_name}')`);



        nameBtn.innerText = name.category_name;
        newsCategoriesName.appendChild(nameBtn)
    });

}

const loadCategoriesNews = async (categoryId, categoryName) => {

    const spinner = document.getElementById('spinner');
    spinner.classList.remove('hidden');

    const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayCategoriesNews(data.data, categoryName);
    }
    catch (error) {
        console.log(error);
    }
}


const displayCategoriesNews = (categories, categoryName) => {


    const foundedData = document.getElementById('founded-data');
    foundedData.innerText = `${categories.length} items found for this category ${categoryName}`



    const newsCategoriesContainer = document.getElementById('news-categories-container');
    newsCategoriesContainer.textContent = '';

    categories.forEach(category => {
        const categoriesDiv = document.createElement('div');

        categoriesDiv.innerHTML = `<div class="card card-compact bg-base-100 shadow-xl m-7 h-full">
        <img src="${category.image_url}" class="h-2/5 w-full" />
        <div class="card-body">
            <h2 class="card-title">${category.title.length > 60 ? category.title.slice(0, 60) + '...' : category.title}</h2>
            <p>${category.details.length > 100 ? category.details.slice(0, 100) + '...' : category.details}</p>
            
            <div class="card-actions justify-between items-center">
            <div class='flex flex-col items-center'>
            <img src='${category.author.img}'class="w-10 rounded-full h-10 mr-2" alt="">
                <p> ${category.author.name == null ? category.author.name = 'no author found' : category.author.name}</p>
            </div>
            <div class='flex flex-col items-center'>
            <i class="fa-regular fa-eye"></i>
                <p> ${category.total_view == null | category.total_view == 0 ? category.total_view = 'no view' : category.total_view}</p>
            </div>
           
            <label for="my-modal-3" class="btn btn-primary" onclick="loadNewsDetails('${category._id}')">Show Details</label>
            </div>
        </div>
    </div>`
        newsCategoriesContainer.appendChild(categoriesDiv)
    });
    spinner.classList.add('hidden');
}

const loadNewsDetails = async id => {
    const url = ` https://openapi.programming-hero.com/api/news/${id}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayNewsDetails(data.data);
    }
    catch (error) {
        console.log(error);
    }
}

const displayNewsDetails = newsDetails => {
    const modalBody = document.getElementById('modal-body');
    newsDetails.forEach(news => {
        modalBody.textContent = '';
        modalBody.innerHTML = ` 
        <img src="${news.image_url}" alt="">
        <h3 class="text-lg font-bold">${news.title}</h3>
        <p class="py-4">${news.details}</p>
         <div class="card-actions justify-around items-center">
            <div class='flex flex-row items-center'>
            <img src='${news.author.img}'class="w-10 rounded-full h-10 mr-3" alt="">
                <p> ${news.author.name == null ? news.author.name = 'no author found' : news.author.name}</p>
            </div>
            <div class='flex flex-row items-center'>
            <i class="fa-regular fa-eye"></i>
                <p class="ml-3"> ${news.total_view == null | news.total_view == 0 ? news.total_view = 'no view' : news.total_view}</p>
            </div>
            </div>
        
        `;

    });

}

function displayBlog() {
    const modalBlogBody = document.getElementById('modal-blog-body');
    modalBlogBody.textContent = '';
    modalBlogBody.innerHTML = `<div tabindex="0"
        class="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
        <div class="collapse-title text-xl font-medium">
        why we use template string in javascript?
        </div>
        <div class="collapse-content">
            <p>Template strings are a powerful feature of modern JavaScript released in ES6. It lets us insert/interpolate variables and expressions into strings without needing to concatenate like in older versions of JavaScript. It allows us to create strings that are complex and contain dynamic elements.</p>
        </div>
    </div> 
    <div tabindex="0"
        class="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
        <div class="collapse-title text-xl font-medium">
        What is the difference between map,find Filter and forEach in JavaScript?

        </div>
        <div class="collapse-content">
            <p>The main difference between forEach and filter is that forEach just loop over the array and executes the callback but filter executes the callback and check its return value.Map like filter & foreach takes a callback and run it against every element on the array but whats makes it unique is it generate a new array based on your existing array. When we want to select a single element from an array ,we use find.</p>
        </div>
    </div>
    <div tabindex="0"
        class="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
        <div class="collapse-title text-xl font-medium">
        What is the difference between var,let and const in JavaScript?

        </div>
        <div class="collapse-content">
            <p>var and let can be updated and re-declared into the scope but cons cannot be updated or re-declared into the scope.The scope of a var variable is functional scope whereas The scope of a let and const variable is block scope.</p>
        </div>
    </div>`;

}




loadNewsName();
