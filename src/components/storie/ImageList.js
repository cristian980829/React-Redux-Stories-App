import React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';


const srcset = (image, width, height, rows = 1, cols = 1) => {
  return {
    src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${width * cols}&h=${
      height * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export const ImgList = () => {

  const { urlImages } = useSelector( state => state.storie );

    return (
    <Box 
        display="flex" 
        justifyContent="center"
    >
      <ImageList
        sx={{
          width: 400,
          height: 300,
          transform: 'translateZ(0)',
        }}
        rowHeight={150}
        gap={1}
      >
        {urlImages.map((item, index) => {
          const cols = 2;
          const rows = 2;

          return (
            <ImageListItem key={index} cols={cols} rows={rows}>
              <img
                {...srcset(item, 200, 150, rows, cols)}
                alt={item}
                loading="lazy"
              />
            </ImageListItem>
          );
        })}
      </ImageList>
    </Box>
  );
}
