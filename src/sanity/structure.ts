import type { StructureResolver } from 'sanity/structure'
import { EarthGlobeIcon } from '@sanity/icons/EarthGlobe'
import { SortIcon } from '@sanity/icons/Sort'

export const structure: StructureResolver = (S) => {
  return S.list()
    .title('Sanity Studio')
    .items([
      // Website (posts, pages, etc.)
      S.listItem()
        .title('Website')
        .icon(EarthGlobeIcon)
        .child(
          S.list()
            .title('Website')
            .items([
              S.documentTypeListItem('case-study').title('Case Studies'),
              S.listItem()
                .title('Case Study Order')
                .icon(SortIcon)
                .child(S.document().schemaType('case-study-order').documentId('case-study-order').title('Case Study Order')),
              S.documentTypeListItem('testimonial')
                .title('Testimonials')
                .child(
                  S.documentTypeList('testimonial')
                    .title('Testimonials')
                    .defaultOrdering([{ field: 'order', direction: 'asc' }]),
                ),
            ]),
        ),
    ])
}
