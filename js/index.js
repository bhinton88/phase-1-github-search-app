const form = document.getElementById('github-form')

form.addEventListener('submit', (event) => {
  event.preventDefault()
  let name = event.target.search.value
  const userList = document.querySelector('#user-list')
  userList.innerHTML = '' // clears out data so that old data doesnt stay on the page
  const reposList = document.getElementById('repos-list')
  reposList.innerHTML = ''

  fetch(`https://api.github.com/search/users?q=${name}`)
  .then(response => response.json())
  .then(json => {json.items.map(item => {
      const li = document.createElement('li')
      const h2 = document.createElement('h2')
      h2.textContent = item.login
      const img = document.createElement('img')
      img.src = item.avatar_url
      const a = document.createElement('a')
      a.href = item.html_url
      a.textContent = `Click here for ${item.login}'s profile`
      li.append(h2,img,a)
      userList.appendChild(li)
    
      h2.addEventListener('click', event => {
        event.preventDefault()
        fetchRepositories(item.login)
      })
    })
  })
  form.reset()
})

function fetchRepositories(username) {
  const reposList = document.getElementById('repos-list')
  reposList.innerHTML = ''
  fetch(`https://api.github.com/users/${username}/repos`)
  .then(response => response.json())
  .then(json => { json.map( item => {
    const li = document.createElement('li')
    li.textContent = item.name
    reposList.appendChild(li)
    })
  })
}