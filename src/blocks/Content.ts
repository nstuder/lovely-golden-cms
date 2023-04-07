import { Field } from 'payload/types'
import { Pedigree } from './dogs/Pedigree'
import { ImagesBlock } from './Image'
import { RichText } from './Text'
import { TextWithImage } from './TextWithImage'

export const ContentFields: Field[] = [
	{
		name: 'content',
		label: {
			de: 'Inhalt', 
			en: 'Content'
		},
		type: 'blocks',
		blocks: [
			RichText,
			ImagesBlock,
			TextWithImage,
			Pedigree,
		],
	},
]