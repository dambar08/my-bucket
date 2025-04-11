// Mock data for files and folders
export const mockDriveData = {
  root: {
    id: "root",
    name: "My Drive",
    type: "folder",
    children: ["folder1", "folder2", "file1", "file2", "file3"],
  },
  folder1: {
    id: "folder1",
    name: "Work Documents",
    type: "folder",
    children: ["file4", "file5", "folder3"],
  },
  folder2: {
    id: "folder2",
    name: "Personal",
    type: "folder",
    children: ["file6", "file7"],
  },
  folder3: {
    id: "folder3",
    name: "Projects",
    type: "folder",
    children: ["file8", "file9"],
  },
  file1: {
    id: "file1",
    name: "Resume.pdf",
    type: "file",
    mimeType: "application/pdf",
    size: "2.4 MB",
    modified: "Apr 10, 2025",
  },
  file2: {
    id: "file2",
    name: "Budget.xlsx",
    type: "file",
    mimeType: "application/excel",
    size: "1.8 MB",
    modified: "Apr 8, 2025",
  },
  file3: {
    id: "file3",
    name: "Vacation Photos.zip",
    type: "file",
    mimeType: "application/zip",
    size: "156 MB",
    modified: "Mar 25, 2025",
  },
  file4: {
    id: "file4",
    name: "Presentation.pptx",
    type: "file",
    mimeType: "application/powerpoint",
    size: "5.7 MB",
    modified: "Apr 5, 2025",
  },
  file5: {
    id: "file5",
    name: "Report.docx",
    type: "file",
    mimeType: "application/word",
    size: "1.2 MB",
    modified: "Apr 2, 2025",
  },
  file6: {
    id: "file6",
    name: "Family Photo.jpg",
    type: "file",
    mimeType: "image/jpeg",
    size: "3.5 MB",
    modified: "Mar 15, 2025",
  },
  file7: {
    id: "file7",
    name: "Tax Return.pdf",
    type: "file",
    mimeType: "application/pdf",
    size: "4.2 MB",
    modified: "Feb 28, 2025",
  },
  file8: {
    id: "file8",
    name: "Project Plan.docx",
    type: "file",
    mimeType: "application/word",
    size: "0.8 MB",
    modified: "Apr 9, 2025",
  },
  file9: {
    id: "file9",
    name: "Code Samples.zip",
    type: "file",
    mimeType: "application/zip",
    size: "12.3 MB",
    modified: "Apr 7, 2025",
  },
};

export type File = {
  id: string,
  name: string,
  type: "file",
  url: string,
  mimeType: string,
  parent: string,
  size: string
}

export type Folder = {
  id: string,
  name: string,
  type: "folder",
  url: string,
  parent: string | null,
  size: string
}