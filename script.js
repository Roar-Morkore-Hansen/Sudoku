
// Rectangel grid x^2

const gridSize = 9

// Create 81 square grid and select the first tile 
let list = document.getElementById("girdList")

// Create grid
for (var i = 1; i <= gridSize*gridSize; i++) {
  let li = document.createElement("li");
  li.classList.add("cell")
  li.setAttribute("id", i)
  list.appendChild(li)
}

// Initial selected tile
document.getElementById("1").classList.toggle("selected")


// Pass or fail

function right() {
  document.getElementById("passOrFail").style.color = "green";
  document.getElementById("passOrFail").innerHTML = "korrekt! :)";
};

function wrong() {
  document.getElementById("passOrFail").style.color = "red";
  document.getElementById("passOrFail").innerHTML = "skeift! :P";
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
  //BRUKA MOD
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


//Check if grid is full. 
function fullGrid() {
  for (var i = 1; i <= 81; i++) {
    if (document.getElementById(i).textContent == "") {
      break
    } else if (i == 81) {
      grid_tjekk();
    }
  }
}


//Fetch Data from text file  
function fetchData() {
  fetch('sudoku_data.txt')
    .then(response => response.text())
    .then(data => {
      var dataArray = data.split(",");
      fillGrid(dataArray[Math.floor(Math.random() * dataArray.length)]);
    })
};

//setur data inn í krossskiptan
function fillGrid(sudoku_array) {
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

fetchData()
//fillGrid("679518243543729618821634957794352186358461729216897534485276391962183475137945860");
fullGrid()


// Select tile with id
function select(id){
  var cell_new = id;
  var cell_prev = document.querySelector(".selected").id;
  document.getElementById(cell_prev).classList.toggle("selected");
  document.getElementById(cell_new).classList.toggle("selected");
};

// Insert sting to tile
function insert(str) {
  document.querySelector(".selected").innerHTML = str;
  document.querySelector("p").innerHTML = "";
  fullGrid();
}

// Select tile that mouse clicks on
document.querySelectorAll(".su_cell").forEach(item => {
  item.addEventListener("click", event => {
    select(event.target.id)
  })
});

// When key is pressed
document.onkeydown = checkKey;

function checkKey(event) {

  var selected_element = document.querySelector(".selected");
  var selected_id = parseInt(selected_element.id);

  if (["1","2","3","4","5","6","7","8","9"].includes(event.key) == true && selected_element.className.split(" ").includes("fast") == false){
    insert(event.key)
  } else if (event.key == "Backspace" && selected_element.className.split(" ").includes("fast") == false){
    insert("")
  } else if (event.key == "ArrowUp" && selected_id > 9) {
    select(selected_id - 9)
  } else if (event.key == "ArrowDown" && selected_id < 73) {
    select(selected_id + 9)
  } else if (event.key == "ArrowLeft" && selected_id > 1 && (selected_id % 9) !== 1) {
    select(selected_id - 1)
  } else if (event.key == "ArrowRight" && selected_id < 81 && (selected_id % 9) !== 0) {
    select(selected_id + 1)
  }
};

// background-color: rgb(230, 197, 0);