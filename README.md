# News Forum

- Repozitorijum za predaju projekta iz predmeta RWA (Razvoj Web Aplikacija, modul Racunarstvo i Informatika), u okviru osnovnih studija na Elektronskom fakultetu, Univerziteta u Nisu.

## Features

### Moderatorska aplikacija

- [ ] Moderator
  - [x] Kreiranje moderatorskog naloga, sign-in (auth) i CRUD.
    - [x] Kreiranje (sign-up);
    - [x] Autentifikacija;
    - [ ] kartica sa osnovnim informacijama, edit dugme za izmenu i dodavanje informacija;
- [ ] Artikli
  - [ ] Kreiranje artikala - metapodaci (CRUD).
  - [ ] Stranica za pregled artikala.
  - [ ] Koncept DRAFT-a, iterativno dopunjavanje sadrzaja artikla, rich text editor mogucnosti.
    - [ ] Ukoliko bude bilo vremena - collaborative editing bi bila poprilicno zanimljiva stvar da se implementira;
  - [ ] POST i ARCHIVE opcije - promena stanja artikla;
  - [ ] BOOKMARK-ovanje artikala;
  - [ ] SEARCH mogucnosti za full text search na osnovu sadrzaja i naslova;
  - [ ] Personalna stranica - pregled osnovnih informacija, analitike datog korisnika;
  - [x] Osnovne informacije - kartica sa osnovnim informacijama, edit dugme za izmenu;
- [ ] Analitika
  - [ ] heatmap aktivnosti;
  - [ ] objedinjeni graf za vizuelizaciju objava, pregleda, lajkova, komentara (za ovo su potrebne informacije sa foruma za vesti);
  - [ ] odnos izbacenih artikala, draftova, arhiviranih artikala;

### Forum za vesti

- Preporuke na osnovu lokacije (geografske udaljenosti);
- Pretrazivanje na osnovu sadrzaja i pregled novosti;
- Komentarisanje i lajkovanje;

## Linkovi do delova projekata

- news-forum-reader - klijentska aplikacija (TBA);
- [news-forum-moderator](./news-forum-moderator/) - moderatorska aplikacija;
- [news-forum-api](./news-forum-api/) - backend api;

## Korisceni DockerHub image-i

- [PostGIS](https://hub.docker.com/r/postgis/postgis) - relaciona baza sa ekstenzijama za geoprostorne indekse;
- [Adminer](https://hub.docker.com/_/adminer) - Web interfejs DB klijent;
- [Redis](https://hub.docker.com/_/redis) - key-value baza koriscena za blacklisting JWT tokena;
- [Redis Commander](https://hub.docker.com/r/rediscommander/redis-commander) - Web interfejs za upravljanje Redis instancom;

## Dokumentacija koriscena za izradu

- [NestJS](https://docs.nestjs.com/) - backend framework;
- [PostGIS](https://postgis.net/documentation/getting_started/) - geospatial extension of Postgres;
- [Postgres Full-text search](https://www.postgresql.org/docs/current/textsearch.html);
  - [video showcase](https://www.youtube.com/watch?v=szfUbzsKvtE) - simple implementation in Node;
- [ngrx](https://ngrx.io/guide/store) - RxJS-based global state management framework for Angular;
- [PrimeNG component library](https://primeng.org/);
