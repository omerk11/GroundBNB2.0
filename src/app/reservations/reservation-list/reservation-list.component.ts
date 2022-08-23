import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { of, switchMap } from 'rxjs';
import { ApartmentsService } from 'src/app/apartments/apartments.service';
import { AuthService } from 'src/app/users/auth.service';
import { TokenStorageService } from 'src/app/users/token-storage.service';
import { Reservation, ReservationView } from '../reservation.model';
import { ReservationsService } from '../reservations.service';
declare var require: any
const createCountMinSketch = require("count-min-sketch")
@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.scss']
})
export class ReservationListComponent implements OnInit {
  @Input() isMyReservations: boolean = false;
  @Input() isForMyApartments: boolean = false;
  reservations: ReservationView[] = [];
  showSearch: boolean = false;
  displayedColumns: string[] = [];
  sketch = createCountMinSketch();
  allRowsExpanded: boolean = false;


  cities = ["Assen", "Drenthe", "Coevorden", "Emmen", "Hoogeveen", "Meppel", "Almere", "Flevoland", "Biddinghuizen", "Emmeloord", "Lelystad", "Bolsward	", "Friesland", "Dokkum", "Franeker", "Harlingen", "Hindeloopen", "IJlst", "Leeuwarden", "Sloten", "Sneek", "Stavoren", "Workum", "Apeldoorn	", "Gelderland", "Arnhem", "Bredevoort", "Buren", "Borculo", "Culemborg", "Dieren", "Doetinchem", "Ede", "Elburg", "Enspijk", "Gendt", "Groenlo", "Harderwijk", "Hattem", "Heukelum", "Huissen", "Nijkerk", "Nijmegen", "Staverden", "Tiel", "Ulft", "Voorst", "Wageningen", "Wijchen", "Winterswijk", "Zaltbommel", "Zevenaar", "Zutphen", "Appingedam	", "Groningen", "Delfzijl", "Groningen", "Hoogezand-Sappemeer", "Stadskanaal", "Veendam", "Winschoten", "Echt	", "Limburg", "Geleen", "Gennep", "Heerlen", "Kerkrade", "Tegelen", "Kessel", "Landgraaf", "Maastricht", "Montfort", "Nieuwstadt", "Roermond", "Schin op Geul", "Sittard", "Stein", "Susteren", "Thorn", "Vaals", "Valkenburg", "Venlo", "Weert", "North Brabant", "Bergen op Zoom", "Boxtel", "Breda", "Eindhoven", "Geertruidenberg", "Geldrop", "Grave", "Helmond", "Heusden", "Klundert", "Oosterhout", "Oss", "Ravenstein", "Roosendaal", "Sint-Oedenrode", "Tilburg", "Valkenswaard", "Veldhoven", "Waalwijk", "Willemstad", "Woudrichem", "Alkmaar	", "North Holland", "Amsterdam", "Den Helder", "Edam", "Enkhuizen", "Haarlem", "Heerhugowaard", "Hilversum", "Hoorn", "Laren", "Medemblik", "Monnickendam", "Muiden", "Naarden", "Purmerend", "Schagen", "Velsen", "Volendam", "Weesp", "Zaanstad", "Almelo	", "Overijssel", "Blokzijl", "Deventer", "Enschede", "Genemuiden", "Hardenberg", "Hasselt", "Hengelo", "Kampen", "Oldenzaal", "Rijssen", "Steenwijk", "Vollenhove", "Zwolle", "Alphen aan den Rijn	", "South Holland", "Capelle aan den IJssel", "Delft", "Dordrecht", "Gorinchem", "Gouda", "The Hague (Den Haag)", "Leiden", "Maassluis", "Rotterdam", "Schiedam", "Spijkenisse", "Vlaardingen", "Voorburg", "Zoetermeer", "Amersfoort	", "Utrecht", "Baarn", "Bunschoten", "Eemnes", "Hagestein", "Houten", "Leerdam", "Montfoort", "Nieuwegein", "Oudewater", "Rhenen", "Utrecht", "Veenendaal", "Vianen", "Wijk bij Duurstede", "Woerden", "IJsselstein", "Zeist", "Arnemuiden	", "Zeeland", "Goes", "Hulst", "Middelburg", "Sluis", "Terneuzen", "Veere", "Vlissingen", "Zierikzee",'Abcoude',
  'Achterherengrach',
  'Amstelveen',
  'Amsterdam',
  'Diemen',
  'Duivendrecht',
  'Landsmeer',
  'Lunas',
  'Ouderkerk aan de Amstel',
  'Watergang',
  'Weesp',
  'Zuiderwoude'].sort();

