import { DeviceColor } from './device-color';

export class DeviceConfig {
    name: string;
    height: number;
    width: number;
    viewportWidth: number;
    viewportHeight: number;
    selectedColor: DeviceColor;
    colors: DeviceColor[];

    constructor(name: string, width: number, height: number, viewportWidth: number, viewportHeight: number, colors: DeviceColor[]) {
        this.name = name;
        this.width = width;
        this.height = height;
        this.viewportWidth = viewportWidth;
        this.viewportHeight = viewportHeight;
        this.colors = colors;
        
        this.selectedColor = this.colors[0];
    }
}