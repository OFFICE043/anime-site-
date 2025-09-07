hereimport { supabase } from "../supabase.js";

const params = new URLSearchParams(window.location.search);
const animeId = params.get("id");

const titleEl = document.getElementById("anime-title");
const rasmEl = document.getElementById("anime-rasm");
const tavsifEl = document.getElementById("anime-tavsif");
const janrEl = document.getElementById("anime-janr");
const jamiEl = document.getElementById("anime-jami");
const chiqqanEl = document.getElementById("anime-chiqqan");
const episodeButtonsEl = document.getElementById("episode-buttons");
const player = document.getElementById("player");
const downloadEl = document.getElementById("download");

// === Anime yuklash ===
async function loadAnime() {
  const { data, error } = await supabase
    .from("animes")
    .select("*")
    .eq("id", animeId)
    .single();

  if (error) {
    alert("Xatolik: " + error.message);
    return;
  }

  const anime = data;
  titleEl.textContent = anime.nomi;
  rasmEl.src = anime.rasm_url;
  tavsifEl.textContent = anime.tavsif;
  janrEl.textContent = anime.janr;
  jamiEl.textContent = anime.qismlar_soni;
  chiqqanEl.textContent = anime.chiqqan_qismlar;
  downloadEl.href = anime.yuklab_url;

  // Qismlar tugmalari
  episodeButtonsEl.innerHTML = "";
  if (anime.episodes && Array.isArray(anime.episodes)) {
    anime.episodes.forEach((url, index) => {
      const btn = document.createElement("button");
      btn.textContent = (index + 1) + "-qism";
      btn.addEventListener("click", () => {
        player.src = url;
        player.play();
      });
      episodeButtonsEl.appendChild(btn);
    });
  }
}

loadAnime();
