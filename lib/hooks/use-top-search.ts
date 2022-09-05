import { queryPipe } from '../api'
import { TopSource, TopSearchData } from '../types/top-sources'
import useQuery from './use-query'

async function getTopSearch() {
  const { data: queryData, meta } = await queryPipe<TopSearchData>(
    'top_search',
    {
      limit: 8
    }
  )

  const data: TopSource[] = [...queryData]
    .sort((a, b) => b.hits - a.hits)
    .map(({ hits, value }) => ({
      value,
      hits,
    }))

  const hits = data.map(({ hits }) => hits)
  const values = data.map(({ value }) => value)

  return {
    data,
    hits,
    values
  }
}

export default function useTopSearch() {
  return useQuery(['topSearch'], getTopSearch)
}
