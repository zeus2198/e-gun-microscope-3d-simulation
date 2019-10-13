

function getRand(min, max) {
    return Math.random() * (max - min) + min;
}

var scene1 = function () {
    return;
};

var scene2 = function () {
    var engine = new BABYLON.Engine(document.getElementById("elecCanvas"), true);
    var scene = new BABYLON.Scene(engine);
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
    var bCy = BABYLON.MeshBuilder.CreateCylinder("bCy", { height: 10, diameter: 16, tessellation: 64 }, scene),
        sCy = BABYLON.MeshBuilder.CreateCylinder("sCy", { height: 10, diameter: 8, tessellation: 64 }, scene);
    var bCsg = BABYLON.CSG.FromMesh(bCy),
        sCsg = BABYLON.CSG.FromMesh(sCy);
    var wCy = bCsg.subtract(sCsg);
    bCy.dispose();
    sCy.dispose();
    wCy = wCy.toMesh("wCy", wcMat, scene);
    var tube = BABYLON.MeshBuilder.CreateTube("tube", { path: [new BABYLON.Vector3(0, -5, 0), new BABYLON.Vector3(0, 5, 0)], radius: 4, sideOrientation: BABYLON.Mesh.DOUBLESIDE, updatable: true }, scene);
    tube.material = wcMat;

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
    bCy = BABYLON.MeshBuilder.CreateCylinder("bCy", { height: 1, diameter: 30, tessellation: 64 }, scene),
        sCy = BABYLON.MeshBuilder.CreateCylinder("sCy", { height: 1, diameter: 14, tessellation: 64 }, scene);
    bCsg = BABYLON.CSG.FromMesh(bCy),
        sCsg = BABYLON.CSG.FromMesh(sCy);
    wCy = bCsg.subtract(sCsg);
    bCy.dispose();
    sCy.dispose();
    wCy = wCy.toMesh("wCy", wcMat, scene);
    wCy.position.y = -25;

    var outputplane = BABYLON.Mesh.CreatePlane("outputplane", 30, scene, false);
    outputplane.billboardMode = BABYLON.AbstractMesh.BILLBOARDMODE_ALL;
    outputplane.material = new BABYLON.StandardMaterial("outputplane", scene);
    outputplane.position = new BABYLON.Vector3(-22.5, -4, 0);
    outputplane.scaling.y = 0.7;


    var outputplaneTexture = new BABYLON.DynamicTexture("dynamic texture", 512, scene, true);
    outputplaneTexture.hasAlpha = true;
    outputplane.material.diffuseTexture = outputplaneTexture;
    outputplane.material.specularColor = new BABYLON.Color3(0, 0, 0);
    outputplane.material.emissiveColor = new BABYLON.Color3(1, 1, 1);
    outputplane.material.backFaceCulling = false;
    outputplaneTexture.drawText("Wehnelt Cylinder", null, 200, "bold 60px sans-serif", "white");

    outputplane = BABYLON.Mesh.CreatePlane("outputplane", 30, scene, false);
    outputplane.billboardMode = BABYLON.AbstractMesh.BILLBOARDMODE_ALL;
    outputplane.material = new BABYLON.StandardMaterial("outputplane", scene);
    outputplane.position = new BABYLON.Vector3(-20.5, -27.8, 0);
    outputplane.scaling.y = 0.7;

    outputplaneTexture = new BABYLON.DynamicTexture("dynamic texture", 512, scene, true);
    outputplaneTexture.hasAlpha = true;
    outputplane.material.diffuseTexture = outputplaneTexture;
    outputplane.material.specularColor = new BABYLON.Color3(0, 0, 0);
    outputplane.material.emissiveColor = new BABYLON.Color3(1, 1, 1);
    outputplane.material.backFaceCulling = false;
    outputplaneTexture.drawText("Anode", null, 200, "bold 60px sans-serif", "white");

    outputplane = BABYLON.Mesh.CreatePlane("outputplane", 30, scene, false);
    outputplane.billboardMode = BABYLON.AbstractMesh.BILLBOARDMODE_ALL;
    outputplane.material = new BABYLON.StandardMaterial("outputplane", scene);
    outputplane.position = new BABYLON.Vector3(20, -13.2, 0);
    outputplane.scaling.y = 0.4;

    outputplaneTexture = new BABYLON.DynamicTexture("dynamic texture", 512, scene, true);
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
    outputplane.position = new BABYLON.Vector3(0, 14, 0);

    outputplane.scaling.y = 0.7;
    outputplaneTexture = new BABYLON.DynamicTexture("dynamic texture", 512, scene, true);
    outputplaneTexture.hasAlpha = true;
    outputplane.material.diffuseTexture = outputplaneTexture;
    outputplane.material.specularColor = new BABYLON.Color3(0, 0, 0);
    outputplane.material.emissiveColor = new BABYLON.Color3(1, 1, 1);
    outputplane.material.backFaceCulling = false;
    outputplaneTexture.drawText("6.3 V", null, 200, "bold 60px sans-serif", "white");

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


        var elec = { e: BABYLON.Mesh.CreateSphere("ele" + count++, 10, 0.5, scene), acc: false, aligned: false, apos: -5-getRand(0,1.5) };
        elec.e.position = new BABYLON.Vector3(getRand(-3, 3), 3.5, getRand(-3, 3));
        elec.e.material = eMat;
        elec.e.physicsImpostor = new BABYLON.PhysicsImpostor(elec.e, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 1, restitution: 1 }, scene);
        elec.e.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(0, -5, 0));
        elec.e.physicsImpostor.physicsBody.shapes.belongsTo = 1 << 2;
        elec.e.physicsImpostor.physicsBody.shapes.collidesWith = 1 << 1;
        electrons.push(elec);
        elec = { e: BABYLON.Mesh.CreateSphere("ele" + count++, 10, 0.5, scene), acc: false, aligned: false, apos: -5-getRand(0,1.5) };
        elec.e.position = new BABYLON.Vector3(getRand(-3, 3), 3.5, getRand(-3, 3));
        elec.e.material = eMat;
        elec.e.physicsImpostor = new BABYLON.PhysicsImpostor(elec.e, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 1, restitution: 1 }, scene);
        elec.e.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(0, -5, 0));
        elec.e.physicsImpostor.physicsBody.shapes.belongsTo = 1 << 2;
        elec.e.physicsImpostor.physicsBody.shapes.collidesWith = 1 << 1;
        electrons.push(elec);
        elec = { e: BABYLON.Mesh.CreateSphere("ele" + count++, 10, 0.5, scene), acc: false, aligned: false, apos: -5-getRand(0,1.5) };
        elec.e.position = new BABYLON.Vector3(getRand(-3, 3), 3.5, getRand(-3, 3));
        elec.e.material = eMat;
        elec.e.physicsImpostor = new BABYLON.PhysicsImpostor(elec.e, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 1, restitution: 1 }, scene);
        elec.e.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(0, -5, 0));
        elec.e.physicsImpostor.physicsBody.shapes.belongsTo = 1 << 2;
        elec.e.physicsImpostor.physicsBody.shapes.collidesWith = 1 << 1;
        electrons.push(elec);
        elec = { e: BABYLON.Mesh.CreateSphere("ele" + count++, 10, 0.5, scene), acc: false, aligned: false, apos: -5-getRand(0,1.5) };
        elec.e.position = c;
        elec.e.material = eMat;
        elec.e.physicsImpostor = new BABYLON.PhysicsImpostor(elec.e, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 1, restitution: 1 }, scene);
        elec.e.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(0, -5, 0));
        elec.e.physicsImpostor.physicsBody.shapes.belongsTo = 1 << 2;
        elec.e.physicsImpostor.physicsBody.shapes.collidesWith = 1 << 1;
        electrons.push(elec);
        elec = { e: BABYLON.Mesh.CreateSphere("ele" + count++, 10, 0.5, scene), acc: false, aligned: false, apos: -5-getRand(0,1.5) };
        elec.e.position = new BABYLON.Vector3(getRand(-3, 3), 3.5, getRand(-3, 3));
        elec.e.material = eMat;
        elec.e.physicsImpostor = new BABYLON.PhysicsImpostor(elec.e, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 1, restitution: 1 }, scene);
        elec.e.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(0, -5, 0));
        elec.e.physicsImpostor.physicsBody.shapes.belongsTo = 1 << 2;
        elec.e.physicsImpostor.physicsBody.shapes.collidesWith = 1 << 1;
        electrons.push(elec);

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

