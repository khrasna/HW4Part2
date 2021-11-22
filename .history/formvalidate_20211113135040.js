$(function () {

    $.validator.addMethod("less", function (value, element, params) {
        return this.optional(element) || value <= params[0].value; //checks to make sure that the starts are less than the finishes, learned from
    });                                                           // https://jqueryvalidation.org/jQuery.validator.addMethod/


    var valid = $("#FormInput").validate({
            debugger
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
    
    if (valid) {
        debugger;
    }
    
    });

    

