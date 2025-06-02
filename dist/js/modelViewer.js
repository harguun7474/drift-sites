// 3D Model Viewer
class ModelViewer {
    constructor(containerId, modelPath, options = {}) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        
        this.modelPath = modelPath;
        this.options = {
            backgroundColor: options.backgroundColor || 0x000000,
            ambientLightColor: options.ambientLightColor || 0xffffff,
            ambientLightIntensity: options.ambientLightIntensity || 0.5,
            directionalLightColor: options.directionalLightColor || 0xffffff,
            directionalLightIntensity: options.directionalLightIntensity || 0.8,
            autoRotate: options.autoRotate !== undefined ? options.autoRotate : true,
            autoRotateSpeed: options.autoRotateSpeed || 1.0,
            cameraPosition: options.cameraPosition || { x: 0, y: 0, z: 5 },
            controlsEnabled: options.controlsEnabled !== undefined ? options.controlsEnabled : true,
            zoom: options.zoom !== undefined ? options.zoom : true,
            pan: options.pan !== undefined ? options.pan : false,
            ...options
        };
        
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.model = null;
        this.mixer = null;
        this.clock = null;
        this.animations = [];
        
        this.init();
    }
    
    init() {
        // Check if Three.js is available
        if (typeof THREE === 'undefined') {
            console.error('Three.js is not loaded. Please include the Three.js library.');
            this.loadThreeJS();
            return;
        }
        
        this.setupScene();
        this.setupCamera();
        this.setupRenderer();
        this.setupLights();
        this.setupControls();
        this.loadModel();
        
        // Add window resize handler
        window.addEventListener('resize', this.onWindowResize.bind(this));
        
        // Start animation loop
        this.animate();
    }
    
    loadThreeJS() {
        // Create script elements to load Three.js and any required addons
        const threeScript = document.createElement('script');
        threeScript.src = 'https://cdn.jsdelivr.net/npm/three@0.132.2/build/three.min.js';
        document.head.appendChild(threeScript);
        
        threeScript.onload = () => {
            const loaderScript = document.createElement('script');
            loaderScript.src = 'https://cdn.jsdelivr.net/npm/three@0.132.2/examples/js/loaders/GLTFLoader.js';
            document.head.appendChild(loaderScript);
            
            loaderScript.onload = () => {
                const controlsScript = document.createElement('script');
                controlsScript.src = 'https://cdn.jsdelivr.net/npm/three@0.132.2/examples/js/controls/OrbitControls.js';
                document.head.appendChild(controlsScript);
                
                controlsScript.onload = () => {
                    this.init();
                };
            };
        };
    }
    
    setupScene() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(this.options.backgroundColor);
        
        // Optional fog
        if (this.options.fog) {
            this.scene.fog = new THREE.FogExp2(this.options.fog.color || 0x000000, this.options.fog.density || 0.002);
        }
    }
    
    setupCamera() {
        const width = this.container.clientWidth;
        const height = this.container.clientHeight;
        this.camera = new THREE.PerspectiveCamera(
            this.options.fov || 45,
            width / height,
            this.options.near || 0.1,
            this.options.far || 1000
        );
        
        this.camera.position.set(
            this.options.cameraPosition.x,
            this.options.cameraPosition.y,
            this.options.cameraPosition.z
        );
    }
    
    setupRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });
        
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.renderer.shadowMap.enabled = true;
        
        this.container.appendChild(this.renderer.domElement);
    }
    
    setupLights() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(
            this.options.ambientLightColor,
            this.options.ambientLightIntensity
        );
        this.scene.add(ambientLight);
        
        // Directional light
        const directionalLight = new THREE.DirectionalLight(
            this.options.directionalLightColor,
            this.options.directionalLightIntensity
        );
        directionalLight.position.set(5, 10, 7.5);
        directionalLight.castShadow = true;
        
        // Configure shadow settings
        directionalLight.shadow.mapSize.width = 1024;
        directionalLight.shadow.mapSize.height = 1024;
        directionalLight.shadow.camera.near = 0.5;
        directionalLight.shadow.camera.far = 500;
        
        this.scene.add(directionalLight);
        
        // Add additional light sources if specified in options
        if (this.options.additionalLights) {
            this.options.additionalLights.forEach(light => {
                let newLight;
                
                switch (light.type) {
                    case 'point':
                        newLight = new THREE.PointLight(light.color, light.intensity, light.distance);
                        break;
                    case 'spot':
                        newLight = new THREE.SpotLight(light.color, light.intensity, light.distance, light.angle);
                        break;
                    default:
                        return;
                }
                
                newLight.position.set(light.position.x, light.position.y, light.position.z);
                this.scene.add(newLight);
            });
        }
    }
    
    setupControls() {
        if (!this.options.controlsEnabled) return;
        
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        
        // Apply control options
        this.controls.autoRotate = this.options.autoRotate;
        this.controls.autoRotateSpeed = this.options.autoRotateSpeed;
        this.controls.enableZoom = this.options.zoom;
        this.controls.enablePan = this.options.pan;
        
        // Set min/max zoom if specified
        if (this.options.minDistance) this.controls.minDistance = this.options.minDistance;
        if (this.options.maxDistance) this.controls.maxDistance = this.options.maxDistance;
        
        // Limit rotation if specified
        if (this.options.minPolarAngle) this.controls.minPolarAngle = this.options.minPolarAngle;
        if (this.options.maxPolarAngle) this.controls.maxPolarAngle = this.options.maxPolarAngle;
    }
    
    loadModel() {
        const loader = new THREE.GLTFLoader();
        
        // Add loading indicator
        this.showLoadingIndicator();
        
        loader.load(
            this.modelPath,
            (gltf) => {
                this.model = gltf.scene;
                
                // Make sure the model casts and receives shadows
                this.model.traverse((node) => {
                    if (node.isMesh) {
                        node.castShadow = true;
                        node.receiveShadow = true;
                    }
                });
                
                // Center the model
                const box = new THREE.Box3().setFromObject(this.model);
                const center = box.getCenter(new THREE.Vector3());
                this.model.position.x -= center.x;
                this.model.position.y -= center.y;
                this.model.position.z -= center.z;
                
                // Scale the model if needed
                if (this.options.scale) {
                    this.model.scale.set(
                        this.options.scale,
                        this.options.scale,
                        this.options.scale
                    );
                }
                
                // Handle animations
                if (gltf.animations && gltf.animations.length > 0) {
                    this.mixer = new THREE.AnimationMixer(this.model);
                    this.animations = gltf.animations;
                    
                    if (this.options.playAnimation) {
                        const animation = this.mixer.clipAction(gltf.animations[0]);
                        animation.play();
                    }
                }
                
                this.scene.add(this.model);
                this.hideLoadingIndicator();
                
                // Adjust camera if needed
                if (this.options.fitCameraToModel) {
                    this.fitCameraToModel();
                }
                
                // Call onLoad callback if provided
                if (typeof this.options.onLoad === 'function') {
                    this.options.onLoad(this.model, this);
                }
            },
            (xhr) => {
                const percentComplete = (xhr.loaded / xhr.total) * 100;
                this.updateLoadingProgress(percentComplete);
                
                // Call onProgress callback if provided
                if (typeof this.options.onProgress === 'function') {
                    this.options.onProgress(percentComplete, xhr);
                }
            },
            (error) => {
                console.error('Error loading model:', error);
                this.hideLoadingIndicator();
                this.showErrorMessage('Error loading 3D model');
                
                // Call onError callback if provided
                if (typeof this.options.onError === 'function') {
                    this.options.onError(error);
                }
            }
        );
    }
    
    showLoadingIndicator() {
        const loadingIndicator = document.createElement('div');
        loadingIndicator.className = 'model-loading-indicator';
        loadingIndicator.style.position = 'absolute';
        loadingIndicator.style.top = '50%';
        loadingIndicator.style.left = '50%';
        loadingIndicator.style.transform = 'translate(-50%, -50%)';
        loadingIndicator.style.textAlign = 'center';
        loadingIndicator.style.color = '#ffffff';
        
        const spinner = document.createElement('div');
        spinner.className = 'loading-spinner';
        spinner.style.border = '5px solid rgba(255, 255, 255, 0.1)';
        spinner.style.borderTop = '5px solid #9D00FF';
        spinner.style.borderRadius = '50%';
        spinner.style.width = '50px';
        spinner.style.height = '50px';
        spinner.style.margin = '0 auto 10px';
        spinner.style.animation = 'spin 1s linear infinite';
        
        const loadingText = document.createElement('div');
        loadingText.className = 'loading-text';
        loadingText.textContent = 'Loading model...';
        
        const progressBar = document.createElement('div');
        progressBar.className = 'loading-progress';
        progressBar.style.width = '100%';
        progressBar.style.height = '4px';
        progressBar.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
        progressBar.style.marginTop = '10px';
        progressBar.style.borderRadius = '2px';
        
        const progressFill = document.createElement('div');
        progressFill.className = 'loading-progress-fill';
        progressFill.style.width = '0%';
        progressFill.style.height = '100%';
        progressFill.style.backgroundColor = '#9D00FF';
        progressFill.style.borderRadius = '2px';
        progressFill.style.transition = 'width 0.3s ease';
        
        progressBar.appendChild(progressFill);
        loadingIndicator.appendChild(spinner);
        loadingIndicator.appendChild(loadingText);
        loadingIndicator.appendChild(progressBar);
        
        // Add keyframes for spinner animation if not already added
        if (!document.querySelector('.spinner-keyframes')) {
            const keyframes = document.createElement('style');
            keyframes.className = 'spinner-keyframes';
            keyframes.textContent = `
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(keyframes);
        }
        
        this.container.appendChild(loadingIndicator);
        this.loadingIndicator = loadingIndicator;
    }
    
    updateLoadingProgress(percent) {
        if (!this.loadingIndicator) return;
        
        const progressFill = this.loadingIndicator.querySelector('.loading-progress-fill');
        if (progressFill) {
            progressFill.style.width = `${percent}%`;
        }
        
        const loadingText = this.loadingIndicator.querySelector('.loading-text');
        if (loadingText) {
            loadingText.textContent = `Loading model... ${Math.round(percent)}%`;
        }
    }
    
    hideLoadingIndicator() {
        if (this.loadingIndicator) {
            this.loadingIndicator.remove();
            this.loadingIndicator = null;
        }
    }
    
    showErrorMessage(message) {
        const errorMessage = document.createElement('div');
        errorMessage.className = 'model-error-message';
        errorMessage.style.position = 'absolute';
        errorMessage.style.top = '50%';
        errorMessage.style.left = '50%';
        errorMessage.style.transform = 'translate(-50%, -50%)';
        errorMessage.style.color = '#ff0055';
        errorMessage.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        errorMessage.style.padding = '15px 20px';
        errorMessage.style.borderRadius = '8px';
        errorMessage.style.maxWidth = '80%';
        errorMessage.style.textAlign = 'center';
        
        errorMessage.textContent = message;
        
        this.container.appendChild(errorMessage);
        this.errorMessage = errorMessage;
    }
    
    fitCameraToModel() {
        if (!this.model) return;
        
        const box = new THREE.Box3().setFromObject(this.model);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
        
        const maxDim = Math.max(size.x, size.y, size.z);
        const fov = this.camera.fov * (Math.PI / 180);
        let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
        
        // Add some padding
        cameraZ *= 1.5;
        
        this.camera.position.z = cameraZ;
        
        // Update the orbit controls target to the center of the model
        if (this.controls) {
            this.controls.target.set(center.x, center.y, center.z);
            this.controls.update();
        }
    }
    
    animate() {
        requestAnimationFrame(this.animate.bind(this));
        
        // Update controls
        if (this.controls) {
            this.controls.update();
        }
        
        // Update animation mixer
        if (this.mixer) {
            if (!this.clock) this.clock = new THREE.Clock();
            const delta = this.clock.getDelta();
            this.mixer.update(delta);
        }
        
        // Custom animation callback
        if (typeof this.options.onAnimate === 'function') {
            this.options.onAnimate(this);
        }
        
        this.renderer.render(this.scene, this.camera);
    }
    
    onWindowResize() {
        const width = this.container.clientWidth;
        const height = this.container.clientHeight;
        
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        
        this.renderer.setSize(width, height);
    }
    
    // Public API methods
    
    setAutoRotate(enabled) {
        if (this.controls) {
            this.controls.autoRotate = enabled;
        }
    }
    
    playAnimation(index = 0) {
        if (!this.mixer || !this.animations || this.animations.length === 0) {
            return;
        }
        
        if (index >= this.animations.length) {
            console.warn(`Animation index ${index} out of bounds. Using animation 0 instead.`);
            index = 0;
        }
        
        const animation = this.mixer.clipAction(this.animations[index]);
        animation.reset();
        animation.play();
    }
    
    stopAllAnimations() {
        if (!this.mixer) return;
        this.mixer.stopAllAction();
    }
    
    setCameraPosition(x, y, z) {
        this.camera.position.set(x, y, z);
    }
    
    resetCamera() {
        this.setCameraPosition(
            this.options.cameraPosition.x,
            this.options.cameraPosition.y,
            this.options.cameraPosition.z
        );
        
        if (this.controls) {
            this.controls.reset();
        }
    }
    
    setRotationSpeed(speed) {
        if (this.controls) {
            this.controls.autoRotateSpeed = speed;
        }
    }
    
    setModelScale(scale) {
        if (this.model) {
            this.model.scale.set(scale, scale, scale);
        }
    }
    
    addObject(object) {
        this.scene.add(object);
    }
    
    removeObject(object) {
        this.scene.remove(object);
    }
    
    setBackgroundColor(color) {
        this.scene.background = new THREE.Color(color);
    }
    
    dispose() {
        // Stop animation loop
        cancelAnimationFrame(this.animationFrameId);
        
        // Dispose of resources
        if (this.renderer) {
            this.renderer.dispose();
        }
        
        // Remove event listeners
        window.removeEventListener('resize', this.onWindowResize);
        
        // Clear the container
        while (this.container.firstChild) {
            this.container.removeChild(this.container.firstChild);
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Look for model viewer containers
    const modelContainer = document.getElementById('model-viewer');
    if (modelContainer) {
        // Load the model
        new ModelViewer('model-viewer', 'source/Laptop.glb', {
            backgroundColor: 0x0a0a0a,
            autoRotate: true,
            autoRotateSpeed: 1.0,
            cameraPosition: { x: 0, y: 1, z: 5 },
            scale: 1.5,
            ambientLightColor: 0xffffff,
            ambientLightIntensity: 0.6,
            directionalLightColor: 0xffffff,
            directionalLightIntensity: 1.0,
            additionalLights: [
                {
                    type: 'point',
                    color: 0x9D00FF,
                    intensity: 2,
                    distance: 10,
                    position: { x: -3, y: 1, z: 3 }
                },
                {
                    type: 'point',
                    color: 0x00E0FF,
                    intensity: 2,
                    distance: 10,
                    position: { x: 3, y: 1, z: -3 }
                }
            ],
            onLoad: (model) => {
                console.log('Model loaded successfully');
            }
        });
    }
}); 