import Carousel from '../components/caresol/caresollanding';
import Explore from '../components/cards/explore_catagory_card';
import Latest from '../components/latest_posting/latestPosting';

const HomePage = () => {
  return (
   <>
    <Carousel />
    <Explore />
    <Latest />
   </>
  )
}

export default HomePage