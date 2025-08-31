type TagApiResponse = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
};
interface Filters {
  title: string;
  tagIds: string[];
}

type Note = {
  id: string;
  title: string;
  body: string;
  tagIds: string[];
};

type NoteApiResponse = {
  body: string;
  directoryId: string;
  createdAt: string;
  id: string;
  status: true;
  tags: TagApiResponse[];
  title: string;
  updatedAt: string;
};

type ToastInput = {
  id: string;
  message: string;
  icon?: React.ReactNode;
  timeout?: number;
  style?: React.CSSProperties;
};

type JWT = {
  id: string;
  exp: number;
  iat: number;
  [key: string]: string;
};

type ApiError = {
  response;
} & Error;
