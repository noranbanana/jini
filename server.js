const express = require('express')
const app = express()
const port = 8000
var bodyParser = require('body-parser');
fs = require('fs');
mysql = require('mysql');
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'password',
	database: 'jinipang'
})
connection.connect();


app.use(express.json())
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());
require('date-utils')

function getDate(){
        var moment = require('moment');
        require('moment-timezone');
        moment.tz.setDefault("Asia/Seoul");
        var date = moment().format('YYYY-MM-DD HH:mm:ss');
        return date;
}

app.get('/index', function (req, res) {
        var html = fs.readFile('./index.html', function (err, html) {
        html = " "+ html

        res.writeHeader(200, {"Content-Type": "text/html"});
        res.write(html);
        res.end();

        });
})

app.post('/login', function (req, res) {
	var qstr = 'select * from user_tb where id = "' +req.body.inputname+ '" and password = "' +req.body.inputPassword+ '"';
	connection.query(qstr, function(err, rows, cols) {
		if(err) throw err;
		if(rows.length == 0)
			console.log('no such user');
		else{
			data = rows[0];
			var html = fs.readFile('./login.html', function (err, html) {
				html = " " + html;
				html = html.replace(/<%= name %>/gi, data.name);
                                html = html.replace(/<%= grade %>/gi, data.grade);
				var lvlup_exp = Math.floor(5 + Math.pow(data.grade/5.0,3));
				var exp_percent = Math.floor(data.exp*100/lvlup_exp);
				html = html.replace(/<%= exp %>/gi, exp_percent);
                                html = html.replace(/<%= age %>/gi, data.age);
                                html = html.replace(/<%= region %>/gi, data.region);
                                html = html.replace(/<%= starb %>/gi, data.starb);
                                html = html.replace(/<%= portion %>/gi, data.portion);
                                html = html.replace(/<%= master_card %>/gi, data.master_card);

				var rec_qstr = 'select * from user_tb where age between ' + (data.age-10) + ' and ' + (data.age+10) + ' and not gender = "' +data.gender+ '" order by grade desc'
				connection.query(rec_qstr, function(rec_err, rec_rows, rec_cols) {
					if(rec_err) throw rec_err;
                                        var partial_html = fs.readFile('./collg3.html', function (err, partial_html) {
					        for(var i = 0; i < 4; i++){
                                                        if(i >= rec_rows.length){
                                                                html = html.replace("<%= collg3_"+i+" %>", "");
                                                                continue;
                                                        }
                                                        var tmp_html = partial_html.toString();
                                                        tmp_html = tmp_html.replace("<%= rec_user_num %>", rec_rows[i].user_num);
                                                        tmp_html = tmp_html.replace("<%= rec_name %>", rec_rows[i].name);
						        tmp_html = tmp_html.replace("<%= rec_gender %>", rec_rows[i].gender);
						        tmp_html = tmp_html.replace("<%= rec_grade %>", rec_rows[i].grade);
						        tmp_html = tmp_html.replace("<%= rec_age %>", rec_rows[i].age);
						        tmp_html = tmp_html.replace("<%= rec_region %>", rec_rows[i].region);
                                                        html = html.replace("<%= collg3_"+i+" %>", tmp_html);
                                                
					        }
					        res.writeHeader(200, {"Content-Type": "text/html"});
                                	        res.write(html);
                                	        res.end();
                                        });
				});

				/*res.writeHeader(200, {"Content-Type": "text/html"});
				res.write(html);
				res.end();*/
				

        		});

		}
	});
	/*
        var html = fs.readFile('./login.html', function (err, html) {
        html = " "+ html
	
        res.writeHeader(200, {"Content-Type": "text/html"});
        res.write(html);
        res.end();
	res.render(html, {name:contents[0].name});
	
        });
	*/
})

app.get('/setting-1', function (req, res) {
        console.log(req);
        var html = fs.readFile('./setting-1.html', function (err, html) {
        html = " "+ html

        res.writeHeader(200, {"Content-Type": "text/html"});
        res.write(html);
        res.end();

        });
})

app.get('/setting-2', function (req, res) {
        console.log(req);
        var html = fs.readFile('./setting-2.html', function (err, html) {
        html = " "+ html

        res.writeHeader(200, {"Content-Type": "text/html"});
        res.write(html);
        res.end();

        });
})

app.get('/itemshop', function (req, res) {
        var html = fs.readFile('./itemshop.html', function (err, html) {
        html = " "+ html

        res.writeHeader(200, {"Content-Type": "text/html"});
        res.write(html);
        res.end();

        });
})

app.get('/starshop', function (req, res) {
        var html = fs.readFile('./starshop.html', function (err, html) {
        html = " "+ html

        res.writeHeader(200, {"Content-Type": "text/html"});
        res.write(html);
        res.end();

        });
})

app.get('/idpassword', function (req, res) {
        var html = fs.readFile('./idpassword.html', function (err, html) {
        html = " "+ html

        res.writeHeader(200, {"Content-Type": "text/html"});
        res.write(html);
        res.end();

        });
})

app.get('/newmember-1', function (req, res) {
        var html = fs.readFile('./newmember-1.html', function (err, html) {
        html = " "+ html

        res.writeHeader(200, {"Content-Type": "text/html"});
        res.write(html);
        res.end();

        });
})

app.get('/newmember-2', function (req, res) {
        var html = fs.readFile('./newmember-2.html', function (err, html) {
        html = " "+ html

        res.writeHeader(200, {"Content-Type": "text/html"});
        res.write(html);
        res.end();

        });
})

app.get('/terms-1', function (req, res) {
        var html = fs.readFile('./terms-1.html', function (err, html) {
        html = " "+ html

        res.writeHeader(200, {"Content-Type": "text/html"});
        res.write(html);
        res.end();

        });
})

app.get('/terms-2', function (req, res) {
        var html = fs.readFile('./terms-2.html', function (err, html) {
        html = " "+ html

        res.writeHeader(200, {"Content-Type": "text/html"});
        res.write(html);
        res.end();

        });
})

app.get('/terms-3', function (req, res) {
        var html = fs.readFile('./terms-3.html', function (err, html) {
        html = " "+ html

        res.writeHeader(200, {"Content-Type": "text/html"});
        res.write(html);
        res.end();

        });
})

app.get('/2030-1', function (req, res) {
	var html = fs.readFile('./2030-1.html', function (err, html) {
	html = " "+ html
	
	res.writeHeader(200, {"Content-Type": "text/html"});
	res.write(html);
	res.end();
	
	});
})

app.get('/2030-2', function (req, res) {
        var html = fs.readFile('./2030-2.html', function (err, html) {
        html = " "+ html

        res.writeHeader(200, {"Content-Type": "text/html"});
        res.write(html);
        res.end();

        });
})

app.get('/2030-3', function (req, res) {
        var html = fs.readFile('./2030-3.html', function (err, html) {
        html = " "+ html

        res.writeHeader(200, {"Content-Type": "text/html"});
        res.write(html);
        res.end();

        });
})

app.get('/talk-1', function (req, res) {
        var html = fs.readFile('./talk-1.html', function (err, html) {
        html = " "+ html

        res.writeHeader(200, {"Content-Type": "text/html"});
        res.write(html);
        res.end();

        });
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
