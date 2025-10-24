const prisma = require("../../../Middlewares/prisma")

const GET_ALL_EXAM = async (req , res) => {
    try 
    {
        const {page, size, user, order, search} = req.query;
        const skip = (page - 1) * size
        const take = parseInt(size)


        let filteredExam;

        if(!page && !size && !user)
        {
          filteredExam = await prisma.exam.findMany({
              orderBy: {
                date: order ? order : "desc"
              },
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
              }
        })
        }

        if(page && size)
        {
          filteredExam = await prisma.exam.findMany({
            skip:skip,
            take:take,
            orderBy: {
              date:order ? order : "desc"
            },
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
            }
          })    
        }

        if(page && size && user)
        {
          filteredExam = await prisma.exam.findMany({
            skip:skip,
            take:take,
            orderBy: {
              date: order ? order : "desc"
            },
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
              user: parseInt(user)
            }
          })   
        }

        if(!page && !size && user)
        {
          filteredExam = await prisma.exam.findMany({
            orderBy: {
              date: order ? order : "desc"
            },
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
              user: parseInt(user)
            }
          })   
        }
        
        if(!page && size && !user)
        {
          filteredExam = await prisma.exam.findMany({
            take:take,
            orderBy: {
              date: order ? order : "desc"
            },
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
          })   
        }

        if(!page && size && user)
          {
            filteredExam = await prisma.exam.findMany({
              take:take,
              orderBy: {
                date: order ? order : "desc"
              },
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
                user:parseInt(user)
              }
            })   
        }

        if (page && size && search) {
          filteredExam = await prisma.exam.findMany({
            take: take,
            skip: skip,
            orderBy: {
              date: order ? order : "desc",
            },
            include: {
              users: {
                select: {
                  id: true,
                  username: true,
                  role: true,
                  create_date: true,
                  end_date: true,
                },
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
              users:{
                username: {
                  contains: search,
                }
              }
            },
          });
        }

        
        if(filteredExam.length === 0)
        {
          return res.status(404).json({
            success:false,
            data:[],
            message: "Өгөгдөл олдсонгүй."
          })
        }
     


        let totalCount;
        
        if(user)
        {
            totalCount = await prisma.exam.count({
              where: {
                user: parseInt(user)
              }
            })
        }

        if (search && !user) {
            totalCount = await prisma.exam.count({
              where: {
                users: {
                  username: {
                      contains: search,
                  },
                },
              },
            });
        }


        if(!search && !user)
        {
          totalCount = await prisma.exam.count()
        }

        if(page && size)
        {
          return res.status(200).json({
            success:true,
            data: filteredExam,
            message: "Амжилттай.",
            pagination: {
                page: parseInt(page),
                size: parseInt(size),
                total: totalCount,
                pages: Math.ceil(totalCount / size),
            },
          })
        }

        return res.status(200).json({
            success:true,
            data: filteredExam,
            message: "Амжилттай",
            totalCount:totalCount
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

module.exports = GET_ALL_EXAM
