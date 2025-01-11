import { EarthGlobeIcon } from '@sanity/icons'

export const structure = (S: any) => {
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
              S.documentTypeListItem('post').title('Blog'),
              S.documentTypeListItem('tag').title('Tags'),
            ])
        ),
    ])
}
