export class ImagePickerResponse {
    url: string;
    data: string;

    constructor(url: string, data: string) {
        this.url = url;
        this.data = data;
    }
}