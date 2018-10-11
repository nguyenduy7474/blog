$.ajax({
	type: "POST",
	url: "/getallpost",
	success: function(json){
		let found = json.found
		render(found);
	}
})

function render(found){
	let slide = [];
	let data = [];
		console.log(found)

	for(var i=0; i<found.length; i++){
		if(found[i].type == "slide"){
			slide.push(found[i])
		}else{
			data.push(found[i])
		}
	}
	const monthNames = ["December", "January", "February", "March", "April", "May", "June",
	  "July", "August", "September", "October", "November"]
	let placemainpost = document.getElementById('placemainpost');
	let placemainslide = document.getElementById('placemainslide');
	let mainpost = ""
	let strslide = ""

	data.forEach(function(post){
		let date = post.date;
		let day = date.slice(0, date.indexOf('/'));
		let month = date.slice(date.indexOf('/') + 1 , date.lastIndexOf('/'))

		month = monthNames[month]
		post.day = day
		post.month = month
		//post.content = post.content.slice(0, post.content.indexOf('\n'));
	})

	for(var i=0; i<slide.length;i++){
		strslide += `            
	            <div class="single-hero-slide bg-img" style="background-image: url(`+ slide[i].img +`); background-size: 100% 100%;">
	                <div class="container h-100">
	                    <div class="row h-100 align-items-center">
	                        <div class="col-12">
	                            <div class="slide-content text-center">
	                                <div class="post-tag">
	                                    <a href="`+ slide[i].category +`" data-animation="fadeInUp">`+ slide[i].category +`</a>
	                                </div>
	                                <h2 data-animation="fadeInUp" data-delay="250ms"><a href="single-post.html" style="font-family: 'Sans-serif', Times, serif">`+ slide[i].title +`</a></h2>
	                            </div>
	                        </div>
	                    </div>
	                </div>
	            </div>`
	}

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
                            <a href="/category/`+ data[i].category +`" style="font-family: 'Sans-serif', Times, serif" class="post-tag">`+ data[i].category +`</a>
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

	placemainslide.innerHTML = strslide;
	placemainpost.innerHTML = mainpost;
    latesvscategory();
	return;
}