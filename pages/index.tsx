import Animator from '@components/Animation'
import Layout from '@components/Layout'
import Loader from '@components/Loader'
import copy from 'copy-to-clipboard'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const IndexPage = () => {
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1500)
  }, [])

  return (
    <Layout title="Rahul Tarak">
      <div className={'h-full   flex flex-col'}>
        {isLoading ? (
          <Loader isLoading={isLoading}></Loader>
        ) : (
          <>
            <div className={'flex'}>
              <Animator></Animator>
            </div>

            <div className="relative  py-16 sm:py-24">
              <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-24 lg:items-start">
                <div className="relative sm:py-16 lg:py-0">
                  <div
                    aria-hidden="true"
                    className="hidden sm:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-screen">
                    <div className="absolute inset-y-0 right-1/2 w-full bg-transparent rounded-r-3xl lg:right-72" />
                    <svg
                      className="absolute top-8 left-1/2 -ml-3 lg:-right-8 lg:left-auto lg:top-12"
                      width={404}
                      height={392}
                      fill="none"
                      viewBox="0 0 404 392">
                      <defs>
                        <pattern
                          id="02f20b47-fd69-4224-a62a-4c9de5c763f7"
                          x={0}
                          y={0}
                          width={20}
                          height={20}
                          patternUnits="userSpaceOnUse">
                          <rect
                            x={0}
                            y={0}
                            width={4}
                            height={4}
                            className="text-gray-300"
                            fill="currentColor"
                          />
                        </pattern>
                      </defs>
                      <rect
                        width={404}
                        height={392}
                        fill="url(#02f20b47-fd69-4224-a62a-4c9de5c763f7)"
                      />
                    </svg>
                  </div>
                  <div className="relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0 lg:max-w-none lg:py-20">
                    <div className="relative pt-64 pb-10 rounded-2xl shadow-xl overflow-hidden">
                      <div className="absolute inset-0 bg-indigo-500 mix-blend-multiply" />
                      <img
                        className="absolute inset-0 h-full w-full object-cover"
                        src="/images/rahulHeadshot.jpg"
                        alt=""
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-indigo-600 via-indigo-600 opacity-50" />
                      <div className="relative px-8">
                        <div>
                          {/* <svg
                            className="h-12 w-auto text-gray-50"
                            viewBox="0 0 1731 376"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M55.3136 168.994C46.8445 168.994 39.9483 175.898 39.9483 184.377V319.623C39.9483 328.102 46.8445 335.005 55.3136 335.005H269.686C278.155 335.005 285.052 328.102 285.052 319.623V184.377C285.052 175.898 278.155 168.994 269.686 168.994H55.3136ZM269.686 375H55.3136C24.8128 375 0 350.158 0 319.623V184.377C0 153.841 24.8128 129 55.3136 129H269.686C300.187 129 325 153.841 325 184.377V319.623C325 350.158 300.187 375 269.686 375Z"
                              fill="currentColor"></path>
                            <g opacity="0.399994">
                              <g opacity="0.399994">
                                <path
                                  className="text-[#02E494]"
                                  opacity="0.399994"
                                  d="M237.248 56.4218C228.224 56.4218 220.041 50.2853 217.82 41.1411C215.214 30.4176 221.807 19.6093 232.546 17.0063L300.345 0.57128C311.134 -2.04193 321.909 4.55923 324.505 15.2822C327.116 26.0058 320.519 36.814 309.784 39.417L241.98 55.8521C240.395 56.2369 238.809 56.4218 237.248 56.4218Z"
                                  fill="currentColor"></path>
                              </g>
                            </g>
                            <g opacity="0.600006">
                              <g opacity="0.600006">
                                <path
                                  className="text-[#02E494]"
                                  opacity="0.600006"
                                  d="M152.354 76.9995C143.33 76.9995 135.147 70.8635 132.926 61.7194C130.319 50.991 136.912 40.1876 147.652 37.584L232.543 17.0073C243.327 14.3935 254.107 20.9947 256.703 31.7128C259.314 42.446 252.716 53.2495 241.982 55.8531L157.086 76.4297C155.5 76.8146 153.914 76.9995 152.354 76.9995Z"
                                  fill="currentColor"></path>
                              </g>
                            </g>
                            <g opacity="0.800003">
                              <g opacity="0.800003">
                                <path
                                  opacity="0.800003"
                                  className="text-[#02E494]"
                                  d="M75.7154 95.5766C66.6915 95.5766 58.5077 89.4407 56.2868 80.2966C53.6806 69.573 60.2738 58.7648 71.0133 56.1612L147.651 37.5878C158.431 34.9698 169.21 41.5655 171.811 52.2939C174.417 63.0169 167.824 73.8251 157.09 76.4287L80.447 95.0069C78.8618 95.3917 77.276 95.5766 75.7154 95.5766Z"
                                  fill="currentColor"></path>
                              </g>
                            </g>
                            <path
                              className="text-[#02E494]"
                              d="M19.9501 109C10.9477 109 2.78335 102.819 0.567655 93.6072C-2.0323 82.8055 4.54524 71.918 15.2592 69.2953L71.3295 55.574C82.0836 52.9464 92.8377 59.5906 95.4323 70.3874C98.0323 81.1945 91.4553 92.0821 80.7461 94.7L24.6705 108.426C23.089 108.814 21.507 109 19.9501 109Z"
                              fill="currentColor"></path>
                            <path
                              className="text-gray-50"
                              d="M650.52 137.688H624.6C620.568 137.688 617.4 137.976 614.52 138.84C611.64 139.704 609.048 141.144 606.744 143.16C604.728 145.464 602.712 148.056 600.984 151.512C599.256 154.968 597.816 159.288 596.088 164.76L545.112 292.056C544.824 293.208 544.536 293.208 544.248 293.208H541.368C541.368 293.208 540.792 293.208 540.504 292.056L489.816 164.76C488.088 159.288 486.36 154.968 484.92 151.512C483.192 148.056 481.176 145.464 479.16 143.16C476.856 141.144 473.976 139.704 471.096 138.84C468.216 137.976 464.76 137.688 461.016 137.688H434.52C424.728 137.688 418.104 140.856 414.648 146.904C411.48 152.376 410.04 161.592 410.04 174.84V365.208C410.04 374.136 415.8 375.288 418.392 375.288H443.16C445.752 375.288 451.224 374.136 451.224 365.208V192.12C451.224 191.832 451.224 191.544 451.224 191.544H452.664C452.952 191.544 453.24 191.544 453.528 192.408L502.776 314.232C504.792 320.28 506.808 325.464 508.824 329.784C511.128 334.104 513.432 337.56 515.736 340.44C518.616 343.32 521.496 345.624 524.952 346.776C528.408 347.928 532.152 348.504 536.472 348.504H548.28C552.6 348.504 556.632 347.928 559.8 346.776C563.256 345.624 566.424 343.32 569.016 340.44C571.32 337.56 573.912 334.104 575.928 329.784C577.944 325.464 579.96 320.28 581.976 314.232L631.512 192.12C631.512 191.544 631.8 191.544 632.088 191.544H633.528C633.528 191.544 633.528 191.832 633.528 192.12V365.208C633.528 374.136 639.288 375.288 641.592 375.288H666.36C668.952 375.288 674.712 374.136 674.712 365.208V174.84C674.712 161.592 673.272 152.376 670.104 146.904C666.648 140.856 660.024 137.688 650.52 137.688ZM931.293 158.712C925.533 151.512 918.045 146.04 908.829 142.584C899.901 139.416 888.957 137.688 876.285 137.688H806.013C793.341 137.688 782.685 139.416 773.757 142.584C764.541 146.04 757.053 151.512 751.293 158.712C745.821 165.912 741.501 175.416 738.909 186.936C736.317 198.168 735.165 211.704 735.165 227.832V284.856C735.165 300.984 736.317 314.808 738.909 326.04C741.501 337.56 745.821 347.064 751.293 354.264C757.053 361.752 764.541 367.224 773.757 370.392C782.397 373.56 793.341 375.288 806.013 375.288H876.285C888.957 375.288 899.901 373.56 908.829 370.392C918.045 367.224 925.533 361.752 931.293 354.552C937.053 347.064 941.085 337.56 943.677 326.04C945.981 314.808 947.421 300.984 947.421 284.856V227.832C947.421 211.992 945.981 198.168 943.677 186.936C941.085 175.416 937.053 165.912 931.293 158.712ZM904.509 222.936V290.04C904.509 298.392 904.221 305.592 903.069 311.352C902.205 316.536 900.477 321.144 898.173 324.024C896.157 327.192 893.277 329.208 889.533 330.36C885.789 331.8 880.893 332.376 874.845 332.376H807.453C801.405 332.376 796.509 331.8 792.765 330.36C789.021 329.208 786.141 327.192 784.125 324.024C781.821 321.144 780.381 316.536 779.229 311.352C778.365 305.592 777.789 298.392 777.789 290.04V222.936C777.789 214.584 778.365 207.384 779.229 201.624C780.381 196.152 781.821 191.832 784.125 188.664C786.141 185.784 789.021 183.768 792.765 182.328C796.509 181.176 801.405 180.312 807.453 180.312H874.845C880.893 180.312 885.789 181.176 889.533 182.328C893.277 183.768 896.157 185.784 898.173 188.664C900.477 191.832 902.205 196.152 903.069 201.624C904.221 207.384 904.509 214.584 904.509 222.936ZM1204.68 191.256C1201.8 179.16 1196.91 169.08 1190.86 161.016C1184.52 153.24 1176.17 147.192 1166.38 143.448C1156.59 139.704 1145.07 137.688 1131.53 137.688H1031.02V137.976C1022.67 138.552 1015.47 143.16 1011.15 150.072C1009.99 152.376 1008.84 154.968 1008.27 157.272L1007.98 353.976C1008.55 357.144 1009.71 360.312 1011.15 362.904C1015.75 370.68 1024.11 375.288 1033.03 375.288H1131.53C1145.07 375.288 1156.87 373.272 1166.38 369.528C1176.17 365.784 1184.52 359.736 1190.86 351.672C1196.91 343.896 1201.8 333.816 1204.68 321.72C1207.56 309.624 1209 295.224 1209 279.096V233.88C1209 217.752 1207.56 203.352 1204.68 191.256ZM1050.31 330.936V182.04C1050.31 180.888 1050.6 180.312 1050.89 180.312H1130.67C1137.29 180.312 1143.05 181.176 1147.66 182.904C1152.27 184.632 1155.72 186.936 1158.31 190.68C1161.19 194.424 1163.21 199.32 1164.36 205.368C1165.51 211.992 1166.38 220.056 1166.38 229.56V283.416C1166.38 292.92 1165.51 300.984 1164.36 307.32C1163.21 313.656 1161.19 318.552 1158.31 322.296C1155.72 325.752 1152.27 328.344 1147.66 330.072C1143.05 331.8 1137.29 332.376 1130.67 332.376H1050.6C1050.6 332.376 1050.31 332.088 1050.31 330.936ZM1442.92 137.688H1277.32C1275.01 137.688 1269.54 138.84 1269.54 148.056V170.232C1269.54 179.16 1275.01 180.312 1277.32 180.312H1442.92C1445.22 180.312 1450.98 179.448 1450.98 170.52V147.768C1450.98 138.552 1445.22 137.688 1442.92 137.688ZM1441.48 234.168L1292.87 234.456C1284.52 235.032 1277.32 239.64 1273 246.552C1271.84 248.856 1270.69 251.448 1270.12 254.04L1269.54 365.208C1269.54 374.136 1275.3 375.288 1277.6 375.288H1304.1C1306.4 375.288 1312.16 374.136 1312.16 365.208C1312.16 365.208 1312.45 276.792 1312.74 276.792H1441.48C1443.78 276.792 1449.54 275.928 1449.54 267V244.248C1449.54 235.32 1443.78 234.168 1441.48 234.168ZM1724.54 137.688H1692.57C1689.98 137.688 1686.52 138.552 1684.22 142.872L1620.86 258.36L1558.07 143.16C1555.77 138.552 1552.31 137.688 1549.72 137.688H1516.89C1514.3 137.688 1512.28 139.128 1511.7 141.72C1511.13 143.736 1511.42 146.04 1512.57 148.056L1598.97 302.136V365.208C1598.97 374.136 1604.73 375 1607.03 375H1633.53C1635.83 375 1641.59 374.136 1641.59 365.208V302.136L1728.86 148.056C1730.01 146.04 1730.3 143.736 1729.72 141.432C1728.86 139.128 1726.84 137.688 1724.54 137.688Z"
                              fill="currentColor"></path>
                          </svg> */}
                        </div>
                        <div className="py-20"></div>
                        {/* <blockquote className="mt-8">
                          <div className="relative text-lg font-medium text-white md:flex-grow">
                            <p className="relative">
                              Tincidunt integer commodo, cursus etiam aliquam
                              neque, et. Consectetur pretium in volutpat, diam.
                              Montes, magna cursus nulla feugiat dignissim id
                              lobortis amet.
                            </p>
                          </div>
                          <footer className="mt-4">
                            <p className="text-base font-semibold text-indigo-200">
                              Founder, Modfy.video
                            </p>
                          </footer>
                        </blockquote> */}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0">
                  {/* Content area */}
                  <div className="pt-12 sm:pt-16 lg:pt-20">
                    <div className="mt-6 font-semibold text-gray-800 dark:text-gray-50 space-y-6">
                      <p className="text-lg">
                        My name is Rahul. I am building{' '}
                        <a className="underline" href="https://modfy.video">
                          Modfy.video
                        </a>
                      </p>
                      <p className="text-base leading-7">
                        I am a{' '}
                        <a
                          className="underline"
                          href="https://pioneer.app/winners/rahul-tarak">
                          {' '}
                          Pioneer @ Pioneer.app
                        </a>
                        , and{' '}
                        <a
                          className="underline"
                          href="https://devfolio.co/blog/first-bif-cohort/">
                          Build India Fellow @ Devfolio
                        </a>
                      </p>
                      <p className="text-base leading-7">
                        Previously, I was{' '}
                        <a className="underline" href="https://thevarstiy.ca">
                          Backend @ The Varsity
                        </a>{' '}
                        and{' '}
                        <a
                          href="https://aws.amazon.com/blogs/mobile/major-league-hacking-fellows-recap-of-winter-2020/"
                          className="underline">
                          Fellow @ MLH.
                        </a>
                      </p>
                      <p>
                        I also wrote a{' '}
                        <a
                          href="https://www.cfrce.com/images/Investigating_the_vertical_ozone_profile_with_a_specific_focus_on_the_ground_level_and_tropospheric_.pdf"
                          className="underline">
                          Research Paper
                        </a>{' '}
                        and founded a{' '}
                        <a
                          href="http://codefest.oakrdige.in"
                          className="underline">
                          Hackathon
                        </a>
                        , among other things.
                      </p>

                      <p className="text-base leading-7">
                        I like building{' '}
                        <Link href="/things" passHref>
                          <a className="underline" href="/things">
                            things
                          </a>
                        </Link>
                        . Also occationally{' '}
                        <Link href="/posts" passHref>
                          <a className="underline" href="/posts">
                            write
                          </a>
                        </Link>
                        ,{' '}
                        <a
                          className="underline"
                          href="https://photography.cryogenicplanet.tech">
                          take photos
                        </a>{' '}
                        and{' '}
                        <a
                          className="underline"
                          href="https://film.cryogenicplanet.tech">
                          make short films.
                        </a>
                      </p>
                      <p className="text-base leading-7">
                        <button
                          onClick={() => {
                            copy('rahul@modfy.video')
                            toast.success('Copied email to clipboard')
                          }}
                          className="font-bold underline focus:outline-none">
                          rahul@modfy.video
                        </button>
                      </p>
                    </div>
                  </div>

                  {/* Stats section */}
                  <div className="mt-10">
                    <div className="mt-10">
                      <a
                        href="https://modfy.video"
                        className="text-base font-medium text-indigo-600 dark:text-indigo-500">
                        {' '}
                        Learn more about how we are reinventing video editing{' '}
                        <span aria-hidden="true">&rarr;</span>{' '}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  )
}

export default IndexPage
