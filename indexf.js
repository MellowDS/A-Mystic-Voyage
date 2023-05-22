import "./style.css";
import * as THREE from "three"
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";

//Canvas
const canvas=document.querySelector("canvas");

//Scene
const scene=new THREE.Scene();

// const spaceTexture=new THREE.TextureLoader().load('../ocean/bc5.jpg')
// scene.background=spaceTexture;
const particlesGeometry = new THREE.BufferGeometry(); // Geometry for the stars
const particlesCount = 10000; // number of particles to be created

const vertices = new Float32Array(particlesCount); // Float32Array is an array of 32-bit floats. This is used to represent an array of vertices. (we have 3 values for each vertex - coordinates x, y, z)

// Loop through all the vertices and set their random position
for (let i = 0; i < particlesCount; i++) {
  vertices[i] = (Math.random() - 0.5) * 1000; // -0.5 to get the range from -0.5 to 0.5 than * 100 to get a range from -50 to 50
}

particlesGeometry.setAttribute(
  'position',
  new THREE.BufferAttribute(vertices, 3) // 3 values for each vertex (x, y, z)
  // Check the documentation for more info about this.
);

// Texture
const textureLoader = new THREE.TextureLoader();
const particleTexture = textureLoader.load('../ocean/star.png'); // Add a texture to the particles

// Material
const particlesMaterial = new THREE.PointsMaterial({
  map: particleTexture, // Texture
  size: 0.5, // Size of the particles
  sizeAttenuation: true, // size of the particle will be smaller as it gets further away from the camera, and if it's closer to the camera, it will be bigger
});

const stars = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(stars);

//Camera
const camera=new THREE.PerspectiveCamera(
  45, //Field of View
  window.innerWidth/window.innerHeight, //Aspect Ratio
  0.1, //Near
  1000 //Far
);

//Initial position of the camera
// camera.position.set(180,2,100);
// const h=new THREE.AxesHelper();
// scene.add(h);


const listener_=new THREE.AudioListener();
camera.add(listener_);

const sound=new THREE.Audio(listener_);
const loader=new THREE.AudioLoader();
loader.load('sound1.mp3',(buffer)=>{
  sound.setBuffer(buffer);
  sound.setVolume(1);
  sound.setLoop(true);
  sound.play();
});



