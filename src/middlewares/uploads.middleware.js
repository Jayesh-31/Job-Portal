import multer from "multer";
import path from 'path';

const storageConf = multer.diskStorage({
    destination(req, file, cbk){
        cbk(null, path.resolve('public','images'));
    },

    filename(req, file, cbk){
        const fileName = Date.now() + '-' + file.originalname;
        cbk(null, fileName);
    }
})

const uploadFile = multer({
    storage: storageConf
})

export default uploadFile;