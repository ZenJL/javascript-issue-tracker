// api URL
const apiBackend = 'https://tony-json-server.herokuapp.com';

const issuesList = document.getElementById("issuesList");

function autoReload() {
    getApiTodo(responseData => {
        renderData(responseData);
    });
};

function autoReloadItem() {
    getSingleTodo(responseData => {
        renderSingleItem(responseData);
    });
}

autoReload();

function getApiTodo(cb) {
    fetch(`${apiBackend}/api/todos`)
        .then(response => response.json())
        .then(cb)
};

function getSingleTodo(cb, id) {
    fetch(`${apiBackend}/api/todos/${id}`)
        .then(response => response.json())
        .then(cb)
};

function renderData(responseData) {
    issuesList.innerHTML = '';

    const issues = responseData.data;
    issues.forEach(issue => {
        issuesList.innerHTML += `
            <li id="issue-list-item--${issue.id}" class="issue-list-item">
                <div class="list-item-header">
                    <div for="" class="list-item-title">${issue.id}</div>
                    <div id="issueStatus" class="list-item-status">${issue.status}</div>
                </div>
                <div class="list-item-content">
                    <h3 class="issue-name">${issue.description}</h3>
                    <div class="list-item-severity">${issue.severity}</div>
                    <div class="list-item-group-btn">
                        <button id="update-status-btn" value="1" class="btn btn--close" onclick="updateIssueStatus('${issue.id}')" >Close</button>
                        <button class="btn btn--delete" onclick="deleteIssue('${issue.id}')">Delete</button>
                    </div>
                </div>
            </li>
            <br>
        `
    })
    // const statusValue = document.getElementById('update-status-btn');   // vẫn ra
    // console.log(statusValue.value);
};


function renderSingleItem(responseData) {
    const issue = responseData.data;
    
    const renderSingleIssue = document.getElementById(`issue-list-item--${issue.id}`);
    
    renderSingleIssue.innerHTML = '';

    renderSingleIssue.innerHTML = `
        <li id="issue-list-item--${issue.id}" class="issue-list-item">
            <div class="list-item-header">
                <div for="" class="list-item-title">${issue.id}</div>
                <div id="issueStatus" class="list-item-status">${issue.status}</div>
            </div>
            <div class="list-item-content">
                <h3 class="issue-name">${issue.description}</h3>
                <div class="list-item-severity">${issue.severity}</div>
                <div class="list-item-group-btn">
                    <button id="update-status-btn" value="1" class="btn btn--close" onclick="updateIssueStatus('${issue.id}')" >Close</button>
                    <button class="btn btn--delete" onclick="deleteIssue('${issue.id}')">Delete</button>
                </div>
            </div>
        </li>
        <br>
    `
};


// add new issue
document.getElementById("issueInputForm").addEventListener('submit', function(event) {
    event.preventDefault();
    addIssue();
});

function addIssue() {
    const issueDescription = document.getElementById("inputIssueDescription").value;
    const issueSeverity = document.getElementById("severity-status").value;
    const addTime = new Date();

    // check input issue
    if(issueDescription === '') {
        alert('please enter the issue for tracking');
        return;
    }

    const newIssue = {
        "id": addTime,
        "title": "Learn React",
        "author": "Tony Nguyen",
        "description": issueDescription,
        "severity": issueSeverity,
        "status": "new",
    };


    // Post issue to backend
    fetch(`${apiBackend}/api/todos`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newIssue)
    })
        .then(autoReload);
};


