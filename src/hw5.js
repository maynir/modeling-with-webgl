import {OrbitControls} from './OrbitControls.js'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
scene.background = new THREE.Color( 'ForestGreen' );

function degrees_to_radians(degrees) {
  let pi = Math.PI;
  return degrees * (pi/180);
}

const colors = {
	red: 0xff0000,
	green: 0x00ff00,
	blue: 0x0000ff,
	yellow: 0xffff00,
	cyan: 0x00ffff,
	magenta: 0xff00ff,
	white: 0xffffff,
	black: 0x000000,
	gray: 0xC0C0C0
};
const goalMaterial = new THREE.MeshBasicMaterial({ color: colors.white });
const ballMaterial = new THREE.MeshBasicMaterial({ color: colors.black });
const netMaterial = new THREE.MeshBasicMaterial({ color: colors.gray });
const materials = [goalMaterial, ballMaterial, netMaterial];

// Add here the rendering of your goal

// Create the front goalposts
const frontGoalpostRadius = 0.1;
const frontGoalpostHeight = 2;
const frontGoalpostRadialSegments = 32;
const frontGoalpostGeometry = new THREE.CylinderGeometry(frontGoalpostRadius, frontGoalpostRadius, frontGoalpostHeight, frontGoalpostRadialSegments);
const frontGoalpost1 = new THREE.Mesh(frontGoalpostGeometry, goalMaterial);
const frontGoalpost2 = new THREE.Mesh(frontGoalpostGeometry, goalMaterial);
frontGoalpost1.position.set(-2, 1, -5);
frontGoalpost2.position.set(2, 1, -5);
scene.add(frontGoalpost1);
scene.add(frontGoalpost2);

// Create rings/toruses for the goalposts
const goalpostRingGeometry = new THREE.SphereGeometry(0.2, 32, 32);
const goalpostRing1 = new THREE.Mesh(goalpostRingGeometry, goalMaterial);
const goalpostRing2 = new THREE.Mesh(goalpostRingGeometry, goalMaterial);
goalpostRing1.position.set(-2, 0, -5);
goalpostRing2.position.set(2, 0, -5);
scene.add(goalpostRing1);
scene.add(goalpostRing2);

// Create the back supports
const backSupportRadius = 0.1;
const backSupportHeight = 3;
const backSupportRadialSegments = 32;
const backSupportGeometry = new THREE.CylinderGeometry(backSupportRadius, backSupportRadius, backSupportHeight, backSupportRadialSegments);
const backSupport1 = new THREE.Mesh(backSupportGeometry, goalMaterial);
const backSupport2 = new THREE.Mesh(backSupportGeometry, goalMaterial);
backSupport1.position.set(-2, 1.5, -9);
backSupport2.position.set(2, 1.5, -9);
scene.add(backSupport1);
scene.add(backSupport2);

// Create rings/toruses for the back supports
const backSupportRingGeometry = new THREE.SphereGeometry(0.2, 32, 32);
const backSupportRing1 = new THREE.Mesh(backSupportRingGeometry, goalMaterial);
const backSupportRing2 = new THREE.Mesh(backSupportRingGeometry, goalMaterial);
backSupportRing1.position.set(-2, 0, -9);
backSupportRing2.position.set(2, 0, -9);
scene.add(backSupportRing1);
scene.add(backSupportRing2);

// Create the crossbar
const crossbarGeometry = new THREE.CylinderGeometry(0.1, 0.1, 4, 32);
const crossbar = new THREE.Mesh(crossbarGeometry, goalMaterial);
crossbar.rotation.x = Math.PI / 2;
crossbar.rotation.z = Math.PI / 2;
crossbar.position.set(0, 2, -5);
scene.add(crossbar);

// Create the side nets
const sideNetGeometry = new THREE.PlaneGeometry(4, 2, 1, 1);
const rightNet1 = new THREE.Mesh(sideNetGeometry, netMaterial);
const leftNet2 = new THREE.Mesh(sideNetGeometry, netMaterial);
rightNet1.position.set(2, 1, -7);
rightNet1.rotation.y = Math.PI / 2;
leftNet2.position.set(-2, 1, -7);
leftNet2.rotation.y = Math.PI / 2;
scene.add(rightNet1);
scene.add(leftNet2);

// Create the back net
const backNetGeometry = new THREE.PlaneGeometry(4, 2, 1, 1);
const backNet = new THREE.Mesh(backNetGeometry, netMaterial);
backNet.position.set(0, 1, -9);
scene.add(backNet);

// Create the ball
const ballGeometry = new THREE.SphereGeometry(0.2, 32, 32);
const ball = new THREE.Mesh(ballGeometry, ballMaterial);
ball.position.set(0, 0.2, -3);
scene.add(ball);


// This defines the initial distance of the camera
const cameraTranslate = new THREE.Matrix4();
cameraTranslate.makeTranslation(0, 0, 5); // sets the camera origin
camera.applyMatrix4(cameraTranslate)

renderer.render( scene, camera );

const controls = new OrbitControls( camera, renderer.domElement );

let isOrbitEnabled = true;

const toggleOrbit = (e) => {
	if (e.key == "o"){
		isOrbitEnabled = !isOrbitEnabled;
	}
}

const toggleWireframe = (e) => {
	if (e.key == "w") {
		if (materials[0].wireframe === false) {
			materials.forEach((element) => {
				element.wireframe = true;
			});
		} else {
			materials.forEach((element) => {
				element.wireframe = false;
			});
		}
	}
};

document.addEventListener('keydown',toggleOrbit)
document.addEventListener('keydown',toggleWireframe)

//controls.update() must be called after any manual changes to the camera's transform
controls.update();

function animate() {

	requestAnimationFrame( animate );

	controls.enabled = isOrbitEnabled;
	controls.update();

	renderer.render( scene, camera );

}
animate()