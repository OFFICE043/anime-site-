import { supabase } from "./supabase.js";

const listEl = document.getElementById("anime-list");

// 🎬 Anime ro‘yxatini yuklash
async function loadAnimes() {
  const { data, error } = await supabase.from("animes").select("*").order("id", { ascending: false });

  if (error) {
    listEl.innerHTML = "<p>Xatolik: " + error.message + "</p>";
    return;
  }

  if (!data || data.length === 0) {
    listEl.innerHTML = "<p>Hozircha anime qo‘shilmagan.</p>";
    return;
  }

  listEl.innerHTML = "";
  data.forEach(anime => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${anime.rasm_url}" alt="${anime.nomi}">
      <h3>${anime.nomi}</h3>
      <p>${anime.tavsif || ""}</p>
      <a href="./detail/detail.html?id=${anime.id}">▶️ Batafsil</a>
    `;
    listEl.appendChild(card);
  });
}

loadAnimes();
