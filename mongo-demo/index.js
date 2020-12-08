const mongoose = require('mongoose');


const db = mongoose.connect('mongodb://localhost:27017/playground')
.then(() => console.log('connected to MongoDB... '))
.catch( err => console.log('Could not connect to mongoDb... ', err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {type: Date, default: Date.now},
    isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    
    const course = new Course ({
        name: 'angular course',
        author: 'Mosh',
        tags: ['node', 'backend'],
        isPublished: true
    });

    const result  = await course.save();
    console.log(result);


}

createCourse();

async function getCourses() {
    const courses = await Course.find();
    console.log( 'corses', courses);
}

async function getCoursesFilter() {

    // Query operatori
    // eq (equal)
    // ne (not equal)
    // gt (greater then)
    // gte (greater then or equal)
    // lt (less then)
    // lte (less then or equal to)
    // in
    // nin (not in)

    const courses = await Course 
   // .find({author: 'Mosh', isPublished: true})
   // find example 
   // .find({ price: {$gt: 10, $lte: 20 }}) // atribut  veci od 10  // dodaje  se $ na operator
    .find ({ price: { $in: [10, 15, 20 ]}}) // pronadji gde su atributi jednak 10, 15, 20

    // Regular expresion
    // Starts with Mosh
    .find({author:/^Mosh/})

    // Ends with Hamedani case insensitive
    .find( { author: /Hamedani$/i})

    // Contains Mosh
    .find({author: /.*Mosh.*/i})


    .or([ {author: 'Mosh'}, {isPublished: true}])
    .limit(10)
    .sort({name:1})
    .select({name:1, tags: 1});  // odredi koje parametre vraca iz baze
    console.log( 'Filter Courses', courses);
}

getCoursesFilter();

getCourses();



