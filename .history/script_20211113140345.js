//Created by Karsten Hrasna. email: Karsten_Hrasna@student.uml.edu
//Validate multiplier and multiplicand from FormInput
function process() {
    var multStart = document.forms["FormInput"]["Multiplier Start"].value;
    var multFinish = document.forms["FormInput"]["Multiplier Finish"].value;
    var multiplicandStart = document.forms["FormInput"]["Multiplicand Start"].value;
    var multiplicandFinish = document.forms["FormInput"]["Multiplicand Finish"].value;


    if (document.getElementById("multTable")) { //remove old table
            var old = document.getElementById("multTable");
            old.remove();
    };

     //clear old table and create a table with size based on input given
        const top = [];
        const left = []; //these will hold the values of the multiplier and multiplicand
        var rows = multFinish - multStart;
        var cols = multiplicandFinish - multiplicandStart;
        var d = document.getElementById("container");
        for (var i = 0; i <= rows; i++) {
            left[i] = (+multiplicandStart + +i); //the + before variable name turns them into integers for addition
        }
        for (var i = 0; i <= cols; i++) {
            top[i] = (+multStart + +i);
        }
        var table = createTable(rows, cols, top, left); //create table based on total rows and cols, and top and left are the sets of multipliers and multiplicands
        table.id = "multTable";
        d.append(table);
    

}

function createError(field) { //creates an error message to be displayed under the input form
    let p = document.createElement('p');
    p.innerHTML = "Input for " + field + " is invalid. Please input numeric values between -50 and 50.";
    p.className = "inputError";
    return p;
}

function createTable(rows, cols, top, left) {
    var t = document.createElement('table');
    for (var x = 0; x <= rows + 1; x++) { // rows and cols + 1 to indicate ranges of numbers
        var r = document.createElement('tr');
        t.appendChild(r);
        for (var y = 0; y <= cols + 1; y++) {   //creates the cols of the table row by row
            if (x == 0) {
                var c = document.createElement('th'); //create and insert element based on position in table
                c.id = "topHeader";
                if (y != 0) {
                    c.innerHTML = top[y - 1]; // - 1 because it is moved over 1 to the right
                }
            } else if (y == 0) {
                var c = document.createElement('th');
                if (x != 0) {
                    c.innerHTML = left[x - 1];
                }
            } else {
                var c = document.createElement('td');
                c.innerHTML = top[y - 1] * left[x - 1];
                if (((y % 2) + (x % 2)) == 0 || ((y % 2) + (x % 2)) == 2) { // checker board effect
                    c.style.backgroundColor = "gray";
                }

            }
            r.appendChild(c);
        }
    }

    return t;
}