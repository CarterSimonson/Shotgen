import { DeviceConfig } from './device-config';

export class CanvasConfig {
    deviceConfig: DeviceConfig;
    
    //Changeable
    scale: number;
    background: string;
    screenshot: string;
    renderedScale: number;
    
    //Typeography
    text: string = "";
    font: string = "Roboto";
    fontSize: string = "100px";
    textColor: string = "#E2E2E2";
    textPlacement: string = "above";
    textMargin: number = 0;
    textHeight: number;

    //Background
    backgroundType: string = "color";
    backgroundSolidColor: string = "#e96443";
    backgroundGradientStartColor: string = "#e96443";
    backgroundGradientEndColor: string = "#904e95";
    backgroundImage: string;

    constructor(deviceConfig: DeviceConfig, scale: number) {
        this.deviceConfig = deviceConfig;
        this.scale = scale;
    }
}