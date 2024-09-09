export const createPost=async(req,res)=>{
    try {
        return res.json({
            message:"createPost page"
        })
    } catch (error) {
        console.log(error);
        
    }
}