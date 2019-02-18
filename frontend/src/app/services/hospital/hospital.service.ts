import { Injectable } from '@angular/core';
import { Hospital } from '../../common/interfaces/hospital.interface';
import { LatLng } from '@ionic-native/google-maps';
@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  constructor() {}

  hospitals: Hospital[] = [
    {
      name: 'Torrette',
      coordinate: { type: 'MultiPoint', coordinates: [[13.555, 45.766]] },
      averageRanks: undefined,
      preparations: undefined
    },
    {
      name: 'Mazzoni',
      coordinate: { type: 'MultiPoint', coordinates: [[65.555, 23.766]] },
      averageRanks: undefined,
      preparations: undefined
    },
    {
      name: 'Sant\'Omero',
      coordinate: { type: 'MultiPoint', coordinates: [[34.555, 13.766]] },
      averageRanks: undefined,
      preparations: undefined
    },
    {
      name: 'Giulianova',
      coordinate: { type: 'MultiPoint', coordinates: [[18.555, 30.766]] },
      averageRanks: undefined,
      preparations: undefined
    }
  ];
}
