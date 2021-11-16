export function renderPost(post, options = {}) {
    const tag = post.type === 'news' ?
        '<li class="tag tag-blue tag-rounded">Новость</li>' :
        '<li class="tag tag-rounded">Заметка</li>'

    const ids = (JSON.parse(localStorage.getItem('favorites')) || []).map(favorite => favorite.id)
    const button = ids.includes(post.id) ?
        `<button class="btn-favourite btn-favourite-remove" data-name="${post.title}" data-id="${post.id}"><i class="fas fa-star" style="pointer-events:none"></i></button>` :
        `<button class="btn-favourite" data-name="${post.title}" data-id="${post.id}"><i class="fas fa-star" style="pointer-events:none"></i></button>`
    return `
    <div class="panel">
      <div class="panel-head">
        <p class="panel-title">${post.title}</p>
        <ul class="tags">
          ${tag}
          ${ options.withButton ? button : '' }
        </ul>
      </div>
      <div class="panel-body">
        <p class="multi-line">${post.fulltext}</p>
      </div>
      <div class="panel-footer w-panel-footer">
        <small>${post.date}</small>
        <button class="button-round button-small button-danger" data-id="${post.id}">Удалить запись</button>
      </div>
    </div>
  `
}