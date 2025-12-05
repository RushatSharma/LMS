import Course from "../models/Course.js"


// Get All Courses
export const getAllCourse = async (req, res) => {
    try {

        const courses = await Course.find({ isPublished: true })
            .select(['-courseContent', '-enrolledStudents'])
            .populate({ path: 'educator', select: '-password' })

        res.json({ success: true, courses })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }

}

// Get Course by Id
export const getCourseId = async (req, res) => {

    const { id } = req.params

    try {

        const courseData = await Course.findById(id)
            .populate({ path: 'educator'})

        // Remove lectureUrl if isPreviewFree is false
        courseData.courseContent.forEach(chapter => {
            chapter.chapterContent.forEach(lecture => {
                if (!lecture.isPreviewFree) {
                    lecture.lectureUrl = "";
                }
            });
        });

        res.json({ success: true, courseData })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }

} 

// ... existing imports

// Delete Course
export const deleteCourse = async (req, res) => {
    try {
        const { id } = req.params;
        // Verify the course belongs to the educator (optional but recommended for security)
        const course = await Course.findById(id);
        
        if (!course) {
             return res.json({ success: false, message: "Course not found" });
        }

        // Add logic here to verify educator ID if needed: if (course.educator !== req.auth.userId) ...

        await Course.findByIdAndDelete(id);
        res.json({ success: true, message: "Course deleted successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

// Update Course
export const updateCourse = async (req, res) => {
    try {
        const { courseId, courseData } = req.body;
        const image = req.file; // From Multer

        const parsedData = JSON.parse(courseData);
        
        let updateData = { ...parsedData };

        // If a new image is uploaded, update the URL (Cloudinary logic here)
        if (image) {
            const imageUpload = await cloudinary.uploader.upload(image.path, { resource_type: 'image' });
            updateData.courseThumbnail = imageUpload.secure_url;
        }

        await Course.findByIdAndUpdate(courseId, updateData);
        res.json({ success: true, message: "Course updated successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}