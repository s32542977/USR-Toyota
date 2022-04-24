import './index.html'
import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { gsap } from 'gsap'
import { BufferGeometry, MeshBasicMaterial, Scene } from 'three'
//import '/node_modules/owl.carousel/dist/assets/owl.carousel.min.css'
import '/node_modules/owl.carousel/dist/assets/owl.theme.default.min.css'
import 'owl.carousel'

/**
 * Image
 */
import grave0 from '../static/img/grave-0.jpg';
import immigration0 from '../static/img/immigration0.png';
import school0 from '../static/img/school0.png';
import tobaccoFactory0 from '../static/img/tobaccoFactory0.jpg';
import fway0 from '../static/img/Fway0.jpg';
import hospital0 from '../static/img/hospital0.png';
import temple0 from '../static/img/temple0.jpg';
import trainStation0 from '../static/img/train0.jpg';
import police0 from '../static/img/police0.jpg';


import grave1 from '../static/img/grave-1.jpg';
import grave2 from '../static/img/grave-2.jpg';
import grave3 from '../static/img/grave-3.jpg';
import grave4 from '../static/img/grave-4.jpg';
import grave5 from '../static/img/grave-5.jpg';

import immigration1 from '../static/img/immigration1.png';
import immigration2 from '../static/img/immigration2.png';
import immigration3 from '../static/img/immigration3.png';

import school2 from '../static/img/school2.png';
import school3 from '../static/img/school3.png';

import tobaccoFactory1 from '../static/img/tobaccoFactory1.png';
import tobaccoFactory2 from '../static/img/tobaccoFactory2.jpg';

import hospital1 from '../static/img/hospital1.png';
import hospital2 from '../static/img/hospital2.png';

import temple1 from '../static/img/temple1.jpg';
import temple2 from '../static/img/temple2.jpg';
import temple3 from '../static/img/temple3.jpg';
import temple4 from '../static/img/temple4.jpg';
import temple5 from '../static/img/temple5.jpg';

import police1 from '../static/img/police1.jpg';
import police2 from '../static/img/police2.jpg';
import police3 from '../static/img/police3.jpg';


import logo from '../static/img/nav-logo.png';

console.log('高度：', window.innerHeight);

var contentIMG=[grave0,immigration0,school0,tobaccoFactory0,fway0,hospital0,temple0,trainStation0,police0];
var lightboxArray=[grave1,grave2,grave3,grave4,grave5,
    immigration1,immigration2,immigration3,
    school0,school2,school3,
    tobaccoFactory1,tobaccoFactory2,
    hospital1,hospital2,
    temple1,temple2,temple3,temple4,temple5,
    police1, police2, police3
];
console.log('long：', lightboxArray.length);


//相片跑馬燈>把全部圖片裝進來

for(var i=0;i<lightboxArray.length;i++){
    var lightbox = document.querySelector(".lightbox"+i)
    var lightboxImg = new Image()
    lightboxImg.src = lightboxArray[i]
    lightboxImg.classList.add('item')
    lightbox.appendChild(lightboxImg)
}

$('.owl-carousel').owlCarousel({
    loop:true,
    margin:10,
    nav:true,
    dots: true,
    responsive:{
        0:{
            items:3
        },
        1200:{
            items:1
        }
    }
})


//contentIMG
for(var i=0;i<=8;i++){
    var cimg = document.querySelector(".contentImg"+i)
    var ii = new Image()
    ii.src = contentIMG[i]
    ii.classList.add('cimg')
    cimg.appendChild(ii)
}

//logoIMG
var logopage = document.querySelector(".orientation")
var logoImg = new Image()
logoImg.src =logo
//ii.classList.add('cimg')
logopage.appendChild(logoImg)

//pageHeight
var pheight = document.querySelectorAll(".content");
pageHeight();
window.addEventListener('resize', pageHeight);

function pageHeight(){
    var phNew = window.innerHeight;
    for(var i=0;i<=8;i++){
        pheight[i].style.height=phNew-80+"px";
        console.log('高：', pheight[i].style.height);
    };
}


/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Loaders
 */
 const loadingBarElement = document.querySelector('.loading-bar')
 var IfLoadEnd = new Boolean(false);
 const loadingManager = new THREE.LoadingManager(
    // Loaded
       () => 
       {
            window.setTimeout(() =>//延遲0.5秒讓進度條載完
            {
            console.log('loaded')
            gsap.to(overlayMaterial.uniforms.uAlpha, { duration: 3, value: 0 })
            loadingBarElement.classList.add('ended')
            loadingBarElement.style.transform = ''
            IfLoadEnd = true
            },500)
       },
   
    // Progress
       (itemUrl,itemsLoaded, itemsTotal) =>
       {
           //loading Bar
            const progressRatio = itemsLoaded / itemsTotal
            loadingBarElement.style.transform = `scaleX(${progressRatio})`
            //console.log(progressRatio)
       }
   )


