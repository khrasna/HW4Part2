$(function () {
    
    var valid = $("#FormInput").validate({
            onkeyup: false,     //this makes it so the validator doesnt update the error messages whenever new input is typed. only validates when submit is hit.
            onfocusout: false,  //learned about onkeyup, and onfocusout at https://www.sitepoint.com/jquery-validation-validate-form-submit/
            rules: {
                MultiplierStart: {
                    less1: true,
                    required: true,
                    range: [-50, 50]
                },
                MultiplierFinish: {
                    less1: true,
                    required: true,
                    range: [-50, 50]
                },

                MultiplicandStart: {
                    less2: true,
                    required: true,
                    range: [-50, 50]
                },

                MultiplicandFinish: {
                    less2: true,
                    required: true,
                    range: [-50, 50]
                }
            },

            messages: {
                MultiplierStart: {
                    digit: "Multiplier Start must be a digit",
                    required: "Multiplier Start must be a digit between -50 and 50",
                    range: "The range of Multiplier Start must stay within -50 and 50",
                    less1: "The value of Multiplier Start must be less than or equal to Multiplier Finish."
                },

                MultiplierFinish: {
                    digit: "Multiplier Finish must be a digit",
                    required: "Multiplier Finish must be a digit between -50 and 50",
                    range: "The range of Multiplier Finish must stay within -50 and 50",
                    less1: "The value of Multiplier Start must be less than or equal to Multiplier Finish."
                },

                MultiplicandStart: {
                    digit: "Multiplicand Start must be a digit",
                    required: "Multiplicand Start must be a digit between -50 and 50",
                    range: "The range of Multiplicand Start must stay within -50 and 50",
                    less2: "The value of Multiplicand Start must be less than or equal to Multiplicand Finish."
                },

                MultiplicandFinish: {
                    digit: "Multiplicand Finish must be a digit",
                    required: "Multiplicand Finish must be a digit between -50 and 50",
                    range: "The range of Multiplicand Finish must stay within -50 and 50",
                    less2: "The value of Multiplicand Start must be less than or equal to Multiplicand Finish."
                }
            },
            
            errorPlacement: function (error, element) {
                $(error).appendTo($(('#FormInput')));
            },
            errorElement: "p"
        });
    
    if (valid) {
        
    }
    
    });

    

