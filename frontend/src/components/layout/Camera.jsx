import { useEffect, useRef, useState } from "react";
import Button from "../buttons/button";

export default function Camera({ setCameraOpen, setFile }) {
    const videoRef = useRef(null);

    const [photo, setPhoto] = useState(null);
    const [stream, setStream] = useState(null);



    const startCamera = async () => {

        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({
                video: true
            });

            videoRef.current.srcObject = mediaStream;
            setStream(mediaStream);

        } catch (error) {
            console.error("Error de cámara:", error);
        }
    };

    const takePhoto = () => {

        const video = videoRef.current;

        const canvas = document.createElement("canvas");

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const context = canvas.getContext("2d");

        context.drawImage(
            video,
            0,
            0,
            canvas.width,
            canvas.height
        );

        canvas.toBlob((blob) => {

            const file = new File(
                [blob],
                "foto-miembro.jpg",
                {
                    type: "image/jpeg"
                }
            );

            const preview = URL.createObjectURL(file);

            setPhoto(preview);
            setFile(file);

        }, "image/jpeg");

    };

    const restart = () => {
        setPhoto(null);
        startCamera();
    }

    const stopCamera = () => {

        if (stream) {

            stream.getTracks().forEach(track => {
                track.stop();
            });

            setStream(null);
            setCameraOpen(false)
        }
    };

    useEffect(() => {
        startCamera();
    }, [])

    useEffect(() => {

        return () => {
            if (stream) {
                stream.getTracks().forEach(track => {
                    track.stop();
                });
            }
        };

    }, [stream]);

    return (
        <>


            {!photo ? <video
                ref={videoRef}
                autoPlay
                playsInline
                className="scale-x-[-1] relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200 overflow-hidden border-primary hover:bg-gray-800/60 hover:primary"
            /> : <div>
                <h3>Foto tomada</h3>

                <img
                    src={photo}
                    alt="Foto del miembro"
                    className="scale-x-[-1] mt-3"
                />
            </div>
            }




            {stream && (
                <div className="flex space-x-5 mt-3">

                    {photo ? <Button type="button" onClick={restart}>
                        Tomar otra foto
                    </Button> :
                        <Button type="button" onClick={takePhoto}>
                            Tomar foto
                        </Button>}


                    <Button type="button" onClick={stopCamera}>
                        Apagar cámara
                    </Button>
                </div>
            )}

        </>


    );
}