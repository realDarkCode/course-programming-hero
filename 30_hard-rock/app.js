window.onload = main;
async function main() {
  // References
  const searchButton = document.getElementById("search-button");
  const songListBody = document.getElementById("song-list");
  handleSearch(null, "hello");
  searchButton.addEventListener("click", handleSearch);
  songListBody.addEventListener("click", handleGetLyric);
}

function handleSearch(_, query) {
  const queryText = query || document.getElementById("search-input").value;
  document.getElementById("lyric").innerText = null;
  document.getElementById("song-list").innerText = "Searching...";
  fetch(`https://api.lyrics.ovh/suggest/${queryText}`)
    .then((result) => result.json())
    .then((response) => {
      const { data } = response;
      generateSongList(data);
    })
    .catch((error) => {
      console.log(error);
      alert("Error Occurred");
    });
}
async function handleGetLyric(event) {
  const element = event.target;
  if (!element.getAttribute("data-component") === "get-lyric") return;
  const lyricElement = document.getElementById("lyric");
  const artist = element.getAttribute("data-author");
  const songName = element.getAttribute("data-name");
  getLyric(artist, songName, lyricElement);
}
function generateSongList(list, maximum = 5) {
  const songListContainer = document.getElementById("song-list");
  songListContainer.innerText = null;
  if (list.length == 0) {
    songListContainer.innerText = "Couldn't find any song with this name";
  }
  for (const song of list.slice(0, maximum)) {
    const songElement = document.createElement("div");
    songElement.className = "single-result row align-items-center my-3 p-3";
    songElement.innerHTML = `
    <div class="col-md-9 d-flex justify-content-sm-between">
              <img
                src=${song?.album.cover_small}
                class="img-fluid"
                alt="Responsive image"
              />
              <h3 class="lyrics-name ">${song.title_short} </h3>
              <p class="author lead">${song.artist.name}</span></p>
            </div>
            <div class="col-md-3 text-md-right text-center">
              <button class="btn btn-success" data-component = "get-lyric" data-name = ${song.title.replace(
                " ",
                "%20"
              )} data-author = ${song.artist.name.replace(" ", "%20")}>Get Lyrics</button>
            </div>`;
    songListContainer.appendChild(songElement);
  }
}
function getLyric(artist, songName, element) {
  if (!artist || !songName) return;
  if (element) element.innerText = "Fetching Lyric";
  fetch(`https://api.lyrics.ovh/v1/${artist}/${songName}`)
    .then((response) => response.json())
    .then((data) => {
      const { lyrics, error } = data;
      if (!lyrics) {
        if (element) element.innerHTML = error;
        return error;
      }
      if (element) element.innerHTML = lyrics;
      return lyrics;
    })
    .catch((error) => {
      console.log(error);
      alert("Error occurred");
    });
}
