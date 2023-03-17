const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const repoList = document.getElementById('repo-list');


const searchRepos = () => {
  const query = searchInput.value.trim();
  if (query.length <= 3) {
    repoList.innerHTML = '<li>Введите более 3 символов для поиска</li>';
    return;
  }

  fetch(`https://api.github.com/search/repositories?q=${query}&per_page=10`)
    .then(response => response.json())
    .then(data => {
      if (data.total_count === 0) {
        repoList.innerHTML = '<li>Ничего не найдено</li>';
        return;
      }
      repoList.innerHTML = '';
      data.items.forEach(item => {
        console.log(item)
        const li = document.createElement('li');
        const link = document.createElement('a');
        link.href = item.html_url;
        link.target = '_blank';
        link.textContent = item.name;
        li.appendChild(link);
        const desc = document.createElement('p');
        desc.textContent = item.description || 'Нет описания проекта';
        li.appendChild(desc);
        repoList.appendChild(li);
      });
    })
    .catch(() => repoList.innerHTML = '<li>Произошла ошибка при загрузке данных<li>');
}


searchButton.addEventListener('click', searchRepos);
searchInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    searchRepos();
  }
});