//Renderer
const renderer=new THREE.WebGLRenderer({
  canvas:canvas,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000);


// const controls=new OrbitControls(camera,canvas);


// gltf Loader
const gltfloader=new GLTFLoader();
let mixer;
  gltfloader.load('../assets/sea3.gltf',(gltf)=>{
      const model=gltf.scene;
      model.position.set(18.674,12.56,203.274);
      scene.add(model);
      mixer=new THREE.AnimationMixer(model);
      const clips=gltf.animations;
      // const clip=THREE.AnimationClip.findByName(clips,'waves');
      // const action=mixer.clipAction(clip);
      // action.play()
      clips.forEach(function(clip){
          const action=mixer.clipAction(clip)
          action.play();
      })
})

const gltfloader1=new GLTFLoader();
let mixer1;
  gltfloader1.load('../assets/room4.gltf',(gltf)=>{
    const model1=gltf.scene;
    model1.position.set(0,-5,6); //180,2,100   
    model1.rotation.set(0,-1.571,0);
    scene.add(model1);
    mixer1=new THREE.AnimationMixer(model1);
    const clips=gltf.animations;
    // const clip=THREE.AnimationClip.findByName(clips,'waves');
    // const action=mixer.clipAction(clip);
    // action.play()
    clips.forEach(function(clip){
        const action=mixer1.clipAction(clip)
        action.play();
    })
})

  const clock=new THREE.Clock();


//   camera.position.set(1,4,8.5); room camera
    // camera.position.set(180,20,100);

  
  const pointl1=new THREE.PointLight(0xffffff,0.7);//FFC989
  // const pointh1=new THREE.PointLightHelper(pointl1);

  const s1=new THREE.PointLight(0xffffff,0.1);
  // const h1=new THREE.PointLightHelper(s1);
  s1.position.set(20,36,5);

  const s2=new THREE.PointLight(0xffffff,0.5);//0.8
  // const h2=new THREE.PointLightHelper(s2);
  s2.position.set(20,20,-12);
  const s3=new THREE.PointLight(0xffffff,0.5);//0.8
  // const h3=new THREE.PointLightHelper(s3);
  s3.position.set(20,20,15);
  const s31=new THREE.PointLight(0xffffff,0.8);
  // const h31=new THREE.PointLightHelper(s31);
  s31.position.set(20,40,15);
  const s4=new THREE.PointLight(0xffffff,0.5);//0.8
  // const h4=new THREE.PointLightHelper(s4);
  s4.position.set(20,20,25);
  const s41=new THREE.PointLight(0xffffff,0.65);//0.8
  // const h41=new THREE.PointLightHelper(s41);
  s41.position.set(20,30,25);

  const b1=new THREE.DirectionalLight(0xebe0d0,0.5);//191970
  // const hb1=new THREE.DirectionalLightHelper(b1);
  b1.position.set(-7,4,-7);
  const b2=new THREE.DirectionalLight(0xebe0d0,0.5);//191970
  // const hb2=new THREE.DirectionalLightHelper(b2);
  b2.position.set(-7,4,0);
  // const l1=new THREE.SpotLight(0xffffff,100,10);
  // const h1=new THREE.SpotLightHelper(l1);
  // l1.position.set(15,55,5);
  pointl1.position.set(8,2,4.1);
  // scene.add(pointl1,pointh1,s1,h1,s2,h2,s3,h3,s4,h4,s31,h31,s41,h41);
  scene.add(pointl1,s1,s2,s3,s4,s31,s41,b1,b2);



  camera.position.set(80,70,90);//20 100
  const controls=new OrbitControls(camera,canvas);
  controls.minDistance=80; //100
  controls.maxDistance=140;

  controls.enableDamping=true;
  controls.autoRotate=true;
  controls.maxAzimuthAngle=Math.PI;
  controls.minAzimuthAngle=-Math.PI;
  controls.enablePan=false;
  controls.maxPolarAngle=Math.PI/2.3;//2.2
  controls.minPolarAngle=Math.PI/2.55;//2.3

  // controls.maxPolarAngle=Math.PI/1.5;
  // controls.minPolarAngle=Math.PI/3;




let position=0;
const navi=document.getElementById("Navigate")
navi.addEventListener("click",function(){
  switch(position){
    case 0:
        // camera.position.set(1,4,8.5);
        // roomcam();
      room();
      position=1;
      break;
    case 1:
        // camera.position.set(180,20,100);
        // shipcam();
      ship();
      position=0;
      break;
  }
});

// function roomcam(){
//     camera.lookAt(1,4,8.5);
// }
// function shipcam(){
//     camera.lookAt(180,20,100);//20
// }
function room(){
    camera.position.set(1,4,8.5); //room camera
    
    controls.minDistance=3; //50
    controls.maxDistance=8.5; //130
    controls.maxPolarAngle=Math.PI/1.5;
    controls.minPolarAngle=Math.PI/3;
    controls.update();
}

function ship(){
    // camera.position.set(180,20,100);//20
    camera.position.set(80,70,90);//20 100
    controls.minDistance=80;
    controls.maxDistance=140;
    controls.maxPolarAngle=Math.PI/2.3;
    controls.minPolarAngle=Math.PI/2.55;
    controls.maxAzimuthAngle=Math.PI;
    controls.minAzimuthAngle=-Math.PI;
    controls.update();
}

  // controls.addEventListener('change',renderer);
  controls.update();

  function animate() {
    // controls.update();  
    if(mixer)
          mixer.update(clock.getDelta());
      
    // while(pointl1.intensity<0.9)
    //   pointl1.intensity++;
    // while(pointl1.intensity>0.3)
    //   pointl1.intensity--;
      renderer.render(scene, camera);
  }
  
  renderer.setAnimationLoop(animate);
  animate();

// var audio=new Audio('../ams_texture/sound1.mp3');
// audio.play()
// var sound=new Howl({
//   src:['../ams_texture/sound1.mp3'],
//   volume:0.5,
// });
// sound.play()

  
  window.addEventListener('resize', function() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
  });



//   window.addEventListener("mouseup",function(){
//     switch(position){
//       case 0:
//         cameraMovement(-6,1.72,1.34);
//         cameraRotation(-2.75,-1.24,-2.77);
//         position=1;
//         break;

//       case 1:
//         cameraMovement(0.48,2.09,-2.11);
//         cameraRotation(-3.12,0.22,3.13);
//         position=2;
//         break;

//       case 2:
//         cameraMovement(-50,1.7,0.48);
//         cameraRotation(-10,1.43,-0.44);
//         position=0;
//     }
//   });

  //GUI configurator
  // const gui=new lilGui.GUI();
  // gui.add(model.position,"x").min(-100).max(100).step(0.001).name("Model X Axis Position");
  // gui.add(model.position,"y").min(-100).max(100).step(0.001).name("Model Y Axis Position");
  // gui.add(model.position,"z").min(-100).max(100).step(0.001).name("Model Z Axis Position");
  
// });

// function cameraMovement(x,y,z){
//   gsap.to(camera.position,{
//     x,
//     y,
//     z,
//     duration:3,
//   });
// }

// function cameraRotation(x,y,z){
//   gsap.to(camera.rotation,{
//     x,
//     y,
//     z,
//     duration:3,
//   });
// }

// const animate=()=>{
//   renderer.render(scene,camera);
//   // controls.update();
// };
// renderer.setAnimationLoop(animate);
// animate();