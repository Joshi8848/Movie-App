// const APIKEY = '04c35731a5ee918f014970082a0088b1'
const movieContainer = document.querySelector(".movie-container");
const form = document.querySelector("form");
const search = document.getElementById("movie-search");
const APIURL = `https://api.themoviedb.org/3/discover/movie?api_key=04c35731a5ee918f014970082a0088b1&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`;
// const APIURL =
//   "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const getMovie = async function (url) {
  try {
    const movie = await fetch(url);
    if (!movie.ok) throw Error("Connection to server couldnt be established");

    const data = await movie.json();

    setMovies(data);
  } catch (err) {
    console.error(err.message);
  }
};

getMovie(APIURL);

function setMovies(data) {
  const arr = data.results;
  movieContainer.innerHTML = "";

  arr.forEach((element) => {
    const html = ` 
   <div class="movie" >
    <div class="img-container" id="${element.id}"> 
      <img src="${IMGPATH + element.poster_path}" alt="Movie named ${
      element.title
    }" />
      <div class="overview-info" data-id="${element.id}">
      <h4>Summary</h4> </br>
      <p class="overview-text" >
        ${element.overview}</p>
      </div>
      </div>
      <div class="text-container">
        <h4 class="movie-name">${element.title}</h4>
        <span class="rating ${ratingColor(element.vote_average)}">${
      element.vote_average
    }</span>
      </div>
    </div>
    `;
    movieContainer.insertAdjacentHTML("beforeend", html);

    displayOverlay(element);
  });
}

function ratingColor(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

function displayOverlay(element) {
  const overview = document.querySelectorAll(".overview-info");
  const imgContainer = document.getElementById(`${element.id}`);

  imgContainer.addEventListener("mouseenter", function (e) {
    // if (!e.target.classList.contains("img-container")) return;
    console.log("not going");
    overview.forEach((ele) => {
      if (e.target.id === ele.dataset.id) {
        ele.classList.add("active");
      }
    });
  });

  imgContainer.addEventListener("mouseleave", function (e) {
    overview.forEach((ele) => {
      if (e.target.id === ele.dataset.id) {
        ele.classList.remove("active");
      }
    });
  });
}

// movieContainer.addEventListener('mouseout', function(e)) {
//   if (e.target.classList.contains)
// }

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = search.value;

  if (searchTerm) {
    search.value = "";
    search.focus();
    getMovie(SEARCHAPI + searchTerm);
  }
});

const arr = [1, 2, 3, 4];
console.log(arr.splice(-2, -1));
console.log(arr);
