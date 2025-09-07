import { supabase } from "../supabase.js";

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

// ➕ Anime saqlash
document.getElementById("animeForm").addEventListener("submit", async (e) => {
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

  const { error } = await supabase.from("animes").insert([
    { nomi, tavsif, janr, qismlar_soni, chiqqan_qismlar, rasm_url, episodes, yuklab_url }
  ]);

  if (error) {
    alert("Xatolik: " + error.message);
  } else {
    alert("✅ Saqlandi!");
    e.target.reset();
    episodesDiv.innerHTML = "";
  }
});
