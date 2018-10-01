function showallpost(){
	let placetable = document.getElementById('placetable');
	let postplace = document.getElementById('postplace');
	let data = {
		type: "post"
	}

	$.ajax({
		type: "POST",
		url: "/getcontentdata",
		data: data,
		success: function(json){
			let data = json.found
			let str = `
					<br>
				  <h2 style="text-align:left;float:left;" id="type">All Post</h2>
				  <h2 style="text-align:right;float:right;">
				  	<button type="button" class="btn btn-success" onclick="newPost()">New Post</button>
				  </h2>
				  <table class="table">
				    <thead>
				      <tr>
				        <th>Tiêu Đề</th>
				        <th>Tác Giả</th>
				        <th>Mục</th>
				        <th>Ngày Đăng</th>
				        <th>Hành Động</th>
				      </tr>
				    </thead>
				    <tbody>`
			for(var i=0; i< data.length; i++){
				str += `
				      <tr>
				        <td style="width: 45%">`+ data[i].title +`</td>
				        <td>`+ data[i].author +`</td>
				        <td>`+ data[i].category +`</td>
				        <td>`+ data[i].date +`</td>
				        <td>
				        	<button type="button" class="btn btn-primary" onclick="editpost('`+ data[i]._id +`')">Edit</button>
				        	<button type="button" class="btn btn-danger" onclick="deletepost('`+ data[i]._id +`')">Delete</button>
				        </td>
				      </tr>
						`
			}

			str += `</tbody>
				  </table>`
			placetable.innerHTML= str;
			postplace.innerHTML = "";
		}
	})
}

function showallslide(){
	let placetable = document.getElementById('placetable');
	let postplace = document.getElementById('postplace');
	let data = {
		type: "slide"
	}
	$.ajax({
		type: "post",
		url: "/getcontentdata",
		data: data,
		success: function(json){
			let data = json.found

			let str = `
					<br>
				  <h2 style="text-align:left;float:left;" id="type">All Slides</h2>
				  <h2 style="text-align:right;float:right;">
				  	<button type="button" class="btn btn-success" onclick="newSlide()">New Slide</button>
				  </h2>
				  <table class="table">
				    <thead>
				      <tr>
				        <th>Tiêu Đề</th>
				        <th>Mục</th>
				        <th>Hành Động</th>
				      </tr>
				    </thead>
				    <tbody>`
			for(var i=0; i< data.length; i++){
				str += `
				      <tr>
				        <td style="width: 45%">`+ data[i].title +`</td>
				        <td>`+ data[i].category +`</td>
				        <td>
				        	<button type="button" class="btn btn-primary" onclick="editpost('`+ data[i]._id +`')">Edit</button>
				        	<button type="button" class="btn btn-danger" onclick="deletepost('`+ data[i]._id +`')">Delete</button>
				        </td>
				      </tr>
					`
			}

			str += `</tbody>
				  </table>`

			placetable.innerHTML= str;
			postplace.innerHTML = "";
		}
	})

}

function newSlide(){
	let postplace = document.getElementById('postplace');
	let str = `<div class="container">
		<h2 for="usr" style="font-family: 'Sans-serif', Times, serif;">Slide Mới</h2>
		<h4 id="error" style="color: red" ></h4>
	    <div class="form-group">
	      <label for="usr">Tiêu đề</label>
	      <input type="text" class="form-control" name="title" id="title" required>
	    </div>
	    <div class="form-group">
	      <label for="pwd">Loại</label>
	      <input type="text" class="form-control" id="category" name="category" required>
	    </div>
		<div class="form-group">
			<label for="exampleFormControlFile1">Upload ảnh bìa</label>
			<input type="file" class="form-control-file" id="image" name="image" required>
		</div>
		 <button  type="button" class="btn btn-success" onclick="sendData()">New Post</button>
		`
	postplace.innerHTML = str;
	return;
}

function newPost(){
	let postplace = document.getElementById('postplace');
	let str = `<div class="container">
		<h2 for="usr" style="font-family: 'Sans-serif', Times, serif;">Bài Viết Mới</h2>
		<h4 id="error" style="color: red" ></h4>
	    <div class="form-group">
	      <label for="usr">Tiêu đề</label>
	      <input type="text" class="form-control" name="title" id="title" required>
	    </div>
	    <div class="form-group">
	      <label for="pwd">Loại</label>
	      <input type="text" class="form-control" id="category" name="category" required>
	    </div>
		<div class="form-group">
		  <label for="comment">Nội Dung</label>
		  <textarea class="form-control" rows="5" id="content" name="content" required></textarea>
		</div>
		<div class="form-group">
			<label for="exampleFormControlFile1">Upload ảnh bìa</label>
			<input type="file" class="form-control-file" id="image" name="image" required>
		</div>
		 <button  type="button" class="btn btn-success" onclick="sendData()">New Post</button>
		`
	postplace.innerHTML = str;
	return;
}

