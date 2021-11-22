$(function () {

    $.validator.addMethod("less", function (value, element, params) {
        return this.optional(element) || value <= params[0].value; //checks to make sure that the starts are less than the finishes, learned from
    });                                                           // https://jqueryvalidation.org/jQuery.validator.addMethod/

    var valid = $('input[value="Submit"]').on("click", function () {
        $("#FormInput").validate({
            onkeyup: false,     //this makes it so the validator doesnt update the error messages whenever new input is typed. only validates when submit is hit.
            onfocusout: false,  //learned about onkeyup, and onfocusout at https://www.sitepoint.com/jquery-validation-validate-form-submit/
            rules: {
                MultiplierStart: {
                    digits: true,
                    less: $('input[name="MultiplierFinish"]'),
                    required: true,
                    range: [-50, 50]
                },
                MultiplierFinish: {
                    required: true,
                    digits: true,
                    range: [-50, 50]
                },

                MultiplicandStart: {
                    digits: true,
                    less: $('input[name="MultiplicandFinish"]'),
                    required: true,
                    range: [-50, 50]
                },

                MultiplicandFinish: {
                    digits: true,
                    required: true,
                    range: [-50, 50]
                }
            },

            messages: {
                MultiplierStart: {
                    digits: "Multiplier Start must be a digit",
                    required: "Multiplier Start must be a digit between -50 and 50",
                    range: "The range of Multiplier Start must stay within -50 and 50",
                    less: "The value of Multiplier Start must be less than or equal to Multiplier Finish."
                },

                MultiplierFinish: {
                    digits: "Multiplier Finish must be a digit",
                    required: "Multiplier Finish must be a digit between -50 and 50",
                    range: "The range of Multiplier Finish must stay within -50 and 50",
                },

                MultiplicandStart: {
                    digits: "Multiplicand Start must be a digit",
                    required: "Multiplicand Start must be a digit between -50 and 50",
                    range: "The range of Multiplicand Start must stay within -50 and 50",
                    less: "The value of Multiplicand Start must be less than or equal to Multiplicand Finish."
                },

                MultiplicandFinish: {
                    digits: "Multiplicand Finish must be a digit",
                    required: "Multiplicand Finish must be a digit between -50 and 50",
                    range: "The range of Multiplicand Finish must stay within -50 and 50",
                }
            },
            
            errorPlacement: function (error, element) {
                $(error).appendTo($(('#FormInput')));
            },
            errorElement: "p"
            
        });
    
        if ($("#FormInput").valid()) {
            
        }
    
    });

});

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
    

