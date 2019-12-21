import * as createjs from 'createjs-module';
import { CanvasConfig } from './canvas-config';
import { DeviceConfig } from './device-config';
import { DeviceColor } from './device-color';

export class CanvasController {
    containerID: string
    width: number;
    height: number;
    canvasConfig: CanvasConfig;

    //Canvas and contexts
    deviceCanvasID: string;
    deviceCanvas: HTMLCanvasElement;
    deviceCanvasContext: CanvasRenderingContext2D
    deviceStage: createjs.Stage;

    screenshotCanvasID: string;
    screenshotCanvas: HTMLCanvasElement;
    screenshotCanvasContext: CanvasRenderingContext2D
    screenshotStage: createjs.Stage;

    captionCanvasID: string;
    captionCanvas: HTMLCanvasElement;
    captionCanvasContext: CanvasRenderingContext2D
    captionStage: createjs.Stage;

    backgroundCanvasID: string;
    backgroundCanvas: HTMLCanvasElement;
    backgroundCanvasContext: CanvasRenderingContext2D
    backgroundStage: createjs.Stage;

    exportCanvasID: string;
    exportCanvas: HTMLCanvasElement;
    exportCanvasContext: CanvasRenderingContext2D;

    constructor(width: number, height: number, canvasConfig: CanvasConfig) {
        //Set member variables
        this.containerID = this.generateID();
        this.screenshotCanvasID = this.generateID();
        this.deviceCanvasID = this.generateID();
        this.captionCanvasID = this.generateID();
        this.backgroundCanvasID = this.generateID();
        this.exportCanvasID = this.generateID();

        this.width = width;
        this.height = height;
        this.canvasConfig = canvasConfig;

        setTimeout(() => {
            this.initialize();
        }, 100);
    }

    initialize() {
        //Setup our canvas scale and initialize create.js
        this.setupCanvas();
        this.initCreateJS();

        //Render initial
        this.render();
    }

    //Initializes the canvas elements to approx. half of the screens height
    //and sets the correct width/height pixel density
    setupCanvas() {
        let screenRatio = ((0.68) * screen.height) / this.height
        let displayHeightPX = Math.floor(screenRatio * this.height) + "px";
        let displayWidthPX = Math.floor(screenRatio * this.width) + "px";

        //Get reference to canvas elements
        let container = <HTMLDivElement>document.getElementById(this.containerID);

        this.screenshotCanvas = <HTMLCanvasElement>document.getElementById(this.screenshotCanvasID);
        this.screenshotCanvasContext = this.screenshotCanvas.getContext("2d");

        this.deviceCanvas = <HTMLCanvasElement>document.getElementById(this.deviceCanvasID);
        this.deviceCanvasContext = this.deviceCanvas.getContext("2d");

        this.captionCanvas = <HTMLCanvasElement>document.getElementById(this.captionCanvasID);
        this.captionCanvasContext = this.captionCanvas.getContext("2d");

        this.backgroundCanvas = <HTMLCanvasElement>document.getElementById(this.backgroundCanvasID);
        this.backgroundCanvasContext = this.backgroundCanvas.getContext("2d");

        this.exportCanvas = <HTMLCanvasElement>document.getElementById(this.exportCanvasID);
        this.exportCanvasContext = this.exportCanvas.getContext("2d");

        container.style.height = displayHeightPX;
        container.style.width = displayWidthPX;
        
        //Scale container element
        container.style.height = displayHeightPX;
        container.style.width = displayWidthPX;

        //Scale canvas elements
        for(let canvas of [this.screenshotCanvas, this.deviceCanvas, this.captionCanvas, this.backgroundCanvas, this.exportCanvas]) {
            canvas.style.height = displayHeightPX;
            canvas.style.width = displayWidthPX;
            canvas.height = this.height;
            canvas.width = this.width;
        }

        for(let context of [this.screenshotCanvasContext, this.deviceCanvasContext, this.captionCanvasContext, this.backgroundCanvasContext]) {
            context.scale(1 / screenRatio, 1 / screenRatio);
        }

        //Setup text margin
        this.canvasConfig.textMargin = this.height * (1 - this.canvasConfig.scale) / 3;
    }

    //Initialize the create.js stage
    initCreateJS() {
        this.screenshotStage = new createjs.Stage(this.screenshotCanvasID);
        this.deviceStage = new createjs.Stage(this.deviceCanvasID);
        this.captionStage = new createjs.Stage(this.captionCanvasID);
        this.backgroundStage = new createjs.Stage(this.backgroundCanvasID);
    }

    //Renders changes to the canvasConfig in proper order
    async render() {
        await this.drawBackground();
        await this.drawText();
        await this.drawScreenshot();
        await this.drawDevice();
    }

    clearStage(stage: createjs.Stage) {
        stage.removeAllChildren();
        stage.update();
    }

    //Device ---
    setDeviceColor(deviceColor: DeviceColor) {
        this.canvasConfig.deviceColor = deviceColor;
        this.drawDevice();
    }

