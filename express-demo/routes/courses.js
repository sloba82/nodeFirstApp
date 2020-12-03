const express = require('express');
const router = express.Router();


const courses = [
    { id:1, name:'course1'},
    { id:2, name:'course2'},
    { id:3, name:'course3'},
];


router.get('/', (req, res) => {
    res.send(courses);
});


router.post('/', (req, res) => {


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
router.put('/:id', (req, res) => {
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
router.delete('/:id' , (req, res) => {
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

router.get('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course){
       return res.status(404).send('The course with the given ID was not found');
    }
       
    res.send(course);
});

// router.get('/api/post/:year/:month', (req, res) => {
//    res.send(req.params);
// });

// router.get('/api/post2/:year/:month', (req, res) => {
//    res.send(req.query);
// });


module.exports = router;