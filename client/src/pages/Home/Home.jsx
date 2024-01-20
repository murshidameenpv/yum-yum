import React from 'react'
import Banner from '../../components/Banner'
import Categories from './Categories'
import SpecialDishes from './SpecialDishes'

function Home() {
  return (
    <div>
      <Banner />
      <Categories />
      <SpecialDishes/>
    </div>
  )
}

export default Home