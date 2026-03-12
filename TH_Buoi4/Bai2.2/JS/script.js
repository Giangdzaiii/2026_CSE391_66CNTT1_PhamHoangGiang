const form = document.querySelector("#registerForm");
const inputNameProduct = document.querySelector("#productName");
const inputQuantity = document.querySelector("#productQuantity");
const inputDate = document.querySelector("#date");
const inputAddress = document.querySelector("#locationAddress");
const inputNote = document.querySelector("#note");
const selectMethod = document.querySelectorAll('input[name="method"]');
const charCount = document.querySelector("#charCount");

function capitalizeFirstLetter(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const prices = {
    smartPhone: 10000000,
    ipad: 15000000,
    computer: 30000000
};

function showError(id, message){
    document.getElementById(id).innerText = message;
}

function clearError(id){
    document.getElementById(id).innerText = "";
}

function validateNameProduct(){
    let name = inputNameProduct.value;

    if(name === "default"){
        showError("nameError","Chưa chọn sản phẩm");
        return false;
    }

    clearError("nameError");
    return true;
}

function validateQuantity(){
    let quantity = Number(inputQuantity.value);

    if(!Number.isInteger(quantity) || quantity < 1 || quantity > 99){
        showError("quantityError","Số lượng phải từ 1 đến 99");
        return false;
    }

    clearError("quantityError");
    return true;
}

function validateDate(){

    let date = inputDate.value;

    if(date === ""){
        showError("dateError","Vui lòng chọn ngày giao hàng");
        return false;
    }

    let today = new Date();
    today.setHours(0,0,0,0);

    let inputDateValue = new Date(date);

    let maxDate = new Date(today);
    maxDate.setDate(maxDate.getDate() + 30);

    if(inputDateValue < today){
        showError("dateError","Ngày giao hàng không được trong quá khứ");
        return false;
    }

    if(inputDateValue > maxDate){
        showError("dateError","Ngày giao hàng không được quá 30 ngày từ hôm nay");
        return false;
    }

    clearError("dateError");
    return true;
}

function validateAddress(){
    let address = inputAddress.value.trim();

    if(address === ""){
        showError("locationAddressError","Địa chỉ không được để trống");
        return false;
    }

    if(address.length < 10){
        showError("locationAddressError","Địa chỉ phải >= 10 ký tự");
        return false;
    }

    clearError("locationAddressError");
    return true;
}

function validateNote(){
    let note = inputNote.value.trim();

    if(note.length > 200){
        showError("noteError","Không quá 200 ký tự");
        return false;
    }

    clearError("noteError");
    return true;
}

function countCharacters(){
    let length = inputNote.value.length;

    charCount.innerText = length;

    if(length > 200){
        charCount.style.color = "red";
    }else{
        charCount.style.color = "black";
    }
}

function validateMethod(){
    let checked = false;

    selectMethod.forEach(m=>{
        if(m.checked){
            checked = true;
        }
    });

    if(!checked){
        showError("methodError","Phải chọn phương thức thanh toán");
        return false;
    }

    clearError("methodError");
    return true;
}

inputNameProduct.addEventListener("change", validateNameProduct);
inputQuantity.addEventListener("blur", validateQuantity);
inputDate.addEventListener("blur", validateDate);
inputAddress.addEventListener("blur", validateAddress);

inputNote.addEventListener("input",()=>{
    countCharacters();
    validateNote();
});

selectMethod.forEach(m=>{
    m.addEventListener("change", validateMethod);
});

inputQuantity.addEventListener("input",()=>clearError("quantityError"));
inputDate.addEventListener("input",()=>clearError("dateError"));
inputAddress.addEventListener("input",()=>clearError("locationAddressError"));

form.addEventListener("submit",(e)=>{

    e.preventDefault();

    let isValid =
    validateNameProduct() &&
    validateQuantity() &&
    validateDate() &&
    validateAddress() &&
    validateNote() &&
    validateMethod();

    if(isValid){

        let quantity = Number(inputQuantity.value);
        let productName = inputNameProduct.value;

        let total = prices[productName] * quantity;

        let money = total.toLocaleString("vi-VN");

        let inputDateValue = new Date(inputDate.value);
        let dateFormat = inputDateValue.toLocaleDateString("vi-VN");

        let result = document.createElement("div");
        result.classList.add("newForm");
        result.innerHTML = `
            <h3 class="newH3">Xác nhận đơn hàng</h3>
            <div class="newName">Tên sản phẩm: ${capitalizeFirstLetter(productName)}</div>
            <div class="newQuantity">Số lượng: ${quantity}</div>
            <div class="newSum">Tổng tiền: ${money}</div>
            <div class="newDate">Ngày giao: ${dateFormat}</div>

            <div class="newBtn">
                <button class="confirm" id="confirm">Xác nhận</button>
                <button class="cancel" id="cancel">Hủy</button>
            </div>
        `;

        form.style.display="none";

        document.querySelector(".form_container").appendChild(result);
    }
    const confirm = document.querySelector("#confirm");
    confirm.addEventListener("click",function(e){
    e.preventDefault();
    alert("Đặt hàng thành công");
});
});

