import { Injectable } from '@angular/core';
import { Hospital } from '../../interfaces/hospital';
import { LatLng } from '@ionic-native/google-maps';
@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  constructor() {}

  hospitals: Hospital[] = [
    {
      name: 'Torrette',
      coordinate: new LatLng(13.555, 45.766),
      description: ' CIAOOO'
    },
    {
      name: 'Mazzoni',
      coordinate: new LatLng(65.555, 23.766),
      description: ' CIAOOO'
    },
    {
      name: 'Sant\'Omero',
      coordinate: new LatLng(34.555, 13.766),
      description: ' CIAOOO'
    },
    {
      name: 'Giulianova',
      coordinate: new LatLng(18.555, 30.766),
      description: ' CIAOOO'
    }
  ];
}
