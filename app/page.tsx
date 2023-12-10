"use client"
import { CarCard, CustomFilter, Hero, SearchBar } from '@/components'
import ShowMore from '@/components/ShowMore';
import { fuels, yearsOfProduction } from '@/constants';
import { HomeProps } from '@/types';
import { fetchCars } from '@/utils';
import Image from 'next/image'
import { useEffect, useState } from 'react';

export default async function Home({ searchParams }: HomeProps) {
  //   const [allCars, setAllCars] = useState([])
  //   const [loading, setLoading] = useState(false)

  //   //searchState
  //   const [manufacturer, setManufacture] = useState("")
  //   const [model, setModel] = useState("")

  //   //filterState
  //   const [fuel, setFuel] = useState("")
  //   const [year, setYear] = useState(2022)

  //   //pagination State
  //   const [limit, setLimit] = useState(10)

  //   const getCars = async () => {
  //     setLoading(true)
  //     try {
  //       const result = await fetchCars({
  //         manufacturer: manufacturer || "",
  //         year: year || 2022,
  //         fuel: fuel || "",
  //         limit: limit || 10,
  //         model: model || "",
  //       });
  //       setAllCars(result)

  //       console.log(result)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //     finally {
  //       setLoading(false)
  //     }

  //   }

  //   useEffect(() => {
  //     getCars()
  //   }, [fuel, year, limit, manufacturer, model])
  const allCars = await fetchCars({
    manufacturer: searchParams.manufacturer || "",
    year: searchParams.year || 2022,
    fuel: searchParams.fuel || "",
    limit: searchParams.limit || 10,
    model: searchParams.model || "",
  });

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;
  return (
    <main className="overflow-hidden">
      <Hero />
      <div className='mt-12 padding-x padding-y max-width' id='discover'>
        <div className='home__text-container'>
          <h1 className='text-4xl font-extrabold'>Car Catalogue</h1>
          <p>Explore out cars you might like</p>
        </div>
        <div className='home__filters'>
          <SearchBar />
          <div className='home__filter-container'>
            <CustomFilter title="fuel" options={fuels} />
            <CustomFilter title="year" options={yearsOfProduction} />
          </div>
        </div>
        {!isDataEmpty ? (
          <section>
            WE HAVE CARS
            <div className='home__cars-wrapper'>
              {allCars?.map((car) => (
                <CarCard car={car} />
              ))}
            </div>

            <ShowMore
              pageNumber={(searchParams.limit || 10) / 10}
              isNext={(searchParams.limit || 10) > allCars.length}
            />
          </section>
        ) : (
          <div className='home__error-container'>
            <h2 className='text-black text-xl font-bold'>Oops, no results</h2>
            <p>{allCars?.message}</p>
          </div>
        )}
      </div>
    </main>
  )
}
