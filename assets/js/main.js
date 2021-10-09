// api
const backendApi = 'https://tony-json-server.herokuapp.com';

// an empty array store backend data
let dataIssues = [];

// get elements
const signoutBtn = document.getElementById('signout');

const issuesList = document.getElementById('issuesList');
const addForm = document.getElementById("issueInputForm");
const issueDescriptionInput = document.getElementById('inputIssueDescription');
const issueSeveritySelect = document.getElementById('severity-status');
const searchBox = document.getElementById("search-box");
const filterAllBtn = document.getElementById('all-status');
const filterOpenBtn = document.getElementById('open-status');
const filterCloseBtn = document.getElementById('close-status');
const filterAll = filterAllBtn.value;
const filterOpen = filterOpenBtn.value;
const filterClose = filterCloseBtn.value;
const orderBy = document.getElementById('sort-value');


signoutBtn.addEventListener('click', function() {
    window.location.href = '../../loginPage.html'
});

// enable autoReload
autoReload();


// call api
function callApi(callback) {
    fetch(`${backendApi}/api/todos`)
        .then(response => response.json())
        .then(callback)
        .catch(error => {
            console.log('error!');
            console.error(error)
        })
};

// autoReload
function autoReload() {
    callApi(responseData => {
        // console.log(responseData)
        renderData(responseData.data);
    });
};


// renderData
function renderData(issues) {
    issuesList.innerHTML = '';
    
    dataIssues = issues;

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
                       
                        <button id="changeSttBtn" class="btn btn--close" onclick="updateIssueStt('${issue.id}', '${issue.status}')">
                            ${(issue.status === 'new' ? 'Close' : 'Open')}
                        </button>
                        
                        
                        <button class="btn btn--delete" onclick="deleteIssue('${issue.id}')">Delete</button>
                    </div>
                </div>
            </li>
            <br>
        `


        // issue's status btn event
        
        // changeSttBtn.addEventListener('click', function(event) {
        //     updateIssueStt(id, updateSttValue)
        // })
    
        // const changeSttBtn = document.getElementById('changeSttBtn');
        // const changeSttBtnValue = changeSttBtn.innerHTML;
        // console.log(changeSttBtnValue)
    })
    
};

// const changeSttBtn = document.getElementsByClassName('changeSttBtn');
// console.log(changeSttBtn.innerHTML);



// form add issue event
addForm.addEventListener('submit', function(event) {
    event.preventDefault();
    addIssue();
});


// add new issue
function addIssue() {
    const issueDescription = issueDescriptionInput.value;
    const issueSeverity = issueSeveritySelect.value;
    const createIssueId = new Date();

    // check validate description input
    if(issueDescription === '') {
        alert('Please enter Issue Description for tracking');
        return;
    };

    // example data template
    const newIssue = {
        "id": createIssueId,
        "title": "Learn React",
        "author": "Tony Nguyen",
        "description": issueDescription,
        "severity": issueSeverity,
        "status": "new",
    };

    // Post issue to server
    fetch(`${backendApi}/api/todos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newIssue),
    })
        .then(autoReload)
};


// delete issue
function deleteIssue(id) {
    fetch(`${backendApi}/api/todos/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(autoReload)
};


// change issue's status
function changeIssueStt(stt) {
    let newStt = '';
    if(stt === 'close') {
        newStt = 'new';
    };
    if(stt === 'new') {
        newStt = 'close';
    };
    return newStt;
};

// update issue's status
function updateIssueStt(id, stt) {
    if(!id) {
        alert('somthing wrong with id');
        return;
    };
    
    // new status
    const updateStt = changeIssueStt(stt);
    
    // example update data template
    const updateIssue = {
        "status": updateStt,
    };

    fetch(`${backendApi}/api/todos/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateIssue),
    })

    // console.log('dataIssues: ', dataIssues)
    const newIssues = JSON.parse(JSON.stringify(dataIssues)); // clone deep array  (! super important)

    const issueIndex = dataIssues.findIndex(issue => issue.id === id);
    
    newIssues[issueIndex].status = updateStt;
    // console.log('newIssues: ', newIssues)

    renderData(newIssues)
};


// search feature
searchBox.addEventListener('keyup', function(event) {
    searchIssue(event);
});

