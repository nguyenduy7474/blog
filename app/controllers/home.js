/*var numeral = require('numeral');
var bcrypt = require('bcrypt-nodejs');
var dateFormat = require('dateformat');*/
const Content = require('../models/content')

class Home {

	static homepage(req, res){
		res.render('index');
	}

	static getallpost(req, res){

		Content.find({}, function (err, found){
			res.send({found: found});
		})
	}

	static searching(req, res){
		let value = to_slug(req.body.value).split(' ');

		Content.find({type: "post"}, function(err, found){
			let arraysearch = []
			for(var i=0; i<found.length; i++){
				for(var j=0; j< value.length; j++){

					if(to_slug(found[i].title).indexOf(value[j]) != -1){
						arraysearch.push(found[i]);
						break;
					}
				}
			}
			res.send({data: arraysearch});

		})
		

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
			 
			    /*// Xóa khoảng trắng thay bằng ký tự -
			    str = str.replace(/(\s+)/g, '-');*/
			 
			    // xóa phần dự - ở đầu
			    str = str.replace(/^-+/g, '');
			 
			    // xóa phần dư - ở cuối
			    str = str.replace(/-+$/g, '');
			 
			    // return
			    return str;
			}
	}

}

module.exports = Home;




    
