import { DeviceConfig } from "src/models/device-config";
import { DeviceColor } from 'src/models/device-color';

export class DeviceConfigs {
    public static devices: DeviceConfig[] = [
        //iPhone 8
        new DeviceConfig("iPhone 8", 1000, 2040, 867, 1540, [
            new DeviceColor("Gold", "assets/devices/iPhone 8/Gold.png", "#edc8b6"),
            new DeviceColor("Space Grey", "assets/devices/iPhone 8/Space Grey.png", "#67676c"),
            new DeviceColor("Silver", "assets/devices/iPhone 8/Silver.png", "#d2d2d3"),
        ]),

        //Pixel 3
        new DeviceConfig("Pixel 3", 1000, 2105, 899, 1800, [
            new DeviceColor("Just Black", "assets/devices/Pixel 3/Just Black.png", "#141414"),
            new DeviceColor("Clearly White", "assets/devices/Pixel 3/Clearly White.png", "#ededed"),
            new DeviceColor("Not Pink", "assets/devices/Pixel 3/Not Pink.png", "#e5d6d3"),
        ]),
    ];
}