// delete issue
function deleteIssue(id) {
    fetch(`${apiBackend}/api/todos/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
    })
        .then(autoReload);
};

// _____________________________________________ START UPDATE ISSUE ___________________________________________________

function updateIssueStatus(id) {
    getSingleTodo(responseData => {
        
        const issue = responseData.data;
        const currentStatus = issue.status;
        // console.log(currentStatus)       //still fine


        const statusValue = document.getElementById('update-status-btn');
        console.log(statusValue.value);
        
        // let newStatus = "";

        // if(!currentStatus) {
        //     if(currentStatus === "new") {
        //         newStatus = "close";
        //     };
        //     if(currentStatus === "close") {
        //         newStatus = "new";
        //     };

        //     const updateIssueStt = {
        //         "status": newStatus,
        //     }
        
        //     fetch(`${apiBackend}/api/todos/${id}`, {
        //         method: "PATCH",
        //         headers: {
        //             "Content-Type": "application/json"
        //         },
        //         body: JSON.stringify(updateIssueStt)
        //     })
        //         .then(response => response.json())
        //         .then(responseData => {
        //             issuesList.innerHTML = '';

        //             const issues = responseData.data;
        //             issues.forEach(issue => {
        //                 issuesList.innerHTML += `
        //                     <li id="issue-list-item--${issue.id}" class="issue-list-item">
        //                         <div class="list-item-header">
        //                             <div for="" class="list-item-title">${issue.id}</div>
        //                             <div id="issueStatus" class="list-item-status">${issue.status}</div>
        //                         </div>
        //                         <div class="list-item-content">
        //                             <h3 class="issue-name">${issue.description}</h3>
        //                             <div class="list-item-severity">${issue.severity}</div>
        //                             <div class="list-item-group-btn">
        //                                 <button id="update-status-btn" value="1" class="btn btn--close" onclick="updateIssueStatus('${issue.id}')" >Close</button>
        //                                 <button class="btn btn--delete" onclick="deleteIssue('${issue.id}')">Delete</button>
        //                             </div>
        //                         </div>
        //                     </li>
        //                     <br>
        //                 `
        //             })
        //         })
        // }
    })
};


// search issue     ________________________________________ START SEARCH __________________________________________
// const searchValue = document.getElementById("search-box").value;
// console.log(searchValue);

document.getElementById("search-box").addEventListener('keyup', function(event) {
    searchIssue(event);
});

function searchIssue(event) {
    const searchString = event.target.value.toLowerCase();
    // console.log(searchString)
    getApiTodo(responseData => {
        const issues = responseData.data;
        // console.log(issues)
        issuesList.innerHTML = '';
        const filteredIssues = issues.filter(issue => {
            return issue.description.toLowerCase().includes(searchString)
        });
        filteredIssues.forEach(issue => {
            issuesList.innerHTML += `
                <li id="issue-list-item--${issue.id}" class="issue-list-item">
                    <div class="list-item-header">
                        <div for="" class="list-item-title">${issue.id}</div>
                        <div class="list-item-status">${issue.status}</div>
                    </div>
                    <div class="list-item-content">
                        <h3 class="issue-name">${issue.description}</h3>
                        <div class="list-item-severity">${issue.severity}</div>
                        <div class="list-item-group-btn">
                            <button class="btn btn--close">Close</button>
                            <button class="btn btn--delete" onclick="deleteIssue('${issue.id}')">Delete</button>
                        </div>
                    </div>
                </li>
                <br>
            `
        })        
    });

}
// ___________________________________________________ DONE SEARCH_________________________________________

// filter status
// function filterByStatus(filterBtnId) {

// }




document.getElementById("search-box").addEventListener('keyup', function(event) {
    searchIssue(event);
});
// document.getElementById("all-status").addEventListener('click', function(event) {
//     const searchString = event.target.value.toLowerCase();
//     // console.log(searchString)
//     getApiTodo(responseData => {
//         const issues = responseData.data;
//         // console.log(issues)
//         issuesList.innerHTML = '';
//         const filteredIssues = issues.filter(issue => {
//             return issue.description.toLowerCase().includes(searchString)
//         });
//         filteredIssues.forEach(issue => {
//             issuesList.innerHTML += `
//                 <li id="issue-list-item--${issue.id}" class="issue-list-item">
//                     <div class="list-item-header">
//                         <div for="" class="list-item-title">${issue.id}</div>
//                         <div class="list-item-status">${issue.status}</div>
//                     </div>
//                     <div class="list-item-content">
//                         <h3 class="issue-name">${issue.description}</h3>
//                         <div class="list-item-severity">${issue.severity}</div>
//                         <div class="list-item-group-btn">
//                             <button class="btn btn--close">Close</button>
//                             <button class="btn btn--delete" onclick="deleteIssue('${issue.id}')">Delete</button>
//                         </div>
//                     </div>
//                 </li>
//                 <br>
//             `
//         })        
//     });
// });

