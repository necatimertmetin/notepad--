import React, { useState, useEffect, useRef } from "react";
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  TextField,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Description,
  Html,
  Save,
  Segment,
  VerticalSplit,
  Preview,
} from "@mui/icons-material";
import { useCodeEditor } from "../context/CodeEditorContext";
import { saveFile } from "../../utils/FileUtils";

export const Navbar: React.FC = () => {
  const [title, setTitle] = useState<string>("untitled");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const previewWindowRef = useRef<Window | null>(null);

  const { setLanguage, formatWithPrettier, toggleMinimap, code } =
    useCodeEditor();

  useEffect(() => {
    const storedTitle = localStorage.getItem("navbarTitle");
    if (storedTitle) {
      setTitle(storedTitle);
    }
  }, []);

  const saveTitleToSessionStorage = (newTitle: string) => {
    setTitle(newTitle || "untitled");
    localStorage.setItem("navbarTitle", newTitle);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    saveTitleToSessionStorage(title);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      setIsEditing(false);
      saveTitleToSessionStorage(title);
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const getFileIconAndLanguage = (title: string) => {
    const fileExtension = title.split(".").pop()?.toLowerCase();

    switch (fileExtension) {
      case "txt":
        return { icon: <Description />, language: "plaintext" };
      case "html":
        return { icon: <Html />, language: "html" };
      default:
        return { icon: null, language: "plaintext" };
    }
  };

  const { icon, language: newLanguage } = getFileIconAndLanguage(title);

  useEffect(() => {
    setLanguage(newLanguage);
  }, [title, setLanguage]);

  const openPreviewInNewWindow = () => {
    // Eğer pencere zaten açıksa, içeriği güncelle
    if (previewWindowRef.current && !previewWindowRef.current.closed) {
      const iframe = previewWindowRef.current.document.querySelector("iframe");
      if (iframe) {
        iframe.srcdoc = code; // iframe içeriğini güncelle
      }
      return;
    }

    // Yeni pencereyi aç
    const newWindow = window.open("", "_blank", "width=800,height=600");
    if (newWindow) {
      previewWindowRef.current = newWindow; // Pencereyi referansla sakla
      newWindow.document.write(`
        <html>
          <head>
            <title>${title}</title>
            <style>
              body {
                margin: 0;
                padding: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                background-color: #f4f4f4;
              }
              iframe {
                width: 100%;
                height: 100%;
                border: none;
                background-color: #fff;
              }
            </style>
          </head>
          <body>
            <iframe srcdoc="${code.replace(/"/g, "&quot;")}"></iframe>
          </body>
        </html>
      `);
      newWindow.document.close();
    }
  };

  // Her code değiştiğinde preview penceresinin içeriğini güncelle
  useEffect(() => {
    if (previewWindowRef.current && !previewWindowRef.current.closed) {
      const iframe = previewWindowRef.current.document.querySelector("iframe");
      if (iframe) {
        iframe.srcdoc = code; // iframe içeriğini güncelle
      }
    }
  }, [code]); // code değiştikçe tetiklenir

  return (
    <AppBar position="static" color="warning">
      <Toolbar variant="dense">
        <IconButton
          size="small"
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleMenuClick}
        >
          <MenuIcon />
        </IconButton>

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

        <IconButton
          size="small"
          color="inherit"
          sx={{ ml: 2 }}
          onClick={() => formatWithPrettier()}
        >
          <Segment />
        </IconButton>

        <IconButton
          size="small"
          color="inherit"
          sx={{ ml: 2 }}
          onClick={toggleMinimap}
        >
          <VerticalSplit />
        </IconButton>

        <IconButton
          size="small"
          color="inherit"
          sx={{ ml: 2 }}
          onClick={openPreviewInNewWindow}
        >
          <Preview />
        </IconButton>

        <IconButton
          size="small"
          color="inherit"
          sx={{ ml: 2 }}
          onClick={() => saveFile(title)}
        >
          <Save />
        </IconButton>
        {icon && (
          <IconButton size="small" color="inherit" sx={{ ml: 2 }}>
            {icon}
          </IconButton>
        )}

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
  );
};
