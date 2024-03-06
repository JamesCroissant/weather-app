import React from 'react'

const ImageList = ({ imageList, cityName }) => {
  return (
    <>
      <h2 className="text-3xl md:text-4xl text-center font-bold mt-16">{cityName}'s Gallery</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-1 sm:flex-row justify-center overflow-x-aut w-10/12 rounded-md bg-opacity-50 mx-auto p-2 font-medium">
        {imageList.map((image, index) => {
          return (
            <li key={index} className={`text-center flex flex-col my-2.5 sm:mx-1.5 items-center justify-center rounded-xl p-2 mx-auto  bg-opacity-30`}>
              <img 
                src={image.urls.regular} 
                alt={`City Image ${index + 1}`}
                className="w-12 h-12 my-2 rounded-lg"
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'cover'
                }}
              />
            </li>
          );
        })}
      </ul>
    </>
  )
}

export default ImageList