function editpost(id){
	let data = {
		id: id
	}
	$.ajax({
		type: "post",
		url: "/singlepost",
		data: data,
		success: function(data){
			let postplace = document.getElementById('postplace');
			let str = `<div class="container">
				<h2 for="usr" style="font-family: 'Sans-serif', Times, serif;">Chỉnh Sửa</h2>
				<h4 id="error" style="color: red" ></h4>
			    <div class="form-group">
			      <label for="usr">Tiêu đề</label>
			      <input type="text" class="form-control" name="title" id="title" value="`+ data.title +`">
			    </div>
			    <div class="form-group">
			      <label for="pwd">Loại</label>
			      <input type="text" class="form-control" id="category" name="category" value="`+ data.category +`">
			    </div>
				<div class="form-group">
				  <label for="comment">Nội Dung</label>
				  <textarea class="form-control" rows="5" id="content" name="content">`+ data.content +`</textarea>
				</div>
				<div class="form-group">
					<label for="exampleFormControlFile1">Upload ảnh bìa</label>
					<input type="file" class="form-control-file" id="image" name="image">
					<br>
					<img id="hinhanh" src="`+ data.img +`" height="80" width="80">
				</div>
				 <button  type="button" class="btn btn-success" onclick="sendData('`+ id +`')">Edit Post</button>
				`
			postplace.innerHTML = str;
			return;
		}
	})

}

function sendData(id){
	let title = $("#title").val()
	let category = $("#category").val()
	let content = $("#content").val()
	let url = to_slug($("#title").val())

	if(title == '' || category == '' || content == '' || url == '' || $('#image')[0].files[0] == undefined ){
		if(id == undefined && $('#image')[0].files[0] == undefined ){
			let error = document.getElementById("error");
			error.innerHTML = "Please input all fields"
			return;
		}
	}

	datasend = {
		id: id,
		title: $("#title").val(),
		category: $("#category").val(),
		content: $("#content").val(),
		url: to_slug($("#title").val()),
		img: $("#hinhanh").attr('src')
	}
	if($("#type").html() == "All Post"){
		datasend.type = "post"
	}

	if($("#type").html() == "All Slides"){
		datasend.type = "slide";
		delete datasend.url;
	}
	// make dataform
    var data = new FormData();
    data.append('datasend',JSON.stringify(datasend));

    if($('#image')[0].files[0] != undefined){
    	data.append('image',$('#image')[0].files[0])
	}
    $.ajax({
		async: false,
		cache: false,
		// bộ ba cần phải nhớ khi chuyển formdata
		enctype: 'multipart/form-data',
		processData:false,
		contentType: false,
		//************
		url : '/savepost',
		type: "post",
		data: data,
		success: function(data){
			if(data.success == 1){
				window.location.href = '/admin'
			}
		}
	})
}

function deletepost(id){
	data = {
		id: id
	}
	swal({
	  title: 'Are you sure?',
	  text: "You won't be able to revert this!",
	  type: 'warning',
	  showCancelButton: true,
	  confirmButtonColor: '#3085d6',
	  cancelButtonColor: '#d33',
	  confirmButtonText: 'Yes, delete it!'
	}).then((result) => {
		if(result.value){
			$.ajax({
				type: "POST",
				url: "/deletepost",
				data: data,
				success: function(data){
					if(data.success == 1){
						window.location.href = '/admin'
					}
				}
			})
		}
	})

}

function to_slug(str)
{
    // Chuyển hết sang chữ thường
    str = str.toLowerCase();     
 
    // xóa dấu
    str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
    str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
    str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
    str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
    str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
    str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
    str = str.replace(/(đ)/g, 'd');
 
    // Xóa ký tự đặc biệt
    str = str.replace(/([^0-9a-z-\s])/g, '');
 
    // Xóa khoảng trắng thay bằng ký tự -
    str = str.replace(/(\s+)/g, '-');
 
    // xóa phần dự - ở đầu
    str = str.replace(/^-+/g, '');
 
    // xóa phần dư - ở cuối
    str = str.replace(/-+$/g, '');
 
    // return
    return str;
}
