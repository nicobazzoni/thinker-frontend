class ThinkerForm {

  static thinkerModalHandler(addBtn){
    addBtn.addEventListener("click", () => {
      ThinkerForm.createThinkerForm()
    })
  }

  static createThinkerForm(){
    modal.style.display = "block"
    const thinkerForm = document.createElement('form')
    modalContent.innerHTML = ""
    modalContent.append(thinkerForm)
    ThinkerForm.thinkerFormContent(thinkerForm)
    thinkerForm.addEventListener('submit', ThinkerForm.handleFormSubmit)
  }

  static thinkerFormContent(editThinkerForm, name, image, personality, times_studied, category, thinkerForm){
    const thinkerNameDiv = document.createElement('div')
    thinkerNameDiv.className = 'form-group'
    const thinkerNameLabel = document.createElement('label')
    thinkerNameLabel.innerText = "Thinker Name:"
    const thinkerNameInput = document.createElement('input')
    thinkerNameInput.name = "name"
    thinkerNameInput.required = true
    thinkerNameInput.className = "form-control"
    thinkerNameDiv.append(thinkerNameLabel, thinkerNameInput)

    const thinkerImageDiv = document.createElement('div')
    thinkerImageDiv.className = 'form-group'
    const thinkerImageLabel = document.createElement('label')
    thinkerImageLabel.innerText = "thinker Image URL:"
    const thinkerImageInput = document.createElement('input')
    thinkerImageInput.name = "image"
    thinkerImageInput.required = true
    thinkerImageInput.className = "form-control"
    thinkerImageDiv.append(thinkerImageLabel, thinkerImageInput)
    
    const thinkerPersonalityDiv = document.createElement('div')
    thinkerPersonalityDiv.className = 'form-group'
    const thinkerPersonalityLabel = document.createElement('label')
    thinkerPersonalityLabel.innerText = "Thinker Personality:"
    const thinkerPersonalityInput = document.createElement('input')
    thinkerPersonalityInput.name = "personality"
    thinkerPersonalityInput.className = "form-control"
    thinkerPersonalityDiv.append(thinkerPersonalityLabel, thinkerPersonalityInput)

    const thinkerTimesStudiedDiv = document.createElement('div')
    thinkerTimesStudiedDiv.className = 'form-group'
    const thinkerTimesStudiedLabel = document.createElement('label')
    thinkerTimesStudiedLabel.innerText = "Times Studied:"
    const thinkerTimesStudiedInput = document.createElement('input')
    thinkerTimesStudiedInput.type = "number"
    thinkerTimesStudiedInput.name = "times_studied"
    thinkerTimesStudiedInput.required = true
    thinkerTimesStudiedInput.className = "form-control"
    thinkerTimesStudiedDiv.append(thinkerTimesStudiedLabel, thinkerTimesStudiedInput)

    const thinkerCatDiv = document.createElement('div')
    thinkerCatDiv.className = 'form-group'
    const categorySelectorLabel = document.createElement('label')
    categorySelectorLabel.innerText = "Category:"
    const categorySelector = document.createElement('select')
    categorySelector.id = 'select-category'
    categorySelector.name = 'category'
    categorySelector.className = 'form-control'
    ThinkerForm.categoryDropdown(categorySelector, category)
  
    if(name){
      thinkerNameInput.value = name
      thinkerImageInput.value = image
      thinkerPersonalityInput.value = personality 
      thinkerTimesStudiedInput.value = times_studied
      
    }

    const submitBtn = document.createElement('button')
    submitBtn.className = 'btn'
    submitBtn.innerText = "Submit"

    if(thinkerForm){
      thinkerForm.innerHTML = ""
      thinkerForm.append(thinkerNameDiv, 
        thinkerImageDiv, thinkerPersonalityDiv,
        thinkerTimesStudiedDiv, 
        categorySelectorLabel, categorySelector, submitBtn)
    } else if (editThinkerForm){
      editThinkerForm.innerHTML = ""
      editThinkerForm.append(thinkerNameDiv, 
        thinkerImageDiv, thinkerPersonalityDiv,
        thinkerTimesStudiedDiv, 
        categorySelectorLabel, categorySelector, submitBtn)
    }
  }

  static categoryDropdown(categorySelector, selectedCategory) {
    ApiService.getAllCategories(selectedCategory)
      .then(categories => {
        categories.forEach(category => {
          let option = document.createElement('option')
          option.textContent = category.name
          option.value = category.name
          if(selectedCategory && selectedCategory === category.name){
            option.selected = true
          }
          categorySelector.appendChild(option)
        })
      })
      .catch(error => alert(error))
  }

  static handleFormSubmit(e){
    e.preventDefault()
    const newThinker = {
      name: e.target.name.value,
      image: e.target.image.value,
      personality: e.target.personality.value,
      times_studied: e.target.times_studied.value,
      category_name: e.target.category.value
    }
    ApiService.postThinker(newThinker)
    .then(thinker => {
      if(thinker.errors){
        alert(thinker.errors)
      } else {
      new Thinker(thinker)
      e.target.reset();
      modal.querySelector("form").remove()
      modal.style.display = "none"
      }
    })
    .catch(error => alert(error))
  }

  static ThinkerEditHandler(editBtn, editThinkerForm, name, image, personality,  times_studied, category){
    editBtn.addEventListener("click", () => {
      modal.style.display = "block"
      modalContent.append(editThinkerForm)
      ThinkerForm.thinkerFormContent(editThinkerForm, name, image, personality, times_studied, category)
    })
  }

}