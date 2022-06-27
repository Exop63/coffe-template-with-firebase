import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailsService {

  constructor() { }

  foodDetails = [
    {
      id: 1,
      foodName: "Caffe Borbone Nobile Çekirdek Kahve ",
      foodDetails: "Dengeli ve yoğun bir yapıya sahip olan Borbone Nobile Çekirdek Kahve, yoğun ve tatlı aromasıyla, gerçek bir İtalyan kahve keyfi sunuyor.",
      foodImg: "https://st1.myideasoft.com/idea/bs/42/myassets/products/061/caffe-borbone-nobile-blend-1kg.png?revision=1649664122"
    },
    {
      id: 2,
      foodName: "Caffe Borbone Suprema Nespresso Uyumlu Kapsül",
      foodDetails: "En rafine damak zevklerini bile harekete geçirecek Caffè Borbone Suprema, gerçek Napoli lezzetini en pratik haliyle sunuyor.",
      foodImg: "https://st2.myideasoft.com/idea/bs/42/myassets/products/069/suprema-vista-corrente.jpg?revision=1649666051"
    },
    {
      id: 3,
      foodName: "Moliendo Kenya AA Muranga Yöresel Kahve",
      foodDetails: "Orta Kenya bölgesine ait olan Nguku AB Thanga-ini İşleme istasyonundan gelen bu çekirdekler 700 farklı küçük üreticinin mahsulünden oluşuyor. Badem tadının baskın hissedildiği, limon tadının eşlik ettiği, içimi yumuşak ve keyifli bir kahve.",
      foodImg: "https://st2.myideasoft.com/idea/bs/42/myassets/products/204/moliendo-kenya-aa-muranga-yoresel-kahve-250-gr-copy.jpg?revision=1617701718"
    },
    {
      id: 4,
      foodName: "Moliendo Organic Guatemala SHB Yöresel Kahve 250 gr. (Çekirdek)",
      foodDetails: "Guatemala’nın ünlü Huehuetenango bölgesinden gelen yüzde yüz organik bir kahve. Üretiminden paketlenmesine kadar sertifikalı. Aynı Moliendo Antigua gibi bu da aromasında ve içiminde çikolata notaları ile keyif veriyor. Sadece çekirdek olarak satılır.",
      foodImg: "https://st1.myideasoft.com/idea/bs/42/myassets/products/073/moliendo-organik-guatemala-yoresel-kahve-250-gr-q.jpg?revision=1650290678"
    },
    {
      id: 5,
      foodName: "Caffe Borbone Oro Çekirdek Kahve 1 kg",
      foodDetails: "Caffe Borbone Oro Çekirdek kahve, hoş ve rafine bir tada sahip olmasıyla birlikte en hassas damakta bile, Napoli aromasını yakalatır.",

      foodImg: "https://st3.myideasoft.com/idea/bs/42/myassets/products/013/grani-linea-bar-oro.png?revision=1640268798"
    },
    {
      id: 6,
      foodName: "Moliendo Dibek Türk Kahvesi 250 gr.",
      foodDetails: "Özenle seçilmiş çekirdeklerin titizlikle kavrularak, saatlerce dibek havanında un ufak edilip öğütülmesiyle hazırlanmıştır.",

      foodImg: "https://st.myideasoft.com/idea/bs/42/myassets/products/181/moliendo-dibek-turk-kahvesi-250-gr.jpg?revision=1621532920"
    }
  ]

}



