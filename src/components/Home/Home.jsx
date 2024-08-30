import React from 'react'
import Banner from './Banner'
import { PopularCourses } from './PopularCourses'
import LearnExcellancy from './LearnExcellancy'
import OfferCourses from './OfferCourses'
import IconsCarousel from './IconsCarousel'
import CeoMessage from './CeoMessage'
import Testimonials from './Testimonials'
import BlogPost from './BlogPost'

const Home = () => {
  return (
    <div>
      <Banner/>
      <PopularCourses/>
      <LearnExcellancy/>
      <OfferCourses/>
      <IconsCarousel/>
      <CeoMessage/>
      <Testimonials/>
      <BlogPost/>
    </div>
  )
}

export default Home
