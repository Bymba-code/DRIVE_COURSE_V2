const prisma = require('../../../Middlewares/prisma')

const ME_VIDEOS = async (req, res) => {
    try {
        const user = req.user;

        const userDB = await prisma.user_category.findFirst({
            where: {
                user: parseInt(user?.id)
            }
        })

        if (!userDB) {
            return res.status(404).json({
                success: false,
                data: [],
                message: "Хэрэглэгчийн категори олдсонгүй."
            })
        }

        const userVideos = await prisma.videos.findMany({
            where: {
                category: parseInt(userDB?.category)
            },
            orderBy: {
                index: "asc",
            },
            include: {
                user_progress: {
                    where: {
                        user: parseInt(user.id) 
                    }
                }
            }
        })

        const processedVideos = userVideos.map((video, index) => {
            const progress = video.user_progress[0]?.progress || 0;
            const completed = video.user_progress[0]?.completed || false;

            let locked = false;
            
            if (index === 0) {
                locked = false;
            } 
            else {
                const prevCompleted = userVideos[index - 1].user_progress[0]?.completed || false;
                locked = !prevCompleted;
            }

            return {
                id: video.id,
                topic:video.topic,
                title: video.title,
                category: video.category,
                url: video.url,
                index: video.index,
                progress,
                completed,
                locked,
            };
        });

        // 4️⃣ Хариу буцаах
        return res.status(200).json({
            success: true,
            data: processedVideos,
        });

    } catch(err) {
        console.error("ME_VIDEOS алдаа:", err); 
        return res.status(500).json({
            success: false,
            data: [],
            message: "Серверийн алдаа гарлаа."
        })
    }
}

module.exports = ME_VIDEOS