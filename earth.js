/**
 * Created by Anette on 13.03.2015.
 */
function Earth(rad, seg){
    return new THREE.Mesh(
        new THREE.SphereGeometry(rad, seg, seg),
        new THREE.MeshPhongMaterial({
            map:            THREE.ImageUtils.loadTexture('img/earth.jpg'),
            bumpMap:        THREE.ImageUtils.loadTexture('img/earth_bump.jpg'),
            bumpScale:      2,
            specularMap:    THREE.ImageUtils.loadTexture('img/water_spec.png'),
            specular:       new THREE.Color('grey')
        })
    );
}
