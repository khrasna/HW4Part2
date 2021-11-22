var tabcount;

$(function () {
    $("#tabs").tabs();

    $("#slider-1").slider({
        min: -50,                       //initialize the four sliders to set the values of their respective input boxes
        max: 50,
        slide: function (event, ui) {
            $('input[name="MultiplierStart"]').val(ui.value);
        }
    });
    $("#slider-2").slider({
        min: -50,
        max: 50,
        slide: function (event, ui) {
            $('input[name="MultiplierFinish"]').val(ui.value);
        }
    });
    $("#slider-3").slider({
        min: -50,
        max: 50,
        slide: function (event, ui) {
            $('input[name="MultiplicandStart"]').val(ui.value);
        }
    });
    $("#slider-4").slider({
        min: -50,
        max: 50,
        slide: function (event, ui) {
            $('input[name="MultiplicandFinish"]').val(ui.value);
        }
    });

    $('input[name="MultiplierStart"]').on('keyup', function () { //if the input boxes values are changed, set the slider to that value
        $("#slider-1").slider("option", "value", $('input[name="MultiplierStart"]').val());
    });

    $('input[name="MultiplierFinish"]').on('keyup', function () { 
        $("#slider-2").slider("option", "value", $('input[name="MultiplierFinish"]').val());
    });

    $('input[name="MultiplicandStart"]').on('keyup', function () { 
        $("#slider-3").slider("option", "value", $('input[name="MultiplicandStart"]').val());
    });

    $('input[name="MultiplicandFinish"]').on('keyup', function () { 
        $("#slider-4").slider("option", "value", $('input[name="MultiplicandFinish"]').val());
    });
    

    $.validator.addMethod("less", function (value, element, params) {
        if (params[0].value == "") {
            return true; // dont want it to say that the start has to be greater than finish if no finish given. instead it will say to give finish value in other error
        } else {
            return this.optional(element) || +value <= +params[0].value;
            
        } //checks to make sure that the starts are less than the finishes, learned from
    });                                                           // https://jqueryvalidation.org/jQuery.validator.addMethod/

    $('input[value="Submit"]').on("click", function () {

        $("#FormInput").validate({
            onkeyup: false,     //this makes it so the validator doesnt update the error messages whenever new input is typed. only validates when submit is hit.
            onfocusout: false,  //learned about onkeyup, and onfocusout at https://www.sitepoint.com/jquery-validation-validate-form-submit/
            rules: {
                MultiplierStart: {
                    range: [-50, 50],
                    less: $('input[name="MultiplierFinish"]'),
                    required: true
                    
                },
                MultiplierFinish: {
                    required: true,
                    range: [-50, 50]
                },

                MultiplicandStart: {
                    range: [-50, 50],
                    less: $('input[name="MultiplicandFinish"]'),
                    required: true
                },

                MultiplicandFinish: {
                    range: [-50, 50],
                    required: true
                }
            },

            messages: {
                MultiplierStart: {
                    required: "Multiplier Start must be a digit between -50 and 50",
                    range: "The range of Multiplier Start must stay within -50 and 50 and only contain numerical digits",
                    less: "The value of Multiplier Start must be less than or equal to Multiplier Finish."
                },

                MultiplierFinish: {
                    required: "Multiplier Finish must be a digit between -50 and 50",
                    range: "The range of Multiplier Finish must stay within -50 and 50 and only contain numerical digits",
                },

                MultiplicandStart: {
                    required: "Multiplicand Start must be a digit between -50 and 50",
                    range: "The range of Multiplicand Start must stay within -50 and 50 and only contain numerical digits",
                    less: "The value of Multiplicand Start must be less than or equal to Multiplicand Finish."
                },

                MultiplicandFinish: {
                    required: "Multiplicand Finish must be a digit between -50 and 50",
                    range: "The range of Multiplicand Finish must stay within -50 and 50 and only contain numerical digits",
                }
            },
            
            errorPlacement: function (error, element) {
                $(error).appendTo($(('#FormInput')));
            },
            errorElement: "p"
            
        });
    
        if ($("#FormInput").valid()) {
            process();
        }
    
    });

    $('input[name="clear"]').on("click", function () {
        console.log(tabcount);
    });

});

function process() {
    var multStart = $('input[name="MultiplierStart"]').val();
    var multFinish = $('input[name="MultiplierFinish"]').val();
    var multiplicandStart = $('input[name="MultiplicandStart"]').val();
    var multiplicandFinish = $('input[name="MultiplicandFinish"]').val();

     //clear old table and create a table with size based on input given
    const rowVals = [];
    const colVals = []; //these will hold the values of the multiplier and multiplicand
    var rows = multFinish - multStart;
    var cols = multiplicandFinish - multiplicandStart;
    var tabs = $("#tabs ul li").length + 1; //number of tabs, learned from https://stackoverflow.com/questions/14702631/in-jquery-ui-1-9-how-do-you-create-new-tabs-dynamically
    for (var i = 0; i <= cols; i++) {
        colVals[i] = (+multiplicandStart + +i); //save the values of the numbers being multiplied
    }
    for (var i = 0; i <= rows; i++) {
        rowVals[i] = (+multStart + +i);
    }
    var table = createTable(rows, cols, rowVals, colVals); //create table based on total rows and cols, and top and left are the sets of multipliers and multiplicands
    table.id = "multTable";
    //adds list item to tab list with parameters as title
    $("#tabs ul").append("<li><a href='#tab" + tabs + "'>" + multStart + " " + multFinish + " " + multiplicandStart + " " + multiplicandFinish + "</a></li>");
    $("#tabs").append("<div id='tab" + tabs + "'></div>"); //also learned from https://stackoverflow.com/questions/14702631/in-jquery-ui-1-9-how-do-you-create-new-tabs-dynamically
    $("#tab" + tabs).append(table); //adds the table to a new tab
    $("#tabs").tabs("refresh");
    tabcount = tabs;
    
}

function createTable(rows, cols, rowVals, colVals) {
    var t = document.createElement('table');
    for (var x = 0; x <= rows + 1; x++) { // rows and cols + 1 to indicate ranges of numbers
        var r = document.createElement('tr');
        t.appendChild(r);
        for (var y = 0; y <= cols + 1; y++) {   //creates the cols of the table row by row
            if (y == 0) {
                var c = document.createElement('th'); //create and insert element based on position in table
                c.id = "topHeader";
                if (x != 0) {
                    c.innerHTML = rowVals[x - 1]; // - 1 because it is moved over 1 to the right
                }
            } else if (x == 0) {
                var c = document.createElement('th');
                if (y != 0) {
                    c.innerHTML = colVals[y - 1];
                }
            } else {
                var c = document.createElement('td');
                c.innerHTML = rowVals[x - 1] * colVals[y - 1];
                if (((y % 2) + (x % 2)) == 0 || ((y % 2) + (x % 2)) == 2) { // checker board effect
                    c.style.backgroundColor = "gray";
                }
            }
            r.appendChild(c);
        }
    }
    return t;
}

