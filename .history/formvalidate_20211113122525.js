$(function (){
    $('#FormInput').validate({
            rules: {
                MultiplierStart: {
                    required: true,
                    range: [-50, 50]
                },
                MultiplierFinish: {
                    required: true,
                    range: [-50, 50]
                },

                MultiplicandStart: {
                    required: true,
                    range: [-50, 50]
                },

                MultiplicandFinish: {
                    required: true,
                    range: [-50, 50]
                }
            },

            messages: {
                MultiplierStart: {
                    digit: "Multiplier Start must be a digit",
                    required: "Multiplier Start must be a digit between -50 and 50",
                    range: "The range of Multiplier Start must stay within -50 and 50"
                },

                MultiplierFinish: {
                    digit: "Multiplier Finish must be a digit",
                    required: "Multiplier Finish must be a digit between -50 and 50",
                    range: "The range of Multiplier Finish must stay within -50 and 50"
                },

                MultiplicandStart: {
                    digit: "Multiplicand Start must be a digit",
                    required: "Multiplicand Start must be a digit between -50 and 50",
                    range: "The range of Multiplicand Start must stay within -50 and 50"
                },

                MultiplicandFinish: {
                    digit: "Multiplicand Finish must be a digit",
                    required: "Multiplicand Finish must be a digit between -50 and 50",
                    range: "The range of Multiplicand Finish must stay within -50 and 50"
                }
           },
            
           

            errorPlacement: function (error, element) {
                $(error).appendTo($(('#inputError')));
            }
        });
});


