
//create 81 square grid with the first tile as selected
let list = document.getElementById("girdList")

for (var i = 1; i < 82; i++) {
    let li = document.createElement("li");
    li.classList.add("su_cell")
    li.setAttribute("id", i)
    list.appendChild(li);
}

document.getElementById("1").classList.toggle("selected")



function right() {
  document.querySelector("p").style.color = "green";
  document.querySelector("p").innerHTML = "korrekt! :)";
  party.confetti(document.querySelector("ul"));
};

function wrong() {
  console.log("rang")
  document.querySelector("p").style.color = "red";
  document.querySelector("p").innerHTML = "skeift! :P";
};

correct_array = ["1","2","3","4","5","6","7","8","9"];

function tjekk(arr){
  tjekk_arr = arr.sort();
  for (var i = 0; i < correct_array.length; i++) {
    if (String(correct_array[i]) !== String(tjekk_arr[i])){
      return "wrong"
    }
  }
  return "correct"
};

function grid_tjekk() {
  //tjekka um loddrættrað er rætt
  for (var v = 1; v < 10; v++) {
    var num_arr = [];
    for (var l = 0; l < 9; l++) {
      var id_num = v + (9 * l)
      num_arr.push(document.getElementById(id_num).textContent)
    }
    if (tjekk(num_arr) == "wrong") {
      wrong()
      return
    };
  };
  //tjekka um vatnrættrað er rætt
  for (var l = 0; l < 9; l++) {
    var num_arr = []
    for (var v = 1; v < 10; v++) {
      id_num = v + (9 * l)
      num_arr.push(document.getElementById(id_num).textContent)
    }
    if (tjekk(num_arr) == "wrong") {
      wrong()
      return
    };
  };
  //tjekka um boks er rætt
  for (var y = 0; y < 3; y++) {
    for (var i = 0; i < 3; i++) {
      var num_arr = []
      for (var x = 0; x < 3; x++) {
        for (var t = 1; t < 4; t++) {
          var id_num = (t + (9 * x) + (3 * i + (27 * y)))
          num_arr.push(document.getElementById(id_num).textContent)
          //console.log(`${id_num} = ${t} + (3 * ${i} + 27 * ${y}) + (9 * ${x})`)
          //console.log(document.getElementById(id_num).textContent)
        }
      }
      if (tjekk(num_arr) == "wrong") {
        wrong()
        return
      }
    }
  };
  //console.log(boks_arr,vandret_arr,loddret_arr)
  right()
};

function x_tjekk() {
  for (var i = 1; i < 82; i++) {
    if (document.getElementById(i).textContent == "") {
      break
    } else if (i == 81) {
      grid_tjekk();
    }
  }
}

function fetchdata() {
  fetch('sudoku_data.txt')
    .then(response => response.text())
    .then(data => {
      var data_arr = data.split(",");
      fillgrid(data_arr[Math.floor(Math.random() * data_arr.length)]);
    })
};

//setur data inn í krossskiptan
function fillgrid(sudoku_array) {
  for (var i = 0; i < document.querySelectorAll(".su_cell").length; i++) {
    var cell = document.getElementById(i+1)
    if (sudoku_array[i] == "0") {
      cell.innerHTML = "";
    } else {
      cell.innerHTML = sudoku_array[i];
      cell.classList.add("fast");
    }
  }
};

fetchdata()
//fillgrid("679518243543729618821634957794352186358461729216897534485276391962183475137945860");
x_tjekk()



function selectedfunction(id){
  var cell_new = id;
  var cell_prev = document.querySelector(".selected").id;
  document.getElementById(cell_prev).classList.toggle("selected");
  document.getElementById(cell_new).classList.toggle("selected");
};

function insert(str) {
  document.querySelector(".selected").innerHTML = str;
  document.querySelector("p").innerHTML = "";
  x_tjekk();
}

//ta mus verur tryst
document.querySelectorAll(".su_cell").forEach(item => {
  item.addEventListener("click", event => {
    selectedfunction(event.target.id)
  })
});

//ta knottur verur trystur
document.onkeydown = checkKey;

function checkKey(event) {
  //console.log(event);

  var selected_element = document.querySelector(".selected");
  var selected_id = parseInt(selected_element.id);

  if (["1","2","3","4","5","6","7","8","9"].includes(event.key) == true && selected_element.className.split(" ").includes("fast") == false){
    insert(event.key)
  } else if (event.key == "Backspace" && selected_element.className.split(" ").includes("fast") == false){
    insert("")
  } else if (event.key == "ArrowUp" && selected_id > 9) {
    selectedfunction(selected_id - 9)
  } else if (event.key == "ArrowDown" && selected_id <= 72) {
    selectedfunction(selected_id + 9)
  } else if (event.key == "ArrowLeft" && selected_id > 1 && [10,19,28,37,46,55,64,73].includes(selected_id) == false) {
    selectedfunction(selected_id - 1)
  } else if (event.key == "ArrowRight" && selected_id < 81 && [9,18,27,36,45,54,63,72,81].includes(selected_id) == false) {
    selectedfunction(selected_id + 1)
  }
};

// background-color: rgb(230, 197, 0);