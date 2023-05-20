# työaikakirjanpito

|     aika      | aika | mitä tein                                                                                                         |
| :-----------: | :--- | :---------------------------------------------------------------------------------------------------------------- |
|     17.1.     | 8h   | NextJS opiskelu, applikaation rakenteen ja kirjastojen valinta                                                    |
| 18.1. - 25.1. | 20h  | Next.js-API & passport.js avulla toimiva autentikointi-flow (postman-testattu), middlewaret, MongoDB-ingtegraatio |
| 26.1. - 2.2.  | 15h  | Käyttöliittymän perusrakenne, Layoutit, self-host fontti, lataustilat, login/signup-sivut                         |
|  3.2. - 6.2.  | 20h  | UI-elementit joka kysymykselle. Loginin jälkeinen "Surveys"-kälis, UI-parannuksia, survey editorisivu             |
| 7.2. - 17.2.  | 4h   | Surveys API/mongoDB toimivuuden raamit                                                                            |
| 18.2. - 21.2. | 20h  | Toimiva Survey-osion CRUDi. Henkilökohtaiset kyselyt. UI-parannuksia & refakturointia                             |
| 22.2. - 28.2. | 10h  | Esikatselutoiminnallisuus, kyselykohtaiset asetussivut, refakturointia, uusia UI-elementtejä, browser iconit      |
|     1.3.      | 8h   | Vastaustoiminnallisuus, tulosten katselu, refakturointia                                                          |
|  2.3. - 7.3.  | 5h   | Ykkösversion viimeistelyt, logout-toiminto, refakturointi, testaus, deploy, turhien koodien poisto                |
| 20.5. - 21.5. | 8h   | Katselmoinnin asioiden korjaus                                                                                    |

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## How to run the project locally

1. clone the repo
2. navigate to project folder root
3. create a file in project root called .env.development. The contents of the file should be as follows:

```
 MONGODB_URI=mongodb+srv://survey-app-public-user:<PASSWORD>@cluster0.qbiztdz.mongodb.net/?retryWrites=true&w=majority
 SESSION_SECRET=<SESSION_SECRET>
```

where <PASSWORD> and <SESSION_SECRET> are replaced with real information

4. Run the following command:

```bash
npm install
```

4. run:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
