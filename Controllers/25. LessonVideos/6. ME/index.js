const prisma = require('../../../Middlewares/prisma')

const ME_LESSON_VIDEOS = async (req, res) => {
    try {
        const user = req.user;
        const { lesson } = req.query;

        if (!user) {
            return res.status(401).json({
                success: false,
                data: [],
                message: "Хэрэглэгч танигдсангүй."
            });
        }

        if (!lesson) {
            return res.status(400).json({
                success: false,
                data: [],
                message: "Lesson ID заавал шаардлагатай."
            });
        }

        const videos = await prisma.lesson_videos.findMany({
            where: { lesson: parseInt(lesson) },
            orderBy: { index: 'asc' },
            include: {
                lesson_progress: {
                    where: { user: parseInt(user.id) }
                }
            }
        });

        let previousVideoCompleted = true; 

        const videosWithUnlock = videos.map((video, index) => {

            const progress = video.lesson_progress[0];
            const videoProgress = progress ? progress.progress : 0;
            const isCompleted = videoProgress >= 100;

            const unlocked = index === 0 || previousVideoCompleted;

            const result = {
                ...video,
                unlocked,
                completed: isCompleted,
                progress: videoProgress
            };

            previousVideoCompleted = isCompleted;

            return result;
        });

        return res.status(200).json({
            success: true,
            data: videosWithUnlock,
            message: "Lesson-ийн видеонууд амжилттай татагдлаа."
        });

    } catch(err) {
        console.error("ME_LESSON_VIDEOS алдаа:", err);

        return res.status(500).json({
            success: false,
            data: [],
            message: "Серверийн алдаа гарлаа."
        })
    }
}

module.exports = ME_LESSON_VIDEOS