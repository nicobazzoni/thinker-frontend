class ApiService {

    static getAllThinkers(){
      return fetch(THINKERS_URL)
      .then(res => res.json())
    }
  
    static sortThinkers(sort, filter, query){
      let sortParams = `?sort=${sort}`
      let filterParams = `&filter=${filter}`
      let queryParams = `&query=${query}`
      return fetch(`${THINKERS_URL}/${sortParams}${filterParams}${queryParams}`)
      .then(res => res.json())
    }
  
    static getAllCategories(){
      return fetch(CATEGORY_URL)
      .then(res => res.json())
    }
  
    static postThinker(newIdea){
      return fetch(THINKERS_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(newIdea)
      })
        .then(res => res.json())
    }
  
    static deleteThinker(thinkerId){
      return fetch(`${THINKERS_URL}/${thinkerId}`, {
        method: "DELETE"
      })
      .then(res => res.json())
    }
  
    static updateThinker(thinkerId, thinker){
      return fetch(`${THINKERS_URL}/${thinkerId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(thinker)
      })
      .then(res => res.json())
    }
  
    static increaseTimesStudied= (id) => fetch(`${THINKERS_URL}/${id}`, {method: "PATCH"}).then(res => res.json())
  
    static getAllIdeas(){
      return fetch(IDEAS_URL)
      .then(res => res.json())
    }
  
    static postIdea(newIdea){
      return fetch(IDEAS_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(newIdea)
      })
        .then(res => res.json())
    }
  
    static deleteIdea(ideaId){
      return fetch(`${IDEAS_URL}/${ideaId}`, {
        method: "DELETE"
      })
      .then(res => res.json())
    }
  
    static updateIdea(ideaId, idea){
      return fetch(`${IDEAS_URL}/${ideaId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(idea)
      })
      .then(res => res.json())
    }
  
    static increaseLikes = (ideaId) => fetch(`${IDEAS_URL}/${ideaId}`, {method: 'PATCH',}).then(res => res.json())
  
  
  }