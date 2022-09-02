
  const newsHunt = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url)
    const data = await res.json()
    showCategory(data.data.news_category)
  }

  const showCategory =(newses)=>{
    const newsCategory = document.getElementById('news_category')
    
    newses.forEach(news => {
      const div = document.createElement('div')
      div.classList.add('col','pb-3')
      div.innerHTML = `<a onclick="showNews(${news.category_id})">${news.category_name}</a>`
      newsCategory.appendChild(div)
    });
  }
const showNews = (category_id)=>{
  fetch(`https://openapi.programming-hero.com/api/news/category/0${category_id}`)
    .then(res =>res.json())
    .then(data => categoriesNews(data.data[0]))
  }
const categoriesNews = (newsId) => {
  const newsList = document.getElementById('news-list')
  newsList.innerHTML = ''
  const div = document.createElement('div')
  div.classList.add('card', 'mb-3')
  div.innerHTML = `<div class="row g-0">
            <div class="col-md-4">
              <img src="${newsId.image_url ? newsId.image_url :'No image found'}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">${newsId.title ? newsId.title : 'No Title Found'}</h5>
                <p class="card-text">${newsId.details ? newsId.details.slice(0,200)+'...' : 'No Details found'}</p>
                <div class="d-flex justify-content-between align-items-center">
                <div><image style="width: 50px;" class="img-fluid rounded-5"  src="${newsId.author ? newsId.author.img : 'No image found'}">
                <h5 class="d-inline-block">${newsId.author ? newsId.author.name : 'No name found'}</h5></div>
                <P>${newsId.rating.number ? newsId.rating.number : 'No rating'}M</P>
                </div>
              </div>
            </div>
          </div>`;
  newsList.appendChild(div)
}

try {
  newsHunt()
} catch (error) {
  console.error(error.message)
}

