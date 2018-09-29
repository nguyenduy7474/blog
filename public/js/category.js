$(document).ready(()=>{
	getpostdata();
})

function getpostdata () {
	let categoryname = window.location.pathname.slice(window.location.pathname.lastIndexOf('/') + 1, window.location.pathname.length);
	let data = {
		categoryname: categoryname
	}

	$.ajax({
		type: "POST",
		url: "/getdata",
		data: data,
		success: function(json){
			let data = json.data
			if(data != 0){
			const monthNames = ["December", "January", "February", "March", "April", "May", "June",
			  "July", "August", "September", "October", "November"]
			let placemainpost = document.getElementById('placemainpost');
			let mainpost = ""

			data.forEach(function(post){
				let date = post.date;
				let day = date.slice(0, date.indexOf('/'));
				let month = date.slice(date.indexOf('/') + 1 , date.lastIndexOf('/'))

				month = monthNames[month]
				post.day = day
				post.month = month
				post.content = post.content.slice(0, post.content.indexOf('\n'));
			})

			for(var i=0; i<data.length; i++){
				mainpost += `               
                    <div class="single-blog-area blog-style-2 mb-50 wow fadeInUp" data-wow-delay="0.2s" data-wow-duration="1000ms">
                        <div class="row align-items-center">
                            <div class="col-12 col-md-6">
                                <div class="single-blog-thumbnail">
                                    <img src="` + data[i].img + `" alt="">
                                    <div class="post-date">
                                        <a href="#">`+ data[i].day +` <span>`+ data[i].month +`</span></a>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 col-md-6">
                                <div class="single-blog-content">
                                    <div class="line"></div>
                                    <a href="#" style="font-family: 'Sans-serif', Times, serif" class="post-tag">`+ data[i].category +`</a>
                                    <h4><a style="font-family: 'Sans-serif', Times, serif" href="/post/`+ data[i].url + `.`+ data[i]._id +`.html" class="post-headline">`+ data[i].title +`</a></h4>
                                    <p style="font-family: 'Sans-serif', Times, serif;   overflow: hidden;  height: 50px;  text-overflow: ellipsis;">`+ data[i].content +`</p>
                                    <div class="post-meta">
                                        <p>By <a href="#">`+ data[i].author +`</a></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`
			}
			
			placemainpost.innerHTML = mainpost;
			latesvscategory();
			return;
			}
		}
	})
}