import React, { Fragment, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { CardFood } from '../Components/Card/Card';

const Search = () => {

  // const [search, setsearch] = useState("28012 Madrid, Spain") // Unused for now

  const [filters, setFilters] = useState([
    {
      title: "Popular Style",
      filter: [
        {
          title: "American",
          count: "24",
          status: false
        },
        {
          title: "Indonesian",
          count: "2",
          status: false
        },
        {
          title: "Arabic",
          count: "8",
          status: false
        },
        {
          title: "Indian",
          count: "20",
          status: false
        },
        {
          title: "Asian",
          count: "12",
          status: false
        },
        {
          title: "Italian",
          count: "18",
          status: false
        },
      ]
    },
    {
      title: "More Filter",
      filter: [
        {
          title: "Breakfast",
          count: "24",
          status: false
        },
        {
          title: "Burgers",
          count: "2",
          status: false
        },
        {
          title: "Sushi",
          count: "2",
          status: false
        },
        {
          title: "Coto Makasar",
          count: "4",
          status: false
        },
        {
          title: "Bakery and Pastry",
          count: "8",
          status: false
        },
        {
          title: "Brunch",
          count: "20",
          status: false
        },
        {
          title: "Chicken",
          count: "12",
          status: false
        },
        {
          title: "Healthy",
          count: "18",
          status: false
        },
        {
          title: "Kebab",
          count: "18",
          status: false
        },
        {
          title: "Pizza",
          count: "18",
          status: false
        },
        {
          title: "Sandwich",
          count: "18",
          status: false
        },
      ]
    },
  ]);

  const updateFilterStatus = (categoryTitle, filterTitle) => {
    setFilters(prevFilters => {
      return prevFilters.map(category => {
        if (category.title === categoryTitle) {
          return {
            ...category,
            filter: category.filter.map(item => {
              if (item.title === filterTitle) {
                return {
                  ...item,
                  status: !item.status // Toggle status
                };
              }
              return item;
            })
          };
        }
        return category;
      });
    });
  };

  const listFOod = [
    {
      img: window.origin + "/images/fd (1).png",
      title: "La Bella Italia",
      distance: "1.2 km",
      time: "9:00 AM - 10:00 PM",
      like: "160"
    },
    {
      img: window.origin + "/images/fd (2).png",
      title: "Istanbul Doner Kebab",
      distance: "1.2 km",
      time: "9:00 AM - 10:00 PM",
      like: "201"
    },
    {
      img: window.origin + "/images/fd (3).png",
      title: "Cedar Delights",
      distance: "1.2 km",
      time: "9:00 AM - 10:00 PM",
      like: "120"
    },
    {
      img: window.origin + "/images/fd (4).png",
      title: "Desert Rose Grill",
      distance: "1.2 km",
      time: "9:00 AM - 10:00 PM",
      like: "201"
    },
    {
      img: window.origin + "/images/fd (5).png",
      title: "Cairo Spice Kitchen",
      distance: "1.2 km",
      time: "9:00 AM - 10:00 PM",
      like: "201"
    },
    {
      img: window.origin + "/images/fd (6).png",
      title: "Majestic Mezze",
      distance: "1.2 km",
      time: "9:00 AM - 10:00 PM",
      like: "201"
    },
    {
      img: window.origin + "/images/fd (7).png",
      title: "Cucina Italiana",
      distance: "1.2 km",
      time: "9:00 AM - 10:00 PM",
      like: "201"
    },
    {
      img: window.origin + "/images/fd (8).png",
      title: "Pasta Perfection",
      distance: "1.2 km",
      time: "9:00 AM - 10:00 PM",
      like: "201"
    },
    {
      img: window.origin + "/images/fd (9).png",
      title: "Bella Napoli",
      distance: "1.2 km",
      time: "9:00 AM - 10:00 PM",
      like: "201"
    },
    {
      img: window.origin + "/images/fd (10).png",
      title: "Taste of Tuscany",
      distance: "1.2 km",
      time: "9:00 AM - 10:00 PM",
      like: "201"
    },
    {
      img: window.origin + "/images/fd (11).png",
      title: "Sicilian Serenade",
      distance: "1.2 km",
      time: "9:00 AM - 10:00 PM",
      like: "201"
    },
    {
      img: window.origin + "/images/fd (12).png",
      title: "Roman Ristorante",
      distance: "1.2 km",
      time: "9:00 AM - 10:00 PM",
      like: "201"
    },
  ]

  const [ToogleFilter, setToogleFilter] = useState(false)
  const [showResults, setShowResults] = useState(false) // Hide results initially

  return (
    <Fragment>
      <section className='bg-[#F8F8F8] -mt-[88px] lg:-mt-[98px] pt-[140px]'>
        <Container>
          <Row>
            <Col lg={showResults ? 3 : 12}>
              {showResults && (
              <div className={"lg:!w-full h-full lg:!h-auto overflow-auto p-4 rounded-[12px] border border-[#E5E5E5] lg:!left-0 h-full top-0 w-[350px] fixed z-[9999] lg:!z-[2] bg-white lg:!bg-transparent lg:!relative transition-all duration-300 " + (ToogleFilter ? "left-[0]" : "-left-[50rem]")}>
                <div className="flex items-center justify-between mb-4">
                  <h4 className='font-semibold text__16'>Filter by</h4>
                  <div className="cursor-pointer lg:hidden" onClick={()=>setToogleFilter(!ToogleFilter)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  {
                    filters.map((category, categoryIndex) => {
                      return <div className="w-full flex flex-wrap gap-3">
                        <h5 className='text__14 font-medium w-full'>{category.title}</h5>

                        {
                          category.filter.map((item, itemIndex) => {
                            return <div className="flex items-center justify-between gap-2 w-full">
                              <div className="flex items-center justify-between gap-2 relative">
                                <input type="checkbox" id="vehicle1" name="filter1" value="Bike" className='absolute -z-[1] opacity-0 left-0 top-0' />
                                <label for="filter1" onClick={() => updateFilterStatus(category.title, item.title)} className={'cursor-pointer w-[20px] h-[20px] rounded-[4px] relative checkboxFIlter ' + (item.status ? "active" : "")}>
                                  <img src="./../images/check.png" className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2' alt="" />
                                </label>
                                <label className='cursor-pointer text__16 text-[#171717]' for="filter1" onClick={() => updateFilterStatus(category.title, item.title)}>{item.title}</label>
                              </div>
                              <div className='text__14 text-[#171717] w-[32px] h-[32px] rounded-full flex items-center justify-center bg-[#F5F5F5]'>{item.count}</div>
                            </div>
                          })
                        }

                      </div>
                    })
                  }

                </div>
              </div>
              )}
            </Col>
            <Col lg={showResults ? 9 : 12}>
              {!showResults ? (
                // Address Search View - When no results are shown
                <div className="text-center py-20">
                  <h2 className="text-h2-normal text-Mblack mb-6">Find Local Food Near You</h2>
                  <p className="text-body-lg-regular text-Mgray mb-8 max-w-2xl mx-auto">
                    Enter your address to discover amazing home-cooked meals from local sellers in your area.
                  </p>
                  <div className="flex items-center gap-3 max-w-2xl mx-auto">
                    <div className="flex items-center gap-2 px-3 py-2 rounded-full border border-[#E5E5E5] w-full bg-white">
                      <img src="./../images/location.png" className='flex-shrink-0' alt="" />
                      <input type="text" className='w-full bg-transparent border-none outline-none hover:focus:active:border-none hover:focus:active:outline-none font-medium text__14 text-Mblack' placeholder='Enter your address...' />
                    </div>
                    <button
                      onClick={() => setShowResults(true)}
                      className="flex items-center justify-center h-[42px] gap-2 px-4 py-2 rounded-full bg-Myellow cursor-pointer hover:bg-yellow-400 transition-colors"
                    >
                      <img src="./../images/search-normal.svg" alt="" />
                      <div className='font-medium text__16'>Search</div>
                    </button>
                  </div>
                  <p className="text-body-sm-regular text-Mgray mt-4">
                    We'll show you verified local food sellers near your location
                  </p>
                </div>
              ) : (
                // Search Results View
                <div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-2 rounded-full border border-[#E5E5E5] w-full">
                  <img src="./../images/location.png" className='flex-shrink-0' alt="" />
                  <input type="text" className='w-full bg-transparent border-none outline-none hover:focus:active:border-none hover:focus:active:outline-none font-medium text__14 text-Mblack' placeholder='Search Food...' />
                </div>
                <div className="flex items-center justify-center h-[42px] gap-2 px-4 py-2 rounded-full bg-Myellow cursor-pointer">
                  <img src="./../images/search-normal.png" alt="" />
                  <div className='font-medium text__16'>Search</div>
                </div>
              </div>

              <div className="my-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text__16 font-medium text-[#171717]">
                  <p>56</p>
                  <p className='text-[#737373]'>Restaurants found</p>
                </div>

                <div className="flex items-center gap-2 px-4 py-2 border !border-[#E5E5E5] rounded-full lg:hidden cursor-pointer" onClick={()=>setToogleFilter(!ToogleFilter)}>
                  <p className='font-medium text__14'>Filter</p>
                  <img src="./../images/filter.svg" alt="" />
                </div>
              </div>

              <Row className='gap-y-6'>
                {
                  listFOod.map((obj) => {
                    return <Col md={4}>
                      <CardFood data={obj} />
                    </Col>
                  })
                }

              </Row>

              <div className="flex justify-center mt-4">
                <nav aria-label="Page navigation example">
                  <ul className="pagination pagiantionMod gap-2">
                    <li className="page-item">
                      <button className="page-link" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                        <span className="sr-only">Previous</span>
                      </button>
                    </li>
                    <li className="page-item active"><button className="page-link">1</button></li>
                    <li className="page-item"><button className="page-link">2</button></li>
                    <li className="page-item"><button className="page-link">3</button></li>
                    <li className="page-item"><button className="page-link">...</button></li>
                    <li className="page-item"><button className="page-link">10</button></li>
                    <li className="page-item">
                      <button className="page-link" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                        <span className="sr-only">Next</span>
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
              </div>
              )}
            </Col>
          </Row>


        </Container>
      </section>
    </Fragment>
  )
}

export default Search