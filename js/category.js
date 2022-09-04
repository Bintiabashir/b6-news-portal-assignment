const loadNewsName = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`
    const res = await fetch(url);
    const data = await res.json();
    displayNewsName(data.data.news_category);
}


const displayNewsName = newsNames => {
    const newsCategoriesName = document.getElementById('news-categories-name');
    newsNames.forEach(name => {
        const nameBtn = document.createElement('button');
        nameBtn.setAttribute('onclick', `loadCategoriesNews('${name.category_id}','${name.category_name}')`);
        nameBtn.innerText = `${name.category_name}`
        newsCategoriesName.appendChild(nameBtn)
    });

}

const loadCategoriesNews = async (categoryId, categoryName) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`
    const res = await fetch(url);
    const data = await res.json();
    displayCategoriesNews(data.data, categoryName);
}


const displayCategoriesNews = (categories, categoryName) => {


    const foundedData = document.getElementById('founded-data');
    foundedData.innerText = `${categories.length} items found for this category ${categoryName}`



    const newsCategoriesContainer = document.getElementById('news-categories-container');
    newsCategoriesContainer.textContent = '';
    categories.forEach(category => {
        const categoriesDiv = document.createElement('div');
        categoriesDiv.innerHTML = `<div class="card card-compact bg-base-100 shadow-xl m-7">
        <img src="${category.image_url}" />
        <div class="card-body">
            <h2 class="card-title">${category.title}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-end">
                <button class="btn btn-primary">Buy Now</button>
            </div>
        </div>
    </div>`
        newsCategoriesContainer.appendChild(categoriesDiv)
    });

}







loadNewsName();