/**
 * Models
 */
//main
const building = new THREE.Mesh( )
scene.add(building)

 const gltfLoader = new GLTFLoader(loadingManager)
 gltfLoader.load(
    '/models/USR_V7.4_location.glb',
    (main) =>
    {
        console.log('success')
        console.log(main.scene)
        console.log(main.scene.children.length)
        

        //載入 
        building.add(main.scene)
       updateAllMaterials()
    },
    (progress) =>
    {
        console.log('progress')
        console.log(progress)
    },
    (error) =>
    {
        console.log('error')
        console.log(error)
    }  
) 
//trainstation.position.y=30


//ground
const ground = new THREE.Group();
gltfLoader.load('/models/USR_V7.5_ground.glb',
 (ground) =>
 {
    scene.add(ground)
 }
 )

//tobacco 
 const tobaccoFarm = new THREE.Group();
 scene.add(tobaccoFarm)

 gltfLoader.load('/models/tobacco.glb',
 (tobacco) =>
 {
    let imax=3,jmax=3,x=-16,z=-12;
    for(let i=0;i<imax;i++){
        z+=3.5;
        x=-16;
            for(let j=0;j<jmax;j++){
                const tobaccoX = new THREE.Mesh( );
                tobaccoX.add( tobacco.scene.clone());
                tobaccoX.rotation.y = (Math.random() - 0.5) * Math.PI * 2
                tobaccoX.position.x = x;
                tobaccoX.position.z = z;
                x+=3.5;

                tobaccoFarm.add(tobaccoX)
            }    
        }

    imax=2,jmax=12,x=0,z=15;
    for(let i=0;i<imax;i++){
        z+=3.5;
        x=0;
            for(let j=0;j<jmax;j++){
                const tobaccoX = new THREE.Mesh( );
                tobaccoX.add( tobacco.scene.clone());
                tobaccoX.rotation.y = (Math.random() - 0.5) * Math.PI * 2
                tobaccoX.position.x = x;
                tobaccoX.position.z = z;
                x+=3.5;

                tobaccoFarm.add(tobaccoX)
            }    
        }

    imax=5,jmax=3,x=32,z=-37;
    for(let i=0;i<imax;i++){
        z+=3.5;
        x=32;
            for(let j=0;j<jmax;j++){
                const tobaccoX = new THREE.Mesh( );
                tobaccoX.add( tobacco.scene.clone());
                tobaccoX.rotation.y = (Math.random() - 0.5) * Math.PI * 2
                tobaccoX.position.x = x;
                tobaccoX.position.z = z;
                x+=3.5;

                tobaccoFarm.add(tobaccoX)
            }    
        }
        
    }
    )


 //rail
 gltfLoader.load('/models/rail.glb',
 (rail) =>
 {
    let i=0,z=0
    for(i;i<49;i++){
        const rails = new THREE.Mesh( )
        rails.add( rail.scene.clone())
        rails.position.z = z
        z+=0.47
        scene.add(rails)
    }

    
    i=0
    let x=-18
    for(i;i<97;i++){
        const rails = new THREE.Mesh( )
        rails.add( rail.scene.clone())
        rails.rotation.y=Math.PI * 0.5
        rails.position.z =-3.5
        rails.position.x =x
        x+=0.47
        

        scene.add(rails)
    }
})



/**
 * Update all materials
 */
 const updateAllMaterials = () =>
 {
     scene.traverse((child) =>
     {
        if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial)
        {
            child.material.envMap = environmentMap
            child.material.envMapIntensity = 3
            child.castShadow = true
            child.receiveShadow = true
        }
     })
 }

/**
 * Mouse
 */
 const mouse = new THREE.Vector2()
 const raycaster = new THREE.Raycaster();
 window.addEventListener('mousemove', (event) =>
 {
     mouse.x = event.clientX / sizes.width * 2 - 1
     mouse.y = - (event.clientY / sizes.height) * 2 + 1
 })

/**
 * Lights
 */
//新增環境光
scene.add( new THREE.AmbientLight( 0x666666, 6 ) );
//新增平行光
const directionalLight = new THREE.DirectionalLight('#ffffff', 3)
directionalLight.position.set(0.25, 3, - 4)
directionalLight.castShadow = true//添加陰影
directionalLight.shadow.camera.top = 50
directionalLight.shadow.camera.right = 50
directionalLight.shadow.camera.bottom = - 50
directionalLight.shadow.camera.left = - 50
directionalLight.shadow.camera.far = 150//陰影距離
directionalLight.shadow.normalBias = 0.3//陰影減低格紋
scene.add(directionalLight)


 /**
 * Environment map
 */
