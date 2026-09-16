
export function errorHandler(error, req, res, next) {
    console.error(error);

    if (error.errno === 1062 || error.code === 'ER_DUP_ENTRY') {

        let messageE = "";
        if( req.body.error){
            messageE = req.body.error;
        }
        else{
            messageE = 'Esta entrada ya está duplicada en el sistema.'
        } 


        return res.status(400).json({ message: messageE });
    }
    return res.status(500).json({
        message: "Error en el servidor"
    })
}