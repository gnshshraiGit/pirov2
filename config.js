module.exports= {
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

    }
}
