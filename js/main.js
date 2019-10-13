const TOTAL_SCENES = 2;

function getRand(min, max) {
    return Math.random() * (max - min) + min;
}

function createRing(height, outterDia, innerDia, scene) {
    var mainCu = BABYLON.MeshBuilder.CreateCylinder("mCu", { diameter: outterDia, height: height }, scene);
    var smallCu = BABYLON.MeshBuilder.CreateCylinder("mCu", { diameter: innerDia, height: height }, scene);
    var mainCSG = BABYLON.CSG.FromMesh(mainCu),
        smallCSG = BABYLON.CSG.FromMesh(smallCu);
    var ring = mainCSG.subtract(smallCSG);
    mainCu.dispose();
    smallCu.dispose();
    var tube = BABYLON.MeshBuilder.CreateTube("tube", { path: [new BABYLON.Vector3(0, -height / 2, 0), new BABYLON.Vector3(0, height / 2, 0)], radius: innerDia / 2, sideOrientation: BABYLON.Mesh.DOUBLESIDE, updatable: true }, scene);
    ring = ring.toMesh("ring", null, scene);
    tube.parent = ring;
    ring.tube = tube;
    return ring;
}

function writeText(text, fsize, yscale, pos, scene) {
    var outputplane = BABYLON.Mesh.CreatePlane("outputplane", 30, scene, false);
    outputplane.billboardMode = BABYLON.AbstractMesh.BILLBOARDMODE_ALL;
    outputplane.material = new BABYLON.StandardMaterial("outputplane", scene);
    outputplane.position = pos;
    outputplane.scaling.y = yscale;

    var outputplaneTexture = new BABYLON.DynamicTexture("dynamic texture", 512, scene, true);
    outputplaneTexture.hasAlpha = true;
    outputplane.material.diffuseTexture = outputplaneTexture;
    outputplane.material.specularColor = new BABYLON.Color3(0, 0, 0);
    outputplane.material.emissiveColor = new BABYLON.Color3(1, 1, 1);
    outputplane.material.backFaceCulling = false;
    outputplaneTexture.drawText(text, null, 200, "bold " + fsize + "px sans-serif", "white");
}

// var scene1 = function () {
//     return;
// };

// var sceneExit1 = function () {
//     return;
// }

