import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.https://kqnjwbboquhrzgdxonyw.supabase.co;
const supabaseKey = process.env.sb_publishable_afcx1cjGb_0MStRvbkq1yw_4Mu5o7_P;

export const supabase = createClient(supabaseUrl, supabaseKey);







function loginUser(event) {

    event.preventDefault();

    let email = document.getElementById("loginEmail").value;

    alert("Welcome! Login successful.");

    window.location.href = "dashboard.html";
}


function signupUser(event) {

    event.preventDefault();

    let password = document.getElementById("password").value;
    let confirmPassword =
        document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {

        alert("Passwords do not match!");

        return;
    }

    alert("Account created successfully!");

    window.location.href = "login.html";
}


function addRecipe(event) {

    event.preventDefault();

    alert("Recipe added successfully!");

    window.location.href = "my-recipes.html";
}


function deleteRecipe() {

    let answer = confirm(
        "Are you sure you want to delete this recipe?"
    );

    if (answer) {

        alert("Recipe deleted successfully!");

    }
}


function editRecipe() {

    alert("Edit recipe option selected.");

}


function searchRecipes() {

    let input =
        document.getElementById("search").value.toLowerCase();

    let cards =
        document.querySelectorAll(".recipe-card");

    cards.forEach(function(card) {

        let title =
            card.querySelector("h2").innerText.toLowerCase();

        if (title.includes(input)) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

}


function filterRecipes() {

    let category =
        document.getElementById("category").value;

    let cards =
        document.querySelectorAll(".recipe-card");

    cards.forEach(function(card) {

        let cardCategory =
            card.querySelector("p").innerText;

        if (
            category === "all" ||
            cardCategory === category
        ) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

}