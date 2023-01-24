
const newsUrl = "https://min-api.cryptocompare.com/data/v2/news/?lang=EN&apiKey=cb61428f173bd9dfe46ab55e0eed23fa04c30251eb044150e3e5731135e975fa";

const fetchUrl = async (url) => {
  let response = await fetch(url);
  let data = await response.json();
  if ((response.status !== 200) | !response.ok) {
    throw new Error();
  }
  console.log("Response: " + response.status);
  prepare(data);
};


fetchUrl(newsUrl).catch((err) => console.log("Error!", err.message));

const prepare = (data) => {
  for (let keys of Object.keys(data.Data)) {
    let key = data.Data[keys];
    let c = [
      key.id,
      key.imageurl,
      key.source_info.name,
      key.title,
      new Date(key.published_on * 1000).toLocaleDateString("en-US"),
      key.body.slice(0, 350) + "...",
      key.url,
      key.tags,
      key.categories,
    ];
    fillPage(c);
  }
};

const fillPage = (c) => {
  const app = document.querySelector("#app");
  let div = document.createElement("div");
 


  div.innerHTML = `
                  
  <div class="card-container">
  <div class="news-card">
  <div class="img-container" style ="background-image: url('${c[1]}');"></div>
  <div class="card-content">
  <h6>${c[4]}</h6>
  <h4>${c[3]}</h4>
  <p class="excerpt">${c[5]}</p>
  <div class="author-cta-container">
  <p class="author">${c[2]}</p>
   <div class="cta">
     <a class="read-more" href="${c[6]}">Read more &rarr;</a>
   </div>
</div>
  </div> 
  
  </div>
  </div>
  `;

  app.append(div);
};