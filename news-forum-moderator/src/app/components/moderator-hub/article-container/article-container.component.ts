import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-article-container',
  standalone: true,
  imports: [],
  templateUrl: './article-container.component.html',
  styleUrls: ['./article-container.component.scss'],
})
export class ArticleContainerComponent implements OnInit {
  type!: 'drafts' | 'posts' | 'archives' | 'bookmarks';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Subscribe to route parameters to get the current type
    this.route.paramMap.subscribe((params) => {
      const type: string = params.get('type') || '';

      if (!this.isValidType(type)) {
        throw new Error(`Invalid article type: ${type}`);
      }

      this.type = type;
    });
  }

  private isValidType(
    // Type guard.
    type: string
  ): type is 'drafts' | 'posts' | 'archives' | 'bookmarks' {
    return ['drafts', 'posts', 'archives', 'bookmarks'].includes(type);
  }
}
