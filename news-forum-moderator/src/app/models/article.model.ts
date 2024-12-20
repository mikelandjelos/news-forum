import { Location } from './location.model';

export type ArticleState = 'DRAFT' | 'POST' | 'ARCHIVE';

export interface Article {
  id: string;
  title: string;
  titleImage: string; // base64 encoded
  contents: string; // HTML/Markdown format
  dateCreated: Date;
  dateStateUpdated: Date;
  description: string;
  state: ArticleState;
  location: Location;
  numberOfViews: number;
  categoryId: string;
}

export type ReadonlyArticle = Readonly<Article>;
