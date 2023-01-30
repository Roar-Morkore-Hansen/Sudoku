// Fetch Data from text file  
function fetch_data() {
  fetch('sudoku_data.txt')
    .then(response => response.text())
    .then(data => {
      var dataArray = data.split(",");
      fill_grid(dataArray[Math.floor(Math.random() * dataArray.length)]);
    })
}

// Fill data into grid
function fill_grid(sudoku_array) {
  for (var i = 0; i < document.querySelectorAll(".cell").length; i++) {
    var cell = document.getElementById(i+1)
    if (sudoku_array[i] == "0") {
      cell.innerHTML = "";
    } else {
      cell.innerHTML = sudoku_array[i];
      cell.classList.add("fast");
    }
  }
};

// Pass or fail

function right() {
  document.getElementById("passOrFail").style.color = "green";
  document.getElementById("passOrFail").innerHTML = "korrekt! :)";
};

function wrong() {
  document.getElementById("passOrFail").style.color = "red";
  document.getElementById("passOrFail").innerHTML = "skeift! :P";
}

// Check if array is correct
correct_array = ["1","2","3","4","5","6","7","8","9"];
function check_array(arr){
  tjekk_arr = arr.sort();
  for (var i = 0; i < correct_array.length; i++) {
    if (String(correct_array[i]) !== String(tjekk_arr[i])){
      return false
    }
  }
  return true
}

// Check if all digits are correct
function grid_check() {
  // Check if all rows have no repeates
  for (var row = 1; row <= 9; row++) {
    var num_arr = [];
    for (var collumn = 0; collumn <= 8; collumn++) {
      var id_num = row + (9 * collumn)
      num_arr.push(document.getElementById(id_num).textContent)
    }
    if (check_array(num_arr) == false) {
      wrong()
      return
    }
  }
  // Check if all collumns have no repeates
  for (var collumn = 0; collumn <= 8; collumn++) {
    var num_arr = []
    for (var row = 1; row <= 9; row++) {
      id_num = row + (9 * collumn)
      num_arr.push(document.getElementById(id_num).textContent)
    }
    if (check_array(num_arr) == false) {
      wrong()
      return
    }
  }
  // Check if all boxes have no repeates
  for (var box_y_offset = 0; box_y_offset <= 2; box_y_offset++) { //box_y_offset
    for (var box_x_offset = 0; box_x_offset <= 2; box_x_offset++) { //box_x_offset
      var num_arr = []
      for (var row = 0; row <= 2; row++) { //row
        for (var collumn = 1; collumn <= 3; collumn++) {//collumn
          var id_num = (collumn + (9 * row) + (3 * box_x_offset + (27 * box_y_offset)))
          num_arr.push(document.getElementById(id_num).textContent)
          //console.log(`${id_num} = ${collumn} + (3 * ${box_x_offset} + 27 * ${box_y_offset}) + (9 * ${row})`)
          //console.log(`box coordinate: (${box_x_offset}, ${box_y_offset}) - coordinate (${collumn}, ${row})`)
          //console.log(document.getElementById(id_num).textContent)
        }
      }
      if (check_array(num_arr) == false) {
        wrong()
        return
      }
    }
  }
  right()
}

//Check if grid is full. 
function full_grid() {
  for (var i = 1; i <= 81; i++) {
    if (document.getElementById(i).textContent == "") {
      break
    } else if (i == 81) {
      grid_check();
    }
  }
}

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
  full_grid();
}

// Select tile that mouse clicks on tile
document.querySelectorAll(".su_cell").forEach(item => {
  item.addEventListener("click", event => {
    select(event.target.id)
  })
});

// When key is pressed
document.onkeydown = function checkKey(event) {
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


// Create 81 square grid and select the first tile 

const grid_width = 9
const grid_size = grid_width*grid_width

let list = document.getElementById("girdList")

// Create grid
for (var i = 1; i <= grid_size; i++) {
  let li = document.createElement("li");
  li.classList.add("cell")
  li.setAttribute("id", i)
  list.appendChild(li)
}

// Initial selected tile
document.getElementById("1").classList.toggle("selected")

fetch_data()
//fill_grid("079518243543729618821634957794352186358461729216897534485276391962183475137945862");
full_grid()
