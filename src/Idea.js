class Idea {

    constructor(idea){
      this.idea = idea
      this.card = this.createCard()
    }
  
    static addIdeaBtn() {
      const btnDiv = document.createElement('span')
      const addBtn = document.createElement('button')
      addBtn.className = 'btn'
      addBtn.id = 'add-idea-btn'
      addBtn.innerText = "Create a New Idea"
      btnDiv.appendChild(addBtn)
      btnsDiv.appendChild(btnDiv)
      app.appendChild(btnsDiv)
  
      IdeaForm.ideaModalHandler(addBtn)
    }
  
    static randomIdeasBtn() {
      const btnDiv = document.createElement('span')
      btnDiv.className = 'ml-3'
      btnDiv.style.display = 'inline-block'
      const addBtn = document.createElement('button')
      addBtn.className = 'btn'
      addBtn.id = 'random-idea-btn'
      addBtn.innerText = "Random Idea"
      btnDiv.appendChild(addBtn)
      btnsDiv.appendChild(btnDiv)
      app.appendChild(btnsDiv)
      addBtn.addEventListener("click", () => {
        ApiService.postIdea()
        .then(idea => {
          if(idea.errors){
            alert(idea.errors)
          } else {
          new Idea(idea)}})
          })
    }
  
    createCard(){
      const card = document.createElement('div')
      card.className = "card text-center "
      card.dataset.id = this.idea.id
      card.id = 'idea-card'
      this.cardContent(card)
      app.appendChild(card)
      return card
    }
  
    cardContent(card) {
      const {quote, likes} = this.idea
  
      const ideaQuote = document.createElement('h3')
      ideaQuote.className = 'h3 card-header'
      ideaQuote.id = 'idea-header'
      ideaQuote.innerText = quote
  
      const ideaLikes = document.createElement('h5')
      ideaLikes.className = 'h5 pt-2'
      ideaLikes.id = 'idea-likes'
      ideaLikes.innerText = `❤️ ${likes}`
      ideaLikes.addEventListener("click", () => {
        this.ideaLikesHandler(this.idea)
      })
  
      const ideaContainer = document.createElement('div')
  
      const imagesDiv = document.createElement('div')
      imagesDiv.className = 'images-div'
      ideaContainer.appendChild(imagesDiv)
  
      this.idea.thinkers.forEach(thinker => {
        const thinkerImgDiv = document.createElement('div')
        thinkerImgDiv.className = 'thinker-idea-div'
        thinkerImgDiv.innerHTML = `<img src=${thinker.image} class='thinker-idea-image' 
        alt='${thinker.name}: ${thinker.times_studied}'' data-toggle="popover" tabindex="50" 
        data-animation="true" data-html="true" data-trigger="focus" 
        title="Thinker Details" data-content="<p><b>Name:</b></p> <p>${thinker.name}</p> 
        <p><b>Times Studied:</b></p> <p>${thinker.times_studied}</p>"></img>`
        $(function () {
          $('[data-toggle="popover"]').popover()
        })
        imagesDiv.append(thinkerImgDiv)
      });
  
      const deleteBtn = document.createElement('p')
      deleteBtn.className ='btn btn-sm'
      deleteBtn.id = 'idea-delete-btn'
      deleteBtn.innerText = "x"
      this.ideaDeleteHandler(deleteBtn, card)
      ideaQuote.appendChild(deleteBtn)
  
      const cardFooterDiv = document.createElement('div')
      cardFooterDiv.className = 'card-footer'
  
      const editBtn =  document.createElement('button')
      editBtn.className = 'btn'
      editBtn.id = 'idea-edit-btn'
      editBtn.innerText = "Edit"
      cardFooterDiv.append(editBtn, ideaLikes)
      ideaContainer.appendChild(cardFooterDiv)
  
      const editIdeaForm = document.createElement('form')
      IdeaForm.ideaEditHandler(editBtn, editIdeaForm, name, likes, this.idea.thinkers)
      editIdeaForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const checks = Array.from(e.target.querySelectorAll(".checks"))
        const checkedThinkers = checks.filter( thinker => thinker.checked )
        let thinkerIdsArray = checkedThinkers.map( thinker => parseInt(thinker.id))
        const editedIdea = {
          name: e.target.quote.value,
          likes: e.target.likes.value,
          thinker_ids: thinkerIdsArray
        }
        this.updateIdeaHandler(editedIdea, card)
      })
      
      card.append(ideaQuote, ideaContainer)
    }
  
    ideaDeleteHandler(deleteBtn, card){
      deleteBtn.addEventListener("click", () => {
        ApiService.deleteIdea(this.idea.id)
          .then(obj => {
            if(obj.error){
              alert(obj.error)
            } else {
              card.remove()
            }
          })
          .catch(error => alert(error))
      })
    }
  
    updateIdeaHandler(editedIdea, card){
      ApiService.updateIdea(this.idea.id, editedIdea)
      .then(updatedIdea => {
        if (updatedIdea.errors){
          alert(updatedIdea.errors)
        } else {
          this.idea = updatedIdea
          card.innerHTML = ""
          this.cardContent(card)
          modal.style.display = "none"
          modal.querySelector("form").remove()
        }
      })
      .catch(error => alert(error))
    }
  
    ideaLikesHandler(idea){
      ApiService.increaseLikes(idea.id)
      .then(updateIdea => {
        this.idea = updateIdea
        this.card.innerHTML = ""
        this.cardContent(this.card)
      })
    }
  
  }