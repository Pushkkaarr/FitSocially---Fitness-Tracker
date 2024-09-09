export const profile=async(req,res)=>{
    try {
        return res.json({
            message:"profile page"
        })
    } catch (error) {
        console.log(error);
        
    }
}