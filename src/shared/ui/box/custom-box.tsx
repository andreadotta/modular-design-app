import { Box, BoxProps } from '@mui/material';
import React from 'react';

type CustomBoxProps = BoxProps & {
  children: React.ReactNode;
  leftMargin?: number; // Aggiungi questa linea
};

const CustomBox = ({ children, leftMargin, ...props }: CustomBoxProps) => {
  return (
    <Box
      className="bg-white flex justify-between items-center p-4 rounded-lg"
      style={{ marginLeft: leftMargin }} // Applica lo stile qui
      {...props}
    >
      {children}
    </Box>
  );
};

export default CustomBox;
