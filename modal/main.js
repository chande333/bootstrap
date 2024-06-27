function open_add_ticket_queue(thisID = "", thisSummary = ""){
    console.log(thisID)
    document.getElementById("edit_ticket_queue").style.display = "block";

    document.querySelector("#edit_ticket_queue .modal-header").style.className = 'modal-header bg-danger text-white';
    document.querySelector("#edit_ticket_queue .modal-title").innerHTML = 'Add New X-Ticket';

    // Buttons ---------
    edit_ticket_but_save.style.display = "none";
    edit_ticket_but_save.disabled = true;
    edit_ticket_but_add.style.display = "block";
    edit_ticket_but_add.disabled = false;

    edit_ticket_id.value = thisID;
    edit_ticket_id.disabled = false;
    edit_ticket_summary.value = decodeURIComponent(thisSummary);
    edit_ticket_comment.value =  "";
    edit_ticket_status.value =  "";
    edit_ticket_emailcat.value =  "";
    edit_ticket_targetDate.value =  "";
    edit_ticket_enabled.value =  "1";
}

var focus_ticket = {};

function open_edit_ticket_queue(thisID){

    // console.log(thisID)

    document.querySelector("#edit_ticket_queue .modal-header").style.className = 'modal-header bg-success text-white';
    document.querySelector("#edit_ticket_queue .modal-title").innerHTML = `Editing ${thisID}`;

    // Buttons ---------
    edit_ticket_but_save.style.display = "block";
    edit_ticket_but_save.disabled = false;
    edit_ticket_but_add.style.display = "none";
    edit_ticket_but_add.disabled = true;
    
    // document.getElementById("edit_ticket_id").value = thisID;

    // const TARGET = document.getElementById("##REPLACE WITH ELEMENT ID");
    // TARGET.innerHTML = ""
    
    const ERROR_LOG = document.getElementById("edit_ticket_queue_warning");
    ERROR_LOG.innerHTML = ""

    x_ticket_spinnerloading.style.display = "block";
    
    var params = {
        "id": thisID
    }
    
    let endpointURL = 'http://localhost:8001/x_ticketid_info';
    
    let endpointQuery = `?fn=${params.fn}`;
    
    fetch(endpointURL + endpointQuery, {
        "headers": {
            "accept": "*/*",
            "Content-Type": "application/json"
        },
        "body": `${JSON.stringify(params)}`,
        "method": "POST"
    })
    .then(response =>{
        console.log(`Response Status: ${response.status}`);
        x_ticket_spinnerloading.style.display = "none";
        if (!!response.ok == false) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
    })
    .then(dataString => {
            
            try {
                JSON.parse(dataString);
                let dataArray = JSON.parse(dataString);
                //TARGET.innerHTML = ""/
                
                focus_ticket = dataArray[0];
                edit_ticket_id.value = focus_ticket.id;
                edit_ticket_id.disabled = true;
                edit_ticket_enabled.value = focus_ticket.enabled;
                edit_ticket_summary.value = decodeURIComponent(focus_ticket.summary);
                edit_ticket_comment.value = decodeURIComponent(focus_ticket.comment);
                edit_ticket_status.value = !!focus_ticket.status ? focus_ticket.status : "";
                edit_ticket_emailcat.value = !!focus_ticket.email_cat ? focus_ticket.email_cat : "";
                edit_ticket_targetDate.value = !!focus_ticket.target_date ? focus_ticket.target_date : "";
                document.getElementById("edit_ticket_queue").style.display = "block";
            }
            
            catch(error) {
            
            }
            // if(callBackFn){callBackFn();}
    })
    .catch(error => {
        ERROR_LOG.innerHTML = `${error}`;
    })   

}


function add_x_ticket_info(callBackFn){
    // const TARGET = document.getElementById("##REPLACE WITH ELEMENT ID");
    // TARGET.innerHTML = ""
    
    const ERROR_LOG = document.getElementById("edit_ticket_queue_warning");
    ERROR_LOG.innerHTML = ""
    
    // SPINNER spinthists.style.display = "block";
    
    var params = {
        "id": edit_ticket_id.value.trim(),
        "summary": encodeURIComponent(edit_ticket_summary.value),
        "comment": encodeURIComponent(edit_ticket_comment.value),
        "status": edit_ticket_status.value,
        "email_cat": edit_ticket_emailcat.value,
        "target_date": edit_ticket_targetDate.value,
        "enabled": edit_ticket_enabled.value
    }
    
    let endpointURL = `http://localhost:8001/x_ticket_add`;
    
    // let endpointQuery = `?fn=${params.fn}`;
    
    fetch(endpointURL, {
        "headers": {
            "accept": "*/*",
            "Content-Type": "application/json"
        },
        "body": `${JSON.stringify(params)}`,
        "method": "POST"
    })
    .then(response =>{
        console.log(`Response Status: ${response.status}`);
         // SPINNER spinthists.style.display = "none";
        if (!!response.ok == false) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
    })
    .then(dataString => {
            edit_ticket_queue.style.display = "none";
            loadJiraTargets();
            try {
                JSON.parse(dataString);
                let dataArray = JSON.parse(dataString);
                //TARGET.innerHTML = ""
            }
            
            catch(error) {
            
            }
            close_edit_ticket_queue();
            loadJiraTargets();
            if(callBackFn){callBackFn();}
    })
    .catch(error => {
        ERROR_LOG.innerHTML = `${error}`;
    })
}

function update_x_ticket_info(callBackFn){
    // const TARGET = document.getElementById("##REPLACE WITH ELEMENT ID");
    // TARGET.innerHTML = ""
    
    const ERROR_LOG = document.getElementById("edit_ticket_queue_warning");
    ERROR_LOG.innerHTML = ""
    
    // SPINNER spinthists.style.display = "block";
    
    var params = {
        "id": focus_ticket.id,
        "summary": encodeURIComponent(edit_ticket_summary.value),
        "comment": encodeURIComponent(edit_ticket_comment.value),
        "status": edit_ticket_status.value,
        "email_cat": edit_ticket_emailcat.value,
        "target_date": edit_ticket_targetDate.value,
        "enabled": edit_ticket_enabled.value
    }
    
    let endpointURL = `http://localhost:8001/x_ticket_update_info`;
    
    // let endpointQuery = `?fn=${params.fn}`;
    
    fetch(endpointURL, {
        "headers": {
            "accept": "*/*",
            "Content-Type": "application/json"
        },
        "body": `${JSON.stringify(params)}`,
        "method": "POST"
    })
    .then(response =>{
        console.log(`Response Status: ${response.status}`);
         // SPINNER spinthists.style.display = "none";
        if (!!response.ok == false) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
    })
    .then(dataString => {
            edit_ticket_queue.style.display = "none";
            loadJiraTargets();
            try {
                JSON.parse(dataString);
                let dataArray = JSON.parse(dataString);
                //TARGET.innerHTML = ""
            }
            
            catch(error) {
            
            }
            
            close_edit_ticket_queue();
            loadJiraTargets();

            if(callBackFn){callBackFn();}
    })
    .catch(error => {
        ERROR_LOG.innerHTML = `${error}`;
    })
}

function close_edit_ticket_queue(){
    document.getElementById("edit_ticket_queue").style.display = "none";
}
