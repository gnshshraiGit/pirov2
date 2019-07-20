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
        recordingHoldTime: 10, // to keep the recordings in above folder in minutes
        //EventNames
        startRecordEvent: 'record',
        recordingDoneEvent: 'recordingdone',
        recordingErrEvent: 'recordingErr'
    }
    
}