// import ArticlesLayout from '@/app/layouts/ArticlesLayout'
import ArticleComponent from '@/components/ArticleComponent'
import React from 'react'

export const metadata = {
  title:"Articles"
}
export default function page() {
  return (
  //  <ArticlesLayout>
    <ArticleComponent/>
  //  </ArticlesLayout>
  )
}