function searchIssue(event) {
    const searchString = event.target.value.toLowerCase();
    // console.log(searchString)
    callApi(responseData => {
        const issues = responseData.data;
        // console.log(issues)
        issuesList.innerHTML = '';
        const matchedIssues = issues.filter(issue => {
            return issue.description.toLowerCase().includes(searchString)
        });
        matchedIssues.forEach(issue => {
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
                        
                            <button id="changeSttBtn" class="btn btn--close" onclick="updateIssueStt('${issue.id}', '${issue.status}')">
                                ${(issue.status === 'new' ? 'Close' : 'Open')}
                            </button>
                            
                            
                            <button class="btn btn--delete" onclick="deleteIssue('${issue.id}')">Delete</button>
                        </div>
                    </div>
                </li>
                <br>
            `
        })        
    });

};


// filter btn event
filterAllBtn.addEventListener('click', function() {
    filterManual(filterAll);
});

filterOpenBtn.addEventListener('click', function() {
    filterManual(filterOpen);
});

filterCloseBtn.addEventListener('click', function() {
    filterManual(filterClose);
});

// filter issue
function filterManual(value) {
    callApi(responseData => {
        const issues = responseData.data;
        // console.log(issues)
        issuesList.innerHTML = '';
        const filteredIssues = issues.filter(issue => {
            if(value === 'open') return issue.status.toLowerCase() === 'new';
            if(value === 'close') return issue.status.toLowerCase() === value;
            if(value === 'all') return issue.status.toLowerCase() === 'new' || issue.status.toLowerCase() === 'close';
        });
        filteredIssues.forEach(issue => {
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
                        
                            <button id="changeSttBtn" class="btn btn--close" onclick="updateIssueStt('${issue.id}', '${issue.status}')">
                                ${(issue.status === 'new' ? 'Close' : 'Open')}
                            </button>
                            
                            
                            <button class="btn btn--delete" onclick="deleteIssue('${issue.id}')">Delete</button>
                        </div>
                    </div>
                </li>
                <br>
            `
        })        
    });
};


// // filter issues
// function filterAllIssue() {
//     const newIssues = JSON.parse(JSON.stringify(dataIssues)); // clone deep array
//     renderData(newIssues);
// };

// function filterOpenIssue() {
//     const newIssues = JSON.parse(JSON.stringify(dataIssues)); // clone deep array


//     const filteredIssues = newIssues.filter(issue => issue.status === 'new');
//         // console.log('u need: ', filteredIssues)
//     renderData(filteredIssues);

// }


// function filterIssue(value) {
//     const newIssues = JSON.parse(JSON.stringify(dataIssues)); // clone deep array


//     // console.log('u need right here: ',newIssues )
//     // if(value === 'all') {
//     //     // console.log('u need: ');
//     //     renderData(newIssues);
//     // };

//     // if(value === 'open') {
//     //     const filteredIssues = newIssues.filter(issue => issue.status === 'new');
//     //     // console.log('u need: ', filteredIssues)
//     //     renderData(filteredIssues);
//     // };

//     if(value === 'close') {
//         const filteredIssues = newIssues.filter(issue => issue.status === 'close');
//         renderData(filteredIssues);
//     };

// };




// order by event
orderBy.addEventListener('change', function() {
    sortOrder();
});



function sortOrder() {
    callApi(responseData => {
        const issues = responseData.data;
        issuesList.innerHTML = '';
        const selectOrderValue = orderBy.value;

        // set priority to order
        const issuePriority = {
            'low': 1,
            'medium': 2,
            'high': 3,
        };

        let orderedIssues;
        let sortResult;
        console.log(orderedIssues);
        function sortAsc(array, property, Prio) {
            sortResult = array.sort((a, b) => {
                if (Prio[a[property]] < Prio[b[property]]) return -1;
                if (Prio[a[property]] > Prio[b[property]]) return 1;
                return 0;
            })
            return sortResult;
        };
        
        function sortPrioDesc(array, property, Prio) {
            const sortResult = array.sort((a, b) => {
                if (Prio[a[property]] > Prio[b[property]]) return -1;
                if (Prio[a[property]] < Prio[b[property]]) return 1;
                return 0;
            })
            return sortResult;
        };

        console.log(sortAsc(issues, 'severity', issuePriority))


        if(selectOrderValue === 'asc') {
            orderedIssues = sortAsc(issues, 'severity', issuePriority);
            return orderedIssues;
        };
        if(selectOrderValue === 'desc') {
            orderedIssues = sortPrioDesc(issues, 'severity', issuePriority);
            return orderedIssues;
        };
        console.log('u need: ', orderedIssues);                 // error here

        // if(selectOrderValue === 'asc') {
        //     const orderedIssues = issues.sort((a, b) => {
        //         if(issuePriority[a.severity] < issuePriority[b.severity]) return -1;
        //         if(issuePriority[a.severity] > issuePriority[b.severity]) return 1;
        //         return 0;
        //     });
        // };
        console.log(orderedIssues);
        
        orderedIssues.forEach(issue => {
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
                        
                            <button id="changeSttBtn" class="btn btn--close" onclick="updateIssueStt('${issue.id}', '${issue.status}')">
                                ${(issue.status === 'new' ? 'Close' : 'Open')}
                            </button>
                            
                            
                            <button class="btn btn--delete" onclick="deleteIssue('${issue.id}')">Delete</button>
                        </div>
                    </div>
                </li>
                <br>
            `
        })        
    });

};


