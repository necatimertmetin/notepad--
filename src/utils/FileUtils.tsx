
export const saveFile = (title: string) => {
    const savedCode = localStorage.getItem('code');
    if (!savedCode) {
      console.error('No code found in localStorage to save.');
      return;
    }
  
    const blob = new Blob([savedCode], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = title || 'untitled.txt'; 
    link.click();
  };
  