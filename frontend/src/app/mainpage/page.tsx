import React from 'react'
import ArticlesLayout from '@/app/layouts/ArticlesLayout'
import ArticlesPageComponent from '@/components/ArticlesPageComponent'

export const metadata = {
  title: "Main Page"
}
export default function page() {
  return (
    <ArticlesLayout>
        <ArticlesPageComponent/>
    </ArticlesLayout>
  )
}
