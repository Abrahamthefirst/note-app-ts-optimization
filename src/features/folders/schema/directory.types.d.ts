
type DirectoryApiResponse = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  parentId: string;
  userId: string;
};

type DirectoriesApiResponse = DirectoryApiResponse[];
