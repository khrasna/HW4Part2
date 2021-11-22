$(function (){
    $("#FormInput").validate({
        rules: {
            MultiplierStart: {
                required: true,
                digit: true,
                min: -50,
                max: 50
            }
        }
    })
});