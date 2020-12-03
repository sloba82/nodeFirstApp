const Joi = require('joi');
const logger = require('./logger'); // middleware 
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));  // middleware za engodiranje request  req.body
app.use(express.static('public')); // middleware  upucuje na folder public vracea fail 
                                   // npr. vraca file na ruti http://localhost:3000/readme.txt

app.use(logger); // use middleware logger.js


app.use(function(req, res, next){

    console.log('Authenticate...');
    next();
});

const courses = [
    { id:1, name:'course1'},
    { id:2, name:'course2'},
    { id:3, name:'course3'},
];

 app.get('/', (req, res) => {
    res.send('Hello World !!!');
 });

 app.get('/api/courses', (req, res) => {
     res.send(courses);
 });


 app.post('/api/courses', (req, res) => {


    const {error} = validateCourse(req.body);
    if(error){
        //400 bad request
       return res.status(400).send(error.details[0].message);
    }

     const course = {
         id:courses.length + 1,
         name: req.body.name
     };

     courses.push(course);
     res.send(course);

 });



// put route
app.put('/api/courses/:id', (req, res) => {
    // Look the course
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) {
        return res.status(404).send('The course with the given ID was not found');
    }

    // if doesn't  exists return 404
    // Validate
    // if invalid return 400 bar request
 
   
    const {error} = validateCourse(req.body);
    if(error){
        //400 bad request
       return res.status(400).send(error.details[0].message);
    }

    // update course 
    course.name = req.body.name;

    // return the updated course
    res.send(course);

});


// delete route
app.delete('/api/courses/:id' , (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course){
        return res.status(404).send('The course with the given ID was not found');
    } 

    const index = courses.indexOf(course);
    courses.splice(index , 1);

    res.send(course);

});




function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);

}
 
 app.get('/api/courses/:id', (req, res) => {
     const course = courses.find(c => c.id === parseInt(req.params.id));
     if(!course){
        return res.status(404).send('The course with the given ID was not found');
     }
        
     res.send(course);
 });

 app.get('/api/post/:year/:month', (req, res) => {
    res.send(req.params);
 });

 app.get('/api/post2/:year/:month', (req, res) => {
    res.send(req.query);
 });

 const port = process.env.PORT || 3000;

 app.listen(port, () => console.log(`Listening on port ${port}...`));




 
