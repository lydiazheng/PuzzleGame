//global variavles
var tableHeight, tableWidth;
var arr = [], left_side = [], table_head = [];
var check_arr = [];
var leftSide_html = "";
var tableHead_html = "";
var map_html_tr = "";
var map_html_td = "";

// initialize the puzzle board when the webpage is first loaded
window.onload = function() {
    showSmallPuzzle(12, 12);
}

//create a table
function showSmallPuzzle(row, col){
    clearMap(); //check if the button of graph is not unmarked

    // create a 2-dimensional array for puzzle table
    // and set random number for the puzzle value
    // 1 == marked(correct cell). 0 == unmarked(empty cell)
    tableHeight = row, tableWidth = col;
    arr = [], left_side = [], table_head = [];
    for(i = 0; i < tableHeight; i++) {
        arr[i] = [];
        check_arr[i] = [];
        left_side[i] = [];
        table_head[i] = [];
        for(j = 0; j < tableWidth; j++) {
            arr[i][j] = Math.round(Math.random());
            check_arr[i][j] = 0;
        }
    }

    // get table left side value
    var count = 0;
    for(i = 0; i < tableHeight; i++){
        for(j = 0; j < tableWidth; j++) {
            if(arr[i][j] == 1){
                if(left_side[i][count] == NaN || left_side[i][count] == undefined) 
                    left_side[i][count] = 0;
                left_side[i][count]++;
            }
            else if(arr[i][j] == 0){
                count++;                      
            }
        }
        count = 0;
    }

    // get table header value
    count = 0;
    for(i = 0; i < tableHeight; i++){
        for(j = 0; j < tableWidth; j++) {
            if(arr[j][i] == 1){
                if(table_head[i][count] == NaN || table_head[i][count] == undefined) 
                    table_head[i][count] = 0;
                table_head[i][count]++;
            }
            else if(arr[j][i] == 0){
                count++;                      
            }
        }
        count = 0;
    }

    // convert array to the string 
    for(i = 0; i < left_side.length; i++ ){
        left_side[i] = left_side[i].toString();
        left_side[i] = left_side[i].replace(/,/g , " ");
        if(left_side[i] == '')
            left_side[i] = '0';
        table_head[i] = table_head[i].toString();
        table_head[i] = table_head[i].replace(/,/g , " ");
        if(table_head[i] == '')
            table_head[i] = '0';
    }

    console.log('arr', arr, '\n');
    console.log("left_side", left_side, '\n');
    console.log("table_head", table_head, '\n');

    tableHead_html = "<th></th>";
    for(i = 0; i < table_head.length; i++){
         tableHead_html = tableHead_html+"<th>"+table_head[i]+"</th>";
    }
    document.getElementById("tableHeader").innerHTML = tableHead_html;

    for(i = 0; i < tableHeight; i++){
        for(j = 0; j < tableWidth; j++) {
            map_html_td = map_html_td + "<td><button class='tdBtn' onclick='changeBtnColor("+i+","+j+")' id='cellBtn"+i+"-"+j+"'></button>"+ "</td>";
        }
        map_html_tr =  map_html_tr + "<tr>" + "<th>"+left_side[i]+"</th>"+map_html_td +"</tr>";
        map_html_td = "";
    }
    document.getElementById("puzzleMap").innerHTML = map_html_tr;
}

//customize input
function showInput(){
    var showInput = document.getElementById("input");
    if(showInput.style.display == ""){
        showInput.style.display = "block";
    }
    else
        showInput.style.display = "";
}

function custom(){
    row = document.getElementById("row").value;
    var showInput = document.getElementById("input");
    if(showInput.style.display == "block"){
        showInput.style.display = "";
    }
    console.log(row);
    showSmallPuzzle(row, row);
}

