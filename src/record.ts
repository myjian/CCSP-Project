export interface DriverRecord {
  _id: string;
  carNum: string;
  country: string;
  created: number;
  description: string;
  ext: string; // file type (image or video)
  happenedDate: string;
  happenedTime: string;
  location: string;
  fileUploadTime: number;
  contentType: string;
}
