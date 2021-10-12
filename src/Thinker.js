class Thinker {

  constructor(thinker){
    this.thinker = thinker
    this.card = this.createCard()
  }

  

  static addThinkerBtn() {
    const addBtn = document.createElement('button')
    addBtn.className = 'btn'
    addBtn.id = "thinker-add-btn"
    addBtn.innerText = "Add a New  Thinker"
    app.appendChild(addBtn)

    ThinkerForm.thinkerModalHandler(addBtn)
  }

  createCard(){
    const card = document.createElement('div')
    card.className = "card text-center"
    card.dataset.id = this.thinker.id
    this.cardElements(card)
    thinkerCollection.appendChild(card)
    app.appendChild(thinkerCollection)
    return card
  }

  cardElements(card) {
    const {name, image, personality, times_studied} = this.thinker
   
    const thinkerCategory = document.createElement('h4')
    thinkerCategory.className = 'h4 card-header'
    thinkerCategory.id = 'card-header'
    thinkerCategory.innerText = `${name} - ${this.thinker.category.name} `
    
    const thinkerImg = document.createElement('img')
    thinkerImg.className = 'card-img float-right'
    thinkerImg.src = image
    thinkerImg.alt = `${name}: ${name}`
   
    const infoDiv = document.createElement('div')
    infoDiv.id = 'info-div'
    
    const thinkerPersonality = document.createElement('p')
    thinkerPersonality.id ='personality'
    thinkerPersonality.innerText = `${personality} `
    
    const thinkerTimesStudied = document.createElement('p')
    thinkerTimesStudied.id = 'times-Studied'
    thinkerTimesStudied.innerText = `Studied ${times_studied} times. `
    thinkerTimesStudied.addEventListener("click", () => {
      ApiService.increaseTimesStudied(this.thinker.id)
        .then(updatedThinker => {
          this.thinker = updatedThinker
          card.innerHTML = ""
          this.cardElements(card)
        })
        .catch(error => alert(error))
    })

    const editBtn = document.createElement('p')
    editBtn.className = 'btn'
    editBtn.id = 'edit-btn'
    editBtn.innerText = `Edit`
    const editThinkerForm = document.createElement('form')
    ThinkerForm.ThinkerEditHandler(editBtn, editThinkerForm, name, image, personality, times_studied, this.thinker.category.name)
    editThinkerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const editedThinker = {
        name: e.target.name.value,
        image: e.target.image.value,
        personality: e.target.personality.value,
        times_studied: e.target.times_studied.value,
        category_name: e.target.category.value
      }
      this.updateThinkerHandler(editedThinker, card)
    })

    const deleteBtn = document.createElement('p')
    deleteBtn.className = 'btn btn-sm'
    deleteBtn.id = 'delete-btn'
    deleteBtn.innerText = "x"
    this.thinkerDeleteHandler(deleteBtn, card)

    infoDiv.append( personality,thinkerTimesStudied, editBtn)
    thinkerCategory.appendChild(deleteBtn)
    card.append(thinkerCategory, infoDiv, thinkerImg)
  }

  thinkerDeleteHandler(deleteBtn, card) {
    deleteBtn.addEventListener("click", () => {
      ApiService.deleteThinker(this.thinker.id)
        .then(() => card.remove())
        .catch(error => alert(error))
    })
  }

  updateThinkerHandler(editedThinker, card){
    ApiService.updateThinker(this.thinker.id, editedThinker)
    .then(updatedThinker => {
      if (updatedThinker.errors){
        alert(updatedThinker.errors)
      } else {
        this.thinker = updatedThinker
        card.innerHTML = ""
        this.cardElements(card)
        modal.style.display = "none"
        modal.querySelector("form").remove()
      }
    })
    .catch(error => alert(error))
  }



}