const APIURL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const next = document.getElementById("next");
const prev = document.getElementById("previous");
let page = 1;
// initially get fav movies
getMovies(APIURL + page);
next.style.visibility = "hidden";
async function getMovies(url) {
  next.style.visibility = "visible";
  if (page === 1) {
    prev.style.visibility = "hidden";
  } else {
    prev.style.visibility = "visible";
  }
  const resp = await fetch(url);
  const respData = await resp.json();

  //console.log(respData);

  showMovies(respData.results);
}

function showMovies(movies) {
  // clear main
  main.innerHTML = "";

  movies.forEach((movie) => {
    const { poster_path, title, vote_average, overview } = movie;

    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");

    movieEl.innerHTML = `
            <img
                src="${IMGPATH + poster_path}"
                alt="${title}"
            />
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(
                  vote_average
                )}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview:</h3>
                ${overview}
            </div>
            
        `;

    main.appendChild(movieEl);
  });
}

function getClassByRate(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm) {
    getMovies(SEARCHAPI + searchTerm);

    search.value = "";
  }
});
search.oninput = handleType;
function handleType(e) {
  console.log("clicl");
  const searchTerm = search.value;
  if (searchTerm == "") {
    getMovies(APIURL);
  }
  if (searchTerm) {
    getMovies(SEARCHAPI + searchTerm);
  }
}
next.addEventListener("click", nextPage);
function nextPage() {
  page += 1;
  console.log(page);
  getMovies(APIURL + page);
}
prev.addEventListener("click", prevPage);
function prevPage() {
  page -= 1;
  getMovies(APIURL + page);
}
