import { Component, OnInit } from '@angular/core';
import { Label } from '@shared/interfaces/label';

@Component({
  selector: 'app-lectorcsv',
  templateUrl: './lectorcsv.component.html',
  styleUrls: ['./lectorcsv.component.scss']
})
export class LectorcsvComponent implements OnInit {

  csvContent: string;
  parsedCsv: string[][];
  data: Label[];

  constructor() { }

  ngOnInit() {
  }

  onFileLoad(fileLoadedEvent) {

    var jsonData: Label[] = [];
    // cs = csvSeparator
    const cs = ';';
    // tffl textFromFileLoaded
    const tffl = fileLoadedEvent.target.result;

    for (const l of tffl.split('\n')) {
      let data = l.split(cs);
      jsonData.push({

        IDCama: data[0],
        Finca: data[1],
        Producto: data[2],
        NombreBloque: data[3],
        Nave: data[4],
        Cama: data[5],
        sufijo: data[6],
        CantidadPlantas: data[7],
        AreaInvernaderoCama: data[8],
        AreaMt2: data[9],
        Variedad: data[10],
        Color: data[11],
        FechaSiembra: data[12],
        rso: data[13],
        Breeder: data[14],
        NombreTipoSiembra: data[15],
        NombreTipoMaterial: data[16],
        aSiembra: data[17],
        sSiembra: data[18]
      })
    }


    this.data = jsonData;
    // console.log(this.data);


  }

  onFileSelect(input: HTMLInputElement) {

    const files = input.files;
    var content = this.csvContent;

    if (files && files.length) {
      /*
       // console.log("Filename: " + files[0].name);
       // console.log("Type: " + files[0].type);
       // console.log("Size: " + files[0].size + " bytes");
       */

      const fileToRead = files[0];

      const fileReader = new FileReader();
      fileReader.onload = this.onFileLoad;

      fileReader.readAsText(fileToRead, "UTF-8");
    }

  }
}
