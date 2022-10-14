import { useAppContext } from '../context/appContext'
import { useEffect } from 'react'
import Loading from './Loading'
import Sector from './Sector'
import Wrapper from '../assets/wrappers/SectorsContainer'
import PageBtnContainer from './PageBtnContainer'

const SectorsContainer = () => {
  const {
    getSectors,
    sectors,
    isLoading,
    page,
    totalSectors,
    search,
    searchStatus,
    searchType,
    sort,
    numOfPages,
  } = useAppContext()
  useEffect(() => {
    getSectors()
    // eslint-disable-next-line
  }, [page, search, searchStatus, searchType, sort])
  if (isLoading) {
    return <Loading center />
  }

  if (sectors.length === 0) {
    return (
      <Wrapper>
        <h2>No Sectors to display...</h2>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <h5>
        {totalSectors} sector{sectors.length > 1 && 's'} found
      </h5>
      <div className='sector'>
        {sectors.map((sector) => {
          return <Sector key={sector._id} {...sector} />
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  )
}

export default SectorsContainer