const cubeTextureLoader = new THREE.CubeTextureLoader(loadingManager)
const environmentMap = cubeTextureLoader.load([
    '/SkyTexture/px.png',
    '/SkyTexture/nx.png',
    '/SkyTexture/py.png',
    '/SkyTexture/ny.png',
    '/SkyTexture/pz.png',
    '/SkyTexture/nz.png'
])
 scene.background = environmentMap

 /**
 * Overlay
 */
const overlayGeometry = new THREE.PlaneGeometry(2, 2, 1, 1)//XY延伸兩倍(-1~1)
const overlayMaterial = new THREE.ShaderMaterial({
    transparent: true,//允許透明
    uniforms://JS可傳入變數
    {
        uAlpha: { value: 1 }
    },
    vertexShader: `
        void main()
        {
            gl_Position =  vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform float uAlpha;
        void main()
        {
            gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha);
        }
    `
})
const overlay = new THREE.Mesh(overlayGeometry, overlayMaterial)
scene.add(overlay)


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(0, 50, 0)
camera.lookAt(0,0,0)
//camera.lookAt(tobaccoFarm.position)
scene.add(camera)


//Controls
const controls = new OrbitControls(camera, canvas)
controls.target.set(0, 0.75, 0)
controls.enableDamping = true
controls.maxPolarAngle = Math.PI/2 //限制視角

// shadow camera help
//const directionalLightCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
//scene.add(directionalLightCameraHelper)*/

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.shadowMap.enabled = true//陰影
renderer.shadowMap.type = THREE.PCFSoftShadowMap//陰影
renderer.physicallyCorrectLights = true//物理光源
renderer.outputEncoding = THREE.sRGBEncoding
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
//renderer.shadowMap.autoUpdate = false
//renderer.shadowMap.needsUpdate = true




/**
 * Html
 */
const locations = [
    {
        position: new THREE.Vector3(1.55, 0.3, - 0.6),
        element: document.querySelector('.name-0')
    }
]
var lo0 = document.querySelector('.location .name');

/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0

/**
 * Raycast
 */
let currentIntersect = null
var click=0, clickCD=1
let locationTag=document.querySelector('.location-'+ click).firstChild 
let contentDetail=document.querySelector('.location-'+ clickCD).lastChild
let btnMore=document.querySelectorAll('.btn-more')

canvas.addEventListener('click', () =>
{
    locationTag.classList.remove('move')
    contentDetail.classList.remove('detailDisplay')
    click=0

    if(currentIntersect)
    {
        
        console.log('click')
        console.log(currentIntersect.object)

        currentIntersect.object.traverse(function(child) {
            console.log(child.parent.name)
            
            switch(child.parent.name)
            {
            case "grave":
                click=1 
                clickCD=1
                break
            
            case "immigration":
                click=2
                clickCD=2
                break

            case "school":
                click=3
                clickCD=3
                break
            
            case "tobaccoFactory":
                click=4
                clickCD=4
                break
            
            case "5way":
                click=5
                clickCD=5
                break

            case "hospital":
                click=6
                clickCD=6
                break
                
            case "temple":
                click=7
                clickCD=7
                break
            
            case "trainStation":  
                click=8
                clickCD=8
                break

            case "police":  
                click=9
                clickCD=9
                break

            default:
                click=0
                break;
            }
          })
    }

    console.log(click)
    if(click!=0){
        locationTag=document.querySelector('.location-'+ click).firstChild 
        locationTag.classList.add('move');
    }
})


btnMore.forEach(function(btnLArray){
    btnLArray.addEventListener('click', () =>{
        console.log(clickCD)
        contentDetail=document.querySelector('.location-'+ clickCD).lastChild 
        contentDetail.classList.add('detailDisplay');
    })
})



const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime
    

    // Update controls
    controls.update()
    
    //mouseRay
    raycaster.setFromCamera(mouse, camera)
    const objectsToTest = [building]
    const intersects = raycaster.intersectObjects(objectsToTest ,true)
    
    canvas.style.cursor = 'default'
    if(intersects.length)
    {
        if(!currentIntersect)
        {
            console.log('mouse enter')
        }

        currentIntersect = intersects[0]
        currentIntersect.object.traverse(function(child) {
                if(child.parent.name!='ground')
                canvas.style.cursor= 'pointer'
            })
    }
    else
    {
        if(currentIntersect)
        {
            console.log('mouse leave')
        }

        currentIntersect = null
    }
    
    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)

}

tick()