/**
 * Created by Anette on 13.03.2015.
 */
var keyCode, locked, lockRot;

function keyPressed(event) {
    keyCode = event.which;

    if(keyCode == 38 && camPosZ > 150 ) {
        camPosZ -= 5;
    }
    if(keyCode == 40) {
        camPosZ += 5;
    }
    if(keyCode == 37) {
        camPosY -= 5;
    }
    if(keyCode == 39) {
        camPosY += 5;
    }
    camera.position.z = camPosZ;
    //camera.position.y = camPosY;
    //camera.position.x = camposX;

    //'l', Lock/Unlock the camera pointing at the root
    if(keyCode == 76){
        locked = !locked;
    }

    //'r', stops/starts rotating earth
    if(keyCode == 82){
        lockRot = !lockRot;
    }
}