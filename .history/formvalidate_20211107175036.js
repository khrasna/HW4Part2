$(function (){
    $("#FormInput").validate({
        rules: {
            MultiplierStart: {
                required: true,
                digit: true
            }
        }
    })
});