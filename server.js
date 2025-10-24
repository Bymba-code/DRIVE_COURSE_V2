require("dotenv").config()
const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")



const authRoutes = require("./routes/1. Auth")
const categoryRoutes = require("./routes/2. Category")
const topicRoutes = require("./routes/3. Topic")
const testRouter = require("./routes/4. Test")
const examRouter = require("./routes/5. Exam")
const answerRouter = require("./routes/6. Answers")
const userRouter = require("./routes/7. User")
const userCategoryRouter = require("./routes/8. UserCategory")
const statRouter = require("./routes/9. Stats")
const teacherRouter = require("./routes/10. Teacher")
const teacherCategoryRouter = require("./routes/11. TeacherCategory")
const scheludeRouter = require("./routes/12. Schelude")
const drivingScheludeRouter = require("./routes/13. DrivingSchelude")
const studentScheludeRouter = require("./routes/14. StudentSchelude")
const studentDriveSchelude = require("./routes/15. userDrivingSchelude")
const userStatRoutes = require("./routes/16. UserStats")
const invoiceRoutes = require("./routes/17. Invoices")
const paymentRoutes = require("./routes/18. Payment")
const contractRoutes = require("./routes/19. Contract")
const videoRoutes = require("./routes/20. Videos")
const progressRoutes = require("./routes/21. Progress")
const storePayRoutes = require("./routes/23. StorePay")
const lessonRoutes = require("./routes/24. Lessons")
const lessonVideoRoutes = require("./routes/25. LessonVideos")
const lessonProggressRoutes = require("./routes/26. LessonProgress")
const postRoutes = require("./routes/27. Post")
const commentRoutes = require("./routes/28. Comment")
const replyRoutes = require('./routes/29. Reply')
const reactionRoutes = require('./routes/30. Reactions')
const profileRoutes = require("./routes/31. Profile")


const app = express()

const corsOptions = {
    origin: [
        "http://localhost:5173",
        "http://localhost:5174",
        "https://omn1club.com",
        "https://system.tsogttsug.com",
        "http://system.tsogttsug.com",
        "https://tsogttsug.com",
        "https://student.tsogttsug.com" 
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true 
};
app.use(cookieParser())

app.use(cors(corsOptions));


app.use("/uploads", express.static("uploads"));

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1" , authRoutes)
app.use("/api/v1", categoryRoutes)
app.use("/api/v1" , topicRoutes)
app.use("/api/v1", testRouter)
app.use("/api/v1", examRouter)
app.use("/api/v1", answerRouter)
app.use("/api/v1", userRouter)
app.use("/api/v1", userCategoryRouter)
app.use("/api/v1", statRouter)
app.use("/api/v1", teacherRouter)
app.use("/api/v1", teacherCategoryRouter)
app.use("/api/v1", scheludeRouter)
app.use("/api/v1", drivingScheludeRouter)
app.use("/api/v1", studentScheludeRouter)
app.use("/api/v1", studentDriveSchelude)
app.use("/api/v1", userStatRoutes)
app.use("/api/v1", invoiceRoutes)
app.use("/api/v1", paymentRoutes)
app.use("/api/v1", contractRoutes)
app.use("/api/v1", videoRoutes)
app.use("/api/v1", progressRoutes)
app.use("/api/v1", storePayRoutes)
app.use("/api/v1", lessonRoutes)
app.use("/api/v1", lessonVideoRoutes)
app.use("/api/v1", lessonProggressRoutes)
app.use("/api/v1", postRoutes)
app.use("/api/v1", commentRoutes)
app.use("/api/v1", replyRoutes)
app.use("/api/v1", reactionRoutes)
app.use("/api/v1", profileRoutes)






app.listen(process.env.PORT , () => {
    console.log("APP LISTENING " + " " + process.env.PORT)
})
