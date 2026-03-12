const arr = [];
let filteredStudents = [];
const nameInput = document.querySelector("#name");
const scoreInput = document.querySelector("#score");
const btn_Add = document.querySelector(".btn_add");
const tbody = document.querySelector("tbody");
const stat = document.querySelector("#stat");

function getRank(score){
    if(score >= 8.5) return "Giỏi";
    if(score >= 7) return "Khá";
    if(score >= 5) return "Trung bình";
    return "Yếu";
}

function renderTable(){
    tbody.innerHTML = "";
    let sum = 0;
    filteredStudents.forEach((sv,index)=>{
        sum += sv.score;
        let tr = document.createElement("tr");
        if(sv.score < 5){
            tr.style.backgroundColor = "yellow";
        }
        tr.innerHTML = `
        <td>${index+1}</td>
        <td>${sv.name}</td>
        <td>${sv.score}</td>
        <td>${getRank(sv.score)}</td>
        <td>
            <button class="btn_delete" data-index="${index}">
                Xóa
            </button>
        </td>
        `;
        tbody.appendChild(tr);
    });
    let avg = filteredStudents.length ? (sum/filteredStudents.length).toFixed(2) : 0;
    stat.innerHTML = `
            <td colspan="2">Tổng số sinh viên: ${arr.length} </td>
            <td colspan="3">Điểm TB: ${avg} </td>
        `;
}

btn_Add.addEventListener("click",addStudent);
function addStudent(e){
    if(e) e.preventDefault();
    let name = nameInput.value.trim();
    let score = parseFloat(scoreInput.value);
    if(name === ""){
        alert("Họ tên không hợp lệ");
        return;
    }
    if(score < 0 || score > 10){
        alert("Điểm số không hợp lệ");
        return;
    }
    arr.push({name: name, score: score});
    applyFilters();

    nameInput.value = "";
    scoreInput.value = "";
    nameInput.focus();
}

scoreInput.addEventListener("keypress",function(e){
    if(e.key === "Enter"){
        e.preventDefault();
        addStudent();
    }
});

tbody.addEventListener("click",function(e){
    if(e.target.classList.contains("btn_delete")){
        let index = e.target.dataset.index;
        let student = filteredStudents[index];
        let realIndex = arr.indexOf(student);
        arr.splice(realIndex,1);
        applyFilters();
    }
});

const inputSearchName = document.querySelector("#search_name");
const rankScore = document.querySelector("#rank_score");
const sortScore = document.querySelector("#sort_score")
let sortDirection = null;

function applyFilters(){
    let searchValue = inputSearchName.value.toLowerCase();
    let rank = rankScore.value;
    filteredStudents = arr.filter(sv => {
        let keyName = sv.name.toLowerCase().includes(searchValue);
        let keyRank = getRank(sv.score) === rank || rank === "all";
        return keyName && keyRank;
    });

    if(sortDirection === "asc"){
        filteredStudents.sort((a,b)=> a.score - b.score);
    }

    if(sortDirection === "desc"){
        filteredStudents.sort((a,b)=> b.score - a.score);
    }

    renderTable();
}

inputSearchName.addEventListener("input",applyFilters);
rankScore.addEventListener("change",applyFilters);
sortScore.addEventListener("click",function(){
    if(sortDirection === "asc"){
        sortDirection = "desc";
        sortScore.innerHTML = "Điểm ▼";
    }else{
        sortDirection = "asc";
        sortScore.innerHTML = "Điểm ▲";
    }

    applyFilters();
});



