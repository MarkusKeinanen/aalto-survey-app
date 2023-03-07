# linkki sovellukseen (muutama toiminto rikki live-versiossa, paikallisympäristössä kaikki toimii)

https://aalto-survey-project-6vtkblux7-markuskeinanen.vercel.app/


# mitä sovellus tekee?

Sovelluksella voi luoda käyttäjän ja kirjautua sisään/kirjautua ulos, luoda kyselyjä eri vastaustyypeillä, tallentaa ja poistaa niitä, esikatsella kyselyitä, vastata kyselyihin, ja tutkia kyselyiden vastauksia. 


# työaikakirjanpito

|     aika    | aika | mitä tein                                                                                                         |
| :---------: | :--- | :---------------------------------------------------------------------------------------------------------------- |
|     17.1.   | 8h   | NextJS opiskelu, applikaation rakenteen ja kirjastojen valinta                                                    |
| 18.1.-25.1. | 20h  | Next.js-API & passport.js avulla toimiva autentikointi-flow (postman-testattu), middlewaret, MongoDB-ingtegraatio |
| 26.1.-2.2.  | 15h  | Käyttöliittymän perusrakenne, Layoutit, self-host fontti, lataustilat, login/signup-sivut                         |
|  3.2.-6.2.  | 20h  | UI-elementit joka kysymykselle. Loginin jälkeinen "Surveys"-kälis, UI-parannuksia, survey editorisivu             |
| 7.2.-17.2.  | 4h   | Surveys API/mongoDB toimivuuden raamit                                                                            |
| 18.2.-21.2. | 20h  | Toimiva Survey-osion CRUDi. Henkilökohtaiset kyselyt. UI-parannuksia & refakturointia                             |
| 22.2.-28.2. | 10h  | Esikatselutoiminnallisuus, kyselykohtaiset asetussivut, refakturointia, uusia UI-elementtejä, browser iconit      |
|     1.3.    | 8h   | Vastaustoiminnallisuus, tulosten katselu, refakturointia                                                          |
|  2.3.-7.3.  | 5h   | Ykkösversion viimeistelyt, logout-toiminto, refakturointi, testaus, deploy                                        |


## Miten ajaa projekti paikallisesti

1. Kloonaa repo
2. Navigoi projektin juurikansioon
3. Aja terminaalissa seuraava komento:

```bash
npm install
```

4. Aja terminaalissa komento:

```bash
npm run dev
```

Avaa [http://localhost:3000](http://localhost:3000) selaimessa
