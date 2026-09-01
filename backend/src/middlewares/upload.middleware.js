import multer from "multer";
const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, "upload/gyms/");
    },
    filename: function (req, file, cb){
        const uniqueName = Date.now() + "-" + file.originalname;
        cb(null, uniqueName);
    }
}
)

export const uploadGymLogo = multer({
    storage
})