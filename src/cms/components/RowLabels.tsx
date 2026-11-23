'use client'
import { useRowLabel } from '@payloadcms/ui'

type RowData = {
    date?: string
    label?: string
    location?: string
    name?: string
    title?: string
}

export const NameRowLabel = () => {
    const { data } = useRowLabel<RowData>()
    return <>{data?.name}</>
}

export const TitleRowLabel = () => {
    const { data } = useRowLabel<RowData>()
    return <>{data?.title}</>
}

export const LabelRowLabel = () => {
    const { data } = useRowLabel<RowData>()
    return <>{data?.label}</>
}

export const ShowRowLabel = () => {
    const { data } = useRowLabel<RowData>()
    const date = data?.date ? new Date(data.date).toLocaleDateString() : ''
    return <>{`${date}: ${data?.location || ''}`}</>
}
