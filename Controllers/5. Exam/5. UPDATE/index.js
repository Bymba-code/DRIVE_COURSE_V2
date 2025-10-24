const prisma = require("../../../Middlewares/prisma")

const UPDATE_TEST = async (req , res) => {
    try 
    {
        const {id} = req.params;
        const {userSubmit} = req.body;

        const result = await prisma.exam.update({
            where: {
                id: parseInt(id)
            },
            data: {
                isMake: 1
            }
        })

        for (const item of userSubmit) {
            const { examTestId, answer, isSuccess } = item;

            await prisma.exam_test.update({
                where: {
                    id: parseInt(examTestId), 
                },
                data: {
                    answer:parseInt(answer === "" ? null : parseInt(answer)),
                    isSuccess:parseInt(isSuccess === "" ? 0 : parseInt(isSuccess))
                },
            });
        }

        return res.status(200).json({
            success:true,
            data:[],
            message: "Шалгалтыг амжилттай илгээлээ."
        })
    }
    catch(err)
    {
        console.log(err)
        return res.status(500).json({
            success:false,
            data: [],
            message: "Серверийн алдаа гарлаа." + " " + err
        })
    }
}

module.exports = UPDATE_TEST