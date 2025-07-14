import db from "../../model/prisma";

const getUserInfo = async function(
    userId: string
){
    const userInfo = await db.user.findUniqueOrThrow({
        where:{
            id:userId
        },

        select:{
            nickname:true,
            email:true,
        }
    });

    return userInfo;
};

export default getUserInfo;