import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  nb:any;
  tableau: any[] = [];
  nom1:string = '';
  prenom1:string ='';
  idActuel=0;
  prenom: string = '';
  nom: string = '';
  url: string ='https://personne29200-default-rtdb.europe-west1.firebasedatabase.app/';
  //url: string = 'https://gestion-equipe.firebaseio.com/';
  url2 = this.url + 'personne.json';
  // httpClient
  constructor(private httpClient: HttpClient) {}
  ngOnInit() {
    // je demande le noeud personne.json
   this.nb=this.getNb();
    this.httpClient.get<any>(this.url2).subscribe((response) => {
      console.log(response);
      if (response != undefined) {
        // comment recupére les "id"
        for (let attribut in response) {
          let p: any = response[attribut];
          // p.prenom = p['prenom']
          p.id = attribut;
          this.tableau.push(p);
        }
      }
    });
  }
  onAjouter() {
    // post
   
    let p: any = {};
    p.nom = this.nom;
    p.prenom = this.prenom;
    this.nom = this.prenom = ''; // vider input
    this.httpClient.post<any>(this.url2, p).subscribe((response) => {
      console.log(response);
      let id = response.name;
      p.id = id;
      this.tableau.push(p);
      console.log(this.tableau);
    });
  }
  onEnlever(i: number) {
    // delete
    // https://gestion-equipe.firebaseio.com/personne/chkjqdhID.json
    let url2 = this.url + 'personne/'+this.tableau[i].id+'.json';
    this.httpClient.delete(url2).subscribe(response=>{
      console.log('delete ok !');
      this.tableau.splice(i, 1);
    })
    
  }
  onCharger(i: number)
  {

    this.nom1 = this.tableau[i].nom;
    this.prenom1 = this.tableau[i].prenom;
    this.idActuel =i;
   
    
  }

  onModifier()
  {
    let url3 = this.url + 'personne/'+this.tableau[this.idActuel].id+'.json';
    let p= {nom:this.nom1, prenom:this.prenom1};
    this.httpClient.put(url3,p ).subscribe((response) => {
    console.log(response);
    this.tableau[this.idActuel] =p;
    });

  }
  onSupprimerTout()
  {
    let url2 = this.url + 'personne.json';
    this.httpClient.delete(url2).subscribe(response=>{
      console.log('delete ok !');
      this.tableau.splice(0, this.tableau.length);
    });
       
    
  }
  getNb()
  {
    {
      
      return this.tableau.length;
  }
  }
}
