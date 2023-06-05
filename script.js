const addlinkform = document.getElementById('addlinkform');
const newlinkinput = document.getElementById('newlinkinput');
const deletelinkform = document.getElementById('deletelinkform');
const linktodelete = document.getElementById('linktodelete');
const message = document.getElementById('message');

addlinkform.addEventListener('submit', event => {
  event.preventDefault();
  const newLink = newlinkinput.value.trim();
  if (newLink !== '') {
    axios.post('/uptime', { url: newLink })
      .then(response => {
        showMessage(response.data.message, 'success');
        newlinkinput.value = '';
      })
      .catch(error => {
        showMessage('Lỗi: ' + error.response.data.message, 'error');
      });
  }
});

deletelinkform.addEventListener('submit', event => {
  event.preventDefault();
  const deleteurl = linktodelete.value.trim();
  if (deleteurl !== '') {
    axios.delete('/uptime', { data: { link: deleteurl } })
      .then(response => {
        showMessage(response.data.message, 'success');
        linktodelete.value = '';
      })
      .catch(error => {
        showMessage('Lỗi: ' + error.response.data.message, 'error');
      });
  }
});

function showMessage(text, type) {
      message.innerHTML = `<p class="${type}">${text}</p>`;
}