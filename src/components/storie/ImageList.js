import React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Box from '@mui/material/Box';


const srcset = (image, width, height, rows = 1, cols = 1) => {
  return {
    src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${width * cols}&h=${
      height * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export const ImgList = () => {
    return (
    <Box 
        display="flex" 
        justifyContent="center"
    >
      <ImageList
        sx={{
          width: 500,
          height: 450,
          transform: 'translateZ(0)',
        }}
        rowHeight={200}
        gap={1}
      >
        {itemData.map((item, index) => {
          const cols = 2;
          const rows = 2;

          return (
            <ImageListItem key={index} cols={cols} rows={rows}>
              <img
                {...srcset(item, 250, 200, rows, cols)}
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


const itemData = [
  'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
  'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
  'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
  'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
  'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
  'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
  'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
  'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
  'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
  'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
  'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
  'https://images.unsplash.com/photo-1589118949245-7d38baf380d6'
];