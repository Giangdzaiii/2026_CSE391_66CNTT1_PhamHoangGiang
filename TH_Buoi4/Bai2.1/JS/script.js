const form = document.querySelector("#registerForm");
const inputName = document.querySelector("#name");
const inputEmail = document.querySelector("#email");
const inputPhone = document.querySelector("#phone");
const inputPassword = document.querySelector("#password");
const inputConfirmPassWord = document.querySelector("#confirmPassword");

const genderInputs = document.querySelectorAll('input[name="gender"]');
const termCheckbox = document.querySelector("#term");
const btnSubmit = document.querySelector("#submit");

const nameCount = document.querySelector("#nameCount");
const togglePassword = document.querySelector("#togglePassword");
const strengthBar = document.querySelector("#strengthBar");

function showError(fieldId,message){
    document.querySelector("#" + fieldId + "Error").textContent = message;
}
function clearError(fieldId){
    document.querySelector("#" + fieldId + "Error").textContent = "";
}

function validateFullname(){
    let name = inputName.value.trim();
    let nameRegex = /^[a-zA-Z\s]{3,}$/;
    if(name === ""){
        showError("name","Không được để trống");
        return false;
    }
    if(!nameRegex.test(name)){
        showError("name","≥ 3 ký tự, chỉ chứa chữ cái và khoảng trắng");
        return false;
    }
    clearError("name");
    return true;
}

function validateEmail(){
    let email = inputEmail.value.trim();
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(email === ""){
        showError("email","Không được để trống");
        return false;
    }
    if(!emailRegex.test(email)){
        showError("email"," đúng định dạng name@domain.com");
        return false;
    }
    clearError("email");
    return true;
}

function validatePhone(){
    let phone = inputPhone.value;
    let phoneRegex = /^0[0-9]{9}$/;
    if(phone === ""){
        showError("phone","Không được để trống");
        return false;
    }
    if(!phoneRegex.test(phone)){
        showError("phone","10 chữ số, bắt đầu bằng 0");
        return false;
    }
    clearError("phone");
    return true;
}

function validatePassWord(){
    let passWord = inputPassword.value.trim();
    let passWordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if(passWord === ""){
        showError("password","Không được để trống");
        return false;
    }
    if(!passWordRegex.test(passWord)){
        showError("password","≥ 8 ký tự, có ít nhất 1 chữ hoa, 1 chữ thường, 1 số");
        return false;
    }
    clearError("password");
    return true;
}

function validateConfirmPassword(){
    let confirmPassWord = inputConfirmPassWord.value.trim();
    if(confirmPassWord !== inputPassword.value){
        showError("confirmPassword","Không giống với password");
        return false;
    }
    clearError("confirmPassword");
    return true;
}

function validateGender(){
    let checked = false;

    genderInputs.forEach(g=>{
        if(g.checked) checked = true;
    });

    if(!checked){
        showError("gender","Phải chọn giới tính");
        return false;
    }

    clearError("gender");
    return true;
}


function validateTerm(){
    if(!termCheckbox.checked){
        showError("term","Bạn phải đồng ý điều khoản");
        return false;
    }

    clearError("term");
    return true;
}

inputName.addEventListener("blur",validateFullname);
inputEmail.addEventListener("blur",validateEmail);
inputPhone.addEventListener("blur",validatePhone);
inputPassword.addEventListener("blur",validatePassWord);
inputConfirmPassWord.addEventListener("blur",validateConfirmPassword);
genderInputs.forEach(g=>{
    g.addEventListener("change",validateGender);
});
termCheckbox.addEventListener("change",validateTerm);

inputName.addEventListener("input",()=>clearError("name"));
inputEmail.addEventListener("input",()=>clearError("email"));
inputPhone.addEventListener("input",()=>clearError("phone"));
inputPassword.addEventListener("input",()=>clearError("password"));
inputConfirmPassWord.addEventListener("input",()=>clearError("confirmPassword"));
genderInputs.forEach(g=>{
    g.addEventListener("change",validateGender);
});
termCheckbox.addEventListener("change",()=>clearError("term"));

form.addEventListener("submit",function(e){
    let valid = validateFullname() & validateEmail() & validatePhone() & validatePassWord() &
    validateConfirmPassword() & validateGender() & validateTerm();
    if(!valid){
        e.preventDefault();
        return;
    }

    e.preventDefault();

    document.querySelector(".form_container").innerHTML =
        "<h2>Đăng ký thành công 🎉</h2>" +
        "<p>Chào mừng " + inputName.value + "</p>";
});

inputName.addEventListener("input", function(){
    let length = inputName.value.length;
    nameCount.textContent = length + "/50";
});

togglePassword.addEventListener("click", function(){

    if(inputPassword.type === "password"){
        inputPassword.type = "text";
    }else{
        inputPassword.type = "password";
    }

});

inputPassword.addEventListener("input", function(){

    let pass = inputPassword.value;
    let strength = 0;

    if(pass.length >= 6) strength++;
    if(pass.match(/[a-z]/) && pass.match(/[A-Z]/)) strength++;
    if(pass.match(/\d/) && pass.match(/[^a-zA-Z\d]/)) strength++;

    if(strength === 1){
        strengthBar.style.width = "33%";
        strengthBar.style.background = "red";
    }
    else if(strength === 2){
        strengthBar.style.width = "66%";
        strengthBar.style.background = "orange";
    }
    else if(strength === 3){
        strengthBar.style.width = "100%";
        strengthBar.style.background = "green";
    }
    else{
        strengthBar.style.width = "0%";
    }

});