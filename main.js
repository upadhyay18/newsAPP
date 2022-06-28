const altImgPath = "notFound.png";
//variables for slide-show-news
const slideBTN = document.getElementById('news-slide-feed')
// variables for menu
const generalBtn = document.getElementById("genral");
const businessBtn = document.getElementById("business");
const sportsBtn = document.getElementById("sport");
const entertainmentBtn = document.getElementById("entertainment");
const technologyBtn = document.getElementById("technology");

// variables for search query
const searchBtn = document.getElementById("searchBtn");
const newsQuery = document.getElementById("newsQuery");
const newsType = document.getElementById("newsType");
const newsdetails = document.getElementById("newsdetails");

// global data arrays
slideNews=[];
newsDataArr=[];

// fetch data from server
const fetchNews = async (route) => {
    let response = await fetch('http://localhost:3000' + route);
    data = await response.json();
    return data;
}

// function to listen request and call fetch data function
window.onload = async () => {
    slideNews = await fetchNews("/");
    newsDataArr = slideNews;
    displayNews();
    feedDataINSlide();
}

generalBtn.addEventListener("click",async function(){
    newsType.innerHTML="<h4>General news</h4>";
    newsDataArr=await fetchNews("/genral");
    displayNews();
});

businessBtn.addEventListener("click",async function(){
    newsType.innerHTML="<h4>Business</h4>";
    newsDataArr=await fetchNews("/business");
    displayNews();
});

sportsBtn.addEventListener("click",async function(){
    newsType.innerHTML="<h4>Sports</h4>";
    newsDataArr=await fetchNews("/sport");
    displayNews();
});

entertainmentBtn.addEventListener("click",async function(){
    newsType.innerHTML="<h4>Entertainment</h4>";
    newsDataArr=await fetchNews("/entertainment");
    displayNews();
});

technologyBtn.addEventListener("click",async function(){
    newsType.innerHTML="<h4>Technology</h4>";
    newsDataArr=await fetchNews("/technology");
    displayNews();
});

searchBtn.addEventListener("click",async function(){
    if(newsQuery.value == "")
        return;
    console.log(newsQuery.value);
    newsDataArr=await fetchNews("/"+encodeURIComponent(newsQuery.value)+"&apiKey=");
    displayNews();
});

const feedDataINSlide=()=>{
    slideBTN.innerHTML="";
    if(slideNews.length == 0) {
        slideNews.innerHTML = "<h5>No data found.</h5>"
        return;
    }
    let i=0;
    slideNews.forEach(news =>{
        // creating card object
        var card = document.createElement('div');
        card.className="carousel-item card lnshort-card";
        if(i == 0){
            card.className+=" active";
        }
        i++;

        // creating img card
        var cardImg=document.createElement('div');
        cardImg.className="card-img-body lnshort-card-img-body";
        var img=document.createElement('img');
        img.className="card-img";
        img.src=(news.urlToImage!=null)?news.urlToImage:"notFound.png";
        img.alt=altImgPath;
        cardImg.appendChild(img);

        // creatting Content card
        var cardBody=document.createElement('div');
        cardBody.className="card-body lnshort-card-body";
        var newsHeading=document.createElement('h4');
        newsHeading.className="card-title";
        newsHeading.innerHTML=news.title;
        var newsSource=document.createElement('h6');
        newsSource.innerHTML="By: "+(news.author!=null?news.author+" / ":"") +news.publishedAt;
        newsSource.className="text-primary";
        var cardText=document.createElement('p');
        cardText.innerHTML=news.description;
        cardText.className="card-text text-muted";
        cardBody.appendChild(newsHeading);
        cardBody.appendChild(newsSource);
        cardBody.appendChild(cardText);
        // creating read more link
        var link = document.createElement('a');
        link.className="btn btn-dark";
        link.setAttribute("target", "_blank");
        link.href = news.url;
        link.innerHTML="Read more";
        cardBody.appendChild(link);
        card.appendChild(cardImg);
        card.appendChild(cardBody);
        slideBTN.appendChild(card);
    });
}


function displayNews() {

    newsdetails.innerHTML = "";

    if(newsDataArr.length == 0) {
        newsdetails.innerHTML = "<h5>No data found.</h5>"
        return;
    }

    newsDataArr.forEach(news => {

        var date = news.publishedAt.split("T");

        var col = document.createElement('div');
        col.className="col-sm-12 col-md-4 col-lg-4 p-2 card";

        var card = document.createElement('div');
        card.className = "p-2";

        var image = document.createElement('img');
        image.setAttribute("height","matchparent");
        image.setAttribute("width","100%");
        image.src=(news.urlToImage!=null)?news.urlToImage:"notFound.png";

        var cardBody = document.createElement('div');

        var newsHeading = document.createElement('h5');
        newsHeading.className = "card-title";
        newsHeading.innerHTML = news.title;

        var newsSource=document.createElement('h6');
        newsSource.innerHTML="By: "+(news.author!=null?news.author+" / ":"") +news.publishedAt;
        newsSource.className="text-primary";

        var discription = document.createElement('p');
        discription.className="text-muted";
        discription.innerHTML = news.description;

        var link = document.createElement('a');
        link.className="btn btn-dark";
        link.setAttribute("target", "_blank");
        link.href = news.url;
        link.innerHTML="Read more";

        cardBody.appendChild(newsHeading);
        cardBody.appendChild(newsSource);
        cardBody.appendChild(discription);
        cardBody.appendChild(link);

        card.appendChild(image);
        card.appendChild(cardBody);

        col.appendChild(card);

        newsdetails.appendChild(col);
    });

}
