export function renderModal({title, fulltext} = '') {
  return `
  <div class="custom-modal">
    <div class="custom-modal-body">
        <form id="edit-post">
          <h1 class="h4">Редактировать пост</h1>

          <div class="form-control">
            <label>Название</label>
            <input class="form-input" type="text" name="title" placeholder="Введите название" value="${title}">
          </div>

          <div class="form-control">
            <label>Текст</label>
            <textarea name="fulltext" placeholder="Введите текст поста">${fulltext}</textarea>
          </div>

          <div class="form-control">
            <label>Тип</label>
            <select name="type">
              <option value="note" selected>Заметка</option>
              <option value="news">Новость</option>
            </select>
          </div>

          <div class="button-wrapper">
            <button class="btn-close-modal">Закрыть</button>
            <button id="save-changes-btn" class="btn-save-modal">Сохранить</button>
          </div>
        </form>
      </div>
  </div>
  `
}