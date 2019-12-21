import { DeviceConfig } from './device-config';
import { DeviceColor } from './device-color';

export class CanvasConfig {
    deviceConfig: DeviceConfig;
    deviceColor: DeviceColor;

    //Changeable
    scale: number;
    background: string;
    screenshot: string;
    backgroundURL: string;
    screenshotURL: string;
    renderedScale: number;
    
    //Typeography
    text: string = "";
    font: string = "Roboto";
    fontSize: string = "100px";
    textColor: string = "#e2e2e2";
    textPlacement: string = "above";
    textMargin: number = 0;
    textHeight: number;

    //Background
    backgroundType: string = "color";
    backgroundSolidColor: string = "#038dff";
    backgroundGradientStartColor: string = "#038dff";
    backgroundGradientEndColor: string = "#5439ab";
    backgroundImage: string;

    constructor(deviceConfig: DeviceConfig, scale: number) {
        this.deviceConfig = deviceConfig;
        this.deviceColor = deviceConfig.colors[0];
        this.scale = scale;
    }
}