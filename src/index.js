let addToy = false;

document.addEventListener("DOMContentLoaded", main)

function main(){

  listenNewToyBtn()
  fetchToys()
  createAddNewToyListener()
  createLikeListenert()
};

  function listenNewToyBtn(){
    const addBtn = document.querySelector("#new-toy-btn");
    const toyFormContainer = document.querySelector(".container");
    addBtn.addEventListener("click", () => {
      // hide & seek with the form
      addToy = !addToy;
      if (addToy) {
        toyFormContainer.style.display = "block";
      } else {
        toyFormContainer.style.display = "none";
      }
    });
  };

  
  function fetchToys(){

    fetch('http://localhost:3000/toys')
    .then(resp=> resp.json())
    .then(toys=>{
      toys.forEach(function(toy){
        renderCard(toy)
      })
    })
  };

  function renderCard(toy){

    const div = document.createElement('div')
    div.className = 'card'

    const h2 = document.createElement('h2')
    h2.innerHTML = toy.name
    
    const img = document.createElement('img')
    img.className = 'toy-avatar'
    img.src = toy.image

    const pTag = document.createElement('p')

    pTag.innerHTML = `${toy.likes} likes`

    const likeButton = document.createElement('button')
    likeButton.className = 'likn-btn'
    likeButton.setAttribute('id',toy.id)
    likeButton.innerHTML = 'like'

    div.append(h2, img, pTag, likeButton)

    toysContainer = document.getElementById('toy-collection')
    toysContainer.append(div)


  };

  function createAddNewToyListener(){

   const form = document.querySelector('form')

    form.addEventListener('submit', function(event){
      event.preventDefault()
      const newToy = {
        name: event.target[0].value,
        image: event.target[1].value,
        likes: 0
      }      

      const newObj = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newToy)
      };

      fetch ('http://localhost:3000/toys', newObj)
      .then(resp=>resp.json())
      .then(toy=>{

        renderCard(toy)

      })

    });

  };

  function createLikeListenert(){

      toyContainer = document.getElementById('toy-collection')

      toyContainer.addEventListener('click', function(event){

        const pTag = event.target.previousElementSibling
        let currentLikes = parseInt(pTag.innerText)
        
        if (event.target){

          const newObj = {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({likes: currentLikes += 1 })
          };
    
          fetch (`http://localhost:3000/toys/${event.target.id}`, newObj)
          .then(resp=>resp.json())
          .then(toy=>{

            
            pTag.innerText = `${toy.likes} likes`

          }) 
        }       

      })
  };