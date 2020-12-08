const mongoose = require("mongoose");

const db = mongoose
  .connect("mongodb://localhost:27017/playground") // konekcija ka bazi tabela: playground
  .then(() => console.log("connected to MongoDB... "))
  .catch((err) => console.log("Could not connect to mongoDb... ", err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "angular course",
    author: "Mosh",
    tags: ["node", "backend"],
    isPublished: true,
  });

  const result = await course.save();
  console.log(result);
}

createCourse();

async function getCourses() {
  const courses = await Course.find();
  console.log("corses", courses);
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

  const pageNumber = 2;
  const pageSize = 10;

  // /api/courses?pageNumber=2&pageSize=10

  const courses = await Course.find({ author: "Mosh", isPublished: true })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });
  console.log("Filter Courses", courses);
}

// update course

//async function updateCourse(id) {
// Approach: Query first
// findById()
// Modifay its properties
// save ()

// Approach update first
// Update directly
// Optionally: get the update

//    const course = await Course.findById(id);

// const course = await Course.update({isPublished:false});  updejtuj sve resurse gde je isPublished:false
//

//     const course = await Course.update(
//       id,
//       {
//         $set:{
//           author: 'Mosh'
//         }
//       }

//     );

//     if (!course) return;

//     course.set({
//       isPublished: true,
//       author: 'Another Author sdsds'
//     });
//     const result = await course.save();

//     console.log('updateCourse', result);

// }

async function updateCourse(id) {
  const course = await Course.findByIdAndUpdate(id, {
    $set: {
      author: "jack zzz",
      isPublished: false
    },
  }, { new: true});
  console.log("updateCourse", course);
}


async function removeCourse(id) {
  const course = await Course.deleteOne({_id: id});
  console.log("removeCourse", course);
}




getCoursesFilter();

getCourses();

updateCourse("5fce33581f01648ebbe0bcc6");

removeCourse(id)
