const BASE_URL = 'http://localhost:3000';
const THINKERS_URL = `${BASE_URL}/thinkers`;
const CATEGORY_URL = `${BASE_URL}/categories`;
const IDEAS_URL = `${BASE_URL}/ideas`;
const body = document.querySelector('body');
const app = document.createElement('div');
const logo = document.querySelector('#logo');
const nav = document.querySelector('nav')
const thinkerCollection = document.createElement('div');
thinkerCollection.className = 'justify-content-center'
thinkerCollection.id = "thinker-collection"
const thinkersBtn = document.querySelector("#thinkers-btn");
const ideasBtn = document.querySelector("#ideas-btn");
const modal = document.querySelector("#myModal");
const modalContent = document.querySelector(".modal-content");
const btnsDiv = document.createElement('div');

createAppDiv();
displayThinkers();
displayIdeas();
Home.renderHome();
Home.renderInfo();

function createAppDiv() {
  app.setAttribute('id', 'app-div')
  body.appendChild(app)
}

function displayThinkers(){
  thinkersBtn.addEventListener("click", () => {
    app.innerHTML = "";
    btnsDiv.innerHTML = "";
    body.style.backgroundImage = "url(data:image/jpeg;base64,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)"
    initThinkers();
    Thinker.addThinkerBtn();
    Thinker.sortAndFilter();
  })
}

function displayIdeas(){
  ideasBtn.addEventListener("click", () => {
    app.innerHTML = "";
    body.style.backgroundImage = "url(data:image/jpeg;base64,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)"
    thinkerCollection.innerHTML = "";
    initIdeas();
    Idea.addIdeaBtn();
    Idea.randomIdeasBtn();
  })
}

const initThinkers = () => {
  ApiService.getAllThinkers()
  .then(thinkers => {
    thinkers.forEach( thinker => {
      new Thinker(thinker)
    })
  })
  .catch(error => alert(error))
}

function initIdeas(){
  ApiService.getAllIdeas()
  .then(ideas => {
    ideas.forEach( idea => {
      new Idea(idea)
    })
  })
  .catch(error => alert(error))
}

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
  modal.querySelector("form").remove()
  // modal.querySelector("edit-item-form").remove()
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    modal.querySelector("form").remove()
    // modal.querySelector("edit-item-form").remove()
  }
}