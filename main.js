hereimport { supabase } from "./supabase.js";

// Adminlar ro‘yxati
const ADMINS = [7483732504]; 

const tg = window.Telegram?.WebApp;
let userId = null;
if (tg?.initDataUnsafe?.user?.id) {
  userId = tg.initDataUnsafe.user.id;
}

// Admin tugmasini ko‘rsatish
if (ADMINS.includes(userId)) {
  document.getElementById("add-btn").classList.remove("hidden");
  document.getElementById("add-btn").onclick = () => {
    location.href = "./add/add.html";
  };
}

// Anime ro‘yxatini yuklash
async function loadAnimes() {
  const { data, error } = await supabase.from("animes").select("*").order("created_at", { ascending: false });

  if (error) {
    console.error("Xato:", error.message);
    return;
  }

  const list = document.getElementById("anime-list");
  list.innerHTML = "";

  data.forEach(anime => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <img src="${anime.rasm_url}" alt="rasm">
      <h3>${anime.nomi}</h3>
    `;
    div.onclick = () => {
      location.href = `./detail/detail.html?id=${anime.id}`;
    };
    list.appendChild(div);
  });
}

loadAnimes();
