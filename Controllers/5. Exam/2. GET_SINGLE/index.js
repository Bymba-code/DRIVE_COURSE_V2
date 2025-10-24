const prisma = require("../../../Middlewares/prisma")

const GET_SINGLE_EXAM = async (req , res) => {
    try 
    {
        const {id} = req.params;

        const exam = await prisma.exam.findFirst({
            include: {
                users:{
                  select: {
                    id:true,
                    username:true,
                    role:true,
                    create_date:true,
                    end_date:true
                  }
                },
                examTest: {
                  include: {
                    test_exam_test_testTotest: {
                      include: {
                        testAnswers: true  
                      }
                    }
                  }
                },
              },
              where: {
                id: parseInt(id)
              }
        })

        if(!exam)
        {
            return res.status(404).json({
                success:false,
                data:[],
                message: "Өгөгдөл олдсонгүй."
            })
        }

        return res.status(200).json({
            success:true,
            data:exam,
            message:"Амжилттай"
        })
    }
    catch(err)
    {
        return res.status(500).json({
            success:false,
            data:[],
            message: "Серверийн алдаа гарлаа." + " " + err
            
        })
    }
}

module.exports = GET_SINGLE_EXAM