var scene1 = function () {
    var engine = new BABYLON.Engine(document.getElementById("elecCanvas"), true);
    var scene = new BABYLON.Scene(engine);
    window.scene1.engine = engine;
    window.scene1.scene = scene;
    scene.clearColor = new BABYLON.Color3(0.2, 0.2, 0.2);

    scene.enablePhysics(new BABYLON.Vector3(0, 0, 0), new BABYLON.OimoJSPlugin());

    var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2, Math.PI / 4, 4, BABYLON.Vector3.Zero(), scene);
    camera.setPosition(new BABYLON.Vector3(0, 30, 90));
    camera.attachControl(document.getElementById("elecCanvas"), true);

    // Add lights to the scene
    new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(10, 20, 0), scene);

    var light = new BABYLON.PointLight("light", new BABYLON.Vector3(0, -10, 0), scene);
    light.diffuse = new BABYLON.Color3(1, 0, 0);
    light.specular = new BABYLON.Color3(0, 1, 0);

    var eMat = new BABYLON.StandardMaterial("eMat", scene);
    eMat.diffuseColor = new BABYLON.Color3(0, 0.5, 1);


    var wcMat = new BABYLON.StandardMaterial("wcMat", scene);
    wcMat.diffuseColor = new BABYLON.Color3(0.9, 1, 0.2);
    wcMat.alpha = 0.5;

    //cylinder with ring:
    var wCy = createRing(10, 16, 8, scene);
    wCy.material = wcMat;
    wCy.tube.material = wcMat;

    var fil = BABYLON.MeshBuilder.CreateCylinder("filament", { height: 2, diameterTop: 7, diameterBottom: 0, faceColors: [], tessellation: 96 }, scene);
    fil.position.y = 3;
    fil.material = new BABYLON.StandardMaterial("filMat", scene);
    fil.material.diffuseColor = new BABYLON.Color3.Red();
    fil.material.emissiveColor = new BABYLON.Color3.Red();

    //battery lines
    var lines = BABYLON.MeshBuilder.CreateLines("lines", { points: [new BABYLON.Vector3(2.8, 4, 0), new BABYLON.Vector3(2.8, 15, 0)] }, scene);
    lines.color = new BABYLON.Color3(1, 0, 1);

    lines = BABYLON.MeshBuilder.CreateLines("lines", { points: [new BABYLON.Vector3(-2.7, 4, 0), new BABYLON.Vector3(-2.8, 15, 0)] }, scene);
    lines.color = new BABYLON.Color3(1, 0, 1);

    lines = BABYLON.MeshBuilder.CreateLines("lines", { points: [new BABYLON.Vector3(15, -25, 0), new BABYLON.Vector3(20, -25, 0), new BABYLON.Vector3(20, -15, 0)] }, scene);
    lines.color = new BABYLON.Color3(1, 0, 1);

    lines = BABYLON.MeshBuilder.CreateLines("lines", { points: [new BABYLON.Vector3(20, -10, 0), new BABYLON.Vector3(20, 10, 0), new BABYLON.Vector3(2.8, 10, 0)] }, scene);
    lines.color = new BABYLON.Color3(1, 0, 1);

    // anode
    wCy = createRing(1, 30, 14, scene);
    wCy.material = wcMat;
    wCy.tube.dispose();
    wCy.position.y = -25;

    writeText("Wehnelt Cylinder", 60, 0.7, new BABYLON.Vector3(-22.5, -4, 0), scene);
    writeText("Anode", 60, 0.7, new BABYLON.Vector3(-20.5, -27.8, 0), scene);
    writeText("6.3 V", 60, 0.7, new BABYLON.Vector3(0, 14, 0), scene);

    var outputplane = BABYLON.Mesh.CreatePlane("outputplane", 30, scene, false);
    outputplane.billboardMode = BABYLON.AbstractMesh.BILLBOARDMODE_ALL;
    outputplane.material = new BABYLON.StandardMaterial("outputplane", scene);
    outputplane.position = new BABYLON.Vector3(20, -13.2, 0);
    outputplane.scaling.y = 0.4;

    var outputplaneTexture = new BABYLON.DynamicTexture("dynamic texture", 512, scene, true);
    outputplaneTexture.hasAlpha = true;
    outputplane.material.diffuseTexture = outputplaneTexture;
    outputplane.material.specularColor = new BABYLON.Color3(0, 0, 0);
    outputplane.material.emissiveColor = new BABYLON.Color3(1, 1, 1);
    outputplane.material.backFaceCulling = false;
    outputplaneTexture.drawText("Acceleration", null, 200, "bold 60px sans-serif", "white");
    outputplaneTexture.drawText("Voltage", null, 280, "bold 60px sans-serif", "white");

    outputplane = BABYLON.Mesh.CreatePlane("outputplane", 30, scene, false);
    outputplane.billboardMode = BABYLON.AbstractMesh.BILLBOARDMODE_ALL;
    outputplane.material = new BABYLON.StandardMaterial("outputplane", scene);
    outputplane.position = new BABYLON.Vector3(0, 4, 0);

    outputplane.scaling.y = 0.4;
    outputplane.scaling.x = 0.4;
    outputplaneTexture = new BABYLON.DynamicTexture("dynamic texture", 512, scene, true);
    outputplaneTexture.hasAlpha = true;
    outputplane.material.diffuseTexture = outputplaneTexture;
    outputplane.material.specularColor = new BABYLON.Color3(0, 0, 0);
    outputplane.material.emissiveColor = new BABYLON.Color3(1, 1, 1);
    outputplane.material.backFaceCulling = false;
    outputplaneTexture.drawText("Filament", null, 200, "bold 60px sans-serif", "white");

    var electrons = [], count = 1;
    scene.registerBeforeRender(function () {
        var elec;
        for (var j = 0; j < 5; j++) {
            elec = { e: BABYLON.Mesh.CreateSphere("ele" + count++, 10, 0.5, scene), acc: false, aligned: false, apos: -5 - getRand(0, 1.5) };
            elec.e.position = new BABYLON.Vector3(getRand(-3, 3), 3.5, getRand(-3, 3));
            elec.e.material = eMat;
            elec.e.physicsImpostor = new BABYLON.PhysicsImpostor(elec.e, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 1, restitution: 1 }, scene);
            elec.e.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(0, -5, 0));
            elec.e.physicsImpostor.physicsBody.shapes.belongsTo = 1 << 2;
            elec.e.physicsImpostor.physicsBody.shapes.collidesWith = 1 << 1;
            electrons.push(elec);
        }
        for (i = 0; i < electrons.length; i++) {
            var elec = electrons[i];
            if (!elec.acc && elec.e.position.y < elec.apos) {
                elec.e.physicsImpostor.applyImpulse(new BABYLON.Vector3(-elec.e.position.x * 1.5, -35, -elec.e.position.z * 1.5), elec.e.getAbsolutePosition());
                elec.acc = true;
            }
            else if (!elec.aligned && elec.e.position.y < -23) {
                elec.e.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(0, -100, 0));
                elec.aligned = true;
            }
            else if (elec.e.position.y < -80) {
                elec.e.physicsImpostor.dispose();
                elec.e.dispose();
                electrons.splice(i, 1);
            }
        }

    });
    engine.runRenderLoop(function () {
        scene.render();
    });
    window.addEventListener('resize', function () {
        engine.resize();
    });
};

