$(function (){
    $("#FormInput").validate({
        rules: {
            MultiplierStart: {
                required: true,
                digit: true,
                min: -50,
                max: 50
            },
            MultiplierFinish: {
                required: true,
                digit: true,
                min: -50,
                max: 50
            },

            MultiplicandStart: {
                required: true,
                digit: true,
                min: -50,
                max: 50
            },

            MultiplicandFinish: {
                required: true,
                digit: true,
                range: [-50,50]
            }
        }
    })
});