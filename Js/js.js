var toastTrigger = document.getElementById('liveToastBtn');
var toastLiveExample = document.getElementById('liveToast');
var underscoreDiv = document.getElementById('underscore');

var WebSiteLinkList = [];
var nameInput = document.getElementById('nameInput');
var linkInput = document.getElementById('urlInput');
var descriptionInput = document.getElementById('descriptionInput');
var listOutput = document.getElementById('output');
var toastInput = document.querySelector('#liveToast');
var toastText = document.querySelector('#toastText');
var regex = /^http[a-zA-Z0-9!@#$%^&*()_+={}\[\]:;"'<>,.?\/\\|-]+(\.com|\.net|\.html)$/;
var editItemVar = -1;

if (localStorage.getItem('WebSiteLinkListStorage')) {
  WebSiteLinkList = JSON.parse(localStorage.getItem('WebSiteLinkListStorage'));
  readWebSiteList();
}

function btnCheck() {
  if (regex.test(linkInput)) {
    showToast("Invalid URL. Please enter a valid URL.", "text-bg-warning");
    return;
  }
  if (toastTrigger.innerHTML === 'CREATE') {
    createItem();
  } else {
    updateItem();
  }
}

function createItem() {
  if (
    !nameInput.value.trim() ||
    !linkInput.value.trim() ||
    !descriptionInput.value.trim()
  ) {
    showToast('Input invalid, please recheck', 'text-bg-warning');
    return;
  }
  var listOutputArray = {
    name: nameInput.value,
    link: linkInput.value,
    description: descriptionInput.value,
  };
  WebSiteLinkList.push(listOutputArray);
  readWebSiteList();
  clearSpaces();
  showToast('Link saved successfully', 'text-bg-success');
}

function clearSpaces() {
  nameInput.value = '';
  linkInput.value = '';
  descriptionInput.value = '';
}

function readWebSiteList() {
  let output = '';
  WebSiteLinkList.forEach((test, index) => {
    output += `<div class="card col-sm-12 col-md-6 col-lg-3 p-3 bg-dark border-0">
        <div class="card border-0 ps-2 py-3 information-area text-light">
            <div id="title" class="d-flex justify-content-between">
                <h3>${test.name}</h3>
                <div class="w-25 d-flex">
                    <button class="border-0 icon-buttons"><span
                            class="material-symbols-outlined text-light" onclick="editItem(${index})">edit</span></button>
                    <button class="border-0 icon-buttons" onclick="deleteItem(${index})"><span
                            class="material-symbols-outlined text-light">delete</span></button>
                </div>
            </div>
            <div id="description">
                <h4 class="text-light-emphasis">${test.description}</h4>
            </div>
            <div id="link" class="d-flex justify-content-between align-items-center">
                <div class="anchor overflow-hidden"><a href="${test.link}" class="text-decoration-none text-success text-wrap"
                        id="link-${index}" target="_blank">Go to website</a></div>
                <div class="form-check form-switch andro text-center d-flex flex-column align-items-center me-2">
                    <label for="checkBox" class="label-text fw-lighter text-wrap">Show/Hide URL</label>
                    <input class="form-check-input flexSwitch mx-auto" id="checkBox" type="checkbox"
                        data-index="${index}">
                </div>
            </div>
        </div>
    </div>`;
  });
  document.getElementById('output').innerHTML = output;

  document.querySelectorAll('.flexSwitch').forEach((switchButton) => {
    switchButton.addEventListener('change', function () {
      const index = this.getAttribute('data-index');
      const test = WebSiteLinkList[index];
      const anchor = document.getElementById(`link-${index}`);
      if (this.checked) {
        anchor.textContent = test.link;
      } else {
        anchor.textContent = 'Go to website';
      }
    });
  });
  saveLocal();
}

function editItem(index) {
  nameInput.value = WebSiteLinkList[index].name;
  linkInput.value = WebSiteLinkList[index].link;
  descriptionInput.value = WebSiteLinkList[index].description;
  toastTrigger.innerHTML = 'UPDATE';
  editItemVar = index;
}

function updateItem() {
  if (
    !nameInput.value.trim() ||
    !linkInput.value.trim() ||
    !descriptionInput.value.trim()
  ) {
    showToast('Input invalid, please recheck', 'text-bg-warning');
    return;
  }
  var listOutputArray = {
    name: nameInput.value,
    link: linkInput.value,
    description: descriptionInput.value,
  };
  WebSiteLinkList[editItemVar] = listOutputArray;
  readWebSiteList();
  clearSpaces();
  toastTrigger.innerHTML = 'CREATE';
  editItemVar = -1;
  showToast('Link updated successfully', 'text-bg-primary');
}

function deleteItem(index) {
  WebSiteLinkList.splice(index, 1);
  readWebSiteList();
  showToast('Link deleted successfully', 'text-bg-dark');
}

function showToast(message, bgClass) {
  toastInput.className = `toast ${bgClass}`;
  toastText.innerHTML = message;

  if (underscoreDiv) {
    underscoreDiv.classList.add('underscore');
    setTimeout(() => {
      underscoreDiv.classList.remove('underscore');
    }, 5000);
  }

  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastInput);
  toastBootstrap.show();
}

function saveLocal() {
  localStorage.setItem('WebSiteLinkListStorage', JSON.stringify(WebSiteLinkList));
}
