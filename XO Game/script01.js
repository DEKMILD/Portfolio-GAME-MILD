let btnRef = document.querySelectorAll(".button-option");
let popupRef = document.querySelector(".popup");
let newgameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("restart");
let msgRef = document.getElementById("message");
//ถ้าชนะ 
let winningPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [2, 5, 8],
  [6, 7, 8],
  [3, 4, 5],
  [1, 4, 7],
  [0, 4, 8],
  [2, 4, 6],
];
// ผู้เล่น X เล่นก่อน
let xTurn = true;
let count = 0;

//ปิดการใช้งานปุ่มทั้งหมด
const disableButtons = () => {
  btnRef.forEach((element) => (element.disabled = true));
  //enable popup
  popupRef.classList.remove("hide");
};

//ใช้งานทุกปุ่ม (สำหรับเริ่มเกมใหม่ กับ เริ่มอีกรอบ)
const enableButtons = () => {
  btnRef.forEach((element) => {
    element.innerText = "";
    element.disabled = false;
  });
  //disable popup
  popupRef.classList.add("hide");
};

//ฟังชันรูปแบบตอนผู้เล่นชนะ
const winFunction = (letter) => {
  disableButtons();
  if (letter == "X") {
    msgRef.innerHTML = "&#x1F389; <br>  X  ชนะ";
  } else {
    msgRef.innerHTML = "&#x1F389; <br>  O  ชนะ";
  }
};

//Function สำหรับคนเสมอ
const drawFunction = () => {
  disableButtons();
  msgRef.innerHTML = "&#x1F60E; <br> เสมอแล้วน้า";
};

//เริ่มเกมใหม่
newgameBtn.addEventListener("click", () => {
  count = 0;
  enableButtons();
});
restartBtn.addEventListener("click", () => {
  count = 0;
  enableButtons();
});

//ชนะ Logic
const winChecker = () => {
  //Loop การชนะทุกครั้ง
  for (let i of winningPattern) {
    let [element1, element2, element3] = [
      btnRef[i[0]].innerText,
      btnRef[i[1]].innerText,
      btnRef[i[2]].innerText,
    ];
    //เช็ค ถ้าองค์ประกอบช่องเต็ม
    //ถ้า 3 ช่ององค์ประกอบว่างเหมือนกัน เราจะต้องชนะ
    if (element1 != "" && (element2 != "") & (element3 != "")) {
      if (element1 == element2 && element2 == element3) {
        //ถ้าทั้ง3ช่องเท่ากัน จะส่งไป winFunction 
        winFunction(element1);
      }
    }
  }
};

//ช่อง X/O ในการคลิ้ก
btnRef.forEach((element) => {
  element.addEventListener("click", () => {
    if (xTurn) {
      xTurn = false;
      //ช่อง X
      element.innerText = "X";
      element.disabled = true;
    } else {
      xTurn = true;
      //ช่อง Y
      element.innerText = "O";
      element.disabled = true;
    }
    //จำนวนที่เพิ่มในแต่ละคลิ้ก
    count += 1;
    if (count == 9) {
      drawFunction();
    }
    //ตรวจการชนะในทุกการคลิ้ก
    winChecker();
  });
});
//เปิดการใช้งานปุ่มและปิดป้อบอัพในหน้าโหลด
window.onload = enableButtons;