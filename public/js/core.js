
function latesvscategory(){
		$.ajax({
		type: "POST",
		url: "/getallpost",
		success: function(json){
			let found = json.found
			let data = [];
			
			for(var i=0; i<found.length; i++){
				if(found[i].type == "post"){
					data.push(found[i])
				}
			}

			const monthNames = ["December", "January", "February", "March", "April", "May", "June",
			  "July", "August", "September", "October", "November"]
			let placesidepost = document.getElementById('placesidepost');
			let placecategory = document.getElementById('category')
			let sidepost = ""
			let category = ""
			let listcategory = [];

			data.forEach(function(post){
				let date = post.date;
				let day = date.slice(0, date.indexOf('/'));
				let month = date.slice(date.indexOf('/') + 1 , date.lastIndexOf('/'))

				month = monthNames[month]
				post.day = day
				post.month = month
			})

			for(var i=data.length -1 ; i>=0; i--){
                if(i>data.length -3){
                	sidepost += `<div class="single-blog-post d-flex align-items-center widget-post">
                                    <div class="post-thumbnail">
                                        <img src="` + data[i].img + `" alt="">
                                    </div>
                                    <div class="post-content">
                                        <a href="/category/`+ data[i].category +`" class="post-tag">`+ data[i].category +`</a>
                                        <h4><a href="/post/`+ data[i].url + `.`+ data[i]._id +`.html" class="post-headline" style="font-family: 'Sans-serif', Times, serif">`+ data[i].title +`</a></h4>
                                        <div class="post-meta">
                                            <p><a href="#">`+ data[i].day + ' ' + data[i].month +`</a></p>
                                        </div>
                                    </div>
                                </div>
                                `
                }
                if(!listcategory.includes(data[i].category)){
                	category +=  "<li><a href='/category/"+ data[i].category +"'>"+ data[i].category +"</a></li>"
                	listcategory.push(data[i].category)
                }

			}
			
			placesidepost.innerHTML = sidepost;
			placecategory.innerHTML = category;
			return;
		}
	})
}

function searching(valuesearch){
	var input = document.getElementById("search");;
	input.addEventListener("keyup", function(event) {
	    event.preventDefault();
	    if (event.keyCode === 13) {
			if(input.value == ''){
				return;
			}
			let data = {
				value: input.value
			}
			$.ajax({
				type: "POST",
				url: "/search",
				data: data,
				success: function(json){
					data = json.data;
					let text = document.getElementById('containerpost');
					text.innerHTML = 'Kết quả tìm kiếm:'
					render(data);
				}
			})
	    }
	});

}