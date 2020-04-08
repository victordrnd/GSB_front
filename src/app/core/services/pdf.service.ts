import { Injectable } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
import { environment } from 'src/environments/environment';
import { FraisService } from 'src/app/core/services/frais.service';
import { timingSafeEqual } from 'crypto';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor(private fraisService: FraisService) { }

  frais;
  logo;
  from;
  to;
  total = 0;
  user;
  async export(from, to, user = null) {
    this.from = from;
    this.to = to;
    this.user = user ? user : null;
    this.frais = await this.fraisService.export(this.from, this.to, this.user.id).toPromise();
    this.frais.map(frais => {
      this.total += frais.montant;
      return frais;
    })
    this.getLogo64()
  }

  generatePdf() {
    const documentDefinition = this.getDocumentDefinition();
    pdfMake.createPdf(documentDefinition).download("Fiche de frais");
  }


  getDocumentDefinition() {

    //sessionStorage.setItem('resume', JSON.stringify(this.resume));<br> ​    
    return {
      info: {
        title: `Fiche de frais du ${this.from} au ${this.to}`,
        author: 'Galaxy-Swiss Bourdin',
        subject: this.user ? `Fiche de frais ${this.user.firstname} ${this.user.lastname}` : "Fiche récapitulative",
      },
      watermark: { text: 'Galaxy-Swiss Bourdin', color: '#9b89ff', opacity: 0.3, bold: true, italics: false },
      styles: { 
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 20, 0, 10],
          decoration: 'underline'
        },
        name: {
          fontSize: 16,
          bold: true
        },
        tableHeader: {
          bold: true,
        }
      },
      // defaultStyle: {
      //   font: 'Helvetica'
      // },
      header: {
        image: this.logo,
        width: 55,
        margin : 20,
        alignment: 'right'
      },
      content: [
        {
          text: 'FICHE RÉCAPITULATIVE',
          bold: true,
          fontSize: 20,
          alignment: 'center',
          margin: [0, 0, 0, 20]
        },
        {
          columns: [
            [{
              text: this.user ? this.user.firstname + ' ' + this.user.lastname : 'Ressources Humaines',
              style: 'name'
            },
            {
              text: '58 rue des Chartreux'
            },
            {
              text: 'Email : ' + this.user ? this.user.email : "rh@galaxy-swiss-bourdin.com",
            },
            {
              text: 'Date : ' + (new Date(Date.now())).toLocaleString('fr-Fr'),
            }
            ],
          ]
        },
        {
          text: `Frais du ${this.from} au ${this.to}`,
          bold: true,
          fontSize: 13,
          margin: [0, 30, 0, 10]
        },
        this.getFraisObject(),
        {
          text: `Montant total : ${this.total}€`,
          bold: true,
          fontSize: 10,
          alignment: 'right',
          margin: [0, 20, 0, 20]
        },
        {
          columns: [
            [{
              text: "Signature du responsable :"
            },
            ],
            [
              {
                text: "Signature du salarié :",
                alignment: "right"
              }
            ]
          ],
          margin: [0, 90, 0, 0]
        },
        { 
          qr: `MECARD:N:${this.user.lastname},${this.user.firstname};ADR:58 Rue Pierre Dupont 69004 Croix Rousse ;Note: Visiteur chez GSB;TEL:${this.user.phone};EMAIL:${this.user.lastname}@gsb.com;;`,
          fit: '105',
          margin : [0,120,0,0],
          alignment : 'left',
        },
      ],
      footer: {
        columns: [
          
          { text: 'Copyright ® Galaxy Swiss Bourdin', alignment: 'right', margin : 20 }
        ]
      },
    };
  }


  async getLogo64() {
    let response = await fetch(`${environment.localUrl}/assets/logo-purple.png`);
    let data = await response.blob();
    let metadata = {
      type: 'image/png'
    };
    const file = new File([data], 'test', metadata);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(reader.result);
      this.logo = reader.result as string;
      this.generatePdf();
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  }



  getFraisObject() {
    console.log(this.frais);
    return {
      table: {
        widths: ['*', '*', '*', '*', 50],
        body: [
          [
            {
              text: 'Date',
              style: 'tableHeader'
            },
            {
              text: 'Description',
              style: 'tableHeader'
            },
            {
              text: 'Catégorie',
              style: 'tableHeader'
            },

            {
              text: 'Validé par',
              style: 'tableHeader'
            },
            {
              text: 'Montant',
              style: 'tableHeader'
            },
          ],
          ...(this.frais.map(frais => {
            return [frais.created_at.substring(0,10), frais.description, frais.type.libelle, frais.validator.firstname + ' ' + frais.validator.lastname, frais.montant + ' €'];
          }))
        ]
      }
    }; 

  }
}