    drawDevice() {
        //Clear the previous device
        this.clearStage(this.deviceStage);

        let renderPromise = new Promise((resolve, reject) => {
            let bitmap = new createjs.Bitmap(this.canvasConfig.deviceColor.image);

            //If the image failed to load
            if(bitmap.image === undefined) {
                resolve();
            }

            bitmap.image.onload = () => {
                //Calculate how to scale the image based on how tall our canvas is
                this.canvasConfig.renderedScale = (this.height / bitmap.image.height) * this.canvasConfig.scale;

                bitmap.scaleX = this.canvasConfig.renderedScale;
                bitmap.scaleY = this.canvasConfig.renderedScale;
    
                //Center the background horizontally
                let centerOffsetX = -(Math.ceil(bitmap.image.width * this.canvasConfig.renderedScale) - this.width) / 2;
                bitmap.x = centerOffsetX;
    
                //Align the background vertically
                let centerOffsetY = -(Math.ceil(bitmap.image.height * this.canvasConfig.renderedScale) - this.height) / 2;
                bitmap.y = centerOffsetY;
    
                //Offset y by text height if applicable
                if(this.canvasConfig.textHeight != null) {
                    //Calculate the Y position
                    if(this.canvasConfig.textPlacement == "above") {
                        bitmap.y += this.canvasConfig.textHeight;
                    }
                    else if(this.canvasConfig.textPlacement == "below") {
                        bitmap.y -= this.canvasConfig.textHeight;
                    }
                }

                //Draw!
                this.deviceStage.addChild(bitmap);
                this.deviceStage.update();

                //Draw screenshot
                this.drawScreenshot();

                //Resolve promise
                resolve();
            }
        });

        return renderPromise;
    }

    //Screenshot ---
    setScreenshot(imageData: string) {
        this.canvasConfig.screenshot = imageData;
        this.drawScreenshot();
    }

    drawScreenshot() {
        //Clear previous drawings
        this.clearStage(this.screenshotStage);

        let renderPromise = new Promise((resolve, reject) => {
            let bitmap = new createjs.Bitmap(this.canvasConfig.screenshot);
            
            //If the image failed to load
            if(bitmap.image === undefined) {
                resolve();
            }

            bitmap.image.onload = () => {
                let deviceRenderedScale = (this.height / this.canvasConfig.deviceConfig.height) * this.canvasConfig.scale;

                //Calculate how to scale the image
                let imageHeightScale = (this.canvasConfig.deviceConfig.viewportHeight / bitmap.image.height) * deviceRenderedScale;
                let imageWidthScale = (this.canvasConfig.deviceConfig.viewportWidth / bitmap.image.width) * deviceRenderedScale;
    
                //Apply scales
                bitmap.scaleY = imageHeightScale;
                bitmap.scaleX = imageWidthScale;
    
                //Center the background horizontally
                let centerOffsetX = -(Math.ceil(bitmap.image.width * imageWidthScale) - this.width) / 2;
                bitmap.x = centerOffsetX;
    
                //Align the background vertically
                let centerOffsetY = -(Math.ceil(bitmap.image.height * imageHeightScale) - this.height) / 2;
                bitmap.y = centerOffsetY;

                //Offset y by text height if applicable
                if(this.canvasConfig.textHeight != null) {
                    //Offset y by text height if applicable
                    if(this.canvasConfig.textHeight != null) {
                        //Calculate the Y position
                        if(this.canvasConfig.textPlacement == "above") {
                            bitmap.y += this.canvasConfig.textHeight;
                        }
                        else if(this.canvasConfig.textPlacement == "below") {
                            bitmap.y -= this.canvasConfig.textHeight;
                        }
                    }
                }

                //Draw!
                this.screenshotStage.addChild(bitmap);
                this.screenshotStage.update();

                //Resolve promise
                resolve();
            }
        });

        return renderPromise;
    }

    //Text
    setText(text: string) {
        this.canvasConfig.text = text;
        this.drawText();
    }

    setTextFont(font: string) {
        this.canvasConfig.font = font;
        this.drawText();
    }

    setTextFontSize(fontSize: string) {
        this.canvasConfig.fontSize = fontSize;
        this.drawText();
    }

    setTextColor(color: string) {
        this.canvasConfig.textColor = color;
        this.drawText();
    }
    
    async setTextPlacement(placement: string) {
        this.canvasConfig.textPlacement = placement;
        await this.drawText();
        await this.drawDevice();
        await this.drawScreenshot();
    }