  constructor(
    private readonly tokenStorage: TokenStorageService,
    public apartmentsService: ApartmentsService, private authService: AuthService,
    public reservationsService: ReservationsService)// this will create a new property ReservationsService in this class
  { }
  top3 = new Map();
  totalSpendings: number = 0;

  ngOnInit(): void {

    if (this.isForMyApartments) {
      this.displayedColumns = ['details', "customer", 'startdate', 'enddate', 'priceperday', "review", "rating"];
    } else {
      if (this.isMyReservations) {
        this.displayedColumns = ['details', "owner", 'startdate', 'enddate', 'priceperday', "review", "rating", "actions"];
      } else {
        this.displayedColumns = ['details',"owner","customer", 'startdate', 'enddate', 'priceperday', "review", "rating"];
      }
    }

    this.reservationsService.getTotalSpendings().subscribe((data) => 
    {
      try {
        this.totalSpendings = data.result;
      }
      catch (e) {
        this.totalSpendings = 0;
      }
    });
  
    this.refreshList();
  }

  refreshList(query: any = {}) {
    if (this.isMyReservations) {
      query = {
        ...query,
        buyerid: this.tokenStorage.getMyId()
      }
    } else if (this.isForMyApartments) {
      query = {
        ...query,
        ownerid: this.tokenStorage.getMyId()
      }
    }

    this.reservationsService.getReservation(query)
      .pipe(switchMap(reservations => {
        return of(reservations.reduce((list, item) => {
          if (item.apartment) {
            const timeDifference = new Date(item.enddate).getTime() - new Date(item.startdate).getTime();
            const daysDifference = timeDifference / (1000 * 3600 * 24);
            item.totalprice = item.apartment.price * daysDifference;
            list.push(item);
          }
          else {
            item.totalprice = NaN;
            list.push(item);
          }
          return list;
        }, new Array<ReservationView>()));
      }))
      .subscribe(reservations => {
        this.reservations = reservations;
        this.reservations.forEach(element => {
          if(element.apartment){
            this.sketch.update(element.apartment.city,1);
          }
        });
        this.cities.forEach(element=>{
          let tmp = this.sketch.query(element);
          if(tmp){
            this.top3.set(element,tmp);
          }
        })
        this.top3 = new Map([...this.top3.entries()].sort((a, b) => b[1] - a[1]));
        // console.log(this.top3);
      });
  }

  removeReservationFromList(reservation: Reservation) {
    this.reservations = this.reservations.filter((res) => reservation._id !== res._id);
  }

  onEdit(reservation: Reservation) {
    if(reservation.rating){
      if(reservation.rating >5 || reservation.rating <0 ){
        window.alert('Please choose rating between 1-5');
      }
      return
    }
    if (window.confirm("Are you sure you want to update?")) {
      this.reservationsService.updateReservation(reservation as ReservationView).subscribe();
    }
  }

  onDelete(reservation: Reservation) {
    if (window.confirm("Are you sure you want to delete?")) {
      this.reservationsService.deleteReservation(reservation).subscribe((message) => {
        console.log(message);
        if(message.deletedCount === 0){
          alert('No Reservation found!');
        }       
        this.removeReservationFromList(reservation);
      });
    }
  }

  onSearch(form: NgForm) {
    let query: any = {};
    if (form.invalid) {
      console.log("error");
      return;
    }
    if (form.value.date != "") {
      query.startdate = form.value.date;
    }
    if (form.value.apartmentname != "") {
      query.apartmentName = form.value.apartmentname;
    }
    if (form.value.city != "") {
      query.city = form.value.city;
    }

    this.refreshList(query);
  }

  toggle() {
    this.allRowsExpanded = !this.allRowsExpanded;
  }

}