var sceneExit1 = function () {
    window.scene1.scene.dispose();
    window.scene1.engine.dispose();
    $("#elecCanvas").css({ opacity: 0 });
};

var scene2 = function () {
    var engine = new BABYLON.Engine(document.getElementById("mCanvas"), true);
    var scene = new BABYLON.Scene(engine);
    window.scene2.engine = engine;
    window.scene2.scene = scene;
    scene.clearColor = new BABYLON.Color3(0.2, 0.2, 0.2);

    var camera = new BABYLON.ArcRotateCamera("arcCam",
        BABYLON.Tools.ToRadians(90),
        BABYLON.Tools.ToRadians(70),
        230.0, new BABYLON.Vector3(0, -50, 0), scene);
    camera.attachControl(document.getElementById("mCanvas"), true);

    var light = new BABYLON.DirectionalLight("light1", new BABYLON.Vector3(-20, -20, -20), scene);
    light.intensity = 1.5;
    light.diffuse = new BABYLON.Color3(1, 1, 1);
    light.specular = new BABYLON.Color3(1, 1, 1);

    var light = new BABYLON.DirectionalLight("light1", new BABYLON.Vector3(25, 4, -10), scene);

    light.diffuse = new BABYLON.Color3(1, 1, 1);
    light.specular = new BABYLON.Color3(1, 1, 1);


    //3d setup
    var mat = BABYLON.MeshBuilder.CreateCylinder("mat", { diameter: 10, height: 0.1 }, scene);
    mat.material = new BABYLON.StandardMaterial("gMat", scene);
    mat.material.diffuseColor = new BABYLON.Color3(1, 0, 0);
    mat.material.alpha = 0.5;
    var interArea = BABYLON.MeshBuilder.CreateCylinder("inter", { diameter: 0.85, height: 0.1 }, scene);
    interArea.material = new BABYLON.StandardMaterial("intMat", scene);
    interArea.material.diffuseColor = new BABYLON.Color3.Yellow();
    interArea.material.alpha = 0.6;
    var objLens = createRing(2, 20, 10, scene);
    objLens.material = new BABYLON.StandardMaterial("objLens", scene);
    objLens.material.diffuseColor = new BABYLON.Color3(0, 0.4, 0.8);
    objLens.position.y = -10;
    objLens.tube.material = objLens.material;

    var interLens = createRing(2, 20, 10, scene);
    interLens.material = objLens.material;
    interLens.tube.material = interLens.material;
    interLens.position.y = -60;

    var projLens = createRing(2, 45, 25, scene);
    projLens.material = objLens.material;
    projLens.tube.material = projLens.material;
    projLens.position.y = -95;


    var mainCu = BABYLON.MeshBuilder.CreateBox("mCu", { width: 25, height: 1.5, depth: 25 }, scene),
        smallCu = BABYLON.MeshBuilder.CreateBox("mCu", { width: 12, height: 1.5, depth: 11 }, scene);
    var mainCSG = BABYLON.CSG.FromMesh(mainCu),
        smallCSG = BABYLON.CSG.FromMesh(smallCu);
    var backFocal = mainCSG.subtract(smallCSG);
    backFocal = backFocal.toMesh("bFocal", null, scene);
    backFocal.position.y = -25;
    mainCu.dispose();
    smallCu.dispose();

    var screen = BABYLON.MeshBuilder.CreateBox("screen", { width: 50, height: 17, depth: 50 }, scene);
    screen.position.y = -125;
    screen.material = new BABYLON.StandardMaterial("sMat", scene);
    screen.material.diffuseColor = new BABYLON.Color3(0.1, 0.1, 0.1);

    //electron gun:
    var mainCu = BABYLON.MeshBuilder.CreateCylinder("mCy", { diameter: 5, height: 8 }, scene);
    var smallCu = BABYLON.MeshBuilder.CreateCylinder("mCy", { diameter: 3, height: 5 }, scene);
    smallCu.position.y = -1.5;
    mainCSG = BABYLON.CSG.FromMesh(mainCu),
        smallCSG = BABYLON.CSG.FromMesh(smallCu);
    var gun = mainCSG.subtract(smallCSG);
    mainCu.dispose();
    smallCu.dispose();
    gun = gun.toMesh("eGun", null, scene);
    gun.position.y = 20;
    gun.material = new BABYLON.StandardMaterial("gunMat", scene);
    gun.material.diffuseColor = new BABYLON.Color3(0.7, 0.1, 0.1);
    gun.material.emissiveColor = new BABYLON.Color3(0.5, 0.1, 0.1);

    lines = BABYLON.MeshBuilder.CreateDashedLines("lines", { points: [new BABYLON.Vector3(-1, 1, 0), new BABYLON.Vector3(-10, 10, 0), new BABYLON.Vector3(-15, 10, 0)] }, scene);
    lines.color = new BABYLON.Color3(1, 0, 1);

    //text:
    writeText("Electron Gun", 60, 0.9, new BABYLON.Vector3(-15, 16, 0), scene);
    writeText("Specimen", 60, 0.9, new BABYLON.Vector3(-15, -4, 0), scene);
    writeText("Objective Lens", 60, 0.9, new BABYLON.Vector3(-24, -14, 0), scene);
    writeText("Back Focal Plane", 60, 0.9, new BABYLON.Vector3(-28, -28, 0), scene);
    writeText("Intermediate Lens", 60, 0.9, new BABYLON.Vector3(-26, -64, 0), scene);
    writeText("Projective Lens", 60, 0.9, new BABYLON.Vector3(-37, -98.5, 0), scene);
    writeText("Screen", 80, 0.9, new BABYLON.Vector3(-37, -125, 0), scene);
    writeText("X-Rays", 60, 0.9, new BABYLON.Vector3(-22, 6.3, 0), scene);

    //anim:
    var url = "http://i166.photobucket.com/albums/u83/j1m68/star.jpg";
    var ps = new BABYLON.ParticleSystem("ps1", 2500, scene)
    ps.particleTexture = new BABYLON.Texture(url, scene);

    ps.minSize = 0.7;
    ps.maxSize = 0.7;
    ps.minLifeTime = 30;
    ps.maxLifeTime = 30;
    ps.minEmitPower = 5;
    ps.maxEmitPower = 5;

    ps.emitter = gun;

    ps.emitRate = 100;
    ps.updateSpeed = 0.07;
    ps.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;
    ps.color1 = new BABYLON.Color4(0, 0, 1, 1);
    ps.color2 = new BABYLON.Color4(0, 1, 0, 1);
    ps.colorDead = new BABYLON.Color4(1, 0, 0, 1);

    ps.direction1 = new BABYLON.Vector3(0, -1, 0);
    ps.direction2 = new BABYLON.Vector3(0, -1, 0);
    ps.minEmitBox = new BABYLON.Vector3(0, 4, 0);
    ps.maxEmitBox = new BABYLON.Vector3(0, 4, 0);

    ps.start(150);

    ps.updateFunction = function (particles) {
        for (var index = 0; index < particles.length; index++) {
            var particle = particles[index];
            particle.age += this._scaledUpdateSpeed;
            var pos = particle.position.y, size;
            if (pos <= 20 && pos >= 0.2) {
                size = ps.maxSize * 1.5 * + (pos / 20) * 3;
                particle.size = size < 0.6 ? 0.6 : size;
            }
            if (pos < 0.2 && pos > -20) {
                //specimen to object and below   
                size = ps.maxSize * 1.5 * + Math.sin((Math.abs(pos) / 20) * Math.PI) * 4;
                particle.size = size < 0.6 ? 0.6 : size;
            } else if (pos <= -20 && pos > -60) {
                //small to mid intermediate
                size = ps.maxSize * 1.5 * + Math.sin(((Math.abs(pos) - 20) / 40) * Math.PI / 2) * 4.3;
                particle.size = size < 0.6 ? 0.6 : size;
            }
            else if (pos <= -60 && pos > -70) {
                //mid inter to small
                size = ps.maxSize * 1.5 * + Math.cos(((Math.abs(pos) - 60) / 10) * Math.PI / 2) * 4.3;
                particle.size = size < 0.6 ? 0.6 : size;
            }
            else if (pos <= -70 && pos > -95) {
                //small to mid proj
                size = ps.maxSize * 2 * + Math.sin(((Math.abs(pos) - 70) / 25) * Math.PI / 2) * 13;
                particle.size = size < 0.6 ? 0.6 : size;
            }
            else if (pos <= -95 && pos > -110) {
                //mid proj to small
                size = ps.maxSize * 2 * + Math.cos(((Math.abs(pos) - 95) / 15) * Math.PI / 2) * 13;
                particle.size = size < 0.6 ? 0.6 : size;
            }
            else if (pos <= -110) {
                //small to screen
                size = ps.maxSize * 2 * + Math.sin(((Math.abs(pos) - 110) / 15) * Math.PI / 2) * 13;
                particle.size = size < 0.6 ? 0.6 : size;
            }
            if (particle.age >= particle.lifeTime) { // Recycle
                particles.splice(index, 1);
                this._stockParticles.push(particle);
                index--;
                continue;
            }
            else {
                particle.colorStep.scaleToRef(this._scaledUpdateSpeed, this._scaledColorStep);
                particle.color.addInPlace(this._scaledColorStep);

                if (particle.color.a < 0)

                    particle.color.a = 0;

                particle.angle += particle.angularSpeed * this._scaledUpdateSpeed;

                particle.direction.scaleToRef(this._scaledUpdateSpeed, this._scaledDirection);
                particle.position.addInPlace(this._scaledDirection);

                this.gravity.scaleToRef(this._scaledUpdateSpeed, this._scaledGravity);
                particle.direction.addInPlace(this._scaledGravity);
            }
        }
    };

    var ps1 = new BABYLON.ParticleSystem("ps1", 10000, scene);
    ps1.particleTexture = new BABYLON.Texture(url, scene);

    ps1.minSize = 0.5;
    ps1.maxSize = 1;
    ps1.minLifeTime = 1;
    ps1.maxLifeTime = 1;
    ps1.minEmitPower = 3;
    ps1.maxEmitPower = 3;
    ps1.minAngularSpeed = 0;
    ps1.maxAngularSpeed = Math.PI;
    ps1.emitter = new BABYLON.Vector3(0, 0, 0);
    ps1.emitRate = 20;
    ps1.updateSpeed = 0.05;
    ps1.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;
    ps1.color1 = new BABYLON.Color4(0, 0, 1, 1);
    ps1.color2 = new BABYLON.Color4(0, 1, 0, 1);
    ps1.colorDead = new BABYLON.Color3(0, 0, 0.2, 0);
    ps1.direction1 = new BABYLON.Vector3(-1, 1, -1);
    ps1.direction2 = new BABYLON.Vector3(1, 1, 1);
    ps1.minEmitBox = new BABYLON.Vector3(0, -0.5, 0);
    ps1.maxEmitBox = new BABYLON.Vector3(0, 0.5, 0);
    ps1.start(1250);

    engine.runRenderLoop(function () {
        scene.render();
    });
    window.addEventListener('resize', function () {
        engine.resize();
    });
};

