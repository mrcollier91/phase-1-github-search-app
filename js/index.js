document.addEventListener('DOMContentLoaded', (e) => {

    const form = document.getElementById('github-form')
    form.addEventListener('submit', (e) =>{
        e.preventDefault()
        const userList = document.querySelector('#user-list')
        userList.innerHTML = ""
        const reposList = document.getElementById('repos-list')
        reposList.innerHTML = ""
        fetch(`https://api.github.com/search/users?q=${e.target[0].value}`)
        .then(resp => resp.json())
        .then(resp => {
            resp.items.map(item =>{
                const li = document.createElement('li')
                const h2 = document.createElement('h2')
                h2.textContent = item.login
                
                h2.addEventListener('click', e => showUserRepos(item.login))
                const img = document.createElement('img')
                img.src = item.avatar_url
                
                
                
                li.append(h2, img)
                userList.append(li)
            })
        })
    })
})
function showUserRepos(username) {
    const reposList = document.getElementById('repos-list')
    reposList.innerHTML = ""
    fetch(`https://api.github.com/users/${username}/repos`)
    .then(resp => resp.json())
    .then(resp => resp.map(repo => {
        const li = document.createElement('li')
        const h3 = document.createElement('h3')
        h3.textContent = repo.name
        reposList.append(li)
        li.append(h3)
    }))
}