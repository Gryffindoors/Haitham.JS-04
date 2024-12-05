var WebSiteLinkList = [];
var nameInput = document.getElementById('webSiteName');
var linkInput = document.getElementById('webSiteLink');
var listOutput = document.getElementById('webSiteList');

function inputLink() {
    if (nameInput === null || linkInput === null || nameInput.value.trim() === "" || linkInput.value.trim() === "") {
        alert('Please do not add empty values');
        return;
    }
    var listOutputArray = {
        name: nameInput.value,
        link: linkInput.value
    }
    WebSiteLinkList.push(listOutputArray);
    nameInput.value = "";
    linkInput.value = "";
    document.getElementById('confirm').innerHTML = "saved"
    readWebSiteList();

}

var output = ""

function readWebSiteList() {
    let output = "";
    WebSiteLinkList.forEach((test, index) => {
        output += `<tr>
                    <th scope="row" class="text-center">${index + 1}</th>
                    <td class="text-center">${test.name}</td>
                    <td class="text-center anchor">
                        <a href="${test.link}" target="_blank">${test.name}</a>
                    </td>
                    
                    <td class="text-center">
                        <button onclick="editLink(${index})" class="btn btn-warning">Edit</button>
                        <button onclick="deleteLink(${index})" class="btn btn-danger">Delete</button>
                    </td>
                    <td>
                        <div class="form-check form-switch mx-auto andro w-25 ">
                            <input class="form-check-input flexSwitch " type="checkbox" data-index="${index}">
                        </div>
                    </td>
                    
                </tr>`;
    });
    document.getElementById('webSiteList').innerHTML = output;

    document.querySelectorAll('.flexSwitch').forEach((switchButton) => {
        switchButton.addEventListener('change', function () {
            const index = this.getAttribute('data-index'); 
            const test = WebSiteLinkList[index]; 
            const anchorCell = this.closest('tr').querySelector('.anchor a'); 
            if (this.checked) {
                anchorCell.textContent = test.link;
            } else {
                anchorCell.textContent = test.name;
            }
        });
    });
}

function editLink(index) {
    nameInput.value = WebSiteLinkList[index].name;
    linkInput.value = WebSiteLinkList[index].link;
    WebSiteLinkList.splice(index, 1);
    readWebSiteList();
}

function deleteLink(index) {
    WebSiteLinkList.splice(index, 1);
    readWebSiteList();
}


function editLink(index){
    nameInput.value = WebSiteLinkList[index].name;
    linkInput.value = WebSiteLinkList[index].link;
    WebSiteLinkList.splice(index,1)
    readWebSiteList();
}
function deleteLink(index){
    WebSiteLinkList.splice(index,1)
    readWebSiteList();
}
console.log(WebSiteLinkList);