var sceneExit2 = function () {
    window.scene2.scene.dispose();
    window.scene2.engine.dispose();
    $("#mCanvas").css({ opacity: 0 });
};

// var scene4 = function () { };
// var sceneExit4 = function () { };

var curFace = 0, curScene = 1;

function next() {
    curFace = !curFace;
    let oldScene = curScene;
    curScene = (curScene % TOTAL_SCENES) + 1;
    $(curFace ? "#back-face" : "#front-face").html($("#scene-" + curScene).html());
    $("#card").toggleClass("back");
    setTimeout(function () { window["scene" + curScene](); window["sceneExit" + oldScene](); }, 10);
    $('.scenes button').each(function () { $(this).removeClass("active"); });
    $('.scenes button:nth-child(' + curScene + ')').addClass("active");
}

function back() {
    if (curScene == 1) return;
    curFace = !curFace;
    let oldScene = curScene;
    curScene = curScene == 1 ? TOTAL_SCENES : curScene - 1;
    $(curFace ? "#back-face" : "#front-face").html($("#scene-" + curScene).html());
    $("#card").toggleClass("back");
    setTimeout(function () { window["scene" + curScene](); window["sceneExit" + oldScene](); }, 10);
    $('.scenes button').each(function () { $(this).removeClass("active"); });
    $('.scenes button:nth-child(' + curScene + ')').addClass("active");
}

$(document).ready(function () {
    $("#front-face").html($("#scene-1").html());
    $(".scenes button").click(function () {
        if ($(this).data("scene") == curScene) return;
        curFace = !curFace;
        var lastScene = curScene;
        curScene = parseInt($(this).data("scene"));
        $(curFace ? "#back-face" : "#front-face").html($("#scene-" + curScene).html());
        $("#card").toggleClass("back");
        $('.scenes button').each(function () { $(this).removeClass("active"); });
        $('.scenes button:nth-child(' + curScene + ')').addClass("active");
        setTimeout(function () { window["scene" + curScene](); window["sceneExit" + lastScene](); }, 10);
    });
    scene1();
    $('.toast').toast('show');
});
