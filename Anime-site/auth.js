import { supabase } from "./supabase.js";

// Ro'yxatdan o'tish
document.querySelector("#register-box form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = e.target.querySelector("input[type=text]").value;
  const password = e.target.querySelector("#parol1").value;

  const { data, error } = await supabase.auth.signUp({
    email: username + "@example.com", // supabase email talab qiladi
    password: password,
  });

  if (error) {
    alert("Xatolik: " + error.message);
  } else {
    alert("Muvaffaqiyatli ro'yxatdan o'tdingiz!");
  }
});

// Kirish
document.querySelector("#login-box form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = e.target.querySelector("input[type=text]").value;
  const password = e.target.querySelector("#parol2").value;

  const { data, error } = await supabase.auth.signInWithPassword({
    email: username + "@example.com",
    password: password,
  });

  if (error) {
    alert("Xatolik: " + error.message);
  } else {
    alert("Kirish muvaffaqiyatli!");
  }
});
