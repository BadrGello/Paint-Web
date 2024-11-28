package com.team.Paint_Backend;

public class SavedData {
      private String Path;
      private String FileName;
      private int zIndexTracker;
      public SavedData() {
        // Default constructor for deserialization
    }

    public SavedData(String path, String fileName, int zIndexTracker) {
        this.Path = path;
        this.FileName = fileName;
        this.zIndexTracker = zIndexTracker;
    }

    public String getPath() {
        return this.Path;
    }

    public void setPath(String Path) {
        this.Path = Path;
    }

    public String getFileName() {
        return this.FileName;
    }

    public void setFileName(String FileName) {
        this.FileName = FileName;
    }

    public int getZIndexTracker() {
        return this.zIndexTracker;
    }

    public void setZIndexTracker(int zIndexTracker) {
        this.zIndexTracker = zIndexTracker;
    }

}
