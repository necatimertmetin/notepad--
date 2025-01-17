import { AppBar, IconButton, Toolbar, Typography, TextField, Menu, MenuItem } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Menu as MenuIcon, Description, Javascript, Html, Css } from '@mui/icons-material';
import { useLanguage } from '../context/LanguageContext';

export const Navbar: React.FC = () => {
  const [title, setTitle] = useState<string>('untitled');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // Menu anchor element state

  const { language, setLanguage } = useLanguage(); // context'den dil bilgisi ve setLanguage fonksiyonu

  // Load title from sessionStorage if available
  useEffect(() => {
    const storedTitle = sessionStorage.getItem('navbarTitle');
    if (storedTitle) {
      setTitle(storedTitle);
    }
  }, []);

  // Save title to sessionStorage when it changes
  const saveTitleToSessionStorage = (newTitle: string) => {
    setTitle(newTitle || "untitled");
    sessionStorage.setItem('navbarTitle', newTitle);
  };

  // Handle opening the menu
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget); // Set the anchor element for the menu
  };

  // Handle closing the menu
  const handleCloseMenu = () => {
    setAnchorEl(null); // Close the menu
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    saveTitleToSessionStorage(title); // Save when losing focus
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      setIsEditing(false);
      saveTitleToSessionStorage(title); // Save when pressing Enter
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  // Determine the file type icon and language based on the title extension
  const getFileIconAndLanguage = (title: string) => {
    const fileExtension = title.split('.').pop()?.toLowerCase();
    
    switch (fileExtension) {
      case 'txt':
        return { icon: <Description />, language: 'plaintext' };
      case 'js':
        return { icon: <Javascript />, language: 'javascript' };
      case 'html':
        return { icon: <Html />, language: 'html' };
      case 'css':
        return { icon: <Css />, language: 'css' };
      default:
        return { icon: null, language: 'txt' }; // Default to plaintext if no match
    }
  };

  const { icon, language: newLanguage } = getFileIconAndLanguage(title);

  useEffect(() => {
    setLanguage(newLanguage); // Başlık değiştikçe dil bilgisini güncelle
  }, [title, setLanguage]);

  return (
    <div>
      <AppBar position="static">
        <Toolbar variant="dense" sx={{ cursor: 'grab' }}>
          {/* Menu IconButton */}
          <IconButton
            size="small"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleMenuClick} // Handle menu button click
          >
            <MenuIcon />
          </IconButton>

          {/* Title */}
          <Typography
            variant="subtitle1"
            component="div"
            sx={{ flexGrow: 1 }}
            onDoubleClick={handleDoubleClick}
          >
            {isEditing ? (
              <TextField
                value={title}
                onChange={handleTitleChange}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                autoFocus
                sx={{ color: "inherit" }}
                size="small"
              />
            ) : (
              title
            )}
          </Typography>

          {/* File Type Icon */}
          {icon && (
            <IconButton size="small" color="inherit" sx={{ ml: 2 }}>
              {icon}
            </IconButton>
          )}

          {/* Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
          >
            <MenuItem onClick={handleCloseMenu}>Option 1</MenuItem>
            <MenuItem onClick={handleCloseMenu}>Option 2</MenuItem>
            <MenuItem onClick={handleCloseMenu}>Option 3</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

    </div>
  );
};