// clear the whole map
function clearMap(){
    var reset = document.getElementById("reset"); // put the reset button back
    console.log(reset)
    if (reset.style.display == "none") 
        reset.style.display = "block";
    document.getElementById("alert").innerHTML = ""; // remove the alert
    console.log("check_arr", check_arr)
    if(check_arr != undefined && check_arr != []){
        for(i = 0; i < tableHeight; i++) {
            for(j = 0; j < tableWidth; j++) {
                var cellBtn = document.getElementById("cellBtn"+i+"-"+j);
                cellBtn.style.backgroundColor = "";
                cellBtn.disabled = false;
            }
        }
        arr = [];
        left_side = [];
        table_head = [];
        tableHeight = undefined;
        tableWidth = undefined;
        check_arr = [];
        leftSide_html = "";
        tableHead_html = "";
        map_html_tr = "";
        map_html_td = "";
    }
}

// change the color of button when user clicks it
function changeBtnColor(row, col){  
    console.log("changeBtnColor", row, col)
    var cellBtn = document.getElementById("cellBtn"+row+"-"+col);
    if(cellBtn.style.backgroundColor == ""){
        cellBtn.style.backgroundColor = "rgb(233, 150, 122)"; //grey
        check_arr[row][col] = 1;
    }
    else if(cellBtn.style.backgroundColor == "rgb(233, 150, 122)"){
        cellBtn.style.backgroundColor = "";
        check_arr[row][col] = 0;
    }
    console.log(row, col, cellBtn.style)
}

// alert 
function checkSuccess(){
    var isSuccess = 0;
    var succeed = tableHeight * tableWidth;
    console.log("check_arr", check_arr, "arr", arr)
    if(check_arr != undefined && check_arr.length != 0){
        for(i = 0; i < tableHeight; i++) {
            for(j = 0; j < tableWidth; j++) {
                if(check_arr[i][j] == arr[i][j])
                    isSuccess++;
            }
        }
        console.log(succeed, isSuccess)
        if(succeed == isSuccess)
            document.getElementById("alert").innerHTML = "<br><strong id='successMsg'>Success! You found the correct solution.</strong>";
        else
            document.getElementById("alert").innerHTML = "<br><strong id='wrongMsg'>Wrong! Please try again!</strong>";
    }
    else
        document.getElementById("alert").innerHTML = "<br><strong id='wrongMsg'>Wrong! Please try again!</strong>";
}

// reset button
function refresh(){
    if(check_arr != undefined){
        for(i = 0; i < tableHeight; i++) {
            for(j = 0; j < tableWidth; j++) {
                var cellBtn = document.getElementById("cellBtn"+i+"-"+j);
                cellBtn.style.backgroundColor = "";
                cellBtn.disabled = false;
                check_arr[i][j] = 0;
            }
        }
    }
    document.getElementById("alert").innerHTML = "";
}

// reveal -- directly show the result
function showResult(){
    for(i = 0; i < tableHeight; i++) {
        for(j = 0; j < tableWidth; j++) {
            var cellBtn = document.getElementById("cellBtn"+i+"-"+j);
            if(arr[i][j] == 1){
                cellBtn.style.backgroundColor = "rgb(233, 150, 122)";
                check_arr[i][j] = 1;
            }
            else{
                cellBtn.style.backgroundColor = "";
                check_arr[i][j] = 0;
            }
        }
    }
    console.log("check_arr", check_arr, "arr", arr)
}

function hint(){
    console.log("innerHTML", tableHeight, tableWidth)
    var hint = 0;
    
    var lydia = "lydia";
    for(i = 0; i < tableHeight; i++) {
        for(j = 0; j < tableWidth; j++) {
            if(arr[i][j] != check_arr[i][j] && arr[i][j] == 1){
                while(hint < 1){
                    var cellBtn = document.getElementById("cellBtn"+i+"-"+j);
                    check_arr[i][j] = 1;
                    cellBtn.style.backgroundColor = "rgb(233, 150, 122)";
                    hint++;
                }
            }
            else if(arr[i][j] != check_arr[i][j] && arr[i][j] == 0){
                while(hint < 1){
                    var cellBtn = document.getElementById("cellBtn"+i+"-"+j);
                    check_arr[i][j] = 0;
                    cellBtn.style.backgroundColor = "";
                    hint++;
                }
            }
        }
    }

}

