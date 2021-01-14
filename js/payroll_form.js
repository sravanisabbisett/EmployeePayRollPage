window.addEventListener('DOMContentLoaded', (event) =>{
    var name = document.querySelector('#name');
    var textError = document.querySelector('.text-error');
    name.addEventListener('input', function(){
        if(name.value.length == 0){
            textError.textContent = "";
            return;
        }
        try{
            (new EmployeePayrollData()).name = name.value;
            textError.textContent = "";
        }catch(e){
            textError.textContent = e;
        }
    });

    var salary = document.querySelector('#salary');
    var output = document.querySelector('.salary-output');
    output.textContent = salary.value;
    salary.addEventListener('input', function(){
        output.textContent = salary.value;
    });
});
const save = (event) => {
    try {
       
        let employeePayrollData = createEmployeePayroll();
        createAndUpdateStorage(employeePayrollData);
    }
    catch (e) {
        return;
    }
}

function createAndUpdateStorage(employeePayrollData){
    let employeePayRollList=JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if(employeePayRollList!=undefined){
        employeePayRollList.push(employeePayrollData);
    }else{
        employeePayRollList=[employeePayrollData]
    }
    alert(employeePayRollList.toString());
    localStorage.setItem("EmployeePayrollList",JSON.stringify(employeePayRollList));
}

// Create emppayroll data for adding to the table 
var createEmployeePayroll = () => {
    let employeePayrollData = new EmployeePayrollData();
    try {
        employeePayrollData.name = getInputValueById('#name');
    } catch (e) {
        setTextValue('.text-error', e);
        throw e;
    }
    employeePayrollData.profilePic = getSelectedValues('[name=profile]').pop();
    employeePayrollData.gender = getSelectedValues('[name=gender]').pop();
    employeePayrollData.department = getSelectedValues('[name=department]');
    employeePayrollData.salary = getInputValueById('#salary');
    employeePayrollData.note = getInputValueById('#notes');
    let date = getInputValueById('#day') + " " + getInputValueById('#month') + " " + getInputValueById('#year');
    employeePayrollData.startDate = new Date(Date.parse(date));
    alert(employeePayrollData.toString());
    return employeePayrollData;
}

var getSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    let selectedItems = [];
    allItems.forEach(item => {
        if (item.checked) {
            selectedItems.push(item.value);
        }
    });
    return selectedItems;
}


var getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}


var getInputElementValue = (id) => {
    let value = document.getElementById(id).value;
    return value;
}

const resetForm=()=>{
    setValue('#name','');
    unsetSelectedValues('[name=profile]');
    unsetSelectedValues('[name=gender]');
    unsetSelectedValues('[name=department]');
    setValueSalaryMethod('#salary','');
    setValueSalaryMethod('.salary-output text','');
    setValue('#notes','');
    setValue('#day','1');
    setValue('#month','January');
    setValue('#year','2020');
}

const unsetSelectedValues=(propertyValue)=>{
    let allItems=document.querySelectorAll(propertyValue);
    allItems.forEach(item=>{
        item.checked=false;
    });
}

const setValueSalaryMethod=(id,value)=>{
    var salary = document.querySelector('#salary');
    var output = document.querySelector('.salary-output');
    output.textContent = salary.value;
    const element=document.querySelector(id);
    element.value=value;
}


const setValue=(id,value)=>{
    const element=document.querySelector(id);
    element.value=value;
}