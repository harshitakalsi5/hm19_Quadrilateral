var express= require('express');
var app= express();



app.use('/public',express.static('files'));

app.set('view engine','ejs');

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
var Person=  require('./Person.js');

app.use('/handlehospital',(req,res)=>{
var name=req.body.hospital;
res.status(200);
res.render('generate',{name:name});

});
app.use('/person',(req,res)=>{
	var searchName = req.query.name;
	Person.findOne({name: searchName}, (err,person)=>{
		if(err) {
		res.type('html').status(500);
		res.send('Error: '+ err);	
	}
	else if(!person)
	{
		res.type('html').status(200);
		res.send('No person named'+ searchName);
	}
	else
	{
		res.render('personInfo',{person: person});
	}
	});
});

app.use('/donordash',(req,res)=>{
	var searchName=req.body.name;
//	var searchPassword = req.query.password;
	Person.findOne({name: searchName}, (err,person)=>{
		if(err) {
		res.type('html').status(500);
		res.send('Error: '+ err);	
	}
	else if(!person)
	{
		res.type('html').status(200);
		res.send('No person named '+ searchName);
	}
	else
	{
		res.render('donor',{person: person});
	}
	});
});

app.use('/helpmsg',(req,res)=>{
	var helpFind = req.query.name;
	Person.findOne({name: helpFind}, (err,person)=>{
		if(err) {
		res.type('html').status(500);
		res.send('Error: '+ err);	
	     }
	   else
	   {
		//Person.helpme.insert('Need Blood');
	//	if(err) {
	//	res.type('html').status(500);
	//	res.send('Error: '+ err);
	//	}
	
	 //    else{
		res.type('html').status(200);
		res.write('Request Sent! <br> <a href="/check"> return to send more requests <a>');
		res.end();
		
	//     }
	}
});
});

app.use('/update',(req,res)=>{
	var nameChange=req.body.name;
	//var password = req.body.password;
	Person.findOne( {name:nameChange},(err, person) =>{
	if(err) {
		res.type('html').status(500);
		res.send('Error: '+ err);	
	}
	else if(!person)
	{
		
		res.type('html').status(200);
		res.send('No person named '+nameChange);
	}
	else
	{   person.donation=req.body.donation;
        person.save((err)=>{
	if(err) {
		res.type('html').status(500);
		res.send('Error: '+ err);
		
	}
	else{
		res.type('html').status(200);
		//res.render('showDonor',{people: allPeople,group : group});
		res.write('Updated');
		res.end();
		//res.render('',{person: newPerson});
	}
 });
		
	}
	});
	
});






app.use('/check',(req,res)=>{
	var group=req.body.group;
	//var password = req.body.password;
	Person.find( (err, allPeople) =>{
	if(err) {
		res.type('html').status(500);
		res.send('Error: '+ err);	
	}
	else if(allPeople.length==0)
	{
		res.type('html').status(200);
		res.send('There are no People');
	}
	else
	{
		res.render('showDonor',{people: allPeople,group : group});
	}
	});
	
});

app.use('/all',(req,res)=>{
	Person.find( (err, allPeople) =>{
	if(err) {
		res.type('html').status(500);
		res.send('Error: '+ err);	
	}
	else if(allPeople.length==0)
	{
		res.type('html').status(200);
		res.send('There are no People');
	}
	else
	{
		res.render('showAll',{people: allPeople});
	}
	});
	
});

app.use('/create',(req,res)=>{

var newPerson = new Person({
	name:req.body.name,
	age:req.body.age,
	bloodgroup: req.body.blood,
	address: req.body.address,
	password: req.body.password,
	donation: 'You Dont have any Donations',
	helpme: 'You will be notified'
               });
newPerson.save((err)=>{
	if(err) {
		res.type('html').status(500);
		res.send('Error: '+ err);
		
	}
	else{
		res.type('html').status(200);
		res.write('You have been registered!! Now <a href="/public/donor.html">go back</a> Sign In');
		res.end();
		//res.render('',{person: newPerson});
	}
 });
});

app.use('/',(req,res)=>{
res.status(200);
res.redirect('/public/index.html');
});

app.listen(3000,()=>{
	console.log('Listening');
});

