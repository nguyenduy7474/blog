function sendData(){
    data = {
        email: $("#email").val(),
        password: $("#password").val()
    }

    $.ajax({
        type: "POST",
        url: "/authen",
        data: data,
        success: function(data){
            if(data.failed == "1"){
                $("#errorcode").html("Wrong email or password");
            }
            if(data.success == "1"){
                window.location.href="/login"
            }        
        }
    })
}
