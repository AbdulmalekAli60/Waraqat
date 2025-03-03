import React from 'react'
import ArticlesLayout from '../layouts/ArticlesLayout'
import BookmarksPageComponent from '@/components/BookmarksPageComponent'

export const metadata = {
  title: "Bookmarks"
}
export default function page() {
  return (
    <ArticlesLayout>
        <BookmarksPageComponent/>
    </ArticlesLayout>
  )
}
