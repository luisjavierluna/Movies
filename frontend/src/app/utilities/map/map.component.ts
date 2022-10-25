import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { tileLayer, latLng, LeafletMouseEvent, Marker, marker, icon } from 'leaflet';
import { Coordinate, CoordinateWithMessage } from './coordinate';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor() { }

  @Input()
  initialCoordinates: CoordinateWithMessage[] = []

  @Input()
  readOnly: boolean = false

  @Output()
  selectedCoordinate: EventEmitter<Coordinate> = new EventEmitter<Coordinate>();

  ngOnInit(): void {
      this.layers = this.initialCoordinates.map(value => {
        let markerVariable = marker([value.latitude, value.longitude], {
          icon: icon({
            iconSize:[25, 41],
            iconAnchor: [13, 41],
            iconUrl: 'marker-icon.png',
            iconRetinaUrl: 'marker-icon-2x.px',
            shadowUrl: 'assets/marker-shadow.png'
          })
        })

        if(value.message){
          markerVariable.bindPopup(value.message, {autoClose: false, autoPan: false});
        }

        return markerVariable;
    })
  }

  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 14,
    center: latLng(20.673075457572732, -103.35680007934572)
  };

  layers: Marker<any>[] = [];

  manageClick(event: LeafletMouseEvent){
    
    if(!this.readOnly){
      const latitude = event.latlng.lat;
      const longitude = event.latlng.lng;
      console.log({latitude, longitude});
  
      this.layers = [];
      this.layers.push(marker([latitude, longitude], {
        icon: icon({
          iconSize:[25, 41],
          iconAnchor: [13, 41],
          iconUrl: 'marker-icon.png',
          iconRetinaUrl: 'marker-icon-2x.px',
          shadowUrl: 'assets/marker-shadow.png'
        })
      }))
      this.selectedCoordinate.emit({ latitude: latitude, longitude: longitude})
    }
  }

}