    drawText() {
        //Clear previous drawings
        this.clearStage(this.captionStage);

        let renderPromise = new Promise((resolve, reject) => {
            //If the text field is empty, or our placement is set to none, clear the text height and resolve
            if(this.canvasConfig.text.trim() == "" || this.canvasConfig.textPlacement == "none") {
                this.canvasConfig.textHeight = 0;

                //Redraw device frame and screenshot
                this.drawDevice();
                this.drawScreenshot();

                resolve();
                return;
            }

            let text = new createjs.Text(this.canvasConfig.text, this.canvasConfig.fontSize + " " + this.canvasConfig.font, this.canvasConfig.textColor);
            text.textAlign = "center";
            text.textBaseline = "top";
            //Center the background horizontally
            let centerOffsetX = this.width / 2;
            text.x = centerOffsetX;
            text.lineWidth = this.width * 0.95;

            //Set our text variables if applicable
            let textHeight = text.getMeasuredHeight() + 2 * this.canvasConfig.textMargin;

            //Calculate the Y position
            if(this.canvasConfig.textPlacement == "above") {
                text.y = 2 * this.canvasConfig.textMargin;
            }
            else if(this.canvasConfig.textPlacement == "below") {
                text.textBaseline = "top";
                text.y = this.height - 2 * this.canvasConfig.textMargin - text.getMeasuredHeight();
            }

            //Draw!
            this.captionStage.addChild(text);
            this.captionStage.update();

            //If our previous text heigh is different then our current text height, we need to redraw the screenshot and device frame
            if(this.canvasConfig.textHeight != textHeight) {
                this.drawDevice();
                this.drawScreenshot();
            }

            this.canvasConfig.textHeight = textHeight;

            resolve();
        });
    
        return renderPromise;
    }

    //Background ---
    setBackgroundType(type: string) {
        this.canvasConfig.backgroundType = type;
        this.drawBackground();
    }

    setBackgroundSolidColor(color: string) {
        this.canvasConfig.backgroundSolidColor = color;
        this.drawBackground();
    }

    setGradientStartColor(color: string) {
        this.canvasConfig.backgroundGradientStartColor = color;
        this.drawBackground();
    }

    setGradientEndColor(color: string) {
        this.canvasConfig.backgroundGradientEndColor = color;
        this.drawBackground();
    }

    setBackgroundImage(imageData: string) {
        this.canvasConfig.background = imageData;
        this.drawBackground();
    }

    //Merges all canvases into the top (device) canvas, generates a base64 image, and downloads it
    downloadImage() {
        this.exportCanvasContext.drawImage(this.backgroundCanvas, 0, 0, this.width, this.height);
        this.exportCanvasContext.drawImage(this.captionCanvas, 0, 0, this.width, this.height);
        this.exportCanvasContext.drawImage(this.screenshotCanvas, 0, 0, this.width, this.height);
        this.exportCanvasContext.drawImage(this.deviceCanvas, 0, 0, this.width, this.height);

        let pngData = this.exportCanvas.toDataURL("image/png");

        this.exportCanvas.toBlob(blob => {
            const a = document.createElement('a');
            a.download = this.generateID();
            a.href = URL.createObjectURL(blob);
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            this.exportCanvasContext.clearRect(0, 0, this.width, this.height);
        });
    }

    drawBackground() {
        //Clear previous drawings
        this.clearStage(this.backgroundStage);

        let renderPromise = new Promise((resolve, reject) => {
            //If we are rendering a solid color
            if(this.canvasConfig.backgroundType == "color") {
                let shape = new createjs.Shape();
                shape.graphics.beginFill(this.canvasConfig.backgroundSolidColor).drawRect(0, 0, this.width, this.height);
                this.backgroundStage.addChild(shape);
                this.backgroundStage.update();
                resolve();
            }
            
            //If we are rendering a solid color
            if(this.canvasConfig.backgroundType == "gradient") {
                let shape = new createjs.Shape();
                shape.graphics.beginLinearGradientFill([this.canvasConfig.backgroundGradientStartColor, this.canvasConfig.backgroundGradientEndColor],
                    [0, 1], 0, 0, 0, this.height)
                .drawRect(0, 0, this.width, this.height);
                this.backgroundStage.addChild(shape);
                this.backgroundStage.update();
                resolve();
            }

            //If we are rendering an image
            else if(this.canvasConfig.backgroundType == "image") {
                let bitmap = new createjs.Bitmap(this.canvasConfig.background);
                            
                //If the image failed to load
                if(bitmap.image === undefined) {
                    resolve();
                }
    
                bitmap.image.onload = () => {
                    //Calculate how to scale the image based on how tall our canvas is
                    let imageScale = this.height / bitmap.image.height;
                    bitmap.scaleX = imageScale;
                    bitmap.scaleY = imageScale;
        
                    //Center the background
                    let centerOffsetX = -(Math.ceil(bitmap.image.width * imageScale) - this.width) / 2;
                    bitmap.x = centerOffsetX;
        
                    //Draw!
                    this.backgroundStage.addChild(bitmap);
                    this.backgroundStage.update();
    
                    //Resolve the promise
                    resolve();
                }
            }
        });

        return renderPromise;
    }

    generateID() {
        return '_' + Math.random().toString(36).substr(2, 9);
    }
}