import type { BlogConfig } from '@/app/blog/types'

export type { BlogConfig } from '@/app/blog/types'

export type LoadedBlog = {
	slug: string
	config: BlogConfig
	markdown: string
	cover?: string
}

/**
 * Load blog data from public/blogs/{slug}
 * Used by both view page and edit page
 */
export async function loadBlog(slug: string): Promise<LoadedBlog> {
	if (!slug) {
		throw new Error('Slug is required')
	}

	// config.json 与 index.md 并行请求，省一个往返
	const [configRes, mdRes] = await Promise.all([
		fetch(`/blogs/${encodeURIComponent(slug)}/config.json`),
		fetch(`/blogs/${encodeURIComponent(slug)}/index.md`)
	])

	let config: BlogConfig = {}
	if (configRes.ok) {
		try {
			config = await configRes.json()
		} catch {
			config = {}
		}
	}

	if (!mdRes.ok) {
		throw new Error('Blog not found')
	}
	const markdown = await mdRes.text()

	return {
		slug,
		config,
		markdown,
		cover: config.cover
	}
}
