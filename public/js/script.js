function SignIn(){
    let email = $("#email").val()
    let password = $("#password").val()

    data = {
        email: email,
        password: password
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

function forSignup(){
    let button = `<button type="submit" class="btn btn-primary" onclick="SignUp()">Sign up!</button>`
    let str = `<div class="form-group">
                        <label class="sr-only" for="form-username">Email</label>
                        <input type="text" name="name" required  placeholder="Name..." class="form-username form-control" id="name">
                    </div>
                    <div class="form-group">
                        <label class="sr-only" for="form-username">Email</label>
                        <input type="text" name="email" required  placeholder="Email..." class="form-username form-control" id="email">
                    </div>
                    <div class="form-group">
                        <label class="sr-only" for="form-password">Password</label>
                        <input type="password" required name="password" placeholder="Password..." class="form-password form-control" id="password">
                    </div>
                `
    $("#form").html(str);
    $("#buttonsignup").html(button);
}


function SignUp(){
    let email = $("#email").val()
    let password = $("#password").val()
    let name = $("#name").val()

    data = {
        name: name,
        email: email,
        password: password
    }

    $.ajax({
        type: "POST",
        url: "/signup",
        data: data,
        success: function(data){
            if(data.failed == "1"){
                $("#errorcode").html("Please input all fields");
            }
            if(data.success == "1"){
                $("#errorcode").html("Sign Up Successfull");
                let str = `
                    <div class="form-group">
                        <label class="sr-only" for="form-username">Email</label>
                        <input type="text" name="email" required  placeholder="Email..." class="form-username form-control" id="email">
                    </div>
                    <div class="form-group">
                        <label class="sr-only" for="form-password">Password</label>
                        <input type="password" required name="password" placeholder="Password..." class="form-password form-control" id="password">
                    </div>
                    <button type="submit" class="btn btn-success" onclick="SignIn()">Sign in!</button>`
                let button = ` <div class="col-sm-6 col-sm-offset-3 social-login">
                            <h3>...or sign up:<button type="submit" class="btn btn-primary" onclick="forSignup()">Sign up!</button></h3>
                        </div>`
                $("#form").html(str);
                $("#buttonsignup").html(button);
            }        
        }
    })
}

