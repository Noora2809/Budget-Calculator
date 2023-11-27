function getStarted() {
  window.location = "./register.html";
}

function registerUser() {
  const userData = {
    username: uname.value,
    emailid: email.value,
    password: pwd.value,
  };
  if(uname.value == "" || email.value == "" || pwd.value == "")
  {
    alert("Please fill the form");
  }
  else{
    if(userData.emailid in localStorage)
    {
      alert("User already exists");
    }else{
            
        localStorage.setItem(userData.emailid, JSON.stringify(userData));
        localStorage.setItem("USERNAME", userData.username); 
        alert("User details added");
        window.location = "./login.html";
    }
}
}

function signIn() {
  window.location = "./login.html";
}

function loginUser() {
  emailid = email1.value;
  password = pwd1.value;

  if (emailid === "" || password === "") {
    alert("Please fill the form");
    return;
}

  if (emailid in localStorage) {
    let accountDetails = JSON.parse(localStorage.getItem(emailid));

    if (password == accountDetails.password) {
      alert("Login successful");
      localStorage.setItem("CURRENT-USER", JSON.stringify(accountDetails));
      window.location = "./userpage.html";
    } else {
      alert("Incorrect password");
    }
  } else {
    alert("User is not registered....");
  }
}

function logOut() {
  window.location = "./login.html";
  alert("Thank you...Visit Again😊😊😊");
}



let username = localStorage.getItem("USERNAME");
console.log(username);
headUser.innerHTML = `<h3>Welcome ${username}</h3>`;


let total = 0
function addIncome() {
  const incomeAdd = {
    description: des1.value,
    income: parseFloat(amt1.value)
  };
  if (incomeAdd.income <= 0 || isNaN(incomeAdd.income)) {
    alert("Please enter a valid amount");
    return;
  }

//   localStorage.setItem(incomeAdd.description, JSON.stringify(incomeAdd));

  total += incomeAdd.income
  alert("income added")
  displayBalance()

  var table = document.getElementById("inc-table");

  // Create an empty <tr> element and add it to the 1st position of the table:
  var row = table.insertRow(2);

  // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);

  // Add some text to the new cells:
  cell1.innerHTML = incomeAdd.description;
  cell2.innerHTML = incomeAdd.income;
  cell3.innerHTML = displayBalance()
  
  }

function addExpense() {
  const expenseAdd = {
    description: des2.value,
    expense: parseFloat(amt2.value), // Parse the expense value as a float
  };
  if (expenseAdd.expense <= 0 || isNaN(expenseAdd.expense)) {
    alert("Please enter a valid amount");
    return;
  }

  const currentUser = JSON.parse(localStorage.getItem("CURRENT-USER"));

  if (expenseAdd.expense > total) {
    alert("Insufficient balance");
  } else {
    total -= expenseAdd.expense;
    alert("Amount taken");
    displayBalance();
  }
  var table = document.getElementById("exp-table");

            // Create an empty <tr> element and add it to the 1st position of the table:
            var row = table.insertRow(2);

            // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2)

            // Add some text to the new cells:
            cell1.innerHTML = expenseAdd.description;
            cell2.innerHTML = expenseAdd.expense;
            cell3.innerHTML = displayBalance()
}

function displayBalance() {
    result.innerHTML = `<h3 class="my-5 text-success">Your savings is : $${total}</h3>`;
    return `${total}`; // Return the formatted balance as a string
  }
