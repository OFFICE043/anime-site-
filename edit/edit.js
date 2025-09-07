hereimport { supabase } from "../supabase.js";

const params = new URLSearchParams(window.location.search);
const animeId = params.get("id");

const form = document.getElementById("editForm");
const episodesDiv = document.getElementById("episodes");
const addEpisodeBtn = document.getElementById("add-episode");

// ➕ Qism qo‘shish
addEpisodeBtn.addEventListener("click", () => {
  const row = document.createElement("div");
  row.className = "episode-row";
  row.innerHTML = `
    <input type="url" placeholder="Qism URL" required>
    <button type="button">➖</button>
  `;
  row.querySelector("button").addEventListener("click", () => row.remove());
  episodesDiv.appendChild(row);
});

// 🎬 Anime ma’lumotlarini yuklash
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

  document.getElementById("nomi").value = data.nomi;
  document.getElementById("tavsif").value = data.tavsif;
  document.getElementById("janr").value = data.janr || "";
  document.getElementById("qismlar_soni").value = data.qismlar_soni;
  document.getElementById("chiqqan_qismlar").value = data.chiqqan_qismlar;
  document.getElementById("rasm_url").value = data.rasm_url;
  document.getElementById("yuklab_url").value = data.yuklab_url || "";

  // Epizodlar
  if (data.episodes && Array.isArray(data.episodes)) {
    data.episodes.forEach(url => {
      const row = document.createElement("div");
      row.className = "episode-row";
      row.innerHTML = `
        <input type="url" value="${url}" required>
        <button type="button">➖</button>
      `;
      row.querySelector("button").addEventListener("click", () => row.remove());
      episodesDiv.appendChild(row);
    });
  }
}

// 💾 Yangilash
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nomi = document.getElementById("nomi").value.trim();
  const tavsif = document.getElementById("tavsif").value.trim();
  const janr = document.getElementById("janr").value.trim();
  const qismlar_soni = parseInt(document.getElementById("qismlar_soni").value);
  const chiqqan_qismlar = parseInt(document.getElementById("chiqqan_qismlar").value);
  const rasm_url = document.getElementById("rasm_url").value.trim();
  const yuklab_url = document.getElementById("yuklab_url").value.trim();

  const episodes = Array.from(document.querySelectorAll(".episode-row input"))
    .map(input => input.value.trim())
    .filter(url => url.length > 0);

  const { error } = await supabase
    .from("animes")
    .update({ nomi, tavsif, janr, qismlar_soni, chiqqan_qismlar, rasm_url, episodes, yuklab_url })
    .eq("id", animeId);

  if (error) {
    alert("Xatolik: " + error.message);
  } else {
    alert("✅ Yangilandi!");
    window.location.href = "../index.html";
  }
});

// Boshlash
loadAnime();