var scene3 = function () {
    var scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3.White();
    var gMat = new BABYLON.StandardMaterial("gMat", scene);
    gMat.diffuseColor = new BABYLON.Color3(1, 0, 0);
    gMat.alpha = 0.5;

    var eMat = new BABYLON.StandardMaterial("eMat", scene);
    eMat.diffuseColor = new BABYLON.Color3(0, 0.7, 1);
    eMat.alpha = 0.9;

    //var camera = new BABYLON.FreeCamera("cam1", new BABYLON.Vector3(0,6,-10), scene);
    //camera.setTarget(BABYLON.Vector3.Zero());
    var camera = new BABYLON.ArcRotateCamera("arcCam",
        BABYLON.Tools.ToRadians(45),
        BABYLON.Tools.ToRadians(45),
        50.0, BABYLON.Vector3.Zero());
    camera.attachControl(lab, true);

    scene.enablePhysics(new BABYLON.Vector3(0, 0, 0), new BABYLON.OimoJSPlugin());

    var electrons = [];
    /*var light = new BABYLON.HemisphericLight("hemiLight", new BABYLON.Vector3(20, 50, 20), scene);
	light.diffuse = new BABYLON.Color3(1, 0.5, 0);
	light.specular = new BABYLON.Color3(0, 1, 0);
    light.groundColor = new BABYLON.Color3(0, 0, 0);*/
    var light = new BABYLON.DirectionalLight("dir02", new BABYLON.Vector3(-0.5, -1, 0), scene);
    light.position = new BABYLON.Vector3(-80, 80, -80);
    light.diffuse = new BABYLON.Color3(1, 1, 1);

    //var shadowGenerator = new BABYLON.ShadowGenerator(2048, light);


    var ground = BABYLON.MeshBuilder.CreateBox("box", { height: 0.5, width: 20, depth: 20 }, scene);
    //ground.physicsImposter = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
    ground.receiveShadows = true;
    ground.material = gMat;
    var timer = 0, count = 1, i = 0;
    scene.registerBeforeRender(function () {
        timer++;
        if (timer == 2) {
            var elec = { e: BABYLON.Mesh.CreateSphere("ele" + count++, 10, 0.5, scene), bounced: false };
            elec.e.position.y = 15;
            elec.e.material = eMat;
            elec.e.physicsImpostor = new BABYLON.PhysicsImpostor(elec.e, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 1, restitution: 1 }, scene);
            elec.e.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(0, -15, 0));
            elec.e.physicsImpostor.physicsBody.shapes.belongsTo = 1 << 2;
            elec.e.physicsImpostor.physicsBody.shapes.collidesWith = 1 << 1;
            if (count == 2) console.log(elec.e.physicsImpostor.physicsBody);
            //shadowGenerator.addShadowCaster(elec);
            electrons.push(elec);
            timer = 0;
        }
        for (i = 0; i < electrons.length; i++)
            if (!electrons[i].bounced && electrons[i].e.intersectsMesh(ground, false)) {
                if (getRand(1, 11) > 6) {
                    electrons[i].e.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(getRand(0, 2) ? getRand(-15, 15) : 0, getRand(10, 15), getRand(0, 2) ? getRand(-15, 15) : 0));
                }
                else
                    electrons[i].e.physicsImpostor.setLinearVelocity(new BABYLON.Vector3(getRand(-4, 4), -20, getRand(-4, 4)));

                ground.material.diffuseColor = new BABYLON.Color3(0, 0.1, 0.5);
                electrons[i].bounced = true;
                break;
            }
        if (i == electrons.length) ground.material.diffuseColor = new BABYLON.Color3(1, 0, 1);

    });
    return scene;
};

$(document).ready(function () {
    var curFace = 0, curScene = 1;
    $("#front-face").html($("#scene-1").html());

    $(".next").click(function () {
        curFace = !curFace;
        curScene++;
        $(curFace ? "#back-face" : "#front-face").html($("#scene-" + curScene).html());
        window["scene" + curScene]();
        $("#card").toggleClass("back");
    });
});
