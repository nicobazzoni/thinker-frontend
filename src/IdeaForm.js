class IdeaForm {

    static ideaModalHandler(addBtn){
      addBtn.addEventListener("click", () => {
        IdeaForm.createIdeaForm()
      })
    }
  
    static createIdeaForm(){
      modal.style.display = "block"
      const ideaForm = document.createElement('form')
      modalContent.innerHTML = ""
      modalContent.append(ideaForm)
      IdeaForm.renderFormContent(ideaForm)
      ideaForm.addEventListener('submit', IdeaForm.handleFormSubmit)
    }
  
    static handleFormSubmit(e) {
      e.preventDefault()
      const checks = Array.from(e.target.querySelectorAll(".checks"))
      const checkedThinkers = checks.filter( thinker => thinker.checked )
      let thinkerIdsArray = checkedThinkers.map( thinker => parseInt(thinker.id))
     
      const newIdea = {
        quote: e.target.quote.value,
        likes: e.target.likes.value,
        thinker_ids: thinkerIdsArray
      }
      
      ApiService.postIdea(newIdea)
      .then(idea => {
        if(idea.errors){
          alert(idea.errors)
        } else {
        new Idea(idea)
        e.target.reset();
        modal.querySelector("form").remove()
        modal.style.display = "none"
        }
      })
      .catch(error => alert(error))
    }
  
    static ideaEditHandler(editBtn, editIdeaForm, quote, likes, thinkers){
      editBtn.addEventListener("click", () => {
        modal.style.display = "block"
        modalContent.append(editIdeaForm)
        IdeaForm.renderFormContent(editIdeaForm, quote, likes, thinkers)
      })
    }
  
    static renderFormContent(editIdeaForm, quote, likes, selectedThinkers, ideaForm){
      const ideaQuoteDiv = document.createElement('div')
      ideaQuoteDiv.className = 'form-group'
      const ideaQuoteLabel = document.createElement('label')
      ideaQuoteLabel.innerText = "idea:"
      const ideaQuoteInput = document.createElement('input')
      ideaQuoteInput.name = "quote"
      if(quote){ideaQuoteInput.value = quote}
      ideaQuoteInput.required = true
      ideaQuoteInput.className = "form-control"
      ideaQuoteDiv.append(ideaQuoteLabel, ideaQuoteInput)
  
      const ideaLikesDiv = document.createElement('div')
      ideaLikesDiv.className = 'form-group'
      const ideaLikesLabel = document.createElement('label')
      ideaLikesLabel.innerText = "Love for this idea:"
      const ideaLikesInput = document.createElement('input')
      ideaLikesInput.name = "likes"
      if(likes){ideaLikesInput.value = likes }
      ideaLikesInput.required = true
      ideaLikesInput.type = "number" 
      ideaLikesInput.className = "form-control"
      ideaLikesDiv.append(ideaLikesLabel, ideaLikesInput)
  
      const thinkersCheckContainer = document.createElement('div')
      thinkersCheckContainer.className = "thinkers-check-container align-content-center"
      const thinkersCheck = document.createElement('div')
      thinkersCheck.className = "form-check-container"
      const checkboxLabel = document.createElement('label')
      checkboxLabel.innerText = "Pick a thinker/thinkers for your idea:"
  
      ApiService.getAllThinkers(selectedThinkers)
        .then(thinkers => {
          thinkers.forEach(thinker => {
            let inputLabelDiv = document.createElement('div')
            inputLabelDiv.className = 'form-check'
            let checkbox = document.createElement('input')
            checkbox.className = "checks form-check-input"
            checkbox.type = "checkbox"
            checkbox.id = thinker.id
            checkbox.name = thinker.name
            let checkLabel = document.createElement('label')
            checkLabel.className = 'form-check-label'
            checkLabel.innerText = thinker.name
            if(selectedThinkers){
              selectedThinkers.forEach( thinker => {
                if(thinker.name === checkbox.name){
                  checkbox.checked = true
                }
              })
            }
            inputLabelDiv.append(checkbox, checkLabel)
            thinkersCheck.appendChild(inputLabelDiv)
          })
        })
  
        thinkersCheckContainer.append(checkboxLabel, thinkersCheck)
  
      const submitBtn = document.createElement('button')
      submitBtn.className = 'btn'
      submitBtn.innerText = "Submit"
      
      if(editIdeaForm){
        editIdeaForm.innerHTML = ""
        editIdeaForm.append(ideaQuoteDiv, ideaLikesDiv, thinkersCheckContainer, submitBtn)
      } else if (ideaForm) {
        ideaForm.innerHTML = ""
        ideaForm.append(ideaQuoteDiv, ideaLikesDiv, thinkersCheckContainer, submitBtn)
      }
    }
  
  }
