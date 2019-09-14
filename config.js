module.exports= {
    //Put all your configurations here, Check plugins page on git or npm for samples
    //walky configurations
    walkyConf:{
        motor1DirectionOnePin: 5,
        motor1DirectionTwoPin: 6,
        motor2DirectionOnePin: 20,
        motor2DirectionTwoPin: 21,
        ultraSonicTrigger: 16,
        ultraSonicReciver: 24,
        goFwdEvent: "goFwd", // Client triggered event to go Forward
        goBkdEvent: "goBkd", // Client triggered event to go Backward
        goLftEvent: "goLft", // Client triggered event to go Left
        goRitEvent: "goRit", // Client triggered event to go Right
        stopEvent: "stop", // Client triggered event to Stop
        servingEvent: "serving", // Server triggered event to let client know of socketID controlling walky
        blockDetectEvent: "blockdetected" // Server triggered event to send the front block distance detected 
    },
    avstreamerConf:{
        videoDriver: 'v4l2',
        videoframeRate: '6',
        videoframeSize: '320x240',
        videoDeviceId: '/dev/video0',
        videoOutQuality: '10',
        videoOutCodec: 'mjpeg',
        videoRecordingCodec: 'h264_omx', //hardware assisted encoding , fast! 
        audioDriver: 'alsa',
        audioChannels: '1',
        audioInBitrate: '11025',
        audioDeviceId: 'hw:1,0',
        audioOutCodec: 'libmp3lame',
        audioOutBitrate: '32k',
        audioRecordingCodec: 'copy', //copy input encoding saves on CPU
        ffserverAudioIn: 'http://localhost:8090/webcamsound.ffm',
        ffserverVideoIn: 'http://localhost:8090/webcamvid.ffm',
        ffServerAudioOut: 'http://localhost:8090/webcamsound.mp3',
        ffserverVideoOut: 'http://localhost:8090/webcamvid.mjpeg',
        recordingTime: 60, // time to record in seconds 
        recordingFormat: 'matroska',
        recordingFolder: '/home/pi/pirov2/recordings', // where the recorded videos will saved, absolute path
        recordingHoldTime: 10, // to keep the recordings in above folder for x minutes
        //EventNames
        startRecordEvent: 'record',
        recordingDoneEvent: 'recordingdone',
        recordingErrEvent: 'recordingErr'
    },
    ambientConf: {
        ambientEvent: 'ambientdata',
        i2cBusNo   : 1, 
        i2cAddress : 0x76
    },
    //UI Config , this can be detached and put to the server on which the Angular app is running, but we have to use the full URLs
    uiConfig: [
        {
            serviceType:'avstreamer', //Important property for angular service initialization
            sockUrl:'http://192.168.1.19:8080/avstream', // socketIO endpoint for avstreamer
            getRecordingUrl:'http://192.168.1.19:8080/app/recordings/',
            videoUrl: 'http://192.168.1.19:8090/webcamvid.mjpeg',
            audioUrl: 'http://192.168.1.19:8090/webcamsound.mp3',
            enabled: true, //Important property for angular service initialization
            startRecordEvent: 'record',
            recordingDoneEvent: 'recordingdone',
            recordingErrEvent: 'recordingErr'
        },
        {
            serviceType:'walky', //Important property for angular service initialization
            sockUrl:'http://192.168.1.19:8080/walky', // socketIO endpoint for walky 
            enabled: false, //Important property for angular service initialization
            goFwdEvent: "goFwd", // Client triggered event to go Forward
            goBkdEvent: "goBkd", // Client triggered event to go Backward
            goLftEvent: "goLft", // Client triggered event to go Left
            goRitEvent: "goRit", // Client triggered event to go Right
            stopEvent: "stop", // Client triggered event to Stop
            servingEvent: "serving", // Server triggered event to let client know of socketID controlling walky
            blockDetectEvent: "blockdetected" // Server triggered event to send the front block distance detected 
        },
        {
            serviceType:'ambient', //Important property for angular service initialization
            sockUrl:'http://192.168.1.11:8080/ambient', // socketIO endpoint for ambient
            enabled: false, //Important property for angular service initialization
            ambientEvent: 'ambientdata'
        }
    ]
    
}
