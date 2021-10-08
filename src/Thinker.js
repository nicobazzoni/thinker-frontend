class Thinker {

    constructor(thinker){
      this.thinker = thinker
      this.card = this.createCard()
    }
  
    static sortAndFilter(){
      const sortForm = document.createElement('form')
      sortForm.id = 'sort-form'
      sortForm.className = 'form-inline'
      sortForm.innerHTML = ` 
      <div class="form-group">
      <label class="ml-2 mr-1"for="sort">Sort By:</label>
      <select class='form-control' name="sort" id="sort">
        <option value="alphabetical">Alphabetical</option>
        <option value="times_studied">Times Studied</option>
        
      </select>
      <label class="ml-2 mr-1"for="filter">Filter By:</label>
      <select class='form-control' name="filter" id="filter">
        <option value="all">All</option>
        <option value="1">Positive</option>
        <option value="2">negative</option>
        <option value="3">Neutral</option>
      
      </select>
      <label class="ml-2 mr-1"for="filter">Search by Name:</label>
      <input class="form-control" name="query">
      </div>
      <button class="btn ml-3">Submit</button>
      `
    app.appendChild(sortForm)
      sortForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this.handleSort(e);
      })
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
      this.cardContent(card)
      thinkerCollection.appendChild(card)
      app.appendChild(thinkerCollection)
      return card
    }
  
    cardContent(card) {
      const {name, image,  times_studied} = this.thinker
     
      const thinkerCategory = document.createElement('h4')
      thinkerCategory.className = 'h4 card-header'
      thinkerCategory.id = 'card-header'
      thinkerCategory.innerText = `${this.thinker.category.name} - ${name}`
      
      const thinkerImg = document.createElement('img')
      thinkerImg.className = 'card-img float-right'
      thinkerImg.src = image
      thinkerImg.alt = `${name}: ${name}`
     
      const infoDiv = document.createElement('div')
      infoDiv.id = 'info-div'
    
      
    
      const thinkerTimesStudied = document.createElement('p')
      thinkerTimesStudied.id = 'times-Studied'
      thinkerTimesStudied.innerText = `Studied ${times_studied} times. +`
      thinkerTimesStudied.addEventListener("click", () => {
        ApiService.increaseTimesStudied(this.thinker.id)
          .then(updatedThinker => {
            this.thinker = updatedThinker
            card.innerHTML = ""
            this.cardContent(card)
          })
          .catch(error => alert(error))
      })
  
      const editBtn = document.createElement('p')
      editBtn.className = 'btn'
      editBtn.id = 'edit-btn'
      editBtn.innerText = `Edit`
      const editThinkerForm = document.createElement('form')
      ThinkerForm.ThinkerEditHandler(editBtn, editThinkerForm, name, image,   times_studied, this.thinker.category.name)
      editThinkerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const editedThinker = {
          name: e.target.name.value,
          image: e.target.image.value,
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
  
      infoDiv.append( thinkerTimesStudied, editBtn)
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
          this.cardContent(card)
          modal.style.display = "none"
          modal.querySelector("form").remove()
        }
      })
      .catch(error => alert(error))
    }
  
    static handleSort = (e) => {
      this.sort = e.target.sort.value
      this.filter = e.target.filter.value
      this.search = e.target.query.value
      ApiService.sortThinkers(this.sort, this.filter, this.search)
      .then(thinkers => {
        if(thinkers.length < 1){
          alert("No thinkers found by that name")
        } else {
          thinkerCollection.innerHTML = ""
          thinkers.forEach( thinker => {
            new Thinker(thinker)
          })
      }
      })
      .catch(error => alert(error))
    }
  
  }