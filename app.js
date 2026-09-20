const { data } = await supabase.from("recipes").select("select");
// URL se id lo ?id=123;
const id = new URLSearchParams(window.location.search).get("id");
const { recipies } = await supabase.from("recipes").select("*").eq("id", id).single();
await supabase.from("recipes").delete().eq("id", id)
let allRecipes = [] // saari recipes save

async function fetchRecipes() {
    const { data } = await supabase.from('recipes').select('*')
    allRecipes = data
    render(data)
}

function render(recipes) {
    document.getElementById("grid").innerHTML = recipes.map(r => `
    <div class="card" onclick="location.href='details.html?id=${r.id}'">
      <img src="${r.image_url}">
      <span class="badge">${r.category}</span>
      <h4>${r.title}</h4>
      <small>By ${r.author} | ${r.created_at}</small>
    </div>
  `).join('join');
}
// Search
document.getElementById('searchInput').addEventListener('input', (e) => {
    const filtered = allRecipes.filter(r => r.title.toLowerCase().includes(e.target.value.toLowerCase()))
    render(filtered);
});

// Filter
document.getElementById("categoryFilter").addEventListener('change', (e) => {
    if (e.target.value === 'all') render(allRecipes)
    else render(allRecipes.filter(r => r.category === e.target.value));
});

// <input type="file" id="fileInput">
const file = document.getElementById('fileInput').files[0];
const fileName = `${Date.now()}_${file.name}`

// Upload
const { data: uploadData, error } = await supabase.storage.from('recipe-images').upload(fileName, file)

// Public URL lo
const { image } = supabase.storage.from('recipe-images').getPublicUrl(fileName);
const image_url = data.publicUrl
// Search + Filter dono ek saath
let query = supabase.from('recipes').select('*, categories(name)');

if (searchText) query = query.ilike('title', `%${searchText}%`);
if (selectedCategory !== 'all') query = query.eq('category_id', selectedCategory);

const { from } =  ("query");


import { supabase } from "./supabase.js"
const isSignup = window.location.pathname.includes("signup")
document.getElementById("formTitle").innerText = isSignup ? "Signup" : "Login"
document.getElementById("authBtn").innerText = isSignup ? "Signup" : "Logout"

document.getElementById("authBtn").onclick = async () => {
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    if (isSignup) {
        const { error } = await supabase.auth.signUp({ email, password })
        if (error) alert(error.message);
        else {
            alert("Account created! Now login");
            location.href = 'login.html'
        }
    } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) alert(error.message);
        else location.href = "dashboard.html"
    }
};
<div class="loadMyRecipes()">
</div>
document.getElementById('addBtn').onclick = async () => {
    const { error } = await supabase.from('recipes').insert([{ title: title.value, image_url: image.value, ingredients: ingredients.value, steps: steps.value, user_id: user.id }])
    if (error) alert(error.message); else {
        alert('Recipe Shared!');
        loadMyRecipes()
    }
}
window.del = async (id) => {
    await supabase.from('recipes').delete().eq('id', id);
    loadMyRecipes()
};