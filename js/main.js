let rowData = document.getElementById("rowData");
let searchContainer = document.getElementById("searchContainer");
closeNav();
$(document).ready(() => {
  searchByName("").then(() => {
    $(".loading-screen").fadeOut(300);
    $("body").css("overflow", "visible");
  });
});
function openNav() {
  $(".side-nav").animate({ left: 0 }, 500);

  $(".manue-i").addClass("fa-xmark");
  $(".manue-i").removeClass("fa-bars");
  $(".ul-nav li ").eq(0).animate({ top: 0 }, 500);
  $(".ul-nav li ").eq(1).animate({ top: 0 }, 600);
  $(".ul-nav li ").eq(2).animate({ top: 0 }, 700);
  $(".ul-nav li ").eq(3).animate({ top: 0 }, 800);
  $(".ul-nav li ").eq(4).animate({ top: 0 }, 900);
}
function closeNav() {
  let navWidth = $(".rightSide").outerWidth();

  $(".side-nav").animate({ left: -navWidth }, 500);
  $(".manue-i").removeClass("fa-xmark");
  $(".manue-i").addClass("fa-bars");
  $(".ul-nav li ").animate({ top: 500 }, 500);
}
$(".manue-i").click(() => {
  if ($(".side-nav").css("left") == "0px") {
    closeNav();
  } else {
    openNav();
  }
});

async function searchByName(name) {
  rowData.innerHTML = "";
  $(".loading-screen").fadeIn(300);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`
  );

  let data = await response.json();
  displayData(data.meals);
  $(".loading-screen").fadeOut(300);
}

function displayData(data) {
  let cartona = "";
  for (let i = 0; i < data.length; i++) {
    cartona += `
        <div class="col-md-4">
          <div  onclick="getMealDetails('${data[i].idMeal}')" class="meal position-relative overflow-hidden w-100 rounded-3">
            <img
              src="${data[i].strMealThumb}"
              alt=""
              class="w-100 rounded-3  cursor-pointer"
            />
            <div class="meal-layer position-absolute d-flex align-items-center ps-1 rounded-3  cursor-pointer">
              <h3>${data[i].strMeal}</h3>
            </div>
          </div>
        </div>
      `;
  }
  rowData.innerHTML = cartona;
}
//category sec
searchByName("");
$("#categ").click(function () {
  getCategories();
});
async function getCategories() {
  rowData.innerHTML = "";
  $(".loading-screen").fadeIn(300);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  response = await response.json();
  displayCateg(response.categories);
  $(".loading-screen").fadeOut(300);
}
function displayCateg(categ) {
  let cartona = "";
  for (let i = 0; i < categ.length; i++) {
    cartona += `
            <div class="col-md-4">
              <div  onclick="getCategoryMeals('${
                categ[i].strCategory
              }')" class="meal position-relative overflow-hidden w-100 rounded-3  ">
                <img
                  src="${categ[i].strCategoryThumb}"
                  alt=""
                  class="w-100 rounded-3  cursor-pointer"
                />
                <div class="meal-layer position-absolute text-center ps-1 rounded-3  cursor-pointer ">
                  <h3>${categ[i].strCategory}</h3>
                  <p >${categ[i].strCategoryDescription
                    .split(" ")
                    .slice(0, 20)
                    .join(" ")}</p>
                </div>
              </div>
            </div>
          `;
  }
  rowData.innerHTML = cartona;
}
async function getCategoryMeals(category) {
  rowData.innerHTML = "";
  $(".loading-screen").fadeIn(300);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );
  response = await response.json();

  displayData(response.meals.slice(0, 20));
  $(".loading-screen").fadeOut(300);
}
//aria section
$("#area").click(function () {
  getArea();
});
async function getArea() {
  rowData.innerHTML = "";
  $(".loading-screen").fadeIn(300);
  let respone = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  respone = await respone.json();
  console.log(respone.meals);

  displayArea(respone.meals);
  $(".loading-screen").fadeOut(300);
}

function displayArea(aria) {
  let cartoona = "";

  for (let i = 0; i < aria.length; i++) {
    cartoona += `
        <div class="col-md-3">
                <div onclick="getAreaMeals('${aria[i].strArea}')" class="rounded-2 text-center cursor-pointer text-white">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${aria[i].strArea}</h3>
                </div>
        </div>
        `;
  }

  rowData.innerHTML = cartoona;
}
async function getAreaMeals(area) {
  rowData.innerHTML = "";
  $(".loading-screen").fadeIn(300);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
  response = await response.json();

  displayData(response.meals.slice(0, 20));
  $(".loading-screen").fadeOut(300);
}
//ingredients sectin
$("#ing").click(function () {
  getIngredients();
});
async function getIngredients() {
  rowData.innerHTML = "";
  $(".loading-screen").fadeIn(300);
  let respone = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  respone = await respone.json();
  console.log(respone.meals);

  displayIngredients(respone.meals.slice(0, 20));
  $(".loading-screen").fadeOut(300);
}
function displayIngredients(ing) {
  let cartoona = "";

  for (let i = 0; i < ing.length; i++) {
    cartoona += `
        <div class="col-md-3">
                <div onclick="getIngredientsMeals('${
                  ing[i].strIngredient
                }')" class="rounded-2 text-center cursor-pointer text-white">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${ing[i].strIngredient}</h3>
                        <p>${ing[i].strDescription
                          .split(" ")
                          .slice(0, 20)
                          .join(" ")}</p>
                </div>
        </div>
        `;
  }

  rowData.innerHTML = cartoona;
}

async function getIngredientsMeals(ingredients) {
  rowData.innerHTML = "";
  $(".loading-screen").fadeIn(300);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`
  );
  response = await response.json();
  displayData(response.meals.slice(0, 20));
  $(".loading-screen").fadeOut(300);
}
async function getMealDetails(mealID) {
  let respone = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`
  );
  respone = await respone.json();
  displayMealInfo(respone.meals[0]);
  $(".loading-screen").fadeOut(300);
}

function displayMealInfo(meal) {
  let ingredients = ``;

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients += `<li class="alert alert-info m-2 p-1">${
        meal[`strMeasure${i}`]
      } ${meal[`strIngredient${i}`]}</li>`;
    }
  }

  let tags = meal.strTags?.split(",");
  if (!tags) tags = [];

  let tag = "";
  for (let i = 0; i < tags.length; i++) {
    tag += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`;
  }

  let cartoona = `
    <div class="col-md-4">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                    alt="">
                    <h2 class="text-white">${meal.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2 class="text-white">Instructions</h2>
                <p class="text-white">${meal.strInstructions}</p>
                <h3 class="text-white"><span class="fw-bolder text-white">Area : </span>${meal.strArea}</h3>
                <h3 class="text-white"><span class="fw-bolder text-white">Category : </span>${meal.strCategory}</h3>
                <h3 class="text-white">Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
                </ul>

                <h3 class="text-white"> Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tag}
                </ul>

                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`;

  rowData.innerHTML = cartoona;
}
//seacrch section 
function SearchInputs() {
  searchContainer.innerHTML = `
    <div class="row py-4 ">
        <div class="col-md-6 ">
            <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input onkeyup="searchByFLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
        </div>
    </div>`;

  rowData.innerHTML = "";
}

async function searchByName(input) {
  closeNav();
  rowData.innerHTML = "";
  $(".loading-screen").fadeIn(300);

  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`
  );
  response = await response.json();

  response.meals ? displayData(response.meals) : displayData([]);
  $(".loading-screen").fadeOut(300);
}

async function searchByFLetter(input) {
  closeNav();
  rowData.innerHTML = "";
  $(".loading-screen").fadeIn(300);

  input == "" ? (input = "a") : "";
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${input}`
  );
  response = await response.json();

  response.meals ? displayData(response.meals) : displayData([]);
  $(".loading-screen").fadeOut(300);
}
//contact section
function contact() {
    rowData.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> `;
 submitBtn = document.getElementById("submitBtn")


    document.getElementById("nameInput").addEventListener("focus", () => {
        nameInputok = true
    })

    document.getElementById("emailInput").addEventListener("focus", () => {
        emailInputok = true
    })

    document.getElementById("phoneInput").addEventListener("focus", () => {
        phoneInputok = true
    })

    document.getElementById("ageInput").addEventListener("focus", () => {
        ageInputok = true
    })

    document.getElementById("passwordInput").addEventListener("focus", () => {
        passwordInputok = true
    })

    document.getElementById("repasswordInput").addEventListener("focus", () => {
        repasswordInputok = true
    })
}

let nameInputok = false;
let emailInputok = false;
let phoneInputok = false;
let ageInputok = false;
let passwordInputok = false;
let repasswordInputok = false;




function inputsValidation() {
    if (nameInputok) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")

        }
    }
    if (emailInputok) {

        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (phoneInputok) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (ageInputok) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")

        }
    }

    if (passwordInputok) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (repasswordInputok) {
        if (repasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

        }
    }


    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passwordValidation() &&
        repasswordValidation()) {
        submitBtn.removeAttribute("disabled")
    } else {
        submitBtn.setAttribute("disabled", true)
    }
}

function nameValidation() {
    return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value))
}

function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value))
}

function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value))
}

function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value))
}

function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passwordInput").value))
}

function repasswordValidation() {
    return document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
}