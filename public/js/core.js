function latesvscategory(){
		$.ajax({
		type: "POST",
		url: "/getallpost",
		success: function(json){
			data = json.found
			let slide = [];
			
			for(var i=0; i<data.length; i++){
				if(data[i].type == "slide"){
					slide.push(data.slice(i, i+1)[0])
					data.splice(i, 1)
				}
			}

			const monthNames = ["December", "January", "February", "March", "April", "May", "June",
			  "July", "August", "September", "October", "November"]
			let placesidepost = document.getElementById('placesidepost');
			let placecategory = document.getElementById('category')
			let sidepost = ""
			let category = ""

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
                category +=  "<li><a href='/category/"+ data[i].category +"'>"+ data[i].category +"</a></li>"
			}
			
			placesidepost.innerHTML = sidepost;
			placecategory.innerHTML = category;
			return;
		}
	})
}