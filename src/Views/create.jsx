import React, { useState } from 'react';

export function CreateDocs() {
  const [fileContent, setFileContent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newContent, setNewContent] = useState({ type: '', content: '' });
  const [additionalContent, setAdditionalContent] = useState([]);

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = (event) => {
      const content = event.target.result;
      setFileContent(content);
    };

    reader.readAsText(file);
  };

  const wrapContentWithH1 = (content) => {
    return `<h1>${content}</h1>`;
  };

  const wrapContentWithH2 = (content) => {
    return `<h2>${content}</h2>`;
  };

  const wrapContentWithH4 = (content) => {
    return `<h4>${content}</h4>`;
  };

  const wrapContentWithP = (content) => {
    return `<p>${content}</p>`;
  };

  const wrapContentWithImg = (src) => {
    return `<img src="${src}" alt="Imagen" />`;
  };

  const addTagsToContent = (additionalTags) => {
    if (fileContent) {
      const modifiedContent = fileContent + additionalTags;
      setFileContent(modifiedContent);
    }
  };

  const downloadFile = () => {
    let modifiedContent = fileContent || '';

    additionalContent.forEach(({ type, content }) => {
      switch (type) {
        case 'h2':
          modifiedContent += wrapContentWithH2(content);
          break;
        case 'h4':
          modifiedContent += wrapContentWithH4(content);
          break;
        case 'p':
          modifiedContent += wrapContentWithP(content);
          break;
        case 'img':
          modifiedContent += wrapContentWithImg(content);
          break;
        default:
          break;
      }
    });

    if (modifiedContent) {
      const blob = new Blob([modifiedContent], { type: 'text/html' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'modified_file.html';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }
  };

  const handleNewContentModal = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleAddNewContent = () => {
    setAdditionalContent([...additionalContent, newContent]);
    setNewContent({ type: '', content: '' });
    setShowModal(false);
  };

  const handleDeleteContent = (index) => {
    const updatedContent = [...additionalContent];
    updatedContent.splice(index, 1);
    setAdditionalContent(updatedContent);
  };

  return (
    <>
      <h1>hola</h1>
      <input
        title="Seleccionar archivo"
        accept="text/html"
        type="file"
        id="directoryInput"
        webkitdirectory
        directory
        onChange={handleFileInputChange}
      />
      {fileContent && (
        <div dangerouslySetInnerHTML={{ __html: wrapContentWithH1(fileContent) }} />
      )}
      {additionalContent.map(({ type, content }, index) => (
        <div key={index} className='asdf'>
          {type === 'h2' && <h2>{content}</h2>}
          {type === 'h4' && <h4>{content}</h4>}
          {type === 'p' && <p>{content}</p>}
          {type === 'img' && <img src={content} alt="Imagen" />}
          <button onClick={() => handleDeleteContent(index)} className='delete'>Eliminar</button>
        </div>
      ))}
      <button onClick={handleNewContentModal}>Agregar contenido</button>
      <button onClick={downloadFile}>Descargar archivo modificado</button>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleModalClose}>&times;</span>
            <h2>Ingresa el contenido:</h2>
            <select value={newContent.type} onChange={(e) => setNewContent({ ...newContent, type: e.target.value })}>
              <option value="">Selecciona el tipo de contenido</option>
              <option value="h2">Encabezado H2</option>
              <option value="h4">Encabezado H4</option>
              <option value="p">Párrafo</option>
              <option value="img">Imagen</option>
            </select>
            {newContent.type !== 'img' && (
              <textarea value={newContent.content} onChange={(e) => setNewContent({ ...newContent, content: e.target.value })} />
            )}
            {newContent.type === 'img' && (
              <input type="file" accept="image/*" onChange={(e) => setNewContent({ ...newContent, content: URL.createObjectURL(e.target.files[0]) })} />
            )}
            <button onClick={handleAddNewContent}>Agregar</button>
          </div>
        </div>
      )}
    </>
  );
}
