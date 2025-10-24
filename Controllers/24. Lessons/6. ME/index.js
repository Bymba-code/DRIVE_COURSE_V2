const prisma = require('../../../Middlewares/prisma')

const ME_LESSONS = async (req, res) => {
    try {
        const user = req.user;

        if (!user) {
            return res.status(401).json({
                success: false,
                data: [],
                message: "Хэрэглэгч танигдсангүй."
            });
        }

        const lessons = await prisma.lessons.findMany({
            orderBy: { index: 'asc' },
            include: {
                lesson_videos: true,
                lesson_progress: {
                    where: { user: parseInt(user.id) }
                }
            }
        });

        let previousLessonCompleted = true;

        const lessonsWithUnlock = lessons.map((lesson, index) => {
            const hasVideos = lesson.lesson_videos.length > 0;

            let lessonProgress = 0;
            if (hasVideos) {
                const totalVideos = lesson.lesson_videos.length;
                const completedVideos = lesson.lesson_videos.filter(video => {
                    const progress = lesson.lesson_progress.find(lp => lp.video === video.id);
                    return progress && progress.progress >= 100;
                }).length;

                lessonProgress = Math.round((completedVideos / totalVideos) * 100);
            }

            // Бүх видео дууссан эсэх
            const allVideosCompleted = lessonProgress === 100;

            // Lesson unlock хийх
            const unlocked = index === 0 || previousLessonCompleted;

            const result = {
                ...lesson,
                unlocked,
                completed: allVideosCompleted,
                progress: lessonProgress // Lesson-ийн ерөнхий progress нэмэх
            };

            previousLessonCompleted = allVideosCompleted;

            return result;
        });

        return res.status(200).json({
            success: true,
            data: lessonsWithUnlock,
            message: "Хэрэглэгчийн lesson-үүд амжилттай татагдлаа."
        });

    } catch(err) {
        console.error("ME_LESSONS алдаа:", err);

        return res.status(500).json({
            success: false,
            data: [],
            message: "Серверийн алдаа гарлаа."
        })
    }
}

module.exports = ME_LESSONS