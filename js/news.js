
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
      div.classList.add('d-inline-block','pb-3','pe-4')
      div.innerHTML = `<a class="btn btn-light" onclick="showNews(${news.category_id})">${news.category_name}</a>`;
      newsCategory.appendChild(div)
    });
  }
const showNews = (category_id )=>{
  toggleLoading(true)
    fetch(`https://openapi.programming-hero.com/api/news/category/0${category_id}`)
    .then(res =>res.json())
    .then(data => categoriesNews(data.data))
  }
const categoriesNews = (newsId) => {
  const sortedResponse = newsId.sort((a, b) => b.total_view - a.total_view);
  const newsList = document.getElementById('news-list')
  newsList.innerHTML = ''
  const newsNumber = document.getElementById('news-number')
  newsNumber.value = ''
  newsNumber.value=`${newsId.length} news found `
  if(newsId.length!==0){
    sortedResponse.forEach(news => {
      const div = document.createElement('div')
      div.classList.add('card', 'mb-3')
      div.innerHTML = `<div  class="row g-0 py-2">
            <div class="col-md-4">
              <img src="${news.image_url ? news.image_url : 'No image found'}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">${news.title ? news.title : 'No Title Found'}</h5>
                <p class="card-text">${news.details ? news.details.slice(0, 200) + '...' : 'No Details found'}</p>
                <div class="d-flex justify-content-between align-items-center">
                <div><image style="width: 50px;" class="img-fluid rounded-5"  src="${news.author.img ? news.author.img : 'No image found'}">
                <h5 class="d-inline-block">${news.author.name ? news.author.name : 'No name found'}</h5></div>
                <P>${news.rating.number ? news.rating.number+'M' : 'No rating'}</P>
                <P>${news.total_view ? news.total_view+'K' : 'No watch'}</P>
                </div>
                </div>
                <button onclick="showDetailsNews('${news._id}')" type="button" class="btn btn-primary mt-2 ms-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Show Details
        </button>
              </div>
            </div>
          </div>`;
      newsList.appendChild(div)


      toggleLoading(false)
    });
  }
  else{
    alert('No news Found')
  }
  
  
}
const showDetailsNews = (news_id) => {
  fetch(` https://openapi.programming-hero.com/api/news/${news_id}`)
    .then(res => res.json())
    .then(data => modalNews(data.data[0]))
}
const modalNews = (news_id) => {
    const modalTitle = document.getElementById('exampleModalLabel');
    modalTitle.innerText = `${news_id.title}`
    const modalDetails = document.getElementById('modal-details')
    modalDetails.innerHTML = `
    <img src="${news_id.image_url ? news_id.image_url : 'No image found'}" class="img-fluid rounded-start" alt="...">
    <p class="card-text">${news_id.details ? news_id.details : 'No Details found'}</p>
    <div class="d-flex justify-content-between align-items-center">
    <div><image style="width: 50px;" class="img-fluid rounded-5"  src="${news_id.author.img ? news_id.author.img : 'No image found'}">
    <h5 class="d-inline-block">${news_id.author.name ? news_id.author.name : 'No name found'}</h5></div>
    <P>${news_id.rating.number ? news_id.rating.number +'M' : 'No rating'}</P>
    <P>${news_id.total_view ? news_id.total_view + 'K' : 'No views'}</P>

    </div>
  `
}

// loading
const toggleLoading = isLoading => {
  const loader = document.getElementById('loader')
  if (isLoading === true) {
    loader.classList.remove('d-none')
  }
  else {
    loader.classList.add('d-none')
  }
}

try {
  newsHunt()
} catch (error) {
  console.error(error.message)
}

