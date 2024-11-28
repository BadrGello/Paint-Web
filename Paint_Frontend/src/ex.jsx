import React, { useState } from 'react';

const FileUploaderAndSaver = () => {
    const [fileName, setFileName] = useState('');
    const [filePath, setFilePath] = useState('');
    const [fileContent, setFileContent] = useState('');
    const [uploadedFile, setUploadedFile] = useState(null);

    // Handle file upload
    const handleFileChange = (event) => {
        const file = event.target.files[0]; // Get the first file
        if (file) {
            setFileName(file.name); // Set the file name
            setFilePath(file.path || ''); // Set the file path (limited in most browsers)
            
            // Read the file content
            const reader = new FileReader();
            reader.onload = () => {
                setFileContent(reader.result); // Set the file content
            };
            reader.readAsText(file); // Read file as text
            setUploadedFile(file); // Store the uploaded file object
        }
    };

    // Handle Save As functionality
    const handleSaveAs = () => {
        const blob = new Blob([fileContent], { type: 'text/plain' }); // Create a Blob from the content
        const link = document.createElement('a'); // Create an anchor element
        link.href = URL.createObjectURL(blob); // Create a URL for the Blob
        link.download = fileName || 'untitled.txt'; // Set the download file name
        link.click(); // Trigger the download
    };

    return (
        <div>
            <h2>Upload and Save As Example</h2>

            {/* File Upload Section */}
            <div>
                <label>Upload File:</label>
                <input type="file" onChange={handleFileChange} />
            </div>

            {/* Display File Info after Upload */}
            {uploadedFile && (
                <div>
                    <p><strong>File Name:</strong> {fileName}</p>
                    <p><strong>File Path:</strong> {filePath || 'Not available in most browsers'}</p>
                    <p><strong>File Content:</strong></p>
                    <textarea 
                        rows="10" 
                        cols="50" 
                        value={fileContent} 
                        onChange={(e) => setFileContent(e.target.value)} 
                    />
                </div>
            )}

            {/* Save As Section */}
            <div>
                <button onClick={handleSaveAs}>Save As</button>
            </div>
        </div>
    );
};

export default FileUploaderAndSaver;
