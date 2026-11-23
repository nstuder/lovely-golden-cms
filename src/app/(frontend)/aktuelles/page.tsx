import { NewsPage, newsMetadata } from '@/lib/newsPage'

export const generateMetadata = newsMetadata

export default function News() {
    return <NewsPage />
}
