import multer from "multer";
import fs from "fs";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "upload/gyms/");
    },
    filename: function (req, file, cb) {
        const uniqueName = Date.now() + "-" + file.originalname;
        cb(null, uniqueName);
    }
}
)

const memberPhotoStorage = multer.diskStorage({
    destination: function (req, file, cb) {

        const dir = `upload/members/${req.user.id}`;

        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        

        cb(null, dir);
    },
    filename: function (req, file, cb) {
        const uniqueName = Date.now() + "-" + file.originalname;
        cb(null, uniqueName);
    }
})

export const uploadGymLogo = multer({
    storage
})

export const uploadMemberPhoto = multer({
    storage: memberPhotoStorage
})