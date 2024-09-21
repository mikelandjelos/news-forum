# News Forum

- Repozitorijum za predaju projekta iz predmeta RWA (Razvoj Web Aplikacija, modul Racunarstvo i Informatika), u okviru osnovnih studija na Elektronskom fakultetu, Univerziteta u Nisu.

## Features

### Moderatorska aplikacija

- Kreiranje moderatorskog naloga i log-in (koriscenjem autentifikacije).
- Personalna stranica - pregled osnovnih informacija i analitike.
- Kreiranje artikala - osnovne informacije (i tagovi mozda?).
- Koncept DRAFT-a, iterativno dopunjavanje sadrzaja, rich text editor mogucnosti.
- POST i ARCHIVE opcije - promena stanja artikla.
- SEARCH mogucnosti za full text search artikala.
- SHARED zona - pregled artikala drugih moderatora.

### Forum za vesti

- Pretrazivanje i pregled novosti.
- Komentarisanje preko personalnog mail-a.

## Linkovi do delova projekata

- news-forum-client - klijentska aplikacija (TBA);
- [news-forum-moderator](./news-forum-moderator/) - moderatorska aplikacija;
- [news-forum-api](./news-forum-api/) - backend api;

## Korisceni DockerHub image-i

- [PostGIS](https://hub.docker.com/r/postgis/postgis) - relaciona baza sa ekstenzijama za geoprostorne indekse;
- [Adminer](https://hub.docker.com/_/adminer) - Web interfejs DB klijent;

## Dokumentacija koriscena za izradu

- [NestJS](https://docs.nestjs.com/) - backend framework;
- [Passport.js](https://www.passportjs.org/) - auth API;
- [PostGIS](https://postgis.net/documentation/getting_started/) - geospatial extension of Postgres;
- [Postgres Full-text search](https://www.postgresql.org/docs/current/textsearch.html);
  - [video showcase](https://www.youtube.com/watch?v=szfUbzsKvtE) - simple implementation in Node;
- [ngrx](https://ngrx.io/guide/store) - RxJS-based global state management framework for Angular;
- [Syncfusion rich text editor](https://ej2.syncfusion.com/angular/documentation/rich-text-editor/getting-started);
- [PrimeNG component library](https://primeng.org